import type { GarmentMission } from '../../domain/missionTypes';
import { SafetyNotice } from '../../components/ui/SafetyNotice';

function GarmentSketch() {
  return (
    <svg className="garment-sketch" viewBox="0 0 160 120" aria-hidden="true" focusable="false">
      <path d="M47 28 67 16h26l20 12 27 20-12 22-17-10v44H49V60l-17 10-12-22 27-20Z" />
      <path d="M67 17c2 12 24 12 26 0M49 104h62" />
    </svg>
  );
}

export function RescueRequestScreen({ mission, onOpenMagnifier }: {
  mission: GarmentMission;
  onOpenMagnifier: () => void;
}) {
  return (
    <section className="request-screen" data-mission-id={mission.id} aria-labelledby="request-title">
      <div className="request-heading">
        <p className="eyebrow">{mission.order}번째 구조 요청</p>
        <h2 id="request-title">{mission.title.split('의 ')[0]} 구조 요청</h2>
        <p>{mission.openingPrompt}</p>
      </div>

      <div className="garment-list">
        {mission.garments.map((garment) => (
          <article key={garment.id} className="garment-card" data-garment-id={garment.id}>
            <div className="garment-visual"><GarmentSketch /></div>
            <div>
              <h3>{garment.name}</h3>
              <dl className="garment-facts">
                <dt>재료</dt>
                <dd>{garment.materialModel}</dd>
                <dt>재료 경계</dt>
                <dd>{garment.materialBoundary}</dd>
                <dt>가상 오염 상황</dt>
                <dd>{garment.contaminationScenario}</dd>
              </dl>
            </div>
          </article>
        ))}
      </div>

      <p className="learning-boundary"><strong>학습 범위:</strong> 이 화면의 옷과 재료는 실제 측정값이 아닌 가상 학습 자료예요.</p>
      <p className="opening-prompt"><strong>이번 질문:</strong> {mission.openingPrompt}</p>
      <SafetyNotice />
      <button type="button" className="required-action gi-pulse primary-action" onClick={onOpenMagnifier}>
        표시 확대
      </button>
    </section>
  );
}

