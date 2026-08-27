import type { CareOptionId, PlanningStage } from '../../domain/careTypes';
import type { CareOption } from '../../domain/missionTypes';
import { careOptionTitle } from './planLabels';

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const stageLabels: Readonly<Record<PlanningStage, string>> = {
  wash: '세탁',
  dry: '건조',
  iron: '다림질',
};

export interface CurrentPlanSummaryProps {
  stageOptions: Readonly<Record<PlanningStage, CareOptionId | null>>;
  options: ReadonlyMap<CareOptionId, CareOption>;
  acknowledgedRestrictionIds: readonly string[];
  restrictionCount: number;
}

export function CurrentPlanSummary({
  stageOptions,
  options,
  acknowledgedRestrictionIds,
  restrictionCount,
}: CurrentPlanSummaryProps) {
  const filled = stages.filter((stage) => stageOptions[stage] !== null).length;
  return (
    <section className="current-plan-summary" aria-label="현재 관리 계획" role="region">
      <h2>현재 관리 계획</h2>
      <p role="status" aria-live="polite">{filled}/3단계가 배치되었어요. 순서: 세탁 → 건조 → 다림질</p>
      <ol className="plan-summary-list">
        {stages.map((stage) => {
          const optionId = stageOptions[stage];
          const option = optionId === null ? undefined : options.get(optionId);
          return (
            <li key={stage}>
              <strong>{stageLabels[stage]}</strong>
              <span>{option ? careOptionTitle(option) : '아직 카드를 놓지 않았어요.'}</span>
            </li>
          );
        })}
      </ol>
      <p className="restriction-summary">
        추가 제한 확인: {acknowledgedRestrictionIds.length}/{restrictionCount}
      </p>
    </section>
  );
}
