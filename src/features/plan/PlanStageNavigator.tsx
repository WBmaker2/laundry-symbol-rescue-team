import { ActionButton } from '../../components/ui/ActionButton';
import type { PlanningStage } from '../../domain/careTypes';

export type PlanStageId = PlanningStage;

const stages: readonly { id: PlanStageId; label: string }[] = [
  { id: 'wash', label: '세탁' },
  { id: 'dry', label: '건조' },
  { id: 'iron', label: '다림질' },
];

export interface PlanStageNavigatorProps {
  activeStage: PlanStageId;
  completedStages: readonly PlanStageId[];
  onStageChange: (stage: PlanStageId) => void;
}

export function PlanStageNavigator({ activeStage, completedStages, onStageChange }: PlanStageNavigatorProps) {
  return (
    <nav className="plan-stage-navigator" aria-label="관리 단계">
      <p className="plan-stage-navigator-label">지금 살펴보는 단계: {stages.find((stage) => stage.id === activeStage)?.label ?? '세탁'}</p>
      <ol>
        {stages.map(({ id, label }) => {
          const isCurrent = id === activeStage;
          const isComplete = completedStages.includes(id);
          return (
            <li key={id} data-complete={isComplete}>
              <ActionButton
                type="button"
                className="plan-stage-nav-button"
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`${label} 단계 보기`}
                onClick={() => onStageChange(id)}
              >
                <span aria-hidden="true">{isComplete ? '✓' : '○'}</span> {label}
              </ActionButton>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
