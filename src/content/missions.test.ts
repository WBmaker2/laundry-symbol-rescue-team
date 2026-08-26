import { describe, expect, it } from 'vitest';
import { careSymbolById } from './symbols';
import { careOptionById } from './careOptions';
import { missionById, missions } from './missions';
import { makeEmptyPlan, makePlanFixture } from '../test/factories';

const expectedMissionIds = [
  'basic-t-shirt',
  'soft-scarf',
  'sportswear',
  'decorated-top',
  'mixed-load',
] as const;

describe('virtual garment missions', () => {
  it('contains the five ordered design missions', () => {
    expect(missions.map(({ id }) => id)).toEqual(expectedMissionIds);
    expect(missions.map(({ order }) => order)).toEqual([1, 2, 3, 4, 5]);
    expect(missionById.size).toBe(5);
  });

  it('marks every material claim as a learning model', () => {
    for (const mission of missions) {
      for (const garment of mission.garments) {
        expect(garment.materialBoundary).toMatch(/학습용 재료 모형/);
        expect(garment.materialBoundary).toMatch(/실제|보장/);
      }
    }
  });

  it('uses three garments and grouping only in the mixed mission', () => {
    const mixed = missions.find(({ id }) => id === 'mixed-load');
    expect(mixed?.garments).toHaveLength(3);
    expect(mixed?.requiresGrouping).toBe(true);
    expect(missions.filter(({ requiresGrouping }) => requiresGrouping)).toHaveLength(1);
    expect(missions.filter(({ garments }) => garments.length === 3)).toHaveLength(1);
  });

  it('references only registered symbols and stage-matching options', () => {
    for (const mission of missions) {
      expect(mission.garments.length).toBeGreaterThan(0);
      for (const garment of mission.garments) {
        expect(garment.symbolIds.length).toBeGreaterThan(0);
        for (const symbolId of garment.symbolIds) expect(careSymbolById.has(symbolId)).toBe(true);
        for (const [stage, optionIds] of Object.entries(garment.materialAllowedOptionIdsByStage)) {
          expect(optionIds.length).toBeGreaterThan(0);
          for (const optionId of optionIds) {
            const option = careOptionById.get(optionId);
            expect(option?.stage).toBe(stage);
          }
        }
      }
    }
  });

  it('keeps the mixed mission as the only grouping mission', () => {
    expect(missions.find(({ id }) => id === 'mixed-load')?.garments.map(({ id }) => id)).toEqual([
      'mixed-cotton-shirt',
      'mixed-synthetic-sportswear',
      'mixed-delicate-scarf',
    ]);
  });

  it('provides empty, within-limit, and misconception plan fixtures', () => {
    for (const mission of missions) {
      const empty = makeEmptyPlan(mission.id);
      expect(empty.garmentIds).toEqual(mission.garments.map(({ id }) => id));
      expect(Object.values(empty.stageOptions)).toEqual([null, null, null]);

      const within = makePlanFixture(mission.id, 'within-limits');
      for (const [stage, optionId] of Object.entries(within.stageOptions)) {
        expect(
          mission.garments.every(({ materialAllowedOptionIdsByStage }) =>
            materialAllowedOptionIdsByStage[stage as 'wash' | 'dry' | 'iron'].includes(optionId!),
          ),
        ).toBe(true);
      }

      const outside = makePlanFixture(mission.id, 'outside-limits');
      expect(outside.stageOptions).toEqual({
        wash: 'plan-wash-strong-40',
        dry: 'plan-dry-tumble-high',
        iron: 'plan-iron-high-with-adult',
      });
    }

    const mixedWithin = makePlanFixture('mixed-load', 'within-limits');
    expect(mixedWithin.grouping).toEqual({
      togetherGarmentIds: ['mixed-cotton-shirt', 'mixed-synthetic-sportswear'],
      separateGarmentIds: ['mixed-delicate-scarf'],
      reasonSymbolIds: ['care-professional'],
    });
  });
});
