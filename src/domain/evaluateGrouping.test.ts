import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { missionById } from '../content/missions';
import { careSymbolById } from '../content/symbols';
import { makePlanFixture } from '../test/factories';
import type { CareOption } from './missionTypes';
import type { CareOptionId, CareSymbol, CareSymbolId } from './careTypes';
import { evaluateGrouping } from './evaluateGrouping';

describe('evaluateGrouping', () => {
  it('asks the learner to separate a garment with no shared safe option', () => {
    const mission = missionById.get('mixed-load')!;
    const result = evaluateGrouping({
      mission,
      grouping: {
        togetherGarmentIds: mission.garments.map(({ id }) => id),
        separateGarmentIds: [],
        reasonSymbolIds: [],
      },
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ code }) => code === 'separation-needed')).toBe(true);
    expect(result.findings.some(({ relatedSymbolIds }) => relatedSymbolIds.includes('care-professional'))).toBe(true);
  });

  it('accepts the fixture grouping and keeps common options derived from Task 4', () => {
    const mission = missionById.get('mixed-load')!;
    const grouping = makePlanFixture('mixed-load', 'within-limits').grouping!;
    const result = evaluateGrouping({
      mission,
      grouping,
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('ready');
    expect(result.commonAllowedOptions).toEqual({
      wash: ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'],
      dry: ['plan-dry-pause-and-ask'],
      iron: ['plan-iron-none', 'plan-iron-pause-and-ask'],
    });
    expect(result.findings.some(({ code }) => code === 'compatible-group')).toBe(true);
  });

  it('rejects duplicate, unknown, or missing garment membership', () => {
    const mission = missionById.get('mixed-load')!;
    const [first, second, third] = mission.garments;
    const result = evaluateGrouping({
      mission,
      grouping: {
        togetherGarmentIds: [first!.id, first!.id],
        separateGarmentIds: ['unknown-garment', second!.id],
        reasonSymbolIds: [],
      },
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.code).toBe('invalid-membership');
    expect(result.findings[0]?.garmentIds).toEqual([first!.id, second!.id, third!.id]);
  });

  it('requires a reason symbol that belongs to the separated garment restriction', () => {
    const mission = missionById.get('mixed-load')!;
    const result = evaluateGrouping({
      mission,
      grouping: {
        togetherGarmentIds: [mission.garments[0]!.id, mission.garments[1]!.id],
        separateGarmentIds: [mission.garments[2]!.id],
        reasonSymbolIds: ['care-wash-30-gentle'],
      },
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ code }) => code === 'missing-reason')).toBe(true);
    expect(result.findings.some(({ relatedSymbolIds }) => relatedSymbolIds.includes('care-professional'))).toBe(true);
  });

  it('fails closed when a referenced professional symbol is null', () => {
    const mission = missionById.get('mixed-load')!;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById)
      .set('care-professional', null as unknown as CareSymbol);
    const result = evaluateGrouping({
      mission,
      grouping: {
        togetherGarmentIds: mission.garments.map(({ id }) => id),
        separateGarmentIds: [],
        reasonSymbolIds: [],
      },
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.code).toBe('invalid-membership');
    expect(result.commonAllowedOptions).toEqual({ wash: [], dry: [], iron: [] });
  });

  it.each([
    ['symbol key/value mismatch', () => {
      const symbol = careSymbolById.get('care-professional')!;
      return {
        symbols: new Map<CareSymbolId, CareSymbol>(careSymbolById)
          .set('care-professional', { ...symbol, id: 'care-no-iron' } as CareSymbol),
        options: careOptionById,
        mission: missionById.get('mixed-load')!,
      };
    }],
    ['malformed symbol risk list', () => {
      const symbol = careSymbolById.get('care-professional')!;
      return {
        symbols: new Map<CareSymbolId, CareSymbol>(careSymbolById)
          .set('care-professional', { ...symbol, riskIds: null } as unknown as CareSymbol),
        options: careOptionById,
        mission: missionById.get('mixed-load')!,
      };
    }],
    ['option key/value mismatch', () => {
      const option = careOptionById.get('plan-wash-gentle-30')!;
      return {
        symbols: careSymbolById,
        options: new Map<CareOptionId, CareOption>(careOptionById)
          .set('plan-wash-gentle-30', { ...option, id: 'plan-wash-strong-40' } as CareOption),
        mission: missionById.get('mixed-load')!,
      };
    }],
    ['stage-mismatched symbol option reference', () => {
      const symbol = careSymbolById.get('care-professional')!;
      return {
        symbols: new Map<CareSymbolId, CareSymbol>(careSymbolById)
          .set('care-professional', { ...symbol, allowedOptionIds: ['plan-wash-gentle-30'] } as CareSymbol),
        options: careOptionById,
        mission: missionById.get('mixed-load')!,
      };
    }],
  ] as const)('rejects %s before resolving options', (_label, makeInput) => {
    const input = makeInput();
    const result = evaluateGrouping({
      mission: input.mission,
      grouping: makePlanFixture('mixed-load', 'within-limits').grouping!,
      symbols: input.symbols,
      options: input.options,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.code).toBe('invalid-membership');
    expect(result.commonAllowedOptions).toEqual({ wash: [], dry: [], iron: [] });
  });

  it('requires an actual reason whenever a non-professional garment is separated', () => {
    const mission = missionById.get('mixed-load')!;
    const [first, second, third] = mission.garments;
    const arbitraryMission = {
      ...mission,
      garments: [first, second, {
        ...third,
        symbolIds: ['care-wash-30-gentle'],
      }],
    } as unknown as typeof mission;
    const result = evaluateGrouping({
      mission: arbitraryMission,
      grouping: {
        togetherGarmentIds: [first!.id, second!.id],
        separateGarmentIds: [third!.id],
        reasonSymbolIds: [],
      },
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ code }) => code === 'missing-reason')).toBe(true);
  });
});
