import type { CareSymbolId, DamageRiskId, PlanningStage, RelativeLevel } from '../../domain/careTypes';
import type { GarmentMission, StudentPlan } from '../../domain/missionTypes';
import type { PlanEvaluation, PlanFinding } from '../../domain/evaluationTypes';
import type { PredictionFeedback } from '../../domain/evaluatePrediction';
import { careOptionById } from '../../content/careOptions';
import { careSymbolById } from '../../content/symbols';
import { careOptionTitle } from '../plan/planLabels';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { BeforeAfterComparison } from './BeforeAfterComparison';

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const stageLabels: Readonly<Record<PlanningStage, string>> = { wash: '세탁', dry: '건조', iron: '다림질' };
const riskLabels: Readonly<Record<DamageRiskId, string>> = {
  shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화',
  'decoration-damage': '장식 손상', 'heat-damage': '열 손상',
};
const levelLabels: Readonly<Record<RelativeLevel, string>> = { lower: '낮음', medium: '보통', higher: '높음' };

function unique<T>(values: readonly T[]): readonly T[] { return [...new Set(values)]; }

function stageFinding(evaluation: PlanEvaluation, stage: PlanningStage): PlanFinding | undefined {
  return evaluation.findings.find((finding) => finding.stage === stage);
}

function symbolNames(ids: readonly string[]): string {
  const names = unique(ids).map((id) => careSymbolById.get(id as CareSymbolId)?.name).filter(Boolean);
  return names.length > 0 ? names.join(', ') : '관련 표시를 다시 살펴봐요.';
}

function possibilityFor(finding: PlanFinding | undefined, feedback: PredictionFeedback | null): string {
  if (!finding || finding.status === 'allowed') {
    return '현재 가상 조건에서는 큰 변화가 두드러지지 않아요. 그래도 실제 라벨을 확인해요.';
  }
  const findingRisks = unique(finding.riskIds);
  const risks = feedback === null
    ? findingRisks
    : findingRisks.filter((risk) => feedback.supportedRiskIds.includes(risk));
  return risks.length > 0
    ? `손상 가능성이 커질 수 있어요. ${risks.map((risk) => riskLabels[risk]).join(', ')} 가능성을 살펴봐요.`
    : '선택한 예측과 이 단계의 발견이 직접 연결되지 않았어요. 실제 라벨을 확인해요.';
}

export interface VirtualCareScreenProps {
  mission: GarmentMission;
  plan: StudentPlan;
  evaluation: PlanEvaluation;
  predictionFeedback: PredictionFeedback | null;
  onStartRevision: () => void;
}

export function VirtualCareScreen({ mission, plan, evaluation, predictionFeedback, onStartRevision }: VirtualCareScreenProps) {
  return (
    <section className="virtual-care-screen" data-app-step="simulation" aria-labelledby="virtual-care-title" aria-describedby="virtual-care-boundary">
      <p className="eyebrow">다섯 번째 단계</p>
      <h2 id="virtual-care-title">가상 결과 확인</h2>
      <p><strong>현재 미션</strong>: {mission.title}</p>
      <p>처음 세운 계획을 가상 재료 모형에 적용해 보고, 단계별 변화 가능성을 살펴봐요.</p>
      <p className="learning-boundary">결과는 가능성을 비교하는 학습 자료이며 실제 옷의 상태를 판정하지 않아요.</p>

      <ol className="virtual-stage-list" aria-label="세탁·건조·다림질 순서">
        {stages.map((stage) => {
          const optionId = plan.stageOptions[stage];
          const option = optionId === null ? undefined : careOptionById.get(optionId);
          const finding = stageFinding(evaluation, stage);
          const related = finding?.relatedSymbolIds ?? [];
          const possibility = stage === 'wash'
            ? possibilityFor(finding, predictionFeedback)
            : possibilityFor(finding, predictionFeedback).replace('손상 가능성이 커질 수 있어요.', '단계별 변화 가능성을 살펴봐요.');
          const isOutside = finding?.status === 'outside-limit' || finding?.status === 'unread-restriction';
          return (
            <li key={stage} className="virtual-stage" data-stage={stage}>
              <article aria-labelledby={`virtual-stage-${stage}`}>
                <h3 id={`virtual-stage-${stage}`}>{stageLabels[stage]} 단계</h3>
                <p><strong>선택한 방법</strong>: {option ? careOptionTitle(option) : '아직 선택하지 않았어요.'}</p>
                <p><strong>관련 표시</strong>: {symbolNames(related)}</p>
                <p className={isOutside ? 'virtual-possibility is-caution' : 'virtual-possibility'}>
                  <strong>발견 가능성</strong>: {possibility}
                </p>
                <BeforeAfterComparison
                  stageLabel={stageLabels[stage]}
                  before="가상 옷의 처음 모습"
                  after={isOutside ? '조건 차이로 달라질 수 있는 모습' : '가상 옷의 모습을 그대로 비교하는 장면'}
                  possibility={isOutside ? '조건 차이에 따라 달라질 수 있어요.' : '실제 상태를 단정하지 않는 비교예요.'}
                />
              </article>
            </li>
          );
        })}
      </ol>

      <section className="resource-summary" aria-label="상대 물·에너지 지표">
        <h3>상대 자원 지표</h3>
        <p><strong>물 사용</strong>: {evaluation.waterUse ? levelLabels[evaluation.waterUse] : '계획을 완성하면 확인할 수 있어요.'}</p>
        <p><strong>에너지 사용</strong>: {evaluation.energyUse ? levelLabels[evaluation.energyUse] : '계획을 완성하면 확인할 수 있어요.'}</p>
        <p>정확한 양이 아닌 가상 조건의 상대 비교예요.</p>
      </section>

      <p id="virtual-care-boundary" className="learning-boundary">이 학습용 결과가 실제 옷의 상태를 보증하지 않아요.</p>
      <SafetyNotice />
      <button type="button" className="simulation-action" onClick={onStartRevision}>계획 수정하기</button>
    </section>
  );
}
