import type { PlanningStage } from './careTypes';
import type { GarmentMission } from './missionTypes';
import { validateCareOptionShape } from './validateCareOption';

export const missionIds = ['basic-t-shirt', 'soft-scarf', 'sportswear', 'decorated-top', 'mixed-load'] as const;
const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function stringList(value: unknown): value is readonly string[] {
  return Array.isArray(value) && value.length > 0
    && value.every(nonEmptyString)
    && new Set(value).size === value.length;
}

export function validateGarmentShape(garment: unknown): string | null {
  if (!isRecord(garment) || !nonEmptyString(garment.id) || !nonEmptyString(garment.name)
    || !nonEmptyString(garment.materialModel) || !nonEmptyString(garment.materialBoundary)
    || !nonEmptyString(garment.contaminationScenario)) {
    return '미션 의류의 설명·재료 경계가 올바르지 않아요.';
  }
  if (!stringList(garment.symbolIds)) return '미션 의류의 표시 목록이 올바르지 않아요.';
  if (!isRecord(garment.materialAllowedOptionIdsByStage)) {
    return `'${garment.name}' 의류의 재료 조건이 올바르지 않아요.`;
  }
  const materialOptions = garment.materialAllowedOptionIdsByStage;
  if (Object.keys(materialOptions).some((key) => !stages.includes(key as PlanningStage))) {
    return `'${garment.name}' 의류의 재료 조건 단계가 올바르지 않아요.`;
  }
  for (const stage of stages) {
    if (!stringList(materialOptions[stage])) {
      return `'${garment.name}' 의류의 ${stage} 재료 조건이 비어 있어요.`;
    }
  }
  return null;
}

export function validateMissionShape(mission: unknown): string | null {
  if (!isRecord(mission) || !missionIds.includes(mission.id as typeof missionIds[number])) {
    return '미션 ID가 올바르지 않아요.';
  }
  const expectedOrder = missionIds.indexOf(mission.id as typeof missionIds[number]) + 1;
  if (mission.order !== expectedOrder) return '미션 순서가 올바르지 않아요.';
  if (!nonEmptyString(mission.title) || !nonEmptyString(mission.learningFocus)
    || !nonEmptyString(mission.openingPrompt)) return '미션 설명이 올바르지 않아요.';
  if (typeof mission.requiresGrouping !== 'boolean') return '미션의 그룹 단계 표시가 올바르지 않아요.';
  if (!Array.isArray(mission.garments) || mission.garments.length === 0) return '미션 의류 목록이 올바르지 않아요.';
  const expectedGarmentCount = mission.id === 'mixed-load' ? 3 : 1;
  if (mission.garments.length !== expectedGarmentCount || mission.requiresGrouping !== (expectedGarmentCount > 1)) {
    return '미션의 의류 그룹 설정이 올바르지 않아요.';
  }
  const garmentIds: string[] = [];
  for (const garment of mission.garments) {
    const issue = validateGarmentShape(garment);
    if (issue !== null) return issue;
    garmentIds.push((garment as { id: string }).id);
  }
  if (new Set(garmentIds).size !== garmentIds.length) return '미션에 중복된 의류 ID가 있어요.';
  return null;
}

export function validateMissionReferences(
  mission: unknown,
  symbols: ReadonlyMap<string, unknown>,
  options: ReadonlyMap<string, unknown>,
): string | null {
  const missionIssue = validateMissionShape(mission);
  if (missionIssue !== null || !isRecord(mission) || !Array.isArray(mission.garments)) return missionIssue;
  for (const garment of mission.garments) {
    if (!isRecord(garment)) return '미션 의류가 올바르지 않아요.';
    for (const symbolId of garment.symbolIds as readonly unknown[]) {
      if (typeof symbolId !== 'string' || !isRecord(symbols.get(symbolId))
        || (symbols.get(symbolId) as { id?: unknown }).id !== symbolId) {
        return `'${String(symbolId)}' 표시를 목록에서 찾을 수 없어요.`;
      }
    }
    const materialOptions = garment.materialAllowedOptionIdsByStage as Record<string, unknown>;
    for (const stage of stages) {
      for (const optionId of materialOptions[stage] as readonly unknown[]) {
        const option = options.get(String(optionId));
        if (typeof optionId !== 'string' || validateCareOptionShape(optionId, option, stage) !== null) {
          return `'${garment.name}' 재료 조건의 선택을 확인할 수 없어요.`;
        }
      }
    }
  }
  return null;
}

export function isGarmentMission(value: unknown): value is GarmentMission {
  return validateMissionShape(value) === null;
}
