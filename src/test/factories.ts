import type { CareOptionId, PlanningStage } from '../domain/careTypes';
import type {
  GroupingChoice,
  MissionId,
  PlanFixtureScenario,
  StudentPlan,
} from '../domain/missionTypes';
import { missionById } from '../content/missions';
import { careSymbolById } from '../content/symbols';

const planningStages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];

function missionOrThrow(missionId: MissionId) {
  const mission = missionById.get(missionId);
  if (mission === undefined) throw new RangeError(`알 수 없는 미션 ID입니다: ${missionId}`);
  return mission;
}

function emptyStageOptions(): Readonly<Record<PlanningStage, CareOptionId | null>> {
  return { wash: null, dry: null, iron: null };
}

function restrictionIdsForMission(missionId: MissionId) {
  const mission = missionOrThrow(missionId);
  return [
    ...new Set(
      mission.garments.flatMap((garment) =>
        garment.symbolIds.filter((symbolId) => careSymbolById.get(symbolId)?.requiresAcknowledgement),
      ),
    ),
  ];
}

function withinLimitOptions(missionId: MissionId): Readonly<Record<PlanningStage, CareOptionId>> {
  switch (missionId) {
    case 'basic-t-shirt':
      return { wash: 'plan-wash-gentle-30', dry: 'plan-dry-tumble-low', iron: 'plan-iron-none' };
    case 'soft-scarf':
      return { wash: 'plan-wash-pause-and-ask', dry: 'plan-dry-flat', iron: 'plan-iron-none' };
    case 'sportswear':
      return { wash: 'plan-wash-gentle-30', dry: 'plan-dry-tumble-low', iron: 'plan-iron-low-with-adult' };
    case 'decorated-top':
      return { wash: 'plan-wash-gentle-30', dry: 'plan-dry-flat', iron: 'plan-iron-none' };
    case 'mixed-load':
      return { wash: 'plan-wash-pause-and-ask', dry: 'plan-dry-pause-and-ask', iron: 'plan-iron-pause-and-ask' };
  }
}

function groupingForMission(
  missionId: MissionId,
  scenario: PlanFixtureScenario,
): GroupingChoice | null {
  if (missionId !== 'mixed-load') return null;
  const [first, second, delicate] = missionOrThrow(missionId).garments;
  if (first === undefined || second === undefined || delicate === undefined) {
    throw new Error('혼합 미션은 세 벌의 가상 옷을 가져야 합니다.');
  }
  if (scenario === 'within-limits') {
    return {
      togetherGarmentIds: [first.id, second.id],
      separateGarmentIds: [delicate.id],
      reasonSymbolIds: ['care-professional'],
    };
  }
  return {
    togetherGarmentIds: [first.id, second.id, delicate.id],
    separateGarmentIds: [],
    reasonSymbolIds: [],
  };
}

export function makeEmptyPlan(missionId: MissionId): StudentPlan {
  const mission = missionOrThrow(missionId);
  return {
    missionId,
    garmentIds: mission.garments.map(({ id }) => id),
    stageOptions: emptyStageOptions(),
    acknowledgedRestrictionIds: [],
    grouping: null,
  };
}

export function makePlanFixture(
  missionId: MissionId,
  scenario: PlanFixtureScenario,
): StudentPlan {
  const mission = missionOrThrow(missionId);
  const garmentIds = mission.garments.map(({ id }) => id);
  if (scenario === 'empty') return makeEmptyPlan(missionId);

  const stageOptions: Readonly<Record<PlanningStage, CareOptionId | null>> =
    scenario === 'within-limits'
      ? withinLimitOptions(missionId)
      : {
          wash: 'plan-wash-strong-40',
          dry: 'plan-dry-tumble-high',
          iron: 'plan-iron-high-with-adult',
        };

  return {
    missionId,
    garmentIds,
    stageOptions,
    acknowledgedRestrictionIds:
      scenario === 'within-limits' ? restrictionIdsForMission(missionId) : [],
    grouping: mission.requiresGrouping ? groupingForMission(missionId, scenario) : null,
  };
}

export { planningStages };
