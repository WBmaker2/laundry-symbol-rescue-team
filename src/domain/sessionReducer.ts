import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { evaluatePlan } from './evaluatePlan';
import { evaluateGrouping, type GroupingEvaluation } from './evaluateGrouping';
import { evaluatePrediction } from './evaluatePrediction';
import type { CareSymbolId, CareOptionId, PlanningStage, DamageRiskId } from './careTypes';
import type { PlanEvaluation, PlanFinding, PlanFindingStatus } from './evaluationTypes';
import type { MissionId, StudentPlan, GroupingChoice } from './missionTypes';
import type { PredictionFeedback, PredictionSelection } from './evaluatePrediction';

export type SessionStep = 'request' | 'magnifier' | 'plan' | 'forecast' | 'simulation' | 'revision' | 'report';

export interface SymbolInterpretationAttempt {
  symbolId: CareSymbolId;
  selectedMeaningOptionId: string;
  isCorrect: boolean;
}

export type RevisionReasonId =
  | 'follow-label-limit'
  | 'protect-material-or-decoration'
  | 'separate-incompatible-garment'
  | 'ask-adult-or-professional'
  | 'reduce-relative-resource-use'
  | 'confirm-current-plan';

export interface RevisionEvidence {
  reasonId: RevisionReasonId;
  relatedSymbolIds: readonly CareSymbolId[];
  changedStages: readonly PlanningStage[];
}

export interface LearnerSession {
  missionId: MissionId | null;
  step: SessionStep;
  interpretations: readonly SymbolInterpretationAttempt[];
  initialPlan: StudentPlan | null;
  initialEvaluation: PlanEvaluation | null;
  initialGroupingEvaluation: GroupingEvaluation | null;
  prediction: PredictionSelection | null;
  predictionFeedback: PredictionFeedback | null;
  revisedPlan: StudentPlan | null;
  revisedEvaluation: PlanEvaluation | null;
  revisedGroupingEvaluation: GroupingEvaluation | null;
  revisionEvidence: RevisionEvidence | null;
}

export type SessionAction =
  | { type: 'SELECT_MISSION'; missionId: MissionId }
  | { type: 'OPEN_MAGNIFIER' }
  | { type: 'RECORD_INTERPRETATION'; attempt: SymbolInterpretationAttempt }
  | { type: 'SUBMIT_INITIAL_PLAN'; plan: StudentPlan; evaluation: PlanEvaluation; groupingEvaluation: GroupingEvaluation | null }
  | { type: 'SUBMIT_PREDICTION'; selection: PredictionSelection; feedback: PredictionFeedback }
  | { type: 'SHOW_SIMULATION' }
  | { type: 'START_REVISION' }
  | { type: 'SUBMIT_REVISION'; plan: StudentPlan; evaluation: PlanEvaluation; groupingEvaluation: GroupingEvaluation | null; evidence: RevisionEvidence }
  | { type: 'RESTART_MISSION' };

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const riskIds: readonly DamageRiskId[] = ['shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage'];
const reasonIds: readonly RevisionReasonId[] = [
  'follow-label-limit', 'protect-material-or-decoration', 'separate-incompatible-garment',
  'ask-adult-or-professional', 'reduce-relative-resource-use', 'confirm-current-plan',
];
const findingStatuses: readonly PlanFindingStatus[] = ['allowed', 'outside-limit', 'missing-step', 'unread-restriction', 'invalid-input'];
const relativeLevels = ['lower', 'medium', 'higher'] as const;

function emptySession(): LearnerSession {
  return {
    missionId: null, step: 'request', interpretations: [], initialPlan: null, initialEvaluation: null,
    initialGroupingEvaluation: null, prediction: null, predictionFeedback: null, revisedPlan: null, revisedEvaluation: null,
    revisedGroupingEvaluation: null, revisionEvidence: null,
  };
}

export const initialLearnerSession: LearnerSession = emptySession();

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isDenseArray(value: unknown): value is readonly unknown[] {
  if (!Array.isArray(value)) return false;
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(value, index)) return false;
  }
  return true;
}

function fail(message: string): never {
  throw new Error(message);
}

function requireStage(state: LearnerSession, expected: SessionStep): void {
  if (state.step !== expected) fail(`지금은 ${expected} 단계에서 할 수 없는 행동이에요.`);
}

function missionFor(missionId: unknown) {
  if (typeof missionId !== 'string' || !missionById.has(missionId as MissionId)) fail('미션 ID가 올바르지 않아요.');
  return missionById.get(missionId as MissionId)!;
}

function symbolIdsFor(missionId: MissionId): readonly CareSymbolId[] {
  const mission = missionFor(missionId);
  return [...new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds))];
}

function exactStringList(value: unknown, label: string): readonly string[] {
  if (!isDenseArray(value) || value.some((item) => typeof item !== 'string' || item.trim() === '')) {
    fail(`${label} 목록이 올바르지 않아요.`);
  }
  return value as readonly string[];
}

function exactKnownList<T extends string>(value: unknown, known: readonly T[], label: string): readonly T[] {
  const list = exactStringList(value, label);
  if (list.some((item) => !known.includes(item as T))) fail(`${label}에 알 수 없는 항목이 있어요.`);
  return list as readonly T[];
}

function structurallyEqual(left: unknown, right: unknown, seen = new WeakMap<object, WeakSet<object>>()): boolean {
  if (Object.is(left, right)) return true;
  if (typeof left !== 'object' || left === null || typeof right !== 'object' || right === null) return false;
  const prior = seen.get(left);
  if (prior?.has(right)) return true;
  if (prior) prior.add(right); else seen.set(left, new WeakSet([right]));
  if (Array.isArray(left) || Array.isArray(right)) {
    if (!Array.isArray(left) || !Array.isArray(right) || !isDenseArray(left) || !isDenseArray(right) || left.length !== right.length) return false;
    const leftKeys = Object.keys(left);
    const rightKeys = Object.keys(right);
    if (leftKeys.length !== left.length || rightKeys.length !== right.length) return false;
    return left.every((item, index) => structurallyEqual(item, right[index], seen));
  }
  const leftKeys = Object.keys(left as object).sort();
  const rightKeys = Object.keys(right as object).sort();
  if (leftKeys.length !== rightKeys.length || leftKeys.some((key, index) => key !== rightKeys[index])) return false;
  return leftKeys.every((key) => structurallyEqual((left as Record<string, unknown>)[key], (right as Record<string, unknown>)[key], seen));
}

function validatePlan(value: unknown, missionId: MissionId): StudentPlan {
  const mission = missionFor(missionId);
  if (!isRecord(value) || value.missionId !== missionId) fail('계획과 현재 미션의 ID가 서로 달라요.');
  const garmentIds = exactStringList(value.garmentIds, '계획 의류');
  const expectedGarmentIds = mission.garments.map(({ id }) => id);
  if (garmentIds.length !== expectedGarmentIds.length || new Set(garmentIds).size !== garmentIds.length
    || garmentIds.some((id) => !expectedGarmentIds.includes(id))) {
    fail('계획의 의류가 현재 미션의 의류와 정확히 일치하지 않아요.');
  }
  if (!isRecord(value.stageOptions)) fail('계획의 단계 선택이 올바르지 않아요.');
  for (const key of Object.keys(value.stageOptions)) if (!stages.includes(key as PlanningStage)) fail('계획에 알 수 없는 단계가 있어요.');
  const stageOptions = {} as Record<PlanningStage, CareOptionId | null>;
  for (const stage of stages) {
    if (!Object.prototype.hasOwnProperty.call(value.stageOptions, stage)) fail(`${stage} 단계 선택이 계획에 없어요.`);
    const optionId = value.stageOptions[stage];
    if (optionId !== null && (typeof optionId !== 'string' || !careOptionById.has(optionId as CareOptionId)
      || careOptionById.get(optionId as CareOptionId)?.stage !== stage)) fail(`${stage} 단계 선택이 올바르지 않아요.`);
    stageOptions[stage] = optionId as CareOptionId | null;
  }
  const missionSymbolIds = symbolIdsFor(missionId);
  const acknowledged = exactKnownList(value.acknowledgedRestrictionIds, missionSymbolIds, '확인 표시');
  if (new Set(acknowledged).size !== acknowledged.length) fail('확인 표시를 중복해서 적을 수 없어요.');
  let grouping: GroupingChoice | null = null;
  if (mission.requiresGrouping) {
    if (!isRecord(value.grouping)) fail('혼합 미션의 옷 묶음이 필요해요.');
    const together = exactStringList(value.grouping.togetherGarmentIds, '함께 둘 옷');
    const separate = exactStringList(value.grouping.separateGarmentIds, '따로 둘 옷');
    const reasons = exactKnownList(value.grouping.reasonSymbolIds, missionSymbolIds, '묶음 근거 표시');
    const members = [...together, ...separate];
    if (members.length !== expectedGarmentIds.length || new Set(members).size !== members.length
      || members.some((id) => !expectedGarmentIds.includes(id))) fail('옷 묶음이 현재 미션의 의류와 정확히 일치하지 않아요.');
    if (new Set(reasons).size !== reasons.length) fail('묶음 근거 표시를 중복해서 적을 수 없어요.');
    grouping = { togetherGarmentIds: [...together], separateGarmentIds: [...separate], reasonSymbolIds: [...reasons] };
  } else if (value.grouping !== null) {
    fail('이 미션에는 옷 묶음 선택이 없어요.');
  }
  return {
    missionId,
    garmentIds: [...garmentIds],
    stageOptions,
    acknowledgedRestrictionIds: [...acknowledged],
    grouping,
  };
}

function cloneFinding(value: unknown, missionId: MissionId): PlanFinding {
  if (!isRecord(value) || !findingStatuses.includes(value.status as PlanFindingStatus)
    || (value.stage !== 'restriction' && !stages.includes(value.stage as PlanningStage))) fail('계획 평가의 발견 항목이 올바르지 않아요.');
  const garments = exactStringList(value.garmentIds, '평가 의류');
  const missionGarmentIds = missionFor(missionId).garments.map(({ id }) => id);
  if (garments.some((garmentId) => !missionGarmentIds.includes(garmentId))) fail('계획 평가에 현재 미션 밖의 의류가 있어요.');
  const optionId = value.optionId === null ? null : value.optionId;
  if (optionId !== null && (typeof optionId !== 'string' || !careOptionById.has(optionId as CareOptionId))) fail('계획 평가의 선택 ID가 올바르지 않아요.');
  if ((value.stage === 'restriction' && optionId !== null)
    || (value.stage !== 'restriction' && optionId !== null && careOptionById.get(optionId as CareOptionId)?.stage !== value.stage)) {
    fail('계획 평가의 단계와 선택이 맞지 않아요.');
  }
  const symbols = exactKnownList(value.relatedSymbolIds, symbolIdsFor(missionId), '평가 표시');
  const risks = exactKnownList(value.riskIds, riskIds, '평가 위험');
  if (typeof value.feedback !== 'string' || value.feedback.trim() === '') fail('계획 평가의 피드백이 올바르지 않아요.');
  return {
    status: value.status as PlanFindingStatus,
    stage: value.stage as PlanningStage | 'restriction',
    garmentIds: [...garments],
    optionId: optionId as CareOptionId | null,
    relatedSymbolIds: [...symbols],
    riskIds: [...risks],
    feedback: value.feedback,
  };
}

function validateEvaluation(value: unknown, missionId: MissionId): PlanEvaluation {
  if (!isRecord(value) || (value.status !== 'ready' && value.status !== 'revise') || !isDenseArray(value.findings)) fail('계획 평가 자료가 올바르지 않아요.');
  if (!Object.prototype.hasOwnProperty.call(value, 'waterUse') || !Object.prototype.hasOwnProperty.call(value, 'energyUse')) fail('계획 평가의 자원 자료가 없어요.');
  if (!isRecord(value.combinedAllowedOptions)) fail('공통 허용 선택 자료가 올바르지 않아요.');
  const combinedAllowedOptions = {} as Record<PlanningStage, readonly CareOptionId[]>;
  for (const stage of stages) {
    const options = exactKnownList(value.combinedAllowedOptions[stage], [...careOptionById.keys()], `${stage} 공통 선택`);
    if (options.some((optionId) => careOptionById.get(optionId)?.stage !== stage)) fail('공통 선택의 단계가 올바르지 않아요.');
    combinedAllowedOptions[stage] = [...options];
  }
  if ((value.waterUse !== null && !relativeLevels.includes(value.waterUse as typeof relativeLevels[number]))
    || (value.energyUse !== null && !relativeLevels.includes(value.energyUse as typeof relativeLevels[number]))) fail('상대 자원 평가가 올바르지 않아요.');
  const notices = exactStringList(value.safetyNotices, '안전 안내');
  return {
    status: value.status,
    findings: value.findings.map((finding) => cloneFinding(finding, missionId)),
    combinedAllowedOptions,
    waterUse: value.waterUse as PlanEvaluation['waterUse'],
    energyUse: value.energyUse as PlanEvaluation['energyUse'],
    safetyNotices: [...notices],
  };
}

function canonicalPlanEvaluation(missionId: MissionId, plan: StudentPlan): PlanEvaluation {
  return evaluatePlan({ mission: missionFor(missionId), plan, symbols: careSymbolById, options: careOptionById });
}

function canonicalGroupingEvaluation(missionId: MissionId, plan: StudentPlan): GroupingEvaluation | null {
  const mission = missionFor(missionId);
  if (!mission.requiresGrouping || plan.grouping === null) return null;
  return evaluateGrouping({ mission, grouping: plan.grouping, symbols: careSymbolById, options: careOptionById });
}

function validateCanonicalEvaluation(value: unknown, missionId: MissionId, plan: StudentPlan): PlanEvaluation {
  const canonical = canonicalPlanEvaluation(missionId, plan);
  validateEvaluation(value, missionId);
  if (!structurallyEqual(value, canonical)) fail('제출한 계획 평가가 실제 계획 판정과 일치하지 않아요.');
  return canonical;
}

function validateCanonicalGrouping(value: unknown, missionId: MissionId, plan: StudentPlan): GroupingEvaluation | null {
  const canonical = canonicalGroupingEvaluation(missionId, plan);
  if (!structurallyEqual(value, canonical)) fail('제출한 옷 묶음 평가가 실제 묶음 판정과 일치하지 않아요.');
  return canonical;
}

function cloneSelection(value: unknown): PredictionSelection {
  if (!isRecord(value)) fail('예측 선택 자료가 올바르지 않아요.');
  const risks = exactKnownList(value.riskIds, riskIds, '위험');
  const reasons = exactKnownList(value.reasonSymbolIds, [...careSymbolById.keys()], '근거 표시');
  if (risks.length === 0 || reasons.length === 0) fail('위험과 근거 표시를 하나 이상 선택하세요.');
  return { riskIds: [...risks], reasonSymbolIds: [...reasons] };
}

function cloneFeedback(value: unknown, selection: PredictionSelection): PredictionFeedback {
  if (!isRecord(value) || value.selectionIsValid !== true || typeof value.message !== 'string' || value.message.trim() === '') fail('예측 피드백이 올바르지 않아요.');
  const supportedRisks = exactKnownList(value.supportedRiskIds, riskIds, '지원 위험');
  const unsupportedRisks = exactKnownList(value.unsupportedRiskIds, riskIds, '미지원 위험');
  const supportedReasons = exactKnownList(value.supportedReasonSymbolIds, [...careSymbolById.keys()], '지원 근거');
  const unsupportedReasons = exactKnownList(value.unsupportedReasonSymbolIds, [...careSymbolById.keys()], '미지원 근거');
  const missedRisks = exactKnownList(value.missedRiskIds, riskIds, '누락 위험');
  const missedReasons = exactKnownList(value.missedReasonSymbolIds, [...careSymbolById.keys()], '누락 근거');
  const invalidRisks = exactStringList(value.invalidRiskIds, '무효 위험');
  const invalidReasons = exactStringList(value.invalidReasonSymbolIds, '무효 근거');
  if (invalidRisks.length > 0 || invalidReasons.length > 0) fail('유효하지 않은 예측 선택이 있어요.');
  if (!matchesSelection(selection.riskIds, supportedRisks, unsupportedRisks)
    || !matchesSelection(selection.reasonSymbolIds, supportedReasons, unsupportedReasons)) fail('예측 피드백의 선택 분류가 선택 내용과 맞지 않아요.');
  return {
    selectionIsValid: true,
    supportedRiskIds: [...supportedRisks], unsupportedRiskIds: [...unsupportedRisks], missedRiskIds: [...missedRisks],
    supportedReasonSymbolIds: [...supportedReasons], unsupportedReasonSymbolIds: [...unsupportedReasons], missedReasonSymbolIds: [...missedReasons],
    invalidRiskIds: [...invalidRisks], invalidReasonSymbolIds: [...invalidReasons], message: value.message,
  };
}

function matchesSelection(selected: readonly string[], supported: readonly string[], unsupported: readonly string[]): boolean {
  const all = [...supported, ...unsupported];
  return new Set(all).size === all.length && all.length === new Set(selected).size
    && all.every((id) => selected.includes(id));
}

function cloneEvidence(value: unknown, missionId: MissionId): RevisionEvidence {
  if (!isRecord(value) || !reasonIds.includes(value.reasonId as RevisionReasonId)) fail('수정 근거가 올바르지 않아요.');
  const symbols = exactKnownList(value.relatedSymbolIds, symbolIdsFor(missionId), '수정 근거 표시');
  const changed = exactKnownList(value.changedStages, stages, '변경 단계');
  if (symbols.length === 0) fail('수정 근거 표시를 하나 이상 선택하세요.');
  if (new Set(symbols).size !== symbols.length || new Set(changed).size !== changed.length) fail('수정 근거 목록을 중복해서 적을 수 없어요.');
  return { reasonId: value.reasonId as RevisionReasonId, relatedSymbolIds: [...symbols], changedStages: [...changed] };
}

function groupingChanged(a: GroupingChoice | null, b: GroupingChoice | null): boolean {
  if (a === null || b === null) return a !== b;
  return !sameSet(a.togetherGarmentIds, b.togetherGarmentIds) || !sameSet(a.separateGarmentIds, b.separateGarmentIds)
    || !sameSet(a.reasonSymbolIds, b.reasonSymbolIds);
}

function sameSet(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && new Set(a).size === new Set(b).size && a.every((item) => b.includes(item));
}

function expectedChangedStages(before: StudentPlan, after: StudentPlan): readonly PlanningStage[] {
  return stages.filter((stage) => before.stageOptions[stage] !== after.stageOptions[stage]);
}

export function sessionReducer(state: LearnerSession, action: SessionAction): LearnerSession {
  if (!isRecord(action) || typeof action.type !== 'string') fail('세션 행동이 올바르지 않아요.');
  switch (action.type) {
    case 'SELECT_MISSION': {
      requireStage(state, 'request');
      const mission = missionFor(action.missionId);
      return { ...state, missionId: mission.id, interpretations: [], initialPlan: null, initialEvaluation: null, initialGroupingEvaluation: null, prediction: null, predictionFeedback: null, revisedPlan: null, revisedEvaluation: null, revisedGroupingEvaluation: null, revisionEvidence: null };
    }
    case 'OPEN_MAGNIFIER':
      requireStage(state, 'request');
      if (state.missionId === null) fail('미션을 먼저 선택하세요.');
      return { ...state, step: 'magnifier' };
    case 'RECORD_INTERPRETATION': {
      requireStage(state, 'magnifier');
      if (state.missionId === null || !isRecord(action.attempt) || typeof action.attempt.symbolId !== 'string'
        || typeof action.attempt.selectedMeaningOptionId !== 'string' || typeof action.attempt.isCorrect !== 'boolean') fail('표시 해석 자료가 올바르지 않아요.');
      const symbolId = action.attempt.symbolId as CareSymbolId;
      const missionSymbolIds = symbolIdsFor(state.missionId);
      const symbol = careSymbolById.get(symbolId);
      if (symbol === undefined || !missionSymbolIds.includes(symbolId)) fail('현재 미션에 없는 표시를 해석할 수 없어요.');
      const derivedCorrect = symbol.correctMeaningOptionId === action.attempt.selectedMeaningOptionId;
      if (derivedCorrect !== action.attempt.isCorrect) fail('표시 해석 결과가 선택 내용과 맞지 않아요.');
      const interpretations = [...state.interpretations, { symbolId, selectedMeaningOptionId: action.attempt.selectedMeaningOptionId, isCorrect: derivedCorrect }];
      const complete = missionSymbolIds.every((id) => interpretations.some((attempt) => attempt.symbolId === id && attempt.isCorrect));
      return { ...state, step: complete ? 'plan' : 'magnifier', interpretations };
    }
    case 'SUBMIT_INITIAL_PLAN': {
      if (state.step === 'magnifier') fail('모든 표시 해석을 먼저 완료하세요.');
      requireStage(state, 'plan');
      if (state.missionId === null) fail('미션을 먼저 선택하세요.');
      const plan = validatePlan(action.plan, state.missionId);
      const evaluation = validateCanonicalEvaluation(action.evaluation, state.missionId, plan);
      const groupingEvaluation = validateCanonicalGrouping(action.groupingEvaluation, state.missionId, plan);
      return { ...state, step: 'forecast', initialPlan: plan, initialEvaluation: evaluation, initialGroupingEvaluation: groupingEvaluation };
    }
    case 'SUBMIT_PREDICTION': {
      requireStage(state, 'forecast');
      if (state.initialEvaluation === null) fail('처음 계획 평가가 없어요.');
      const selection = cloneSelection(action.selection);
      if (!structurallyEqual(action.selection, selection)) fail('예측 선택 자료에 알 수 없는 항목이 있어요.');
      const canonicalFeedback = evaluatePrediction({ evaluation: state.initialEvaluation, selection });
      cloneFeedback(action.feedback, selection);
      if (!structurallyEqual(action.feedback, canonicalFeedback)) fail('제출한 예측 피드백이 실제 판정과 일치하지 않아요.');
      return { ...state, prediction: selection, predictionFeedback: canonicalFeedback };
    }
    case 'SHOW_SIMULATION':
      requireStage(state, 'forecast');
      if (state.prediction === null || state.predictionFeedback === null) fail('예측 피드백을 먼저 확인하세요.');
      return { ...state, step: 'simulation' };
    case 'START_REVISION':
      requireStage(state, 'simulation');
      return { ...state, step: 'revision' };
    case 'SUBMIT_REVISION': {
      requireStage(state, 'revision');
      if (state.missionId === null || state.initialPlan === null || state.initialEvaluation === null) fail('처음 계획 자료가 없어요.');
      const plan = validatePlan(action.plan, state.missionId);
      const evaluation = validateCanonicalEvaluation(action.evaluation, state.missionId, plan);
      const groupingEvaluation = validateCanonicalGrouping(action.groupingEvaluation, state.missionId, plan);
      if (evaluation.status !== 'ready') fail('수정 계획은 허용 범위로 완성해야 해요.');
      if (state.missionId === 'mixed-load' && groupingEvaluation?.status !== 'ready') fail('수정한 옷 묶음은 허용 범위로 완성해야 해요.');
      const evidence = cloneEvidence(action.evidence, state.missionId);
      const changedStages = expectedChangedStages(state.initialPlan, plan);
      if (evidence.changedStages.length !== changedStages.length || evidence.changedStages.some((stage, index) => stage !== changedStages[index])) fail('실제 변경 단계와 수정 근거가 맞지 않아요.');
      const changedGrouping = groupingChanged(state.initialPlan.grouping, plan.grouping);
      if (state.initialEvaluation.status === 'ready') {
        const groupingReady = state.missionId !== 'mixed-load' || state.initialGroupingEvaluation?.status === 'ready';
        if (!groupingReady) {
          if (evidence.reasonId === 'confirm-current-plan' || !changedGrouping) fail('옷 묶음도 먼저 수정하거나 확인해야 해요.');
        } else if (evidence.reasonId !== 'confirm-current-plan' || changedStages.length > 0 || changedGrouping) {
          fail('허용된 계획은 현재 계획 확인으로만 마무리할 수 있어요.');
        }
      } else if (evidence.reasonId === 'confirm-current-plan' || (changedStages.length === 0 && !changedGrouping)) {
        fail('수정 계획은 실제 단계나 옷 묶음을 바꿔야 해요.');
      }
      return { ...state, step: 'report', revisedPlan: plan, revisedEvaluation: evaluation, revisedGroupingEvaluation: groupingEvaluation, revisionEvidence: evidence };
    }
    case 'RESTART_MISSION':
      return emptySession();
    default:
      fail('알 수 없는 세션 행동이에요.');
  }
}
