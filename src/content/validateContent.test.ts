import { describe, expect, it } from 'vitest';
import { validatePublishedContent } from './validateContent';
import { sources } from './sources';
import { careSymbols } from './symbols';
import type { CareSymbol, SourceRecord } from '../domain/careTypes';

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

  it('fails closed for every source record, including unlinked records', () => {
    const requiredTextFields = [
      'publisher',
      'title',
      'standardOrDocumentId',
      'editionOrPublishedAt',
      'accessedAt',
      'reviewedAt',
      'coverage',
    ] as const;

    for (const field of requiredTextFields) {
      const invalidSource = { ...sources[0], id: `invalid-${field}`, [field]: ' ' };
      const issues = validatePublishedContent({
        sources: [...sources, invalidSource],
        symbols: careSymbols,
      });
      expect(issues.map(({ code }) => code), field).toContain('invalid-source-record');
    }

    const malformedSources: readonly SourceRecord[] = [
      { ...sources[0], id: 'placeholder-id', standardOrDocumentId: 'ISO 3758: TBD' },
      { ...sources[0], id: 'bad-url', officialUrl: 'http://example.com/source' },
      { ...sources[0], id: 'bad-url-syntax', officialUrl: 'https://%' },
      { ...sources[0], id: 'pending-unlinked', status: 'pending' },
      { ...sources[0], id: sources[0].id },
    ];
    const issues = validatePublishedContent({
      sources: [...sources, ...malformedSources],
      symbols: careSymbols,
    });
    expect(issues.map(({ code }) => code)).toEqual(
      expect.arrayContaining(['invalid-source-record', 'unapproved-source', 'duplicate-source-id']),
    );
  });

  it('requires the exact eight IDs and ISO plus domestic provenance', () => {
    const unexpected = { ...careSymbols[0], id: 'care-unexpected' as CareSymbol['id'] };
    const idIssues = validatePublishedContent({
      sources,
      symbols: [...careSymbols.slice(1), unexpected],
    });
    expect(idIssues.map(({ code }) => code)).toEqual(
      expect.arrayContaining(['unexpected-symbol-id', 'missing-required-symbol-id']),
    );

    const withoutIso = { ...careSymbols[0], sourceIds: ['ks-k-0021-2024', 'katri-care-label-cardnews'] };
    const withoutDomestic = { ...careSymbols[0], sourceIds: ['iso-3758-2023', 'ginetex-care-symbols'] };
    const provenanceIssues = validatePublishedContent({
      sources,
      symbols: [withoutIso, withoutDomestic, ...careSymbols.slice(2)],
    });
    expect(provenanceIssues.map(({ code }) => code)).toContain('missing-required-provenance');
  });

  it('rejects malformed meaning choices, constraints, acknowledgement, and official display claims', () => {
    const malformed = {
      ...careSymbols[0],
      displayKind: 'official-standard-symbol' as const,
      meaningOptions: [
        { id: '', label: '첫 선택지' },
        { id: 'duplicate', label: '두 번째 선택지' },
        { id: 'duplicate', label: '두 번째 선택지' },
        { id: 'extra', label: '네 번째 선택지' },
      ],
      allowedOptionIds: ['unknown-option'] as unknown as CareSymbol['allowedOptionIds'],
      forbiddenOptionIds: 'not-an-array' as unknown as CareSymbol['forbiddenOptionIds'],
      requiresAcknowledgement: 'yes' as unknown as boolean,
    };
    const issues = validatePublishedContent({
      sources,
      symbols: [malformed, ...careSymbols.slice(1)],
    });
    expect(issues.map(({ code }) => code)).toEqual(
      expect.arrayContaining([
        'unlicensed-display-kind',
        'meaning-choice-count',
        'invalid-meaning-choice',
        'missing-correct-choice',
        'invalid-constraint-id',
        'invalid-acknowledgement',
      ]),
    );
  });
});
