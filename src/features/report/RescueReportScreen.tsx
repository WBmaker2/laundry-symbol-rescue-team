import type { CareSymbolId, DamageRiskId, PlanningStage, RelativeLevel } from '../../domain/careTypes';
import type { GarmentMission, StudentPlan } from '../../domain/missionTypes';
import type { GroupingEvaluation } from '../../domain/evaluateGrouping';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import type { PredictionFeedback, PredictionSelection } from '../../domain/evaluatePrediction';
import type { LearnerSession, RevisionEvidence, RevisionReasonId } from '../../domain/sessionReducer';
import { careSymbolById } from '../../content/symbols';
import { sources } from '../../content/sources';
import { ManagementCard } from './ManagementCard';
import { SafetyNotice } from '../../components/ui/SafetyNotice';

const riskLabels: Readonly<Record<DamageRiskId, string>> = {
  shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화',
  'decoration-damage': '장식 손상', 'heat-damage': '열 손상',
};
const levelLabels: Readonly<Record<RelativeLevel, string>> = { lower: '낮음', medium: '보통', higher: '높음' };
const reasonLabels: Readonly<Record<RevisionReasonId, string>> = {
  'follow-label-limit': '표시의 제한을 따르기 위해',
  'protect-material-or-decoration': '재료나 장식을 보호하기 위해',
  'separate-incompatible-garment': '함께 관리하기 어려운 옷을 나누기 위해',
  'ask-adult-or-professional': '보호자·교사 또는 전문가에게 확인하기 위해',
  'reduce-relative-resource-use': '상대 자원 사용을 줄이기 위해',
  'confirm-current-plan': '현재 계획의 근거를 다시 확인하기 위해',
};

function unique<T>(values: readonly T[]): readonly T[] { return [...new Set(values)]; }

export interface AchievementSummary {
  interpretedAllSymbols: boolean;
  combinedRestrictions: boolean;
  connectedRiskEvidence: boolean;
  revisedPlan: boolean;
  responsibleCare: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export function achievementSummary(state: Pick<LearnerSession, 'missionId' | 'interpretations' | 'initialEvaluation' | 'initialGroupingEvaluation' | 'predictionFeedback' | 'revisedEvaluation' | 'revisedGroupingEvaluation' | 'revisionEvidence'>, mission: GarmentMission): AchievementSummary {
  const symbolIds = unique(mission.garments.flatMap(({ symbolIds: ids }) => ids));
  return {
    interpretedAllSymbols: state.missionId === mission.id && symbolIds.every((id) => state.interpretations.some((attempt) => attempt.symbolId === id && attempt.isCorrect)),
    combinedRestrictions: state.initialEvaluation?.status === 'ready' && (!mission.requiresGrouping || state.initialGroupingEvaluation?.status === 'ready'),
    connectedRiskEvidence: state.predictionFeedback?.selectionIsValid === true
      && state.predictionFeedback.supportedRiskIds.length > 0
      && state.predictionFeedback.supportedReasonSymbolIds.length > 0,
    revisedPlan: state.revisedEvaluation?.status === 'ready' && (!mission.requiresGrouping || state.revisedGroupingEvaluation?.status === 'ready'),
    responsibleCare: state.revisionEvidence !== null && state.revisionEvidence.relatedSymbolIds.length > 0,
  };
}

function sourceLinks(symbolIds: readonly CareSymbolId[]) {
  return unique(symbolIds.flatMap((id) => careSymbolById.get(id)?.sourceIds ?? [])).map((sourceId) => {
    const source = sources.find(({ id }) => id === sourceId);
    return source ? <a key={source.id} href={source.officialUrl} target="_blank" rel="noreferrer">{source.title} · 검수일 {source.reviewedAt}</a> : null;
  }).filter(Boolean);
}

function changedStages(initialPlan: StudentPlan, revisedPlan: StudentPlan): readonly PlanningStage[] {
  return (['wash', 'dry', 'iron'] as const).filter((stage) => initialPlan.stageOptions[stage] !== revisedPlan.stageOptions[stage]);
}

function names<T extends string>(ids: readonly T[], labels: Readonly<Record<T, string>>): string {
  return ids.map((id) => labels[id]).join(', ') || '없음';
}

export interface RescueReportScreenProps {
  mission: GarmentMission;
  interpretations: LearnerSession['interpretations'];
  initialPlan: StudentPlan;
  initialEvaluation: PlanEvaluation;
  initialGroupingEvaluation: GroupingEvaluation | null;
  prediction: PredictionSelection | null;
  predictionFeedback: PredictionFeedback | null;
  revisedPlan: StudentPlan;
  revisedEvaluation: PlanEvaluation;
  revisedGroupingEvaluation: GroupingEvaluation | null;
  revisionEvidence: RevisionEvidence;
}

export function RescueReportScreen(props: RescueReportScreenProps) {
  const { mission, initialPlan, initialEvaluation, initialGroupingEvaluation, prediction, predictionFeedback, revisedPlan, revisedEvaluation, revisedGroupingEvaluation, revisionEvidence } = props;
  const symbolIds = unique(mission.garments.flatMap(({ symbolIds: ids }) => ids));
  const summary = achievementSummary({ missionId: mission.id, interpretations: props.interpretations, initialEvaluation, initialGroupingEvaluation, predictionFeedback, revisedEvaluation, revisedGroupingEvaluation, revisionEvidence }, mission);
  const changed = changedStages(initialPlan, revisedPlan);
  const selectedRisks = prediction?.riskIds ?? [];
  const selectedReasons = prediction?.reasonSymbolIds ?? [];
  const supportedRisks = predictionFeedback?.supportedRiskIds ?? [];
  const unsupportedRisks = predictionFeedback?.unsupportedRiskIds ?? [];
  const missedRisks = predictionFeedback?.missedRiskIds ?? [];
  const supportedReasons = predictionFeedback?.supportedReasonSymbolIds ?? [];
  const unsupportedReasons = predictionFeedback?.unsupportedReasonSymbolIds ?? [];
  const missedReasons = predictionFeedback?.missedReasonSymbolIds ?? [];
  const evidenceNames = revisionEvidence.relatedSymbolIds.map((id) => careSymbolById.get(id)?.name ?? id);
  return (
    <section className="rescue-report-screen" data-app-step="report" aria-labelledby="rescue-report-title">
      <p className="eyebrow">일곱 번째 단계</p>
      <h2 id="rescue-report-title">구조 보고서</h2>

      <section className="report-section" aria-labelledby="mission-boundary-title">
        <h3 id="mission-boundary-title">미션·가상 재료와 학습 경계</h3>
        <p><strong>현재 미션</strong>: {mission.title}</p>
        <p>{mission.learningFocus}</p>
        <ul>{mission.garments.map((garment) => <li key={garment.id}><strong>{garment.name}</strong>: {garment.materialModel} · {garment.contaminationScenario} {garment.materialBoundary}</li>)}</ul>
        <p className="learning-boundary">이 보고서는 가상 재료 모형을 살펴본 학습용 결과이며 실제 옷의 상태를 판정하거나 보증하지 않아요.</p>
      </section>

      <section className="report-section" aria-labelledby="symbol-evidence-title">
        <h3 id="symbol-evidence-title">해석한 표시와 공식·학습용 구분</h3>
        <ul className="report-symbol-list">{symbolIds.map((id) => {
          const symbol = careSymbolById.get(id);
          if (!symbol) return null;
          const displayKind = (symbol.displayKind as string) === 'official-standard-symbol' ? '공식 표준 표시' : '학습용 아이콘';
          return <li key={id}><strong>{symbol.name}</strong> · {displayKind} · {symbol.shortDescription}<span className="source-links">{sourceLinks([id])}</span><span>해석: {props.interpretations.find((attempt) => attempt.symbolId === id && attempt.isCorrect) ? '맞게 확인했어요.' : '다시 살펴봐요.'}</span></li>;
        })}</ul>
        <p>학습용 아이콘은 실제 제품 라벨 표시를 대신하지 않아요. 출처와 검수일 링크를 확인해요.</p>
      </section>

      <section className="report-section" aria-label="최초 계획" role="region">
        <h3>최초 계획</h3>
        <ManagementCard title="최초 세탁·건조·다림질 계획" mission={mission} plan={initialPlan} evaluation={initialEvaluation} groupingEvaluation={initialGroupingEvaluation} includeLabelNotice={false} />
      </section>

      <section className="report-section" aria-labelledby="risk-title" aria-label="예측한 손상 가능성과 관련 표시" role="region">
        <h3 id="risk-title">예측한 손상 가능성과 관련 표시</h3>
        <p>{prediction ? '학생이 고른 위험·근거 표시와 평가 결과를 구분해 살펴봐요.' : '예측 선택 자료가 없어요.'}</p>
        <ul>
          <li><strong>학생이 선택한 위험</strong>: {names(selectedRisks, riskLabels)}</li>
          <li><strong>예측한 가능성(평가가 연결된 위험)</strong>: {supportedRisks.length > 0 ? names(supportedRisks, riskLabels) : '연결된 위험 없음 · 근거 부족'}</li>
          <li><strong>선택했지만 초기 평가 근거가 없는 위험</strong>: {names(unsupportedRisks, riskLabels)}</li>
          <li><strong>평가에서 놓친 위험</strong>: {names(missedRisks, riskLabels)}</li>
          <li><strong>학생이 선택한 근거 표시</strong>: {names(selectedReasons, Object.fromEntries(selectedReasons.map((id) => [id, careSymbolById.get(id)?.name ?? id])) as Readonly<Record<CareSymbolId, string>>)}</li>
          <li><strong>평가가 연결한 근거 표시</strong>: {names(supportedReasons, Object.fromEntries(supportedReasons.map((id) => [id, careSymbolById.get(id)?.name ?? id])) as Readonly<Record<CareSymbolId, string>>)}</li>
          <li><strong>선택했지만 초기 평가 근거가 없는 표시</strong>: {names(unsupportedReasons, Object.fromEntries(unsupportedReasons.map((id) => [id, careSymbolById.get(id)?.name ?? id])) as Readonly<Record<CareSymbolId, string>>)}</li>
          <li><strong>평가에서 놓친 표시</strong>: {names(missedReasons, Object.fromEntries(missedReasons.map((id) => [id, careSymbolById.get(id)?.name ?? id])) as Readonly<Record<CareSymbolId, string>>)}</li>
        </ul>
        <p>{predictionFeedback?.message ?? '실제 옷의 상태를 예측하는 결과가 아니에요.'}</p>
      </section>

      <section className="report-section" aria-label="수정 계획" role="region">
        <h3>수정 계획</h3>
        <ManagementCard title="수정한 세탁·건조·다림질 계획" mission={mission} plan={revisedPlan} evaluation={revisedEvaluation} groupingEvaluation={revisedGroupingEvaluation} changedStages={changed} includeLabelNotice={false} />
        <p><strong>수정 이유</strong>: {reasonLabels[revisionEvidence.reasonId]} (<code>{revisionEvidence.reasonId}</code>)</p>
        <p><strong>바뀐 단계</strong>: {changed.length > 0 ? changed.join(', ') : '바뀐 단계 없음'}</p>
        <p><strong>근거 표시</strong>: {evidenceNames.join(', ')}</p>
      </section>

      <section className="report-section resource-summary" aria-label="상대 물·에너지 지표" role="region">
        <h3>물·에너지 상대 지표</h3>
        <p><strong>물 사용 상대 수준</strong>: {revisedEvaluation.waterUse ? levelLabels[revisedEvaluation.waterUse] : '계획을 완성하면 확인할 수 있어요.'} · <strong>에너지 사용 상대 수준</strong>: {revisedEvaluation.energyUse ? levelLabels[revisedEvaluation.energyUse] : '계획을 완성하면 확인할 수 있어요.'}</p>
        <p>정확한 양이나 실제 절약량이 아닌 학습용 상대 비교예요.</p>
      </section>

      <section className="report-section responsible-care-evidence" aria-label="responsible-care evidence" role="region">
        <h3>책임 있는 관리와 도움 요청</h3>
        <p>제품 정보를 보호자·교사와 함께 살펴보는 것이 안전한 관리의 출발점이에요.</p>
        <p>전문 관리가 필요하거나 모르는 표시는 보호자·교사 또는 제품 공식 안내에 확인하기</p>
        <p>이번 보고서의 근거: {summary.responsibleCare ? evidenceNames.join(', ') : '근거를 확인하지 못했어요.'}</p>
      </section>

      <SafetyNotice />
    </section>
  );
}
