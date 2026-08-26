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
const careStages = ['wash', 'bleach', 'dry', 'iron', 'professional'] as const;
const stageLabels: Readonly<Record<PlanningStage, string>> = {
  wash: '세탁',
  dry: '건조',
  iron: '다림질',
};
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
): RelativeLevel | null {
  const selected = values.filter((value): value is RelativeLevel => value !== undefined);
  if (selected.length !== values.length || selected.length === 0) return null;
  return selected.reduce<RelativeLevel>(
    (highest, value) =>
      relativeLevelRank[value] > relativeLevelRank[highest] ? value : highest,
    'lower',
  );
}

function outsideFeedback(stage: PlanningStage, optionName: string): string {
  return `${stageLabels[stage]}에서 '${optionName}' 선택은 관련 표시와 재료 모형의 허용 범위 밖일 수 있어요. 손상 가능성을 단정하지 말고 표시를 다시 살펴보며 보호자·교사에게 확인해 보세요.`;
}

function missingFeedback(stage: PlanningStage): string {
  return `${stageLabels[stage]} 관리 선택이 빠졌어요. 관련 표시와 재료 모형 조건을 다시 확인해 카드를 골라 보세요.`;
}

function allowedFeedback(stage: PlanningStage, optionName: string): string {
  return `${stageLabels[stage]} '${optionName}' 선택이 관련 표시와 재료 모형 조건 안에 있어요. 실제 의류에서는 표시 라벨을 우선하고 보호자·교사와 확인해요.`;
}

function restrictionFeedback(symbol: CareSymbol): string {
  return `'${symbol.name}' 표시의 추가 제한을 아직 확인하지 않았어요. 실제 라벨과 보호자·교사 안내를 먼저 살펴보세요.`;
}

function isMapLike(value: unknown): value is ReadonlyMap<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof (value as ReadonlyMap<string, unknown>).get === 'function' &&
    typeof (value as ReadonlyMap<string, unknown>).has === 'function'
  );
}

function invalidEvaluation(message: string): PlanEvaluation {
  const finding: PlanFinding = {
    status: 'invalid-input',
    stage: 'restriction',
    garmentIds: [],
    optionId: null,
    relatedSymbolIds: [],
    riskIds: [],
    feedback: `입력 자료를 확인할 수 없어요. ${message} 표시와 선택 목록을 다시 확인하고 보호자·교사에게 물어보세요.`,
  };
  return {
    status: 'revise',
    findings: [finding],
    combinedAllowedOptions: { wash: [], dry: [], iron: [] },
    waterUse: null,
    energyUse: null,
    safetyNotices: [...safetyNotices],
  };
}

function optionReferenceIssue(
  optionId: unknown,
  stage: PlanningStage,
  options: ReadonlyMap<string, unknown>,
  source: string,
): string | null {
  if (typeof optionId !== 'string') return `${source}의 선택 ID가 올바르지 않아요.`;
  const option = options.get(optionId) as CareOption | undefined;
  if (option === undefined) return `${source} '${optionId}' 선택을 목록에서 찾을 수 없어요.`;
  if (option.id !== optionId) return `${source} '${optionId}' 선택의 ID가 목록과 달라요.`;
  if (option.stage !== stage) return `${source} '${optionId}' 선택이 ${stageLabels[stage]} 단계와 맞지 않아요.`;
  return null;
}

function symbolReferenceIssue(
  symbolId: unknown,
  symbols: ReadonlyMap<string, unknown>,
): string | null {
  if (typeof symbolId !== 'string') return '표시 ID가 올바르지 않아요.';
  const symbol = symbols.get(symbolId) as CareSymbol | undefined;
  if (symbol === undefined) return `'${symbolId}' 표시를 목록에서 찾을 수 없어요.`;
  if (symbol.id !== symbolId) return `'${symbolId}' 표시의 ID가 목록과 달라요.`;
  return null;
}

function isPlanningStage(value: string): value is PlanningStage {
  return planningStages.includes(value as PlanningStage);
}

function validatePlanInput(input: {
  mission: GarmentMission;
  plan: StudentPlan;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): string | null {
  const { mission, plan, symbols, options } = input;
  if (!isMapLike(symbols) || !isMapLike(options)) return '표시·선택 목록이 올바른 목록이 아니에요.';
  if (mission === null || typeof mission !== 'object' || !Array.isArray(mission.garments)) {
    return '미션의 의류 목록이 올바르지 않아요.';
  }
  if (
    typeof mission.id !== 'string' ||
    mission.garments.some(
      (garment) => garment === null || typeof garment !== 'object' || typeof garment.id !== 'string',
    )
  ) {
    return '미션 ID 또는 의류 ID가 올바르지 않아요.';
  }
  if (plan === null || typeof plan !== 'object' || !Array.isArray(plan.garmentIds)) {
    return '계획의 의류 목록이 올바르지 않아요.';
  }
  if (plan.missionId !== mission.id) return '계획과 미션의 ID가 서로 달라요.';
  if (new Set(mission.garments.map(({ id }) => id)).size !== mission.garments.length) {
    return '미션에 중복된 의류 ID가 있어요.';
  }

  const missionGarmentIds = mission.garments.map(({ id }) => id);
  const plannedGarmentIds = plan.garmentIds;
  if (
    plannedGarmentIds.length !== missionGarmentIds.length ||
    new Set(plannedGarmentIds).size !== plannedGarmentIds.length ||
    plannedGarmentIds.some((garmentId) => !missionGarmentIds.includes(garmentId))
  ) {
    return '계획의 의류 목록이 미션의 의류와 정확히 일치하지 않아요.';
  }

  if (plan.stageOptions === null || typeof plan.stageOptions !== 'object') {
    return '세탁·건조·다림질 선택 목록이 올바르지 않아요.';
  }
  for (const stage of planningStages) {
    if (!Object.prototype.hasOwnProperty.call(plan.stageOptions, stage)) {
      return `${stageLabels[stage]} 선택이 계획에 없어요.`;
    }
    const optionId = plan.stageOptions[stage];
    if (optionId !== null) {
      const issue = optionReferenceIssue(optionId, stage, options, `${stageLabels[stage]} 계획`);
      if (issue !== null) return issue;
    }
  }

  for (const garment of mission.garments) {
    if (!garment || typeof garment.id !== 'string' || !Array.isArray(garment.symbolIds)) {
      return '미션 의류의 표시 목록이 올바르지 않아요.';
    }
    for (const symbolId of garment.symbolIds) {
      const symbolIssue = symbolReferenceIssue(symbolId, symbols);
      if (symbolIssue !== null) return symbolIssue;
      const symbol = symbols.get(symbolId) as CareSymbol;
      const symbolStage = symbol.category;
      if (!careStages.includes(symbolStage as (typeof careStages)[number])) {
        return `'${symbol.name}' 표시의 범주가 올바르지 않아요.`;
      }
      if (!Array.isArray(symbol.allowedOptionIds) || !Array.isArray(symbol.forbiddenOptionIds)) {
        return `'${symbol.name}' 표시의 조건 목록이 올바르지 않아요.`;
      }
      if (isPlanningStage(symbolStage)) {
        for (const optionId of [...symbol.allowedOptionIds, ...symbol.forbiddenOptionIds]) {
          const issue = optionReferenceIssue(optionId, symbolStage, options, `'${symbol.name}' 표시 조건`);
          if (issue !== null) return issue;
        }
      } else if (symbol.allowedOptionIds.length > 0 || symbol.forbiddenOptionIds.length > 0) {
        return `'${symbol.name}' 표시는 계획 단계 선택을 만들 수 없어요.`;
      }
    }

    const materialOptions = garment.materialAllowedOptionIdsByStage;
    if (materialOptions === null || typeof materialOptions !== 'object') {
      return `'${garment.name}' 의류의 재료 조건이 올바르지 않아요.`;
    }
    for (const stage of planningStages) {
      const optionIds = materialOptions[stage];
      if (!Array.isArray(optionIds) || optionIds.length === 0) {
        return `'${garment.name}' 의류의 ${stageLabels[stage]} 재료 조건이 비어 있어요.`;
      }
      for (const optionId of optionIds) {
        const issue = optionReferenceIssue(optionId, stage, options, `'${garment.name}' 재료 조건`);
        if (issue !== null) return issue;
      }
    }
  }

  if (!Array.isArray(plan.acknowledgedRestrictionIds)) return '추가 제한 확인 목록이 올바르지 않아요.';
  for (const symbolId of plan.acknowledgedRestrictionIds) {
    const issue = symbolReferenceIssue(symbolId, symbols);
    if (issue !== null) return issue;
  }
  if (plan.grouping !== null) {
    if (
      plan.grouping === undefined ||
      !Array.isArray(plan.grouping.togetherGarmentIds) ||
      !Array.isArray(plan.grouping.separateGarmentIds) ||
      !Array.isArray(plan.grouping.reasonSymbolIds)
    ) {
      return '혼합 의류 그룹 정보가 올바르지 않아요.';
    }
    const groupedIds = [...plan.grouping.togetherGarmentIds, ...plan.grouping.separateGarmentIds];
    if (
      groupedIds.length !== missionGarmentIds.length ||
      new Set(groupedIds).size !== groupedIds.length ||
      groupedIds.some((garmentId) => !missionGarmentIds.includes(garmentId))
    ) {
      return '혼합 의류 그룹이 미션의 의류와 정확히 일치하지 않아요.';
    }
    for (const symbolId of plan.grouping.reasonSymbolIds) {
      const issue = symbolReferenceIssue(symbolId, symbols);
      if (issue !== null) return issue;
    }
  }
  return null;
}

function resourceLevel(
  plan: StudentPlan,
  options: ReadonlyMap<CareOptionId, CareOption>,
  metric: 'waterUse' | 'energyUse',
): RelativeLevel | null {
  const values: RelativeLevel[] = [];
  for (const stage of planningStages) {
    const optionId = plan.stageOptions[stage];
    if (optionId === null) return null;
    const option = options.get(optionId);
    if (option === undefined || option.stage !== stage) return null;
    values.push(option[metric]);
  }
  return relativeMaximum(values);
}

export function evaluatePlan(input: {
  mission: GarmentMission;
  plan: StudentPlan;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): PlanEvaluation {
  const { mission, plan, symbols, options } = input;
  const inputIssue = validatePlanInput(input);
  if (inputIssue !== null) return invalidEvaluation(inputIssue);

  const garments = selectedGarments(mission, plan);
  const garmentIds = garments.map((garment) => garment.id);
  const combinedAllowedOptions = combinedOptions(garments, symbols, options);
  const findings: PlanFinding[] = [];

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
    waterUse: resourceLevel(plan, options, 'waterUse'),
    energyUse: resourceLevel(plan, options, 'energyUse'),
    safetyNotices: [...safetyNotices],
  };
}
