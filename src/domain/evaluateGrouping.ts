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
    .map((symbolId) => symbols.get(symbolId))
    .filter((symbol): symbol is CareSymbol => symbol !== undefined));
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

  const hasSeparationCause = professionalTogether.length > 0
    || professionalSeparate.length > 0
    || emptyStages.length > 0;
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
  const reasonsAreCausative = reasons.length > 0
    && reasons.every((symbolId) => blockingSymbols.includes(symbolId));
  if (hasSeparationCause) {
    if (!reasonsAreCausative) {
      findings.push(finding(
        'missing-reason',
        [...grouping.separateGarmentIds],
        blockingSymbols,
        '따로 살펴볼 옷의 실제 표시를 근거로 골라 주세요.',
      ));
    }
  } else if (reasons.length > 0) {
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
