import { describe, expect, it } from 'vitest';
import { careSymbolIds } from './symbols';
import { interpretationRetryHints } from './learnerCopy';

describe('interpretation retry hints', () => {
  it('covers every reviewed care symbol with an observable shape cue', () => {
    expect(Object.keys(interpretationRetryHints).sort()).toEqual([...careSymbolIds].sort());

    for (const symbolId of careSymbolIds) {
      expect(interpretationRetryHints[symbolId].trim()).toMatch(/[가-힣]/);
    }
  });
});
