import { careSymbolIds } from './symbols';
import { sources } from './sources';
import { validatePublishedContent, validatePublishedSymbolRecord } from './validateContent';
import type { CareSymbol } from '../domain/careTypes';

const sourceById = new Map(sources.map((source) => [source.id, source] as const));

export function isSafeSymbolAssetPath(symbolId: string, assetPath: unknown): assetPath is `/symbols/${string}.svg` {
  return typeof assetPath === 'string'
    && !assetPath.includes('..') && !/%2e/i.test(assetPath)
    && !assetPath.includes('?') && !assetPath.includes('#')
    && assetPath === `/symbols/${symbolId}.svg`;
}

export function isRenderableSymbol(value: unknown): value is CareSymbol {
  return validatePublishedSymbolRecord(value, sourceById).length === 0;
}

export function validatePublishedSymbolCatalog(symbolMap: ReadonlyMap<string, unknown>): boolean {
  if (symbolMap.size !== careSymbolIds.length) return false;
  const symbols: CareSymbol[] = [];
  for (const mapKey of careSymbolIds) {
    const symbol = symbolMap.get(mapKey);
    if (!isRenderableSymbol(symbol) || symbol.id !== mapKey) return false;
    symbols.push(symbol);
  }
  for (const [mapKey, symbol] of symbolMap) {
    if (typeof mapKey !== 'string' || !careSymbolIds.includes(mapKey as CareSymbol['id'])) return false;
    if (!isRenderableSymbol(symbol) || symbol.id !== mapKey) return false;
  }
  return validatePublishedContent({ sources, symbols }).length === 0;
}
