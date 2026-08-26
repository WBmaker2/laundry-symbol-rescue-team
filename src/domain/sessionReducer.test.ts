import { describe, expect, it } from 'vitest';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { evaluatePlan } from './evaluatePlan';
import { evaluatePrediction, type PredictionFeedback, type PredictionSelection } from './evaluatePrediction';
import { evaluateGrouping, type GroupingEvaluation } from './evaluateGrouping';
import { makePlanFixture } from '../test/factories';
import type { MissionId, StudentPlan } from './missionTypes';
import type { CareOptionId, DamageRiskId, PlanningStage } from './careTypes';
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

function groupingEvaluationFor(missionId: MissionId, plan: StudentPlan): GroupingEvaluation | null {
  const mission = missionById.get(missionId);
  if (mission === undefined) throw new Error('fixture mission is missing');
  if (!mission.requiresGrouping || plan.grouping === null) return null;
  return evaluateGrouping({ mission, grouping: plan.grouping, symbols: careSymbolById, options: careOptionById });
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
    groupingEvaluation: groupingEvaluationFor(missionId, plan),
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
    groupingEvaluation: groupingEvaluationFor('basic-t-shirt', revisedPlan),
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
      groupingEvaluation: null,
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
      groupingEvaluation: null,
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
    const selection = { riskIds: ['heat-damage'] as const, reasonSymbolIds: ['care-tumble-low'] as const };
    const prediction = { selection, feedback: evaluatePrediction({ evaluation: forecast.initialEvaluation!, selection }) };
    const withPrediction = sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION', selection: prediction.selection, feedback: prediction.feedback,
    });
    const revision = sessionReducer(
      sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' }),
      { type: 'START_REVISION' },
    );
    const complete = sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan, evaluation: evaluationFor('basic-t-shirt', plan), groupingEvaluation: null, evidence: {
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
      type: 'SUBMIT_REVISION', plan: initialPlan, evaluation: forecast.initialEvaluation!, groupingEvaluation: null, evidence: {
        reasonId: 'follow-label-limit', relatedSymbolIds: ['care-wash-30-gentle'], changedStages: [],
      },
    })).toThrow(/변경|수정/);
    const revisedPlan = makePlanFixture('basic-t-shirt', 'within-limits');
    expect(() => sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: evaluationFor('basic-t-shirt', revisedPlan), groupingEvaluation: null, evidence: {
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
      type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: evaluationFor('basic-t-shirt', plan), groupingEvaluation: null,
    });
    expect(opened).toEqual(before);
    expect(plan).toEqual(submitted);
    expect(next.initialPlan).not.toBe(plan);
  });

  it('rejects a forged or mismatched canonical plan evaluation', () => {
    const opened = interpretAll(openMission());
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const canonical = evaluationFor('basic-t-shirt', plan);
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: { ...canonical, status: 'revise' }, groupingEvaluation: null,
    })).toThrow(/평가|일치/);
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: evaluationFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'outside-limits')), groupingEvaluation: null,
    })).toThrow(/평가|일치/);
  });

  it('rejects forged prediction feedback instead of trusting matching-shaped fields', () => {
    const plan = makePlanFixture('basic-t-shirt', 'outside-limits');
    const forecast = reduceToPlan('basic-t-shirt', plan);
    const prediction = predictionFor(forecast.initialEvaluation!);
    expect(() => sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION', selection: prediction.selection,
      feedback: { ...prediction.feedback, message: '조작된 피드백' },
    })).toThrow(/예측|일치/);
  });

  it('rejects sparse plan, evaluation, prediction, and revision arrays', () => {
    const opened = interpretAll(openMission());
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const sparseGarments = new Array(1) as string[];
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan: { ...plan, garmentIds: sparseGarments }, evaluation: evaluationFor('basic-t-shirt', plan), groupingEvaluation: null,
    })).toThrow(/목록|의류/);
    const sparseEvaluation = { ...evaluationFor('basic-t-shirt', plan), findings: Object.assign(new Array(1), { 0: evaluationFor('basic-t-shirt', plan).findings[0] }) };
    delete (sparseEvaluation.findings as unknown[])[0];
    expect(() => sessionReducer(opened, { type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: sparseEvaluation, groupingEvaluation: null })).toThrow(/평가/);
    const sparseOptions = new Array(1) as CareOptionId[];
    const sparseCombined = { ...evaluationFor('basic-t-shirt', plan), combinedAllowedOptions: { ...evaluationFor('basic-t-shirt', plan).combinedAllowedOptions, wash: sparseOptions } };
    expect(() => sessionReducer(opened, { type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: sparseCombined, groupingEvaluation: null })).toThrow(/선택|평가/);
    const forecast = reduceToPlan('basic-t-shirt', makePlanFixture('basic-t-shirt', 'outside-limits'));
    const prediction = predictionFor(forecast.initialEvaluation!);
    const sparseRisks = new Array(1) as DamageRiskId[];
    expect(() => sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION', selection: { ...prediction.selection, riskIds: sparseRisks }, feedback: prediction.feedback,
    })).toThrow(/위험|예측/);
    const withPrediction = sessionReducer(forecast, { type: 'SUBMIT_PREDICTION', selection: prediction.selection, feedback: prediction.feedback });
    const revision = sessionReducer(sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' }), { type: 'START_REVISION' });
    const sparseStages = new Array(1) as PlanningStage[];
    expect(() => sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: makePlanFixture('basic-t-shirt', 'within-limits'),
      evaluation: evaluationFor('basic-t-shirt', makePlanFixture('basic-t-shirt', 'within-limits')), groupingEvaluation: null,
      evidence: { reasonId: 'follow-label-limit', relatedSymbolIds: ['care-wash-30-gentle'], changedStages: sparseStages },
    })).toThrow(/단계|근거/);
    const mixedPlan = makePlanFixture('mixed-load', 'within-limits');
    const mixedOpened = interpretAll(openMission('mixed-load'));
    const sparseTogether = new Array(2) as string[];
    expect(() => sessionReducer(mixedOpened, {
      type: 'SUBMIT_INITIAL_PLAN', plan: { ...mixedPlan, grouping: { ...mixedPlan.grouping!, togetherGarmentIds: sparseTogether } },
      evaluation: evaluationFor('mixed-load', mixedPlan), groupingEvaluation: groupingEvaluationFor('mixed-load', mixedPlan),
    } as never)).toThrow(/옷|묶음|목록/);
  });

  it('requires own resource fields in an evaluation', () => {
    const opened = interpretAll(openMission());
    const plan = makePlanFixture('basic-t-shirt', 'within-limits');
    const evaluation = evaluationFor('basic-t-shirt', plan);
    const missingWater = { ...evaluation } as Record<string, unknown>;
    delete missingWater.waterUse;
    expect(() => sessionReducer(opened, { type: 'SUBMIT_INITIAL_PLAN', plan, evaluation: missingWater as never, groupingEvaluation: null })).toThrow(/자원|평가/);
  });

  it('canonicalizes mixed-load grouping and allows a real grouping revision after plan-ready grouping-revise', () => {
    const initialPlan = makePlanFixture('mixed-load', 'outside-limits');
    const revisedPlan = makePlanFixture('mixed-load', 'within-limits');
    const opened = interpretAll(openMission('mixed-load'));
    const forgedGrouping = groupingEvaluationFor('mixed-load', initialPlan)!;
    expect(() => sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan: initialPlan, evaluation: evaluationFor('mixed-load', initialPlan),
      groupingEvaluation: { ...forgedGrouping, status: 'ready' },
    } as never)).toThrow(/묶음|평가|일치/);
    const forecast = sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan: initialPlan, evaluation: evaluationFor('mixed-load', initialPlan),
      groupingEvaluation: forgedGrouping,
    } as never);
    const prediction = predictionFor(forecast.initialEvaluation!);
    const withPrediction = sessionReducer(forecast, { type: 'SUBMIT_PREDICTION', selection: prediction.selection, feedback: prediction.feedback });
    const revision = sessionReducer(sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' }), { type: 'START_REVISION' });
    expect(() => sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: evaluationFor('mixed-load', revisedPlan),
      groupingEvaluation: { ...groupingEvaluationFor('mixed-load', revisedPlan)!, status: 'revise' },
      evidence: { reasonId: 'separate-incompatible-garment', relatedSymbolIds: ['care-professional'], changedStages: ['wash', 'dry', 'iron'] },
    })).toThrow(/묶음|일치/);
    const complete = sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: evaluationFor('mixed-load', revisedPlan),
      groupingEvaluation: groupingEvaluationFor('mixed-load', revisedPlan),
      evidence: { reasonId: 'separate-incompatible-garment', relatedSymbolIds: ['care-professional'], changedStages: ['wash', 'dry', 'iron'] },
    } as never);
    expect(complete.step).toBe('report');
    expect(complete.initialGroupingEvaluation?.status).toBe('revise');
    expect(complete.revisedGroupingEvaluation?.status).toBe('ready');
  });

  it('permits a grouping-only revision when the initial plan is ready but grouping needs a reason', () => {
    const base = makePlanFixture('mixed-load', 'within-limits');
    const garments = missionById.get('mixed-load')!.garments.map(({ id }) => id);
    const initialPlan = {
      ...base,
      grouping: { togetherGarmentIds: [garments[0]!, garments[1]!], separateGarmentIds: [garments[2]!], reasonSymbolIds: [] },
    };
    const revisedPlan = base;
    const opened = interpretAll(openMission('mixed-load'));
    const initialEvaluation = evaluationFor('mixed-load', initialPlan);
    const initialGroupingEvaluation = groupingEvaluationFor('mixed-load', initialPlan);
    expect(initialEvaluation.status).toBe('ready');
    expect(initialGroupingEvaluation?.status).toBe('revise');
    const forecast = sessionReducer(opened, {
      type: 'SUBMIT_INITIAL_PLAN', plan: initialPlan, evaluation: initialEvaluation, groupingEvaluation: initialGroupingEvaluation,
    });
    const selection = { riskIds: ['heat-damage'] as const, reasonSymbolIds: ['care-professional'] as const };
    const withPrediction = sessionReducer(forecast, {
      type: 'SUBMIT_PREDICTION', selection, feedback: evaluatePrediction({ evaluation: initialEvaluation, selection }),
    });
    const revision = sessionReducer(sessionReducer(withPrediction, { type: 'SHOW_SIMULATION' }), { type: 'START_REVISION' });
    const complete = sessionReducer(revision, {
      type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: evaluationFor('mixed-load', revisedPlan),
      groupingEvaluation: groupingEvaluationFor('mixed-load', revisedPlan),
      evidence: { reasonId: 'separate-incompatible-garment', relatedSymbolIds: ['care-professional'], changedStages: [] },
    });
    expect(complete.step).toBe('report');
  });
});
