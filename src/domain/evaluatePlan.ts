import type {
  CareOptionId,
  CareSymbol,
  CareSymbolId,
  PlanningStage,
  RelativeLevel,
} from './careTypes';
import type { CareOption, GarmentMission, StudentPlan, VirtualGarment } from './missionTypes';
import type { PlanEvaluation, PlanFinding } from './evaluationTypes';

const planningStages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const relativeLevelRank: Readonly<Record<RelativeLevel, number>> = {
  lower: 0,
  medium: 1,
  higher: 2,
};

const safetyNotices: readonly string[] = [
  '실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요.',
  '실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요.',
  '표시는 국가·시기·제품에 따라 다를 수 있어요. 모르는 표시는 보호자·교사 또는 제품 공식 안내에 확인하세요.',
  '이 앱은 가상 의류를 위한 학습 도구이며 실제 손상이나 안전을 보증하는 전문 서비스가 아니에요.',
];

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function intersect(
  source: readonly CareOptionId[],
  allowed: readonly CareOptionId[],
): readonly CareOptionId[] {
  const allowedSet = new Set(allowed);
  return source.filter((optionId) => allowedSet.has(optionId));
}

function symbolsForStage(
  garment: VirtualGarment,
  stage: PlanningStage,
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
): readonly CareSymbol[] {
  return garment.symbolIds
    .map((symbolId) => symbols.get(symbolId))
    .filter((symbol): symbol is CareSymbol => symbol?.category === stage);
}

function allowedByStage(
  garment: VirtualGarment,
  stage: PlanningStage,
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): readonly CareOptionId[] {
  const materialOptions = garment.materialAllowedOptionIdsByStage[stage].filter(
    (optionId) => options.get(optionId)?.stage === stage,
  );
  let resolved = [...materialOptions];

  for (const symbol of symbolsForStage(garment, stage, symbols)) {
    resolved = [...intersect(resolved, symbol.allowedOptionIds)].filter(
      (optionId) => !symbol.forbiddenOptionIds.includes(optionId),
    );
  }

  return unique(resolved);
}

export function resolveGarmentAllowedOptions(input: {
  garment: VirtualGarment;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): Readonly<Record<PlanningStage, readonly CareOptionId[]>> {
  const { garment, symbols, options } = input;

  return {
    wash: allowedByStage(garment, 'wash', symbols, options),
    dry: allowedByStage(garment, 'dry', symbols, options),
    iron: allowedByStage(garment, 'iron', symbols, options),
  };
}

function selectedGarments(
  mission: GarmentMission,
  plan: StudentPlan,
): readonly VirtualGarment[] {
  const garmentsById = new Map(mission.garments.map((garment) => [garment.id, garment] as const));
  return plan.garmentIds
    .map((garmentId) => garmentsById.get(garmentId))
    .filter((garment): garment is VirtualGarment => garment !== undefined);
}

function combinedOptions(
  garments: readonly VirtualGarment[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): Readonly<Record<PlanningStage, readonly CareOptionId[]>> {
  const byGarment = garments.map((garment) =>
    resolveGarmentAllowedOptions({ garment, symbols, options }),
  );

  const commonFor = (stage: PlanningStage): readonly CareOptionId[] => {
    const first = byGarment[0]?.[stage] ?? [];
    return byGarment.slice(1).reduce<readonly CareOptionId[]>(
      (current, garmentOptions) => intersect(current, garmentOptions[stage]),
      [...first],
    );
  };

  return {
    wash: [...commonFor('wash')],
    dry: [...commonFor('dry')],
    iron: [...commonFor('iron')],
  };
}

function stageSymbolIds(
  garments: readonly VirtualGarment[],
  stage: PlanningStage,
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
): readonly CareSymbolId[] {
  return unique(
    garments.flatMap((garment) =>
      symbolsForStage(garment, stage, symbols).map((symbol) => symbol.id),
    ),
  );
}

function blockingSymbolIds(
  garments: readonly VirtualGarment[],
  stage: PlanningStage,
  optionId: CareOptionId,
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): readonly CareSymbolId[] {
  return unique(
    garments.flatMap((garment) =>
      symbolsForStage(garment, stage, symbols)
        .filter(
          (symbol) =>
            !symbol.allowedOptionIds.includes(optionId) ||
            symbol.forbiddenOptionIds.includes(optionId),
        )
        .map((symbol) => symbol.id),
    ),
  ).filter((symbolId) => symbols.has(symbolId) && options.has(optionId));
}

function riskIdsFor(
  symbolIds: readonly CareSymbolId[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  option: CareOption | undefined,
): readonly PlanFinding['riskIds'][number][] {
  return unique([
    ...symbolIds.flatMap((symbolId) => symbols.get(symbolId)?.riskIds ?? []),
    ...(option?.riskIds ?? []),
  ]);
}

function optionLabel(optionId: CareOptionId, options: ReadonlyMap<CareOptionId, CareOption>): string {
  return options.get(optionId)?.label ?? optionId;
}

function relativeMaximum(
  values: readonly (RelativeLevel | undefined)[],
): RelativeLevel {
  const selected = values.filter((value): value is RelativeLevel => value !== undefined);
  if (selected.length === 0) return 'lower';
  return selected.reduce<RelativeLevel>(
    (highest, value) =>
      relativeLevelRank[value] > relativeLevelRank[highest] ? value : highest,
    'lower',
  );
}

function outsideFeedback(stage: PlanningStage, optionName: string): string {
  return `${stage} 단계에서 '${optionName}' 선택은 관련 표시와 재료 모형의 허용 범위 밖일 수 있어요. 손상 가능성을 단정하지 말고 표시를 다시 살펴보며 보호자·교사에게 확인해 보세요.`;
}

function missingFeedback(stage: PlanningStage): string {
  return `${stage} 단계의 관리 선택이 빠졌어요. 관련 표시와 재료 모형 조건을 다시 확인해 카드를 골라 보세요.`;
}

function allowedFeedback(stage: PlanningStage, optionName: string): string {
  return `${stage} 단계의 '${optionName}' 선택이 관련 표시와 재료 모형 조건 안에 있어요. 실제 의류에서는 표시 라벨을 우선하고 보호자·교사와 확인해요.`;
}

function restrictionFeedback(symbol: CareSymbol): string {
  return `'${symbol.name}' 표시의 추가 제한을 아직 확인하지 않았어요. 실제 라벨과 보호자·교사 안내를 먼저 살펴보세요.`;
}

export function evaluatePlan(input: {
  mission: GarmentMission;
  plan: StudentPlan;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): PlanEvaluation {
  const { mission, plan, symbols, options } = input;
  const garments = selectedGarments(mission, plan);
  const garmentIds = garments.map((garment) => garment.id);
  const combinedAllowedOptions = combinedOptions(garments, symbols, options);
  const findings: PlanFinding[] = [];
  const selectedOptions = planningStages.map((stage) => plan.stageOptions[stage]);

  for (const stage of planningStages) {
    const optionId = plan.stageOptions[stage];
    const relatedSymbolIds = stageSymbolIds(garments, stage, symbols);
    const combined = combinedAllowedOptions[stage];

    if (optionId === null || combined.length === 0) {
      findings.push({
        status: 'missing-step',
        stage,
        garmentIds: [...garmentIds],
        optionId: null,
        relatedSymbolIds: [...relatedSymbolIds],
        riskIds: riskIdsFor(relatedSymbolIds, symbols, undefined),
        feedback: missingFeedback(stage),
      });
      continue;
    }

    if (!combined.includes(optionId)) {
      const related = blockingSymbolIds(garments, stage, optionId, symbols, options);
      findings.push({
        status: 'outside-limit',
        stage,
        garmentIds: [...garmentIds],
        optionId,
        relatedSymbolIds: [...related],
        riskIds: riskIdsFor(related, symbols, options.get(optionId)),
        feedback: outsideFeedback(stage, optionLabel(optionId, options)),
      });
      continue;
    }

    findings.push({
      status: 'allowed',
      stage,
      garmentIds: [...garmentIds],
      optionId,
      relatedSymbolIds: [...relatedSymbolIds],
      riskIds: riskIdsFor(relatedSymbolIds, symbols, options.get(optionId)),
      feedback: allowedFeedback(stage, optionLabel(optionId, options)),
    });
  }

  const acknowledged = new Set(plan.acknowledgedRestrictionIds);
  const restrictions = unique(
    garments.flatMap((garment) =>
      garment.symbolIds.filter((symbolId) => symbols.get(symbolId)?.requiresAcknowledgement),
    ),
  );
  for (const symbolId of restrictions) {
    if (acknowledged.has(symbolId)) continue;
    const symbol = symbols.get(symbolId);
    if (symbol === undefined) continue;
    const affectedGarmentIds = garments
      .filter((garment) => garment.symbolIds.includes(symbolId))
      .map((garment) => garment.id);
    findings.push({
      status: 'unread-restriction',
      stage: 'restriction',
      garmentIds: affectedGarmentIds,
      optionId: null,
      relatedSymbolIds: [symbol.id],
      riskIds: [...symbol.riskIds],
      feedback: restrictionFeedback(symbol),
    });
  }

  return {
    status: findings.some(({ status }) => status !== 'allowed') ? 'revise' : 'ready',
    findings,
    combinedAllowedOptions,
    waterUse: relativeMaximum(
      selectedOptions.map((optionId) => (optionId === null ? undefined : options.get(optionId)?.waterUse)),
    ),
    energyUse: relativeMaximum(
      selectedOptions.map((optionId) => (optionId === null ? undefined : options.get(optionId)?.energyUse)),
    ),
    safetyNotices: [...safetyNotices],
  };
}
