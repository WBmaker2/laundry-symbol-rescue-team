import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { makeEmptyPlan, makePlanFixture } from '../test/factories';
import { evaluatePlan, resolveGarmentAllowedOptions } from './evaluatePlan';
import type { CareOptionId, CareSymbol, CareSymbolId } from './careTypes';
import type { CareOption } from './missionTypes';

const inputFor = (missionId: Parameters<typeof makeEmptyPlan>[0], plan = makeEmptyPlan(missionId)) => ({
  mission: missionById.get(missionId)!,
  plan,
  symbols: careSymbolById,
  options: careOptionById,
});

describe('resolveGarmentAllowedOptions', () => {
  it('intersects material and planning-stage symbols without mutating input arrays', () => {
    const garment = missionById.get('basic-t-shirt')!.garments[0]!;
    const materialWash = garment.materialAllowedOptionIdsByStage.wash;
    const materialDry = garment.materialAllowedOptionIdsByStage.dry;

    const result = resolveGarmentAllowedOptions({
      garment,
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.wash).toEqual(['plan-wash-gentle-30', 'plan-wash-pause-and-ask']);
    expect(result.dry).toEqual(['plan-dry-tumble-low', 'plan-dry-pause-and-ask']);
    expect(garment.materialAllowedOptionIdsByStage.wash).toEqual(materialWash);
    expect(garment.materialAllowedOptionIdsByStage.dry).toEqual(materialDry);
  });

  it('does not turn bleach or professional restrictions into planning stages', () => {
    const garment = missionById.get('soft-scarf')!.garments[0]!;
    const result = resolveGarmentAllowedOptions({
      garment,
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.wash).toEqual(['plan-wash-pause-and-ask']);
    expect(result.dry).toEqual(['plan-dry-flat', 'plan-dry-pause-and-ask']);
  });
});

describe('evaluatePlan', () => {
  it.each([
    'basic-t-shirt',
    'soft-scarf',
    'sportswear',
    'decorated-top',
    'mixed-load',
  ] as const)('accepts the %s within-limits fixture as ready', (missionId) => {
    const result = evaluatePlan(inputFor(missionId, makePlanFixture(missionId, 'within-limits')));

    expect(result.status).toBe('ready');
    expect(result.findings.filter(({ status }) => status !== 'allowed')).toHaveLength(0);
  });

  it('requires all three planning stages', () => {
    const result = evaluatePlan(inputFor('basic-t-shirt'));

    expect(result.status).toBe('revise');
    expect(result.findings.filter(({ status }) => status === 'missing-step')).toHaveLength(3);
  });

  it('returns to related labels without claiming certain damage', () => {
    const result = evaluatePlan(inputFor('decorated-top', makePlanFixture('decorated-top', 'outside-limits')));
    const outside = result.findings.filter(({ status }) => status === 'outside-limit');

    expect(outside.length).toBeGreaterThan(0);
    expect(outside.every(({ feedback }) => feedback.includes('표시'))).toBe(true);
    expect(outside.every(({ feedback }) => /가능성/.test(feedback))).toBe(true);
    expect(outside.every(({ feedback }) => !/반드시|확실히/.test(feedback))).toBe(true);
    expect(outside.some(({ relatedSymbolIds }) => relatedSymbolIds.includes('care-no-tumble'))).toBe(true);
    expect(outside.some(({ riskIds }) => riskIds.includes('decoration-damage'))).toBe(true);
  });

  it('reports unread acknowledgement restrictions while keeping non-planning symbols out of stages', () => {
    const within = makePlanFixture('soft-scarf', 'within-limits');
    const result = evaluatePlan(inputFor('soft-scarf', { ...within, acknowledgedRestrictionIds: [] }));

    expect(result.status).toBe('revise');
    expect(result.findings.filter(({ status }) => status === 'unread-restriction')).toHaveLength(3);
    expect(result.findings.every(({ stage }) => stage === 'restriction' || ['wash', 'dry', 'iron'].includes(stage))).toBe(true);
    expect(result.combinedAllowedOptions.wash).toEqual(['plan-wash-pause-and-ask']);
  });

  it('is ready for a within-limit plan and reports relative resources only', () => {
    const within = makePlanFixture('soft-scarf', 'within-limits');
    const result = evaluatePlan(inputFor('soft-scarf', within));

    expect(result.status).toBe('ready');
    expect(result.findings.filter(({ status }) => status === 'outside-limit')).toHaveLength(0);
    expect(result.findings.filter(({ status }) => status === 'missing-step')).toHaveLength(0);
    expect(result.waterUse).toBe('lower');
    expect(result.energyUse).toBe('lower');
    expect(result.safetyNotices).toEqual(expect.arrayContaining([
      '실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요.',
      '실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요.',
    ]));
  });

  it('rejects a mission with a missing referenced symbol', () => {
    const mission = missionById.get('basic-t-shirt')!;
    const garment = mission.garments[0]!;
    const malformedMission = {
      ...mission,
      garments: [{ ...garment, symbolIds: ['missing-symbol' as CareSymbolId] }],
    };
    const result = evaluatePlan({
      mission: malformedMission,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it('rejects a plan whose mission ID does not match the evaluated mission', () => {
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const result = evaluatePlan(inputFor('basic-t-shirt', { ...plan, missionId: 'soft-scarf' }));

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it.each([
    ['duplicate', ['basic-t-shirt', 'basic-t-shirt']],
    ['unknown', ['missing-garment']],
    ['partial', []],
  ] as const)('rejects %s garment IDs', (_label, garmentIds) => {
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const result = evaluatePlan(inputFor('basic-t-shirt', { ...plan, garmentIds }));

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it('rejects a selected option missing from the catalog', () => {
    const options = new Map([...careOptionById].filter(([id]) => id !== 'plan-wash-gentle-30'));
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it('rejects a selected option whose catalog stage does not match', () => {
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const malformedPlan = {
      ...plan,
      stageOptions: { ...plan.stageOptions, wash: 'plan-dry-flat' as CareOptionId },
    };
    const result = evaluatePlan(inputFor('basic-t-shirt', malformedPlan));

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it.each([
    ['missing material constraint', 'missing-option'],
    ['stage-mismatched material constraint', 'plan-dry-flat'],
  ] as const)('rejects a %s reference', (_label, optionId) => {
    const mission = missionById.get('basic-t-shirt')!;
    const garment = mission.garments[0]!;
    const malformedMission = {
      ...mission,
      garments: [{
        ...garment,
        materialAllowedOptionIdsByStage: {
          ...garment.materialAllowedOptionIdsByStage,
          wash: [optionId as CareOptionId],
        },
      }],
    };
    const result = evaluatePlan({
      mission: malformedMission,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it('rejects a missing symbol constraint-catalog option', () => {
    const symbol = careSymbolById.get('care-wash-30-gentle')!;
    const malformedSymbol = { ...symbol, allowedOptionIds: ['missing-option' as CareOptionId] };
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol as CareSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status }) => status === 'invalid-input')).toBe(true);
  });

  it('returns null resource levels until all three stage options are known and stage-correct', () => {
    const result = evaluatePlan(inputFor('basic-t-shirt'));

    expect(result.waterUse).toBeNull();
    expect(result.energyUse).toBeNull();
  });

  it('uses Korean planning-stage labels in every stage finding', () => {
    const result = evaluatePlan(inputFor('decorated-top', makePlanFixture('decorated-top', 'outside-limits')));
    const stageFindings = result.findings.filter(({ stage }) => stage !== 'restriction');

    expect(stageFindings.every(({ feedback }) => /세탁|건조|다림질/.test(feedback))).toBe(true);
    expect(stageFindings.every(({ feedback }) => !/wash 단계|dry 단계|iron 단계/.test(feedback))).toBe(true);
  });

  it('lets forbidden options win over an overlapping allowed option', () => {
    const symbol = careSymbolById.get('care-wash-30-gentle')!;
    const malformedSymbol = {
      ...symbol,
      forbiddenOptionIds: [...symbol.forbiddenOptionIds, 'plan-wash-gentle-30' as CareOptionId],
    };
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol as CareSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings.some(({ status, stage }) => status === 'outside-limit' && stage === 'wash')).toBe(true);
  });

  it.each([
    ['null input', null as unknown as Parameters<typeof evaluatePlan>[0]],
    [
      'null option map value',
      {
        ...inputFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'within-limits')),
        options: new Map<CareOptionId, CareOption>(careOptionById).set('plan-wash-gentle-30', null as unknown as CareOption),
      },
    ],
    [
      'null symbol map value',
      {
        ...inputFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'within-limits')),
        symbols: new Map<CareSymbolId, CareSymbol>(careSymbolById).set('care-wash-30-gentle', null as unknown as CareSymbol),
      },
    ],
  ] as const)('returns a defensive invalid result for %s', (_label, malformedInput) => {
    const result = evaluatePlan(malformedInput);

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
    expect(result.combinedAllowedOptions).toEqual({ wash: [], dry: [], iron: [] });
    expect(result.waterUse).toBeNull();
    expect(result.energyUse).toBeNull();
    expect(result.safetyNotices.length).toBeGreaterThan(0);
  });

  it('rejects a symbol with a null risk list without throwing', () => {
    const symbol = careSymbolById.get('care-wash-30-gentle')!;
    const malformedSymbol = { ...symbol, riskIds: null } as unknown as CareSymbol;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it('rejects non-Map catalog lookalikes without throwing', () => {
    const input = inputFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'within-limits'));
    const result = evaluatePlan({
      ...input,
      options: { get: () => undefined, has: () => false } as unknown as typeof input.options,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
    expect(result.combinedAllowedOptions).toEqual({ wash: [], dry: [], iron: [] });
  });

  it('rejects malformed nested option constraints structurally', () => {
    const symbol = careSymbolById.get('care-wash-30-gentle')!;
    const malformedSymbol = { ...symbol, allowedOptionIds: null } as unknown as CareSymbol;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it('rejects an unused symbol with a missing constraint option', () => {
    const symbol = careSymbolById.get('care-iron-low')!;
    const malformedSymbol = { ...symbol, allowedOptionIds: ['missing-option' as CareOptionId] } as unknown as CareSymbol;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it('rejects an unused symbol constraint option from the wrong planning stage', () => {
    const symbol = careSymbolById.get('care-iron-low')!;
    const malformedSymbol = { ...symbol, allowedOptionIds: ['plan-wash-gentle-30' as CareOptionId] } as unknown as CareSymbol;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(symbol.id, malformedSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it('rejects unknown symbol and option risk IDs in the full catalogs', () => {
    const symbol = careSymbolById.get('care-iron-low')!;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById).set(
      symbol.id,
      { ...symbol, riskIds: ['unknown-risk'] } as unknown as CareSymbol,
    );
    const symbolResult = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });
    expect(symbolResult.status).toBe('revise');
    expect(symbolResult.findings[0]?.status).toBe('invalid-input');

    const option = careOptionById.get('plan-iron-low-with-adult')!;
    const options = new Map<CareOptionId, CareOption>(careOptionById).set(
      option.id,
      { ...option, riskIds: ['unknown-risk'] } as unknown as CareOption,
    );
    const optionResult = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options,
    });
    expect(optionResult.status).toBe('revise');
    expect(optionResult.findings[0]?.status).toBe('invalid-input');
  });

  it.each([
    ['display kind', { displayKind: null }],
    ['accessible description', { accessibleDescription: null }],
    ['source IDs', { sourceIds: [] }],
    ['review date', { reviewedAt: null }],
    ['meaning choices', { meaningOptions: [] }],
    ['visible correct choice', { correctMeaningOptionId: 'missing-choice' }],
  ] as const)('rejects a malformed published symbol %s field', (_label, change) => {
    const symbol = careSymbolById.get('care-wash-30-gentle')!;
    const malformedSymbol = { ...symbol, ...change } as unknown as CareSymbol;
    const symbols = new Map<CareSymbolId, CareSymbol>(careSymbolById)
      .set(symbol.id, malformedSymbol);
    const result = evaluatePlan({
      mission: missionById.get('basic-t-shirt')!,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it.each([
    ['mission title', { title: '' }],
    ['mission order', { order: 9 }],
    ['grouping flag', { requiresGrouping: 'yes' }],
  ] as const)('rejects a malformed mission identity field: %s', (_label, change) => {
    const mission = missionById.get('basic-t-shirt')!;
    const malformedMission = { ...mission, ...change } as unknown as typeof mission;
    const result = evaluatePlan({
      mission: malformedMission,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });

  it.each([
    ['material model', { materialModel: '' }],
    ['material boundary', { materialBoundary: '' }],
    ['contamination scenario', { contaminationScenario: '' }],
  ] as const)('rejects a malformed virtual garment field: %s', (_label, change) => {
    const mission = missionById.get('basic-t-shirt')!;
    const garment = mission.garments[0]!;
    const malformedMission = {
      ...mission,
      garments: [{ ...garment, ...change }],
    } as unknown as typeof mission;
    const result = evaluatePlan({
      mission: malformedMission,
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });

    expect(result.status).toBe('revise');
    expect(result.findings[0]?.status).toBe('invalid-input');
  });
});
