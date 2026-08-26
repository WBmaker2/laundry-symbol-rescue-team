import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { missionById } from '../content/missions';
import { careSymbolById } from '../content/symbols';
import { makePlanFixture } from '../test/factories';
import { evaluatePlan } from './evaluatePlan';
import { evaluatePrediction } from './evaluatePrediction';

describe('evaluatePrediction', () => {
  it('connects predicted risks to findings rather than certainty', () => {
    const evaluation = evaluatePlan({
      mission: missionById.get('decorated-top')!,
      plan: makePlanFixture('decorated-top', 'outside-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });
    const result = evaluatePrediction({
      evaluation,
      selection: {
        riskIds: ['heat-damage'],
        reasonSymbolIds: ['care-no-iron'],
      },
    });

    expect(result.supportedRiskIds).toContain('heat-damage');
    expect(result.message).toMatch(/가능성/);
    expect(result.message).not.toMatch(/반드시|확실히|[0-9]+%|[0-9]+도|[0-9]+℃/);
  });

  it('deduplicates evidence deterministically and separates supported, unsupported, and missed risks', () => {
    const result = evaluatePrediction({
      evaluation: {
        status: 'revise',
        findings: [
          {
            status: 'outside-limit',
            stage: 'dry',
            garmentIds: ['decorated-top'],
            optionId: 'plan-dry-tumble-high',
            relatedSymbolIds: ['care-no-tumble'],
            riskIds: ['heat-damage', 'deformation', 'heat-damage'],
            feedback: '가능성이 있어요.',
          },
          {
            status: 'unread-restriction',
            stage: 'restriction',
            garmentIds: ['decorated-top'],
            optionId: null,
            relatedSymbolIds: ['care-no-iron'],
            riskIds: ['decoration-damage', 'deformation'],
            feedback: '가능성을 다시 살펴봐요.',
          },
        ],
        combinedAllowedOptions: { wash: [], dry: [], iron: [] },
        waterUse: null,
        energyUse: null,
        safetyNotices: [],
      },
      selection: {
        riskIds: ['deformation', 'heat-damage', 'shrinkage', 'deformation'],
        reasonSymbolIds: [],
      },
    });

    expect(result.supportedRiskIds).toEqual(['deformation', 'heat-damage']);
    expect(result.unsupportedRiskIds).toEqual(['shrinkage']);
    expect(result.missedRiskIds).toEqual(['decoration-damage']);
  });

  it('does not infer damage from allowed-only findings and handles invalid input safely', () => {
    const allowedOnly = evaluatePrediction({
      evaluation: {
        status: 'ready',
        findings: [{
          status: 'allowed',
          stage: 'wash',
          garmentIds: ['basic-t-shirt'],
          optionId: 'plan-wash-gentle-30',
          relatedSymbolIds: ['care-wash-30-gentle'],
          riskIds: ['shrinkage', 'deformation'],
          feedback: '허용 범위예요.',
        }],
        combinedAllowedOptions: { wash: [], dry: [], iron: [] },
        waterUse: 'lower',
        energyUse: 'lower',
        safetyNotices: [],
      },
      selection: { riskIds: ['shrinkage'], reasonSymbolIds: [] },
    });
    expect(allowedOnly.supportedRiskIds).toEqual([]);
    expect(allowedOnly.unsupportedRiskIds).toEqual(['shrinkage']);

    const malformed = evaluatePrediction({
      evaluation: null as never,
      selection: null as never,
    });
    expect(malformed.supportedRiskIds).toEqual([]);
    expect(malformed.unsupportedRiskIds).toEqual([]);
    expect(malformed.missedRiskIds).toEqual([]);
    expect(malformed.message).toMatch(/확인|가능성/);
  });
});
