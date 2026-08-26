import type {
  CareOptionId,
  CareSymbol,
  CareSymbolId,
  PlanningStage,
} from './careTypes';
import type { CareOption, GarmentMission, GroupingChoice, VirtualGarment } from './missionTypes';
import { resolveGarmentAllowedOptions } from './evaluatePlan';

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
const emptyCommon: Readonly<Record<PlanningStage, readonly CareOptionId[]>> = {
  wash: [],
  dry: [],
  iron: [],
};
const careSymbolIds: readonly CareSymbolId[] = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
];
const careOptionIds: readonly CareOptionId[] = [
  'plan-wash-gentle-30',
  'plan-wash-strong-40',
  'plan-wash-pause-and-ask',
  'plan-dry-flat',
  'plan-dry-line',
  'plan-dry-tumble-low',
  'plan-dry-tumble-high',
  'plan-dry-pause-and-ask',
  'plan-iron-none',
  'plan-iron-low-with-adult',
  'plan-iron-high-with-adult',
  'plan-iron-pause-and-ask',
];
const damageRiskIds = ['shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage'];
const careStages = ['wash', 'bleach', 'dry', 'iron', 'professional'];

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function isStringArray(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

function isCareSymbolId(value: unknown): value is CareSymbolId {
  return typeof value === 'string' && careSymbolIds.includes(value as CareSymbolId);
}

function isCareOptionId(value: unknown): value is CareOptionId {
  return typeof value === 'string' && careOptionIds.includes(value as CareOptionId);
}

function isPlanningStage(value: unknown): value is PlanningStage {
  return value === 'wash' || value === 'dry' || value === 'iron';
}

function isRiskList(value: unknown): value is readonly string[] {
  return Array.isArray(value)
    && value.every((riskId) => typeof riskId === 'string' && damageRiskIds.includes(riskId));
}

function validOptionCatalog(options: ReadonlyMap<CareOptionId, CareOption>): boolean {
  if (options.size !== careOptionIds.length) return false;
  for (const [key, option] of options) {
    if (!isCareOptionId(key) || !isRecord(option) || option.id !== key
      || !isPlanningStage(option.stage) || !isRiskList(option.riskIds)) return false;
  }
  return careOptionIds.every((id) => options.has(id));
}

function validSymbolCatalog(
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): boolean {
  if (symbols.size !== careSymbolIds.length) return false;
  for (const [key, symbol] of symbols) {
    if (!isCareSymbolId(key) || !isRecord(symbol) || symbol.id !== key
      || typeof symbol.category !== 'string' || !careStages.includes(symbol.category)
      || !Array.isArray(symbol.allowedOptionIds) || !Array.isArray(symbol.forbiddenOptionIds)
      || !isRiskList(symbol.riskIds)) return false;
    const constraintIds = [...symbol.allowedOptionIds, ...symbol.forbiddenOptionIds];
    if (!constraintIds.every(isCareOptionId)) return false;
    for (const optionId of constraintIds) {
      const option = options.get(optionId);
      if (option === undefined || option.stage !== symbol.category) return false;
    }
  }
  return careSymbolIds.every((id) => symbols.has(id));
}

function validMission(mission: GarmentMission, symbols: ReadonlyMap<CareSymbolId, CareSymbol>, options: ReadonlyMap<CareOptionId, CareOption>): boolean {
  if (!Array.isArray(mission.garments)) return false;
  const garmentIds = mission.garments.map((garment) => garment?.id);
  if (!garmentIds.every((id): id is string => typeof id === 'string' && id.length > 0)
    || new Set(garmentIds).size !== garmentIds.length) return false;
  return mission.garments.every((garment) => {
    if (!isRecord(garment) || !Array.isArray(garment.symbolIds)
      || !garment.symbolIds.every((symbolId) => isCareSymbolId(symbolId) && symbols.get(symbolId) !== null && symbols.get(symbolId) !== undefined)) {
      return false;
    }
    const byStage = garment.materialAllowedOptionIdsByStage;
    if (!isRecord(byStage)) return false;
    return stages.every((stage) => {
      const ids = byStage[stage];
      return Array.isArray(ids) && ids.every((optionId) => {
        if (!isCareOptionId(optionId)) return false;
        return options.get(optionId)?.stage === stage;
      });
    });
  });
}

function intersect(source: readonly CareOptionId[], other: readonly CareOptionId[]): readonly CareOptionId[] {
  const otherSet = new Set(other);
  return source.filter((optionId) => otherSet.has(optionId));
}

function commonOptions(
  garments: readonly VirtualGarment[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
  options: ReadonlyMap<CareOptionId, CareOption>,
): Readonly<Record<PlanningStage, readonly CareOptionId[]>> | null {
  try {
    const resolved = garments.map((garment) => resolveGarmentAllowedOptions({ garment, symbols, options }));
    const commonFor = (stage: PlanningStage): readonly CareOptionId[] => {
      const first = resolved[0]?.[stage] ?? [];
      return resolved.slice(1).reduce<readonly CareOptionId[]>(
        (current, garmentOptions) => intersect(current, garmentOptions[stage]),
        [...first],
      );
    };
    return { wash: commonFor('wash'), dry: commonFor('dry'), iron: commonFor('iron') };
  } catch {
    return null;
  }
}

function symbolsOn(
  garments: readonly VirtualGarment[],
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>,
): readonly CareSymbol[] {
  return garments.flatMap((garment) => garment.symbolIds
    .map((symbolId) => symbols.get(symbolId)!));
}

function finding(
  code: GroupingFindingCode,
  garmentIds: readonly string[],
  relatedSymbolIds: readonly CareSymbolId[],
  feedback: string,
): GroupingFinding {
  return { code, garmentIds: [...garmentIds], relatedSymbolIds: unique(relatedSymbolIds), feedback };
}

function invalidResult(garmentIds: readonly string[], message: string): GroupingEvaluation {
  return {
    status: 'revise',
    findings: [finding('invalid-membership', garmentIds, [], `옷 묶음을 확인할 수 없어요. ${message}`)],
    commonAllowedOptions: emptyCommon,
  };
}

export function evaluateGrouping(input: {
  mission: GarmentMission;
  grouping: GroupingChoice;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}): GroupingEvaluation {
  if (input === null || typeof input !== 'object') {
    return invalidResult([], '미션과 옷 묶음 자료를 다시 확인해 주세요.');
  }
  const { mission, grouping, symbols, options } = input;
  if (!mission || !Array.isArray(mission.garments) || !grouping || !symbols || !options
    || !(symbols instanceof Map) || !(options instanceof Map)) {
    return invalidResult([], '미션과 옷 묶음 자료를 다시 확인해 주세요.');
  }

  if (!validOptionCatalog(options) || !validSymbolCatalog(symbols, options)
    || !validMission(mission, symbols, options)) {
    return invalidResult([], '표시·관리 선택·재료 모형 자료를 다시 확인해 주세요.');
  }

  const missionIds = mission.garments.map((garment) => {
    return garment && typeof garment.id === 'string' ? garment.id : '';
  });
  const expectedIds = unique(missionIds);
  if (expectedIds.length !== missionIds.length || !mission.garments.every((garment: VirtualGarment) => {
    return garment && typeof garment.id === 'string' && Array.isArray(garment.symbolIds)
      && garment.symbolIds.every((symbolId: CareSymbolId) => symbols.has(symbolId));
  })) {
    return invalidResult(expectedIds, '미션의 옷이나 표시 목록이 올바르지 않아요.');
  }
  if (!isStringArray(grouping.togetherGarmentIds) || !isStringArray(grouping.separateGarmentIds)
    || !isStringArray(grouping.reasonSymbolIds)) {
    return invalidResult(expectedIds, '함께 둘 옷과 따로 둘 옷을 다시 선택해 주세요.');
  }

  const membership = [...grouping.togetherGarmentIds, ...grouping.separateGarmentIds];
  const expectedSet = new Set(expectedIds);
  const duplicate = new Set(membership).size !== membership.length;
  const unknown = membership.some((id) => !expectedSet.has(id));
  const missing = expectedIds.some((id) => !membership.includes(id));
  if (duplicate || unknown || missing) {
    return invalidResult(expectedIds, '각 옷은 한 번씩만 함께 두거나 따로 두어야 해요.');
  }

  const together = mission.garments.filter(({ id }) => grouping.togetherGarmentIds.includes(id));
  const commonAllowedOptions = commonOptions(together, symbols, options);
  if (commonAllowedOptions === null) {
    return invalidResult(expectedIds, '표시와 관리 선택 자료를 다시 확인해 주세요.');
  }

  const findings: GroupingFinding[] = [];
  const professionalGarments = mission.garments.filter((garment) => symbolsOn([garment], symbols)
    .some((symbol) => symbol.category === 'professional'));
  const professionalTogether = professionalGarments.filter((garment) => grouping.togetherGarmentIds.includes(garment.id));
  const professionalSeparate = professionalGarments.filter((garment) => grouping.separateGarmentIds.includes(garment.id));
  const separate = mission.garments.filter(({ id }) => grouping.separateGarmentIds.includes(id));
  const emptyStages = together.length > 1
    ? stages.filter((stage) => commonAllowedOptions[stage].length === 0)
    : [];
  const blockingSymbols = unique([
    ...symbolsOn([...professionalTogether, ...professionalSeparate], symbols)
      .filter((symbol) => symbol.category === 'professional' || symbol.requiresAcknowledgement)
      .map((symbol) => symbol.id),
    ...emptyStages.flatMap((stage) => symbolsOn(together, symbols)
      .filter((symbol) => symbol.category === stage)
      .map((symbol) => symbol.id)),
  ]);
  const separatedCauseSymbols = unique(
    symbolsOn(separate, symbols)
      .filter((symbol) => symbol.category === 'professional' || symbol.requiresAcknowledgement)
      .map((symbol) => symbol.id),
  );

  const hasSeparationCause = professionalTogether.length > 0 || emptyStages.length > 0;
  if (professionalTogether.length > 0 || emptyStages.length > 0) {
    const garmentIds = unique([
      ...professionalTogether.map(({ id }) => id),
      ...together.filter(({ id }) => !professionalTogether.some((garment) => garment.id === id)).map(({ id }) => id),
    ]);
    findings.push(finding(
      'separation-needed',
      garmentIds,
      blockingSymbols,
      professionalTogether.length > 0
        ? '전문 관리나 도움 요청 표시가 있는 옷은 일반 묶음에서 따로 확인해요.'
        : '모든 단계에서 함께 허용되는 조건이 없어 옷을 나누어 살펴봐요.',
    ));
  }

  const reasons = grouping.reasonSymbolIds;
  const causativeSymbols = grouping.separateGarmentIds.length > 0 ? separatedCauseSymbols : blockingSymbols;
  const reasonsAreCausative = reasons.length > 0
    && reasons.every((symbolId) => causativeSymbols.includes(symbolId));
  if (grouping.separateGarmentIds.length > 0) {
    if (!reasonsAreCausative) {
      findings.push(finding(
        'missing-reason',
        [...grouping.separateGarmentIds],
        causativeSymbols,
        '따로 살펴볼 옷의 실제 표시를 근거로 골라 주세요.',
      ));
    }
  } else if (!hasSeparationCause && reasons.length > 0) {
    findings.push(finding(
      'missing-reason',
      [...grouping.togetherGarmentIds],
      [],
      '선택한 근거 표시가 현재 묶음의 분리 원인과 연결되지 않아요.',
    ));
  }

  if (findings.length === 0) {
    findings.push(finding(
      'compatible-group',
      [...grouping.togetherGarmentIds],
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
