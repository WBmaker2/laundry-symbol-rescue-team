import { describe, expect, it } from 'vitest';
import { careSymbolById } from './symbols';
import { validatePublishedSymbolCatalog } from './validateSymbolCatalog';

describe('validatePublishedSymbolCatalog', () => {
  it('rejects a catalog that swaps two valid symbols under canonical keys', () => {
    const washKey = 'care-wash-30-gentle';
    const ironKey = 'care-iron-low';
    const catalog = new Map<string, unknown>(careSymbolById);
    const washSymbol = catalog.get(washKey);
    const ironSymbol = catalog.get(ironKey);

    try {
      catalog.set(washKey, ironSymbol);
      catalog.set(ironKey, washSymbol);
      expect(validatePublishedSymbolCatalog(catalog)).toBe(false);
    } finally {
      catalog.set(washKey, washSymbol);
      catalog.set(ironKey, ironSymbol);
    }
  });
});
