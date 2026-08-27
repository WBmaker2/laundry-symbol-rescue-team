import type { CareSymbolId, PlanningStage } from '../../domain/careTypes';
import type { GarmentMission, StudentPlan } from '../../domain/missionTypes';
import type { GroupingEvaluation } from '../../domain/evaluateGrouping';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import { careOptionById } from '../../content/careOptions';
import { careSymbolById } from '../../content/symbols';
import { sources } from '../../content/sources';
import { REAL_LABEL_PRIORITY_NOTICE } from '../../content/safetyNotices';
import { careOptionTitle } from '../plan/planLabels';

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const stageLabels: Readonly<Record<PlanningStage, string>> = { wash: '세탁', dry: '건조', iron: '다림질' };

function unique<T>(values: readonly T[]): readonly T[] { return [...new Set(values)]; }

function symbolNames(ids: readonly CareSymbolId[]): string {
  return unique(ids).map((id) => careSymbolById.get(id)?.name ?? id).join(', ') || '관련 표시 없음';
}

function sourceLinks(ids: readonly CareSymbolId[]) {
  const sourceIds = unique(ids.flatMap((id) => careSymbolById.get(id)?.sourceIds ?? []));
  return sourceIds.map((sourceId) => {
    const source = sources.find(({ id }) => id === sourceId);
    return source ? (
      <a key={source.id} href={source.officialUrl} target="_blank" rel="noreferrer">
        {source.publisher} · {source.standardOrDocumentId} (검수일 {source.reviewedAt})
      </a>
    ) : null;
  }).filter(Boolean);
}

export interface ManagementCardProps {
  title: string;
  mission: GarmentMission;
  plan: StudentPlan;
  evaluation: PlanEvaluation;
  groupingEvaluation: GroupingEvaluation | null;
  changedStages?: readonly PlanningStage[];
  includeLabelNotice?: boolean;
}

export function ManagementCard({ title, mission, plan, evaluation, groupingEvaluation, changedStages = [], includeLabelNotice = true }: ManagementCardProps) {
  const symbolIds = unique(mission.garments.flatMap(({ symbolIds: ids }) => ids));
  return (
    <article className="management-card">
      <h3>{title}</h3>
      <dl className="management-stage-list">
        {stages.map((stage) => {
          const option = plan.stageOptions[stage] ? careOptionById.get(plan.stageOptions[stage]!) : undefined;
          return (
            <div key={stage} className={changedStages.includes(stage) ? 'management-stage is-changed' : 'management-stage'}>
              <dt>{stageLabels[stage]}{changedStages.includes(stage) ? ' · 바뀐 단계' : ''}</dt>
              <dd>{option ? careOptionTitle(option) : '아직 선택하지 않았어요.'}</dd>
            </div>
          );
        })}
      </dl>
      <p><strong>평가</strong>: {evaluation.status === 'ready' ? '허용 범위' : '다시 살펴볼 부분이 있어요.'}</p>
      {mission.requiresGrouping && plan.grouping && (
        <div className="management-grouping">
          <p><strong>함께</strong>: {plan.grouping.togetherGarmentIds.map((id) => mission.garments.find((garment) => garment.id === id)?.name ?? id).join(', ') || '없음'}</p>
          <p><strong>따로</strong>: {plan.grouping.separateGarmentIds.map((id) => mission.garments.find((garment) => garment.id === id)?.name ?? id).join(', ') || '없음'}</p>
          <p><strong>옷 묶음 평가</strong>: {groupingEvaluation?.status === 'ready' ? '허용 범위' : '근거를 다시 확인해요.'}</p>
        </div>
      )}
      <p><strong>관련 표시</strong>: {symbolNames(symbolIds)}</p>
      <p className="source-links"><strong>출처·검수일</strong>: {sourceLinks(symbolIds)}</p>
      {evaluation.findings.some(({ status }) => status !== 'allowed') && (
        <ul className="management-findings" aria-label="계획 평가 근거">
          {evaluation.findings.filter(({ status }) => status !== 'allowed').map((finding, index) => <li key={`${finding.stage}-${index}`}>{finding.feedback}</li>)}
        </ul>
      )}
      {groupingEvaluation?.findings.filter(({ code }) => code !== 'compatible-group').map((finding, index) => (
        <p key={`${finding.code}-${index}`} className="management-finding">{finding.feedback}</p>
      ))}
      {includeLabelNotice && <p>{REAL_LABEL_PRIORITY_NOTICE}</p>}
      <p className="learning-boundary">학습용 선택 카드이며 실제 옷의 상태나 결과를 보증하지 않아요.</p>
    </article>
  );
}
