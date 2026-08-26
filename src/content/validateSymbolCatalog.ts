import { careSymbolIds } from './symbols';
import { sources } from './sources';
import { validatePublishedContent } from './validateContent';
import type { CareSymbol, CareStage, DamageRiskId } from '../domain/careTypes';

const careStages: readonly CareStage[] = ['wash', 'bleach', 'dry', 'iron', 'professional'];
const riskIds: readonly DamageRiskId[] = [
  'shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage',
];
const riskIdSet = new Set(riskIds);

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object';
}
function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

export function isSafeSymbolAssetPath(symbolId: string, assetPath: unknown): assetPath is `/symbols/${string}.svg` {
  if (typeof assetPath !== 'string') return false;
  if (assetPath.includes('..') || /%2e/i.test(assetPath) || assetPath.includes('?') || assetPath.includes('#')) return false;
  return assetPath === `/symbols/${symbolId}.svg`;
}

function hasCompleteSymbolShape(key: string, value: unknown): value is CareSymbol {
  if (!isRecord(value) || value.id !== key || !careSymbolIds.includes(key as CareSymbol['id'])) return false;
  if (!careStages.includes(value.category as CareStage)
    || !nonEmptyString(value.name)
    || !nonEmptyString(value.categoryHint)
    || !nonEmptyString(value.shortDescription)
    || !nonEmptyString(value.accessibleDescription)
    || !isSafeSymbolAssetPath(key, value.assetPath)
    || value.displayKind !== 'learning-icon'
    || !Array.isArray(value.sourceIds)
    || value.sourceIds.length === 0
    || value.sourceIds.some((id) => !nonEmptyString(id))
    || !nonEmptyString(value.reviewedAt)
    || !Array.isArray(value.meaningOptions)
    || value.meaningOptions.length !== 3
    || value.meaningOptions.some((option) => !isRecord(option) || !nonEmptyString(option.id) || !nonEmptyString(option.label))
    || value.meaningOptions.length !== new Set(value.meaningOptions.map((option) => (option as { id: string }).id)).size
    || value.meaningOptions.length !== new Set(value.meaningOptions.map((option) => (option as { label: string }).label)).size
    || !nonEmptyString(value.correctMeaningOptionId)
    || !value.meaningOptions.some((option) => isRecord(option) && option.id === value.correctMeaningOptionId)
    || !Array.isArray(value.allowedOptionIds)
    || !Array.isArray(value.forbiddenOptionIds)
    || !Array.isArray(value.riskIds)
    || value.riskIds.length === 0
    || value.riskIds.some((riskId) => typeof riskId !== 'string' || !riskIdSet.has(riskId as DamageRiskId))
    || value.riskIds.length !== new Set(value.riskIds).size
    || typeof value.requiresAcknowledgement !== 'boolean') {
    return false;
  }
  return true;
}

export function validatePublishedSymbolCatalog(symbolMap: ReadonlyMap<string, unknown>): boolean {
  if (symbolMap.size !== careSymbolIds.length) return false;
  const symbols: CareSymbol[] = [];
  for (const id of careSymbolIds) {
    const symbol = symbolMap.get(id);
    if (!hasCompleteSymbolShape(id, symbol)) return false;
    symbols.push(symbol);
  }
  for (const key of symbolMap.keys()) {
    if (typeof key !== 'string' || !careSymbolIds.includes(key as CareSymbol['id'])) return false;
  }
  return validatePublishedContent({ sources, symbols }).length === 0;
}
