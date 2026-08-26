import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { makeEmptyPlan, makePlanFixture } from '../test/factories';
import { evaluatePlan, resolveGarmentAllowedOptions } from './evaluatePlan';

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

    expect(result.wash).toEqual(['plan-wash-gentle-30']);
    expect(result.dry).toEqual(['plan-dry-tumble-low']);
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
    expect(result.dry).toEqual(['plan-dry-flat']);
  });
});

describe('evaluatePlan', () => {
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
});
