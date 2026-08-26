import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { careSymbolById, careSymbols } from './symbols';

const REQUIRED_CARE_SYMBOL_IDS = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
] as const;

describe('care symbol registry', () => {
  it('keeps the published symbols in the brief-defined order', () => {
    expect(careSymbols.map(({ id }) => id)).toEqual(REQUIRED_CARE_SYMBOL_IDS);
    expect(REQUIRED_CARE_SYMBOL_IDS).toHaveLength(8);
  });

  it('indexes every published symbol by its stable id', () => {
    expect(careSymbolById.size).toBe(careSymbols.length);
    for (const id of REQUIRED_CARE_SYMBOL_IDS) {
      expect(careSymbolById.get(id)?.id).toBe(id);
    }
  });

  it('offers three visible meanings, safe wording, and a local learning-icon note for every symbol', () => {
    for (const symbol of careSymbols) {
      expect(symbol.meaningOptions).toHaveLength(3);
      expect(new Set(symbol.meaningOptions.map(({ id }) => id)).size).toBe(3);
      expect(symbol.displayKind).toBe('learning-icon');
      expect(symbol.accessibleDescription).toMatch(/실제 라벨|대신하지/);
      expect(symbol.assetPath).toMatch(/^\/symbols\/.+\.svg$/);
      expect(existsSync(resolve(process.cwd(), 'public', symbol.assetPath.slice(1)))).toBe(true);
    }

    const visibleText = careSymbols.flatMap(({ meaningOptions }) => meaningOptions.map(({ label }) => label));
    expect(visibleText).not.toContain('높은 온도로 다림질하기');
    for (const label of visibleText) {
      expect(label).not.toMatch(/(?:높은|고온|뜨거운)\s*(?:온도|열).*(?:다림질|다리미).*(?:하기|하세요|사용)/);
    }
  });
});
