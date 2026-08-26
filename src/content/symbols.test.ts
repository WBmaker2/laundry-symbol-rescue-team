import { describe, expect, it } from 'vitest';
import { careSymbolById, careSymbolIds, careSymbols } from './symbols';

describe('care symbol registry', () => {
  it('keeps the published symbols in the brief-defined order', () => {
    expect(careSymbols.map(({ id }) => id)).toEqual(careSymbolIds);
    expect(careSymbolIds).toHaveLength(8);
  });

  it('indexes every published symbol by its stable id', () => {
    expect(careSymbolById.size).toBe(careSymbols.length);
    for (const id of careSymbolIds) {
      expect(careSymbolById.get(id)?.id).toBe(id);
    }
  });

  it('offers three visible meanings and a local learning-icon note for every symbol', () => {
    for (const symbol of careSymbols) {
      expect(symbol.meaningOptions).toHaveLength(3);
      expect(new Set(symbol.meaningOptions.map(({ id }) => id)).size).toBe(3);
      expect(symbol.displayKind).toBe('learning-icon');
      expect(symbol.accessibleDescription).toMatch(/실제 라벨|대신하지/);
      expect(symbol.assetPath).toMatch(/^\/symbols\/.+\.svg$/);
    }
  });
});
