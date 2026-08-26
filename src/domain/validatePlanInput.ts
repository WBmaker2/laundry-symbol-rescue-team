import type {
  CareOptionId,
  CareStage,
  CareSymbol,
  CareSymbolId,
  PlanningStage,
  RelativeLevel,
} from './careTypes';
import type { CareOption, GarmentMission, StudentPlan } from './missionTypes';

export interface PlanEvaluationInput {
  mission: GarmentMission;
  plan: StudentPlan;
  symbols: ReadonlyMap<CareSymbolId, CareSymbol>;
  options: ReadonlyMap<CareOptionId, CareOption>;
}

export type PlanInputValidationResult =
  | { valid: true; input: PlanEvaluationInput }
  | { valid: false; message: string };

const planningStages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const careStages: readonly CareStage[] = ['wash', 'bleach', 'dry', 'iron', 'professional'];
const stageLabels: Readonly<Record<PlanningStage, string>> = {
  wash: '세탁',
  dry: '건조',
  iron: '다림질',
};
const relativeLevels: readonly RelativeLevel[] = ['lower', 'medium', 'higher'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

function isMap(value: unknown): value is Map<string, unknown> {
  return value instanceof Map;
}

function isPlanningStage(value: unknown): value is PlanningStage {
  return planningStages.includes(value as PlanningStage);
}

function isCareStage(value: unknown): value is CareStage {
  return careStages.includes(value as CareStage);
}

function isRelativeLevel(value: unknown): value is RelativeLevel {
  return relativeLevels.includes(value as RelativeLevel);
}

function riskListIssue(value: unknown, source: string): string | null {
  if (!Array.isArray(value) || value.some((riskId) => typeof riskId !== 'string')) {
    return `${source}의 가능성 근거 목록이 올바르지 않아요.`;
  }
  return null;
}

function optionShapeIssue(
  key: unknown,
  value: unknown,
  expectedStage?: PlanningStage,
): string | null {
  if (typeof key !== 'string' || !isRecord(value)) return '선택 목록에 비어 있거나 올바르지 않은 항목이 있어요.';
  const option = value as Partial<CareOption>;
  if (option.id !== key || typeof option.id !== 'string') return `'${key}' 선택의 ID가 목록과 달라요.`;
  if (!isPlanningStage(option.stage)) return `'${key}' 선택의 단계가 올바르지 않아요.`;
  if (expectedStage !== undefined && option.stage !== expectedStage) {
    return `'${key}' 선택이 ${stageLabels[expectedStage]} 단계와 맞지 않아요.`;
  }
  if (typeof option.label !== 'string' || typeof option.learningDescription !== 'string') {
    return `'${key}' 선택의 설명이 올바르지 않아요.`;
  }
  if (typeof option.requiresAdult !== 'boolean') return `'${key}' 선택의 안전 경계가 올바르지 않아요.`;
  if (!isRelativeLevel(option.waterUse) || !isRelativeLevel(option.energyUse)) {
    return `'${key}' 선택의 상대 자원 지표가 올바르지 않아요.`;
  }
  return riskListIssue(option.riskIds, `'${key}' 선택`);
}

function symbolShapeIssue(key: unknown, value: unknown): string | null {
  if (typeof key !== 'string' || !isRecord(value)) return '표시 목록에 비어 있거나 올바르지 않은 항목이 있어요.';
  const symbol = value as Partial<CareSymbol>;
  if (symbol.id !== key || typeof symbol.id !== 'string') return `'${key}' 표시의 ID가 목록과 달라요.`;
  if (!isCareStage(symbol.category)) return `'${key}' 표시의 범주가 올바르지 않아요.`;
  if (typeof symbol.name !== 'string') return `'${key}' 표시의 이름이 올바르지 않아요.`;
  if (!Array.isArray(symbol.allowedOptionIds) || !Array.isArray(symbol.forbiddenOptionIds)) {
    return `'${key}' 표시의 조건 목록이 올바르지 않아요.`;
  }
  if (typeof symbol.requiresAcknowledgement !== 'boolean') return `'${key}' 표시의 확인 경계가 올바르지 않아요.`;
  return riskListIssue(symbol.riskIds, `'${key}' 표시`);
}

function optionReferenceIssue(
  optionId: unknown,
  stage: PlanningStage,
  options: ReadonlyMap<string, unknown>,
  source: string,
): string | null {
  if (typeof optionId !== 'string') return `${source}의 선택 ID가 올바르지 않아요.`;
  const option = options.get(optionId);
  if (option === undefined) return `${source} '${optionId}' 선택을 목록에서 찾을 수 없어요.`;
  return optionShapeIssue(optionId, option, stage);
}

function symbolReferenceIssue(symbolId: unknown, symbols: ReadonlyMap<string, unknown>): string | null {
  if (typeof symbolId !== 'string') return '표시 ID가 올바르지 않아요.';
  if (symbols.get(symbolId) === undefined) return `'${symbolId}' 표시를 목록에서 찾을 수 없어요.`;
  return null;
}

function validateMapCatalogs(
  symbols: ReadonlyMap<string, unknown>,
  options: ReadonlyMap<string, unknown>,
): string | null {
  for (const [key, value] of options) {
    const issue = optionShapeIssue(key, value);
    if (issue !== null) return issue;
  }
  for (const [key, value] of symbols) {
    const issue = symbolShapeIssue(key, value);
    if (issue !== null) return issue;
  }
  return null;
}

export function validatePlanInput(input: unknown): PlanInputValidationResult {
  if (!isRecord(input)) return { valid: false, message: '계획 입력 자료가 비어 있거나 올바르지 않아요.' };

  const candidate = input as Partial<PlanEvaluationInput>;
  if (!isMap(candidate.symbols) || !isMap(candidate.options)) {
    return { valid: false, message: '표시·선택 목록이 Map 자료가 아니에요.' };
  }
  const catalogIssue = validateMapCatalogs(candidate.symbols, candidate.options);
  if (catalogIssue !== null) return { valid: false, message: catalogIssue };

  const mission = candidate.mission;
  const plan = candidate.plan;
  if (!isRecord(mission) || !Array.isArray(mission.garments) || typeof mission.id !== 'string') {
    return { valid: false, message: '미션 ID 또는 의류 목록이 올바르지 않아요.' };
  }
  if (!isRecord(plan) || !Array.isArray(plan.garmentIds)) {
    return { valid: false, message: '계획의 의류 목록이 올바르지 않아요.' };
  }
  if (plan.missionId !== mission.id) return { valid: false, message: '계획과 미션의 ID가 서로 달라요.' };

  const missionGarmentIds: string[] = [];
  for (const garment of mission.garments) {
    if (!isRecord(garment) || typeof garment.id !== 'string' || typeof garment.name !== 'string') {
      return { valid: false, message: '미션 의류의 ID 또는 이름이 올바르지 않아요.' };
    }
    missionGarmentIds.push(garment.id);
  }
  if (new Set(missionGarmentIds).size !== missionGarmentIds.length) {
    return { valid: false, message: '미션에 중복된 의류 ID가 있어요.' };
  }
  const plannedGarmentIds = plan.garmentIds;
  if (
    plannedGarmentIds.length !== missionGarmentIds.length ||
    new Set(plannedGarmentIds).size !== plannedGarmentIds.length ||
    plannedGarmentIds.some((garmentId) => !missionGarmentIds.includes(garmentId))
  ) {
    return { valid: false, message: '계획의 의류 목록이 미션의 의류와 정확히 일치하지 않아요.' };
  }

  if (!isRecord(plan.stageOptions)) return { valid: false, message: '세탁·건조·다림질 선택 목록이 올바르지 않아요.' };
  for (const stage of planningStages) {
    if (!Object.prototype.hasOwnProperty.call(plan.stageOptions, stage)) {
      return { valid: false, message: `${stageLabels[stage]} 선택이 계획에 없어요.` };
    }
    const optionId = plan.stageOptions[stage];
    if (optionId !== null) {
      const issue = optionReferenceIssue(optionId, stage, candidate.options, `${stageLabels[stage]} 계획`);
      if (issue !== null) return { valid: false, message: issue };
    }
  }

  for (const garment of mission.garments) {
    if (!isRecord(garment) || !Array.isArray(garment.symbolIds)) {
      return { valid: false, message: '미션 의류의 표시 목록이 올바르지 않아요.' };
    }
    for (const symbolId of garment.symbolIds) {
      const symbolIssue = symbolReferenceIssue(symbolId, candidate.symbols);
      if (symbolIssue !== null) return { valid: false, message: symbolIssue };
      const symbol = candidate.symbols.get(symbolId) as CareSymbol;
      if (isPlanningStage(symbol.category)) {
        for (const optionId of [...symbol.allowedOptionIds, ...symbol.forbiddenOptionIds]) {
          const issue = optionReferenceIssue(optionId, symbol.category, candidate.options, `'${symbol.name}' 표시 조건`);
          if (issue !== null) return { valid: false, message: issue };
        }
      } else if (symbol.allowedOptionIds.length > 0 || symbol.forbiddenOptionIds.length > 0) {
        return { valid: false, message: `'${symbol.name}' 표시는 계획 단계 선택을 만들 수 없어요.` };
      }
    }

    const materialOptions = garment.materialAllowedOptionIdsByStage;
    if (!isRecord(materialOptions)) return { valid: false, message: `'${garment.name}' 의류의 재료 조건이 올바르지 않아요.` };
    for (const stage of planningStages) {
      const optionIds = materialOptions[stage];
      if (!Array.isArray(optionIds) || optionIds.length === 0) {
        return { valid: false, message: `'${garment.name}' 의류의 ${stageLabels[stage]} 재료 조건이 비어 있어요.` };
      }
      for (const optionId of optionIds) {
        const issue = optionReferenceIssue(optionId, stage, candidate.options, `'${garment.name}' 재료 조건`);
        if (issue !== null) return { valid: false, message: issue };
      }
    }
  }

  if (!Array.isArray(plan.acknowledgedRestrictionIds)) {
    return { valid: false, message: '추가 제한 확인 목록이 올바르지 않아요.' };
  }
  for (const symbolId of plan.acknowledgedRestrictionIds) {
    const issue = symbolReferenceIssue(symbolId, candidate.symbols);
    if (issue !== null) return { valid: false, message: issue };
  }
  if (plan.grouping !== null) {
    if (
      !isRecord(plan.grouping) ||
      !Array.isArray(plan.grouping.togetherGarmentIds) ||
      !Array.isArray(plan.grouping.separateGarmentIds) ||
      !Array.isArray(plan.grouping.reasonSymbolIds)
    ) {
      return { valid: false, message: '혼합 의류 그룹 정보가 올바르지 않아요.' };
    }
    const groupedIds = [...plan.grouping.togetherGarmentIds, ...plan.grouping.separateGarmentIds];
    if (
      groupedIds.length !== missionGarmentIds.length ||
      new Set(groupedIds).size !== groupedIds.length ||
      groupedIds.some((garmentId) => !missionGarmentIds.includes(garmentId))
    ) {
      return { valid: false, message: '혼합 의류 그룹이 미션의 의류와 정확히 일치하지 않아요.' };
    }
    for (const symbolId of plan.grouping.reasonSymbolIds) {
      const issue = symbolReferenceIssue(symbolId, candidate.symbols);
      if (issue !== null) return { valid: false, message: issue };
    }
  }

  return { valid: true, input: candidate as PlanEvaluationInput };
}
