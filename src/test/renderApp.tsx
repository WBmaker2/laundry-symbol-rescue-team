import { render, type RenderResult } from '@testing-library/react';
import type { ReactElement } from 'react';
import { AppShell } from '../app/AppShell';
import { LearnerSessionProvider } from '../app/LearnerSessionProvider';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { evaluateGrouping } from '../domain/evaluateGrouping';
import { evaluatePlan } from '../domain/evaluatePlan';
import { evaluatePrediction } from '../domain/evaluatePrediction';
import {
  initialLearnerSession,
  sessionReducer,
  type LearnerSession,
  type SessionStep,
} from '../domain/sessionReducer';
import type { MissionId, StudentPlan } from '../domain/missionTypes';
import type { CareSymbolId } from '../domain/careTypes';
import { makePlanFixture } from './factories';

export interface RenderAppAtStepInput {
  missionId: MissionId;
  step: SessionStep;
  scenario?: 'within-limits' | 'outside-limits' | 'completed-revision';
}

const sessionSteps: readonly SessionStep[] = [
  'request', 'magnifier', 'plan', 'forecast', 'simulation', 'revision', 'report',
];
const planningStages = ['wash', 'dry', 'iron'] as const;

function fail(message: string): never {
  throw new Error(message);
}

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function canonicalGrouping(missionId: MissionId, plan: StudentPlan) {
  const mission = missionById.get(missionId);
  if (!mission?.requiresGrouping || plan.grouping === null) return null;
  return evaluateGrouping({ mission, grouping: plan.grouping, symbols: careSymbolById, options: careOptionById });
}

function advanceToPlan(missionId: MissionId): LearnerSession {
  const mission = missionById.get(missionId);
  if (!mission) fail('렌더할 미션 ID가 올바르지 않아요.');
  let state = sessionReducer(initialLearnerSession, { type: 'SELECT_MISSION', missionId });
  state = sessionReducer(state, { type: 'OPEN_MAGNIFIER' });
  const symbolIds = unique(mission.garments.flatMap(({ symbolIds: ids }) => ids));
  for (const symbolId of symbolIds) {
    const symbol = careSymbolById.get(symbolId);
    if (!symbol) fail('미션 표시 자료가 없어 렌더 선행 상태를 만들 수 없어요.');
    state = sessionReducer(state, {
      type: 'RECORD_INTERPRETATION',
      attempt: {
        symbolId,
        selectedMeaningOptionId: symbol.correctMeaningOptionId,
        isCorrect: true,
      },
    });
  }
  return state;
}

function advanceToMagnifier(missionId: MissionId): LearnerSession {
  if (!missionById.has(missionId)) fail('렌더할 미션 ID가 올바르지 않아요.');
  const selected = sessionReducer(initialLearnerSession, { type: 'SELECT_MISSION', missionId });
  return sessionReducer(selected, { type: 'OPEN_MAGNIFIER' });
}

function submitInitialPlan(
  state: LearnerSession,
  missionId: MissionId,
  scenario: 'within-limits' | 'outside-limits',
): { state: LearnerSession; plan: StudentPlan } {
  const mission = missionById.get(missionId);
  if (!mission) fail('렌더할 미션 ID가 올바르지 않아요.');
  const plan = makePlanFixture(missionId, scenario);
  const evaluation = evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById });
  const groupingEvaluation = canonicalGrouping(missionId, plan);
  return {
    state: sessionReducer(state, {
      type: 'SUBMIT_INITIAL_PLAN', plan, evaluation, groupingEvaluation,
    }),
    plan,
  };
}

function submitPrediction(state: LearnerSession, missionId: MissionId): LearnerSession {
  const mission = missionById.get(missionId);
  if (!mission || !state.initialEvaluation) fail('초기 평가가 없어 예측 선행 상태를 만들 수 없어요.');
  const risks = unique(
    state.initialEvaluation.findings
      .filter(({ status }) => status === 'outside-limit' || status === 'missing-step' || status === 'unread-restriction')
      .flatMap(({ riskIds }) => riskIds),
  );
  const reasons = unique(
    state.initialEvaluation.findings
      .filter(({ status }) => status === 'outside-limit' || status === 'missing-step' || status === 'unread-restriction')
      .flatMap(({ relatedSymbolIds }) => relatedSymbolIds),
  );
  const firstSymbol = mission.garments[0]?.symbolIds[0];
  if (!firstSymbol) fail('예측 근거 표시가 없어 렌더 선행 상태를 만들 수 없어요.');
  const selection = {
    riskIds: risks.length > 0 ? risks : ['shrinkage' as const],
    reasonSymbolIds: reasons.length > 0 ? reasons : [firstSymbol],
  };
  const feedback = evaluatePrediction({ evaluation: state.initialEvaluation, selection });
  return sessionReducer(state, { type: 'SUBMIT_PREDICTION', selection, feedback });
}

function changedStagesBetween(initialPlan: StudentPlan, revisedPlan: StudentPlan) {
  return planningStages.filter((stage) => initialPlan.stageOptions[stage] !== revisedPlan.stageOptions[stage]);
}

function groupingChanged(initialPlan: StudentPlan, revisedPlan: StudentPlan): boolean {
  if (initialPlan.grouping === null || revisedPlan.grouping === null) return initialPlan.grouping !== revisedPlan.grouping;
  return initialPlan.grouping.togetherGarmentIds.join('|') !== revisedPlan.grouping.togetherGarmentIds.join('|')
    || initialPlan.grouping.separateGarmentIds.join('|') !== revisedPlan.grouping.separateGarmentIds.join('|')
    || initialPlan.grouping.reasonSymbolIds.join('|') !== revisedPlan.grouping.reasonSymbolIds.join('|');
}

function nonAllowedEvidence(state: LearnerSession): readonly CareSymbolId[] {
  const planIds = state.initialEvaluation?.findings
    .filter(({ status }) => status !== 'allowed')
    .flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
  const groupingIds = state.initialGroupingEvaluation?.findings
    .filter(({ code }) => code !== 'compatible-group')
    .flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
  return unique([...planIds, ...groupingIds]);
}

export function buildLearnerSessionAtStep(input: RenderAppAtStepInput): LearnerSession {
  if (!input || typeof input !== 'object' || !missionById.has(input.missionId)) {
    fail('렌더할 미션 ID가 올바르지 않아요.');
  }
  if (!sessionSteps.includes(input.step)) fail('렌더할 학습 단계가 올바르지 않아요.');
  const scenario = input.scenario ?? 'within-limits';
  if (!['within-limits', 'outside-limits', 'completed-revision'].includes(scenario)) {
    fail('렌더 시나리오가 올바르지 않아요.');
  }
  if (scenario === 'completed-revision' && input.step !== 'report') {
    fail('completed-revision 시나리오는 report 단계에서만 사용할 수 있어요.');
  }

  const initialScenario = scenario === 'within-limits' ? 'within-limits' : 'outside-limits';
  let state = sessionReducer(initialLearnerSession, { type: 'SELECT_MISSION', missionId: input.missionId });
  if (input.step === 'request') return state;
  state = advanceToMagnifier(input.missionId);
  if (input.step === 'magnifier') return state;

  state = advanceToPlan(input.missionId);

  const submitted = submitInitialPlan(state, input.missionId, initialScenario);
  state = submitted.state;
  if (input.step === 'plan') {
    // The reducer owns the plan transition, so restore the canonical predecessor for the plan screen.
    state = advanceToPlan(input.missionId);
    return state;
  }
  state = submitPrediction(state, input.missionId);
  if (input.step === 'forecast') return state;
  state = sessionReducer(state, { type: 'SHOW_SIMULATION' });
  if (input.step === 'simulation') return state;
  state = sessionReducer(state, { type: 'START_REVISION' });
  if (input.step === 'revision') return state;

  const mission = missionById.get(input.missionId);
  if (!mission || !state.initialEvaluation) fail('report 선행 자료가 올바르지 않아요.');
  const initialPlan = submitted.plan;
  const revisedPlan = scenario === 'within-limits' ? initialPlan : makePlanFixture(input.missionId, 'within-limits');
  const revisedEvaluation = evaluatePlan({ mission, plan: revisedPlan, symbols: careSymbolById, options: careOptionById });
  const revisedGroupingEvaluation = canonicalGrouping(input.missionId, revisedPlan);
  const relatedSymbolIds = nonAllowedEvidence(state);
  const fallbackSymbolId = mission.garments[0]?.symbolIds[0];
  if (!fallbackSymbolId) fail('report 근거 표시가 없어 렌더할 수 없어요.');
  const revisedGroupingChanged = groupingChanged(initialPlan, revisedPlan);
  const changedStages = changedStagesBetween(initialPlan, revisedPlan);
  let evidence;
  if (scenario === 'within-limits') {
    evidence = { reasonId: 'confirm-current-plan' as const, relatedSymbolIds: [fallbackSymbolId], changedStages: [] as const };
  } else {
    if (relatedSymbolIds.length === 0) fail('report 근거 표시가 없어 렌더할 수 없어요.');
    evidence = {
      reasonId: revisedGroupingChanged ? 'separate-incompatible-garment' as const : 'follow-label-limit' as const,
      relatedSymbolIds,
      changedStages,
    };
  }
  if (input.missionId === 'mixed-load' && revisedGroupingChanged && !evidence.relatedSymbolIds.includes('care-professional')) {
    fail('혼합 미션의 분리 근거 표시가 canonical 평가에 없어요.');
  }
  state = sessionReducer(state, {
    type: 'SUBMIT_REVISION',
    plan: revisedPlan,
    evaluation: revisedEvaluation,
    groupingEvaluation: revisedGroupingEvaluation,
    evidence,
  });
  return state;
}

export function renderAppAtStep(input: RenderAppAtStepInput): RenderResult {
  return renderWithState(buildLearnerSessionAtStep(input));
}

function renderWithState(state: LearnerSession): RenderResult {
  const element: ReactElement = (
    <LearnerSessionProvider initialState={state}>
      <AppShell />
    </LearnerSessionProvider>
  );
  return render(element);
}
