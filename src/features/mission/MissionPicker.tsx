import { missions } from '../../content/missions';
import type { MissionId } from '../../domain/missionTypes';
import { SafetyNotice } from '../../components/ui/SafetyNotice';

export function MissionPicker({ onSelect }: { onSelect: (missionId: MissionId) => void }) {
  return (
    <section className="mission-picker" aria-labelledby="mission-picker-title">
      <p className="eyebrow">첫 번째 단계</p>
      <h2 id="mission-picker-title">구조할 가상 옷을 골라 보세요</h2>
      <p>가상 옷의 재료와 취급 표시를 읽고 관리 순서를 정하는 활동이에요.</p>
      <div className="mission-grid">
        {missions.map((mission) => (
          <button
            key={mission.id}
            type="button"
            className="mission-card"
            aria-label={`${mission.title} 미션 선택 — ${mission.learningFocus}`}
            onClick={() => onSelect(mission.id)}
          >
            <span className="mission-order" aria-hidden="true">미션 {mission.order}</span>
            <strong>{mission.title}</strong>
            <span>{mission.learningFocus}</span>
          </button>
        ))}
      </div>
      <SafetyNotice />
    </section>
  );
}
