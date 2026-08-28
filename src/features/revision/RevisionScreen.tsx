import { useState } from 'react';
import type { CareSymbolId, PlanningStage } from '../../domain/careTypes';
import type { GarmentMission, GroupingChoice, StudentPlan } from '../../domain/missionTypes';
import type { GroupingEvaluation } from '../../domain/evaluateGrouping';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import type { RevisionEvidence, RevisionReasonId } from '../../domain/sessionReducer';
import type { PredictionFeedback } from '../../domain/evaluatePrediction';
import type { PredictionSelection } from '../../domain/evaluatePrediction';
import { careSymbolById } from '../../content/symbols';
import { evaluateGrouping } from '../../domain/evaluateGrouping';
import { evaluatePlan } from '../../domain/evaluatePlan';
import { ManagementBoardScreen } from '../plan/ManagementBoardScreen';
import { CurrentPlanSummary } from '../plan/CurrentPlanSummary';
import { careOptionById } from '../../content/careOptions';
import { SafetyNotice } from '../../components/ui/SafetyNotice';

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const reasonLabels: Readonly<Record<Exclude<RevisionReasonId, 'confirm-current-plan'>, string>> = {
  'follow-label-limit': '표시의 제한을 따르기 위해',
  'protect-material-or-decoration': '재료나 장식을 보호하기 위해',
  'separate-incompatible-garment': '함께 관리하기 어려운 옷을 나누기 위해',
  'ask-adult-or-professional': '보호자·교사 또는 전문가에게 확인하기 위해',
  'reduce-relative-resource-use': '상대 자원 사용을 줄이기 위해',
};

function unique<T>(values: readonly T[]): readonly T[] { return [...new Set(values)]; }

function sameSet(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && new Set(left).size === new Set(right).size && left.every((item) => right.includes(item));
}

function groupingChanged(left: GroupingChoice | null, right: GroupingChoice | null): boolean {
  if (left === null || right === null) return left !== right;
  return !sameSet(left.togetherGarmentIds, right.togetherGarmentIds)
    || !sameSet(left.separateGarmentIds, right.separateGarmentIds)
    || !sameSet(left.reasonSymbolIds, right.reasonSymbolIds);
}

function changedStages(left: StudentPlan, right: StudentPlan): readonly PlanningStage[] {
  return stages.filter((stage) => left.stageOptions[stage] !== right.stageOptions[stage]);
}

function findingSymbolIds(evaluation: PlanEvaluation | null, grouping: GroupingEvaluation | null): readonly CareSymbolId[] {
  const planIds = evaluation?.findings.filter(({ status }) => status !== 'allowed').flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
  const groupingIds = grouping?.findings.filter(({ code }) => code !== 'compatible-group').flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
  return unique([...planIds, ...groupingIds]);
}

const riskLabels: Readonly<Record<string, string>> = {
  shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화',
  'decoration-damage': '장식 손상', 'heat-damage': '열 손상',
};

function garmentNames(mission: GarmentMission, ids: readonly string[]): string {
  const names = ids.map((id) => mission.garments.find((garment) => garment.id === id)?.name).filter(Boolean);
  return names.length > 0 ? names.join(', ') : '없음';
}

function symbolNames(ids: readonly CareSymbolId[]): string {
  const names = ids.map((id) => careSymbolById.get(id)?.name ?? '관련 표시');
  return names.length > 0 ? names.join(', ') : '선택하지 않았어요.';
}

function selectedRiskNames(ids: readonly string[]): string {
  return ids.map((id) => riskLabels[id] ?? '선택한 위험').join(', ') || '선택하지 않았어요.';
}

export interface RevisionScreenProps {
  mission: GarmentMission;
  initialPlan: StudentPlan;
  initialEvaluation: PlanEvaluation;
  initialGroupingEvaluation: GroupingEvaluation | null;
  prediction: PredictionSelection | null;
  predictionFeedback: PredictionFeedback | null;
  onSubmit: (plan: StudentPlan, evaluation: PlanEvaluation, groupingEvaluation: GroupingEvaluation | null, evidence: RevisionEvidence) => void;
}

export function RevisionScreen({ mission, initialPlan, initialEvaluation, initialGroupingEvaluation, prediction, predictionFeedback, onSubmit }: RevisionScreenProps) {
  const [reasonId, setReasonId] = useState<RevisionReasonId | null>(null);
  const [relatedSymbolIds, setRelatedSymbolIds] = useState<CareSymbolId[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const initialGroupingReady = !mission.requiresGrouping || initialGroupingEvaluation?.status === 'ready';
  const canConfirmCurrent = initialEvaluation.status === 'ready' && initialGroupingReady;
  const relevantIds = findingSymbolIds(initialEvaluation, initialGroupingEvaluation);
  const symbolIds = relevantIds.length > 0
    ? relevantIds
    : unique(mission.garments.flatMap(({ symbolIds: ids }) => ids));

  function toggleSymbol(symbolId: CareSymbolId) {
    setRelatedSymbolIds((current) => current.includes(symbolId)
      ? current.filter((id) => id !== symbolId)
      : [...current, symbolId]);
    setMessage(null);
  }

  function handlePlanSubmit(plan: StudentPlan) {
    const changed = changedStages(initialPlan, plan);
    const changedGrouping = groupingChanged(initialPlan.grouping, plan.grouping);
    if (initialEvaluation.status === 'revise' && changed.length === 0 && !changedGrouping) {
      setMessage('바꾼 단계와 근거 표시를 선택해 수정 계획을 만들어 주세요.');
      return;
    }
    if (mission.id === 'mixed-load' && initialGroupingEvaluation?.status === 'revise' && !changedGrouping) {
      setMessage('옷 묶음도 실제로 바꾼 뒤 근거를 다시 확인해 주세요.');
      return;
    }
    if (reasonId === null) {
      setMessage('수정 이유를 하나 골라 주세요.');
      return;
    }
    if (relatedSymbolIds.length === 0) {
      setMessage('관련 표시 근거를 하나 이상 선택해 주세요.');
      return;
    }
    if ((initialEvaluation.status === 'revise' || initialGroupingEvaluation?.status === 'revise')
      && relevantIds.length > 0 && relatedSymbolIds.some((id) => !relevantIds.includes(id))) {
      setMessage('처음 발견한 제한과 연결된 표시를 수정 근거로 골라 주세요.');
      return;
    }
    const evaluation = evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById });
    const groupingEvaluation = mission.requiresGrouping && plan.grouping
      ? evaluateGrouping({ mission, grouping: plan.grouping, symbols: careSymbolById, options: careOptionById })
      : null;
    if (evaluation.status !== 'ready') {
      setMessage('수정 계획은 세탁·건조·다림질과 추가 제한을 모두 허용 범위로 완성해야 해요.');
      return;
    }
    if (mission.id === 'mixed-load' && groupingEvaluation?.status !== 'ready') {
      setMessage('수정한 옷 묶음은 허용 범위로 완성해야 해요.');
      return;
    }
    if (canConfirmCurrent && (reasonId !== 'confirm-current-plan' || changed.length > 0 || changedGrouping)) {
      setMessage('허용된 계획은 현재 계획 확인으로만 마무리할 수 있어요.');
      return;
    }
    if (!canConfirmCurrent && reasonId === 'confirm-current-plan') {
      setMessage('아직 수정이 필요한 계획이에요. 계획을 바꾸고 근거를 확인해 주세요.');
      return;
    }
    const evidence: RevisionEvidence = { reasonId, relatedSymbolIds, changedStages: changed };
    onSubmit(plan, evaluation, groupingEvaluation, evidence);
  }

  return (
    <section className="revision-screen" data-app-step="revision" aria-labelledby="revision-title">
      <p className="eyebrow">여섯 번째 단계</p>
      <h2 id="revision-title" data-step-heading="true" tabIndex={-1}>관리 계획 수정</h2>
      <p>가상 결과는 가능성을 보여 줘요. 최초 계획과 발견을 근거로 필요한 부분만 다시 계획해요.</p>
      {predictionFeedback && <p className="revision-feedback" role="status" aria-live="polite">앞에서 확인한 예측: {predictionFeedback.message}</p>}

      <section className="initial-plan-comparison" aria-label="최초 계획과 비교" role="region">
        <h3>최초 계획과 발견</h3>
        <CurrentPlanSummary
          stageOptions={initialPlan.stageOptions}
          options={careOptionById}
          acknowledgedRestrictionIds={initialPlan.acknowledgedRestrictionIds}
          restrictionCount={mission.garments.flatMap(({ symbolIds: ids }) => ids).filter((id) => careSymbolById.get(id)?.requiresAcknowledgement).length}
        />
        <p><strong>최초 평가</strong>: {initialEvaluation.status === 'ready' ? '허용 범위' : '다시 살펴볼 부분이 있어요.'}</p>
        <ul>
          {initialEvaluation.findings.filter(({ status }) => status !== 'allowed').map((finding, index) => (
            <li key={`${finding.stage}-${index}`}>{finding.feedback}</li>
          ))}
          {initialGroupingEvaluation?.findings.filter(({ code }) => code !== 'compatible-group').map((finding, index) => (
            <li key={`${finding.code}-${index}`}>{finding.feedback}</li>
          ))}
        </ul>
      </section>

      {mission.requiresGrouping && initialPlan.grouping && (
        <section className="initial-grouping" aria-label="최초 그룹 배정" role="region" data-read-only="true">
          <h3>최초 옷 묶음과 발견</h3>
          <p><strong>최초 묶음 평가</strong>: {initialGroupingEvaluation?.status === 'ready' ? '허용 범위' : '나누어 살펴볼 부분이 있어요.'}</p>
          <p data-grouping-assignment="together"><strong>함께</strong>: {garmentNames(mission, initialPlan.grouping.togetherGarmentIds)}</p>
          <p data-grouping-assignment="separate"><strong>따로</strong>: {garmentNames(mission, initialPlan.grouping.separateGarmentIds)}</p>
          <p><strong>최초 묶음 근거</strong>: {initialPlan.grouping.reasonSymbolIds.length > 0
            ? symbolNames(initialPlan.grouping.reasonSymbolIds)
            : '선택하지 않았어요.'}</p>
          {initialGroupingEvaluation?.findings.filter(({ code }) => code !== 'compatible-group').map((finding, index) => (
            <p key={`${finding.code}-${index}`}>{finding.feedback}</p>
          ))}
        </section>
      )}

      <section className="initial-prediction" aria-label="최초 예측 선택" role="region" data-read-only="true">
        <h3>최초 예측 선택</h3>
        <p><strong>선택한 위험</strong>: {prediction ? selectedRiskNames(prediction.riskIds) : '선택하지 않았어요.'}</p>
        <p><strong>선택한 근거 표시</strong>: {prediction ? symbolNames(prediction.reasonSymbolIds) : '선택하지 않았어요.'}</p>
      </section>

      <fieldset className="revision-reasons">
        <legend>수정 이유</legend>
        {(Object.entries(reasonLabels) as [Exclude<RevisionReasonId, 'confirm-current-plan'>, string][]).map(([id, label]) => (
          <label key={id}><input type="radio" name="revision-reason" checked={reasonId === id} onChange={() => { setReasonId(id); setMessage(null); }} />{label}</label>
        ))}
        {canConfirmCurrent && (
          <label><input type="radio" name="revision-reason" checked={reasonId === 'confirm-current-plan'} onChange={() => { setReasonId('confirm-current-plan'); setMessage(null); }} />현재 계획의 근거를 다시 확인하기</label>
        )}
      </fieldset>

      <fieldset className="revision-evidence">
        <legend>관련 표시 근거</legend>
        <p>수정 이유와 연결되는 표시를 하나 이상 선택해요.</p>
        {symbolIds.map((symbolId) => {
          const symbol = careSymbolById.get(symbolId);
          if (!symbol) return null;
          return <label key={symbolId}><input type="checkbox" checked={relatedSymbolIds.includes(symbolId)} onChange={() => toggleSymbol(symbolId)} />{symbol.name} 표시를 근거로 선택</label>;
        })}
      </fieldset>

      {message && <p className="revision-message" role="alert">{message}</p>}
      <ManagementBoardScreen mission={mission} mode="revision" initialPlan={initialPlan} onSubmit={handlePlanSubmit} />
      <SafetyNotice />
    </section>
  );
}
