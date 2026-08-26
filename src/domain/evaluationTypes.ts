import type {
  CareOptionId,
  CareSymbolId,
  DamageRiskId,
  PlanningStage,
  RelativeLevel,
} from './careTypes';

export interface InterpretationFeedback {
  symbolId: CareSymbolId;
  isCorrect: boolean;
  categoryHint: string;
  explanation: string;
  returnPrompt: string;
}

export type PlanFindingStatus =
  | 'allowed'
  | 'outside-limit'
  | 'missing-step'
  | 'unread-restriction';

export interface PlanFinding {
  status: PlanFindingStatus;
  stage: PlanningStage | 'restriction';
  garmentIds: readonly string[];
  optionId: CareOptionId | null;
  relatedSymbolIds: readonly CareSymbolId[];
  riskIds: readonly DamageRiskId[];
  feedback: string;
}

export interface PlanEvaluation {
  status: 'ready' | 'revise';
  findings: readonly PlanFinding[];
  combinedAllowedOptions: Readonly<Record<PlanningStage, readonly CareOptionId[]>>;
  waterUse: RelativeLevel;
  energyUse: RelativeLevel;
  safetyNotices: readonly string[];
}
