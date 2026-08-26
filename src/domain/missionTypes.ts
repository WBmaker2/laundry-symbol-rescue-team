import type {
  CareOptionId,
  CareSymbolId,
  DamageRiskId,
  PlanningStage,
  RelativeLevel,
} from './careTypes';

export type MissionId =
  | 'basic-t-shirt'
  | 'soft-scarf'
  | 'sportswear'
  | 'decorated-top'
  | 'mixed-load';

export interface CareOption {
  id: CareOptionId;
  stage: PlanningStage;
  label: string;
  learningDescription: string;
  requiresAdult: boolean;
  waterUse: RelativeLevel;
  energyUse: RelativeLevel;
  riskIds: readonly DamageRiskId[];
}

export interface VirtualGarment {
  id: string;
  name: string;
  materialModel: string;
  materialBoundary: string;
  contaminationScenario: string;
  symbolIds: readonly CareSymbolId[];
  materialAllowedOptionIdsByStage: Readonly<Record<PlanningStage, readonly CareOptionId[]>>;
}

export interface GarmentMission {
  id: MissionId;
  order: 1 | 2 | 3 | 4 | 5;
  title: string;
  learningFocus: string;
  garments: readonly VirtualGarment[];
  requiresGrouping: boolean;
  openingPrompt: string;
}

export interface GroupingChoice {
  togetherGarmentIds: readonly string[];
  separateGarmentIds: readonly string[];
  reasonSymbolIds: readonly CareSymbolId[];
}

export interface StudentPlan {
  missionId: MissionId;
  garmentIds: readonly string[];
  stageOptions: Readonly<Record<PlanningStage, CareOptionId | null>>;
  acknowledgedRestrictionIds: readonly CareSymbolId[];
  grouping: GroupingChoice | null;
}

export type PlanFixtureScenario = 'empty' | 'within-limits' | 'outside-limits';
