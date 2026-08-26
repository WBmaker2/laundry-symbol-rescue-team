import type { CareOptionId, DamageRiskId, PlanningStage, RelativeLevel } from './careTypes';
import type { CareOption } from './missionTypes';

export const careOptionIds: readonly CareOptionId[] = [
  'plan-wash-gentle-30', 'plan-wash-strong-40', 'plan-wash-pause-and-ask',
  'plan-dry-flat', 'plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-tumble-high', 'plan-dry-pause-and-ask',
  'plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-high-with-adult', 'plan-iron-pause-and-ask',
];
const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const levels: readonly RelativeLevel[] = ['lower', 'medium', 'higher'];
const riskIds: readonly DamageRiskId[] = [
  'shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage',
];
const stageLabels: Readonly<Record<PlanningStage, string>> = { wash: '세탁', dry: '건조', iron: '다림질' };

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function validateCareOptionShape(
  key: unknown,
  value: unknown,
  expectedStage?: PlanningStage,
): string | null {
  if (typeof key !== 'string' || !isRecord(value)) return '선택 목록에 비어 있거나 올바르지 않은 항목이 있어요.';
  const option = value as Partial<CareOption>;
  if (option.id !== key || !careOptionIds.includes(key as CareOptionId)) return `'${key}' 선택의 ID가 목록과 달라요.`;
  if (!stages.includes(option.stage as PlanningStage)) return `'${key}' 선택의 단계가 올바르지 않아요.`;
  if (expectedStage !== undefined && option.stage !== expectedStage) {
    return `'${key}' 선택이 ${stageLabels[expectedStage]} 단계와 맞지 않아요.`;
  }
  if (!nonEmptyString(option.label) || !nonEmptyString(option.learningDescription)) {
    return `'${key}' 선택의 설명이 올바르지 않아요.`;
  }
  if (typeof option.requiresAdult !== 'boolean') return `'${key}' 선택의 안전 경계가 올바르지 않아요.`;
  if (!levels.includes(option.waterUse as RelativeLevel) || !levels.includes(option.energyUse as RelativeLevel)) {
    return `'${key}' 선택의 상대 자원 지표가 올바르지 않아요.`;
  }
  if (!Array.isArray(option.riskIds)
    || option.riskIds.some((riskId) => !riskIds.includes(riskId as DamageRiskId))
    || new Set(option.riskIds).size !== option.riskIds.length) {
    return `'${key}' 선택의 가능성 근거 목록이 올바르지 않아요.`;
  }
  return null;
}

export function validateCareOptionCatalog(options: ReadonlyMap<string, unknown>): string | null {
  if (options.size !== careOptionIds.length) return '선택 목록의 항목 수가 올바르지 않아요.';
  for (const id of careOptionIds) {
    const issue = validateCareOptionShape(id, options.get(id));
    if (issue !== null) return issue;
  }
  for (const key of options.keys()) {
    if (typeof key !== 'string' || !careOptionIds.includes(key as CareOptionId)) {
      return `'${String(key)}' 선택의 ID가 목록과 달라요.`;
    }
  }
  return null;
}
