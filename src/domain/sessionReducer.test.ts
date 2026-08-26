import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { evaluatePlan } from './evaluatePlan';
import { evaluatePrediction, type PredictionFeedback, type PredictionSelection } from './evaluatePrediction';
import { makePlanFixture } from '../test/factories';
import type { MissionId, StudentPlan } from './missionTypes';
import {
  initialLearnerSession,
  sessionReducer,
  type LearnerSession,
  type RevisionEvidence,
} from './sessionReducer';

function missionSymbols(missionId: MissionId) {
  const mission = missionById.get(missionId);
  if (mission === undefined) throw new Error('fixture mission is missing');
  return [...new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds))];
}

function openMission(missionId: MissionId = 'basic-t-shirt') {
  return sessionReducer(
    sessionReducer(initialLearnerSession, { type: 'SELECT_MISSION', missionId }),
    { type: 'OPEN_MAGNIFIER' },
  );
}

function interpretAll(session: LearnerSession) {
  return missionSymbols(session.missionId ?? 'basic-t-shirt').reduce((current, symbolId) => {
    const symbol = careSymbolById.get(symbolId);
    if (symbol === undefined) throw new Error('fixture symbol is missing');
    return sessionReducer(current, {
      type: 'RECORD_INTERPRETATION',
      attempt: {
        symbolId,
        selectedMeaningOptionId: symbol.correctMeaningOptionId,
        isCorrect: true,
      },
    });
  }, session);
}

function evaluationFor(missionId: MissionId, plan: StudentPlan) {
  const mission = missionById.get(missionId);
  if (mission === undefined) throw new Error('fixture mission is missing');
  return evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById });
}

function predictionFor(evaluation: ReturnType<typeof evaluationFor>): {
  selection: PredictionSelection;
  feedback: PredictionFeedback;
} {
  const finding = evaluation.findings.find(({ status }) => status !== 'allowed');
  if (finding === undefined || finding.riskIds[0] === undefined || finding.relatedSymbolIds[0] === undefined) {
    throw new Error('fixture needs prediction evidence');
  }
  const selection = {
    riskIds: [finding.riskIds[0]],
    reasonSymbolIds: [finding.relatedSymbolIds[0]],
  } as PredictionSelection;
  return { selection, feedback: evaluatePrediction({ evaluation, selection }) };
}

function reduceToPlan(missionId: MissionId, plan: StudentPlan) {
  const interpreted = interpretAll(openMission(missionId));
  expect(interpreted.step).toBe('plan');
  return sessionReducer(interpreted, {
    type: 'SUBMIT_INITIAL_PLAN',
    plan,
    evaluation: evaluationFor(missionId, plan),
  });
}

function reduceCompleteRevisionScenario() {
  const initialPlan = makePlanFixture('basic-t-shirt', 'outside-limits');
  const revisedPlan = makePlanFixture('basic-t-shirt', 'within-limits');
  const forecast = reduceToPlan('basic-t-shirt', initialPlan);
  const prediction = predictionFor(forecast.initialEvaluation!);
  const withPrediction = sessionReducer(forecast, {
    type: 'SUBMIT_PREDICTION',
    selection: prediction.selection,
    feedback: prediction.feedback,
  });
  const simulation = sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' });
  const revision = sessionReducer(simulation, { type: 'START_REVISION' });
  const evidence: RevisionEvidence = {
    reasonId: 'follow-label-limit',
    relatedSymbolIds: [missionSymbols('basic-t-shirt')[0]!],
    changedStages: ['wash', 'dry', 'iron'],
  };
  return sessionReducer(revision, {
    type: 'SUBMIT_REVISION',
    plan: revisedPlan,
    evaluation: evaluationFor('basic-t-shirt', revisedPlan),
    evidence,
  });
}

describe('sessionReducer', () => {
  it('starts at request and selects a mission without persistence', () => {
    expect(initialLearnerSession).toMatchObject({ missionId: null, step: 'request' });
    const selected = sessionReducer(initialLearnerSession, {
      type: 'SELECT_MISSION',
      missionId: 'basic-t-shirt',
    });
    expect(selected).toMatchObject({ missionId: 'basic-t-shirt', step: 'request' });
    expect(selected.interpretations).toEqual([]);
  });

  it('does not enter planning before every mission symbol has an interpretation', () => {
    const opened = openMission();
    expect(opened.step).toBe('magnifier');
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN',
      plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      evaluation: evaluationFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'within-limits')),
    })).toThrow('모든 표시 해석을 먼저 완료하세요.');
  });

  it('moves to plan only after every unique mission symbol has a correct attempt', () => {
    const opened = openMission();
    const symbolId = missionSymbols('basic-t-shirt')[0]!;
    const symbol = careSymbolById.get(symbolId)!;
    const partial = sessionReducer(opened, {
      type: 'RECORD_INTERPRETATION',
      attempt: { symbolId, selectedMeaningOptionId: symbol.correctMeaningOptionId, isCorrect: true },
    });
    expect(partial.step).toBe('magnifier');
    const withRetry = sessionReducer(partial, {
      type: 'RECORD_INTERPRETATION',
      attempt: { symbolId, selectedMeaningOptionId: 'wrong-meaning', isCorrect: false },
    });
    expect(withRetry.interpretations).toHaveLength(2);
    expect(withRetry.step).toBe('magnifier');
    expect(interpretAll(opened).step).toBe('plan');
  });

  it('rejects wrong-stage actions and malformed interpretation payloads in Korean', () => {
    expect(() => sessionReducer(initialLearnerSession, { type: 'OPEN_MAGNIFIER' })).toThrow(/단계|미션/);
    const opened = openMission();
    expect(() => sessionReducer(opened, {
      type: 'RECORD_INTERPRETATION',
      attempt: { symbolId: 'unknown-symbol' as never, selectedMeaningOptionId: 'x', isCorrect: true },
    })).toThrow(/표시|미션/);
    expect(() => sessionReducer(opened, {
      type: 'RECORD_INTERPRETATION',
      attempt: { symbolId: 'care-wash-30-gentle', selectedMeaningOptionId: 'x', isCorrect: 'true' as never },
    })).toThrow(/해석|올바르/);
  });

  it('requires an exact current-mission garment list in plans', () => {
    const opened = interpretAll(openMission());
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN',
      plan: { ...plan, garmentIds: ['not-the-mission-garment'] },
      evaluation: evaluationFor('basic-t-shirt', plan),
    })).toThrow(/의류|미션/);
  });

  it('requires valid non-empty risk and reason selections with matching feedback', () => {
    const initialPlan = makePlanFixture('basic-t-shirt', 'outside-limits');
    const forecast = reduceToPlan('basic-t-shirt', initialPlan);
    const prediction = predictionFor(forecast.initialEvaluation!);
    expect(() => sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION',
      selection: { riskIds: [], reasonSymbolIds: prediction.selection.reasonSymbolIds },
      feedback: prediction.feedback,
    })).toThrow(/위험|근거|선택/);
    expect(() => sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION',
      selection: prediction.selection,
      feedback: { ...prediction.feedback, selectionIsValid: false },
    })).toThrow(/선택|피드백/);
    expect(() => sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION',
      selection: prediction.selection,
      feedback: { ...prediction.feedback, supportedRiskIds: [] },
    })).toThrow(/분류|피드백/);
  });

  it('allows the full forecast, simulation, and revision sequence', () => {
    const complete = reduceCompleteRevisionScenario();
    expect(complete.step).toBe('report');
    expect(complete.initialPlan).not.toEqual(complete.revisedPlan);
    expect(complete.initialEvaluation?.status).toBe('revise');
    expect(complete.revisedEvaluation?.status).toBe('ready');
    expect(complete.revisionEvidence?.changedStages).toEqual(['wash', 'dry', 'iron']);
  });

  it('keeps a ready initial plan unchanged only with confirm-current-plan', () => {
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const forecast = reduceToPlan('basic-t-shirt', plan);
    const prediction = predictionFor({
      ...forecast.initialEvaluation!,
      status: 'revise',
      findings: [{
        status: 'outside-limit', stage: 'dry', garmentIds: ['basic-t-shirt'], optionId: 'plan-dry-tumble-high',
        relatedSymbolIds: ['care-tumble-low'], riskIds: ['heat-damage'], feedback: '가능성이 있어요.',
      }],
    });
    const withPrediction = sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION', selection: prediction.selection, feedback: prediction.feedback,
    });
    const revision = sessionReducer(
      sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' }),
      { type: 'START_REVISION' },
    );
    const complete = sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan, evaluation: evaluationFor('basic-t-shirt', plan), evidence: {
        reasonId: 'confirm-current-plan', relatedSymbolIds: ['care-tumble-low'], changedStages: [],
      },
    });
    expect(complete.step).toBe('report');
  });

  it('rejects a no-op revise, wrong changed stages, and unrelated evidence', () => {
    const initialPlan = makePlanFixture('basic-t-shirt', 'outside-limits');
    const forecast = reduceToPlan('basic-t-shirt', initialPlan);
    const prediction = predictionFor(forecast.initialEvaluation!);
    const revision = sessionReducer(
      sessionReducer(
        sessionReducer(forecast, { type: 'SUBMIT_PREDICTION', ...prediction }),
        { type: 'SHOW_SIMULATION' },
      ),
      { type: 'START_REVISION' },
    );
    expect(() => sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: initialPlan, evaluation: forecast.initialEvaluation!, evidence: {
        reasonId: 'follow-label-limit', relatedSymbolIds: ['care-wash-30-gentle'], changedStages: [],
      },
    })).toThrow(/변경|수정/);
    const revisedPlan = makePlanFixture('basic-t-shirt', 'within-limits');
    expect(() => sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: evaluationFor('basic-t-shirt', revisedPlan), evidence: {
        reasonId: 'follow-label-limit', relatedSymbolIds: ['care-professional'], changedStages: ['dry'],
      },
    })).toThrow(/단계|근거|표시/);
  });

  it('restarts from every stage and clears all learner data', () => {
    const complete = reduceCompleteRevisionScenario();
    expect(sessionReducer(complete, { type: 'RESTART_MISSION' })).toEqual(initialLearnerSession);
  });

  it('does not mutate the input state or submitted plans', () => {
    const opened = interpretAll(openMission());
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const before = structuredClone(opened);
    const submitted = structuredClone(plan);
    const next = sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: evaluationFor('basic-t-shirt', plan),
    });
    expect(opened).toEqual(before);
    expect(plan).toEqual(submitted);
    expect(next.initialPlan).not.toBe(plan);
  });
});
