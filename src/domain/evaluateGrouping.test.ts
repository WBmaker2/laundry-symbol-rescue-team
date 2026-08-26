import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { missionById } from '../content/missions';
import { careSymbolById } from '../content/symbols';
import { makePlanFixture } from '../test/factories';
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
});
