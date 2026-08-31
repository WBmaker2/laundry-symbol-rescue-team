import { missions } from '../../content/missions';
import type { MissionId } from '../../domain/missionTypes';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { StepIntro } from '../../components/ui/StepIntro';

export function MissionPicker({ onSelect }: { onSelect: (missionId: MissionId) => void }) {
  return (
    <section className="mission-picker" aria-labelledby="mission-picker-title">
      <StepIntro
        eyebrow="첫 번째 단계"
        title="구조할 가상 옷을 골라 보세요"
        titleId="mission-picker-title"
        description="가상 옷의 재료와 취급 표시를 읽고 관리 순서를 정하는 활동이에요."
        nextActionLabel="미션 카드 하나를 골라 시작해요."
      />
      <div className="mission-grid">
        {missions.map((mission) => (
          <article key={mission.id} data-mission-id={mission.id}>
            <button
              type="button"
              className="mission-card"
              aria-label={`${mission.title} 미션 선택 — ${mission.learningFocus}`}
              onClick={() => onSelect(mission.id)}
            >
              <span className="mission-order" aria-hidden="true">미션 {mission.order}</span>
              <strong>{mission.title}</strong>
              <span>{mission.learningFocus}</span>
            </button>
          </article>
        ))}
      </div>
      <SafetyNotice variant="compact" />
    </section>
  );
}
