import type { CareOptionId, CareSymbol, CareSymbolId, PlanningStage } from './careTypes';
import type { CareOption, GarmentMission, GroupingChoice, StudentPlan, VirtualGarment } from './missionTypes';
import { resolveGarmentAllowedOptions } from './evaluatePlan';
import { validatePlanInput } from './validatePlanInput';

export interface GroupingEvaluation {
  status: 'ready' | 'revise';
  findings: readonly GroupingFinding[];
  commonAllowedOptions: Readonly<Record<PlanningStage, readonly CareOptionId[]>>;
}

export type GroupingFindingCode =
  | 'invalid-membership'
  | 'separation-needed'
  | 'missing-reason'
  | 'compatible-group';

export interface GroupingFinding {
  code: GroupingFindingCode;
  garmentIds: readonly string[];
  relatedSymbolIds: readonly CareSymbolId[];
  feedback: string;
}

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const mixedGarmentIds = ['mixed-cotton-shirt', 'mixed-synthetic-sportswear', 'mixed-delicate-scarf'] as const;
const emptyCommon: Readonly<Record<PlanningStage, readonly CareOptionId[]>> = {
  wash: [],
  dry: [],
  iron: [],
};

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function intersect(source: readonly CareOptionId[], other: readonly CareOptionId[]): readonly CareOptionId[] {
  const otherSet = new Set(other);
  return source.filter((optionId) => otherSet.has(optionId));
}

function commonOptions(
  garments: readonly VirtualGarment[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): Readonly<Record<PlanningStage, readonly CareOptionId[]>> {
  const resolved = garments.map((garment) => resolveGarmentAllowedOptions({ garment, symbols, options }));
  const commonFor = (stage: PlanningStage): readonly CareOptionId[] => {
    const first = resolved[0]?.[stage] ?? [];
    return resolved.slice(1).reduce<readonly CareOptionId[]>(
      (current, garmentOptions) => intersect(current, garmentOptions[stage]),
      [...first],
    );
  };
  return { wash: commonFor('wash'), dry: commonFor('dry'), iron: commonFor('iron') };
}

function symbolsOn(
  garments: readonly VirtualGarment[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
): readonly CareSymbol[] {
  return garments.flatMap((garment) => garment.symbolIds.map((symbolId) => symbols.get(symbolId)!));
}

function finding(
  code: GroupingFindingCode,
  garmentIds: readonly string[],
  relatedSymbolIds: readonly CareSymbolId[],
  feedback: string,
): GroupingFinding {
  return { code, garmentIds: [...garmentIds], relatedSymbolIds: unique(relatedSymbolIds), feedback };
}

function invalidResult(message: string, garmentIds: readonly string[] = []): GroupingEvaluation {
  return {
    status: 'revise',
    findings: [finding('invalid-membership', garmentIds, [], `옷 묶음을 확인할 수 없어요. ${message}`)],
    commonAllowedOptions: emptyCommon,
  };
}

function validationPlan(mission: GarmentMission, grouping: GroupingChoice): StudentPlan {
  return {
    missionId: mission.id,
    garmentIds: mission.garments.map(({ id }) => id),
    stageOptions: { wash: null, dry: null, iron: null },
    acknowledgedRestrictionIds: [],
    grouping,
  };
}

export function evaluateGrouping(input: {
  mission: GarmentMission;
  grouping: GroupingChoice;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): GroupingEvaluation {
  if (!input || typeof input !== 'object') return invalidResult('미션과 옷 묶음 자료를 다시 확인해 주세요.');
  const { mission, grouping, symbols, options } = input;
  if (!mission || !grouping || !symbols || !options || !(symbols instanceof Map) || !(options instanceof Map)) {
    return invalidResult('미션과 옷 묶음 자료를 다시 확인해 주세요.');
  }
  if (!Array.isArray(mission.garments) || mission.id !== 'mixed-load' || mission.requiresGrouping !== true
    || mission.garments.length !== mixedGarmentIds.length
    || mission.garments.map(({ id }) => id).some((id, index) => id !== mixedGarmentIds[index])) {
    return invalidResult('혼합 미션은 지정된 세 벌과 그룹 단계가 필요해요.');
  }
  const candidate = { mission, plan: validationPlan(mission, grouping), symbols, options };
  const validation = validatePlanInput(candidate);
  if (!validation.valid) return invalidResult(validation.message, mission.garments.map(({ id }) => id));
  if (!isStringArray(grouping.togetherGarmentIds) || !isStringArray(grouping.separateGarmentIds)
    || !isStringArray(grouping.reasonSymbolIds)) {
    return invalidResult('함께 둘 옷과 따로 둘 옷을 다시 선택해 주세요.', mission.garments.map(({ id }) => id));
  }

  const membership = [...grouping.togetherGarmentIds, ...grouping.separateGarmentIds];
  const expectedIds = mission.garments.map(({ id }) => id);
  const expectedSet = new Set(expectedIds);
  if (new Set(membership).size !== membership.length
    || membership.length !== expectedIds.length
    || membership.some((id) => !expectedSet.has(id))) {
    return invalidResult('각 옷은 한 번씩만 함께 두거나 따로 두어야 해요.', expectedIds);
  }

  const together = mission.garments.filter(({ id }) => grouping.togetherGarmentIds.includes(id));
  const separate = mission.garments.filter(({ id }) => grouping.separateGarmentIds.includes(id));
  const commonAllowedOptions = commonOptions(together, symbols, options);
  const findings: GroupingFinding[] = [];
  const professionalTogether = together.filter((garment) => symbolsOn([garment], symbols)
    .some((symbol) => symbol.category === 'professional'));
  const emptyStages = together.length > 1
    ? stages.filter((stage) => commonAllowedOptions[stage].length === 0)
    : [];
  const allAllowedOptions = separate.length > 0
    ? commonOptions([...together, ...separate], symbols, options)
    : commonAllowedOptions;
  const addedEmptyStages = separate.length > 0
    ? stages.filter((stage) => commonAllowedOptions[stage].length > 0 && allAllowedOptions[stage].length === 0)
    : [];
  const stageCauses = emptyStages.flatMap((stage) => symbolsOn(together, symbols)
    .filter((symbol) => symbol.category === stage)
    .map((symbol) => symbol.id));
  const addedStageCauses = addedEmptyStages.flatMap((stage) => symbolsOn(separate, symbols)
    .filter((symbol) => symbol.category === stage)
    .map((symbol) => symbol.id));
  const professionalCauses = symbolsOn([...professionalTogether, ...separate], symbols)
    .filter((symbol) => symbol.category === 'professional')
    .map((symbol) => symbol.id);
  const blockingSymbols = unique([...professionalCauses, ...stageCauses, ...addedStageCauses]);
  const separatedCauses = unique(symbolsOn(separate, symbols)
    .filter((symbol) => symbol.category === 'professional' || addedStageCauses.includes(symbol.id))
    .map((symbol) => symbol.id));

  if (professionalTogether.length > 0 || emptyStages.length > 0 || addedEmptyStages.length > 0) {
    findings.push(finding(
      'separation-needed',
      unique([...professionalTogether.map(({ id }) => id), ...together.map(({ id }) => id)]),
      blockingSymbols,
      professionalTogether.length > 0
        ? '전문 관리나 도움 요청 표시가 있는 옷은 일반 묶음에서 따로 확인해요.'
        : '모든 단계에서 함께 허용되는 조건이 없어 옷을 나누어 살펴봐요.',
    ));
  }

  const reasons = grouping.reasonSymbolIds;
  const causativeSymbols = separate.length > 0 ? separatedCauses : blockingSymbols;
  const hasReason = reasons.length > 0 && reasons.every((symbolId) => causativeSymbols.includes(symbolId));
  if (separate.length > 0 && !hasReason) {
    findings.push(finding(
      'missing-reason',
      grouping.separateGarmentIds,
      causativeSymbols,
      '따로 살펴볼 옷의 실제 제한 표시를 근거로 골라 주세요.',
    ));
  } else if (separate.length === 0 && professionalTogether.length === 0 && emptyStages.length === 0 && reasons.length > 0) {
    findings.push(finding(
      'missing-reason',
      grouping.togetherGarmentIds,
      [],
      '선택한 근거 표시가 현재 묶음의 분리 원인과 연결되지 않아요.',
    ));
  }

  if (findings.length === 0) {
    findings.push(finding(
      'compatible-group',
      grouping.togetherGarmentIds,
      symbolsOn(together, symbols).map((symbol) => symbol.id),
      '함께 둔 옷에서 세탁·건조·다림질의 공통 조건을 찾았어요.',
    ));
  }
  return {
    status: findings.some(({ code }) => code !== 'compatible-group') ? 'revise' : 'ready',
    findings,
    commonAllowedOptions,
  };
}
