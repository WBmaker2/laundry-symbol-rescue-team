import { describe, expect, it } from 'vitest';
import { validatePublishedContent } from './validateContent';
import { sources } from './sources';
import { careSymbols } from './symbols';

describe('published care-symbol content', () => {
  it('publishes exactly eight fully reviewed symbols', () => {
    expect(careSymbols).toHaveLength(8);
    expect(validatePublishedContent({ sources, symbols: careSymbols })).toEqual([]);
  });

  it('keeps every correct meaning inside its visible choice list', () => {
    for (const symbol of careSymbols) {
      expect(symbol.meaningOptions.map(({ id }) => id)).toContain(symbol.correctMeaningOptionId);
    }
  });

  it('reports duplicate ids, missing sources, and unapproved sources', () => {
    const duplicate = { ...careSymbols[0], id: careSymbols[1].id };
    const broken = { ...careSymbols[2], sourceIds: ['missing-source'] };
    const issues = validatePublishedContent({
      sources: [...sources, { ...sources[0], id: 'pending-source', status: 'pending' }],
      symbols: [
        duplicate,
        careSymbols[1],
        broken,
        { ...careSymbols[3], sourceIds: ['pending-source'] },
        ...careSymbols.slice(4),
      ],
    });

    expect(issues.map(({ code }) => code)).toEqual(
      expect.arrayContaining(['duplicate-symbol-id', 'missing-source', 'unapproved-source']),
    );
  });

  it('reports review, accessibility, display, answer, and constraint gaps', () => {
    const symbol = careSymbols[0];
    const broken = {
      ...symbol,
      reviewedAt: '2026-08-25',
      accessibleDescription: ' ',
      displayKind: '' as typeof symbol.displayKind,
      correctMeaningOptionId: 'not-visible',
      meaningOptions: [],
      allowedOptionIds: [],
      forbiddenOptionIds: [],
      requiresAcknowledgement: false,
    };
    const issues = validatePublishedContent({
      sources,
      symbols: [broken, ...careSymbols.slice(1)],
    });

    expect(issues.map(({ code }) => code)).toEqual(
      expect.arrayContaining([
        'review-date-mismatch',
        'missing-accessible-text',
        'missing-display-kind',
        'missing-correct-choice',
        'empty-constraint-set',
      ]),
    );
  });
});
