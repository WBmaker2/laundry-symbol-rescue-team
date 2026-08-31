import type { GarmentMission } from '../../domain/missionTypes';
import type { ReactNode } from 'react';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { ActionButton } from '../../components/ui/ActionButton';
import { StepIntro } from '../../components/ui/StepIntro';
import { learnerCopy } from '../../content/learnerCopy';

type IllustrationKind = 'shirt' | 'scarf' | 'sportswear' | 'decorated-top';

function illustrationKind(garmentId: string): IllustrationKind {
  if (garmentId.includes('scarf')) return 'scarf';
  if (garmentId.includes('sportswear')) return 'sportswear';
  if (garmentId === 'decorated-top') return 'decorated-top';
  return 'shirt';
}

function GarmentSketch({ garmentId }: { garmentId: string }) {
  const kind = illustrationKind(garmentId);
  const paths: Record<IllustrationKind, ReactNode> = {
    shirt: <><path d="M47 28 67 16h26l20 12 27 20-12 22-17-10v44H49V60l-17 10-12-22 27-20Z" /><path d="M67 17c2 12 24 12 26 0M49 104h62" /></>,
    scarf: <><path d="M59 16h42v57H59z" /><path d="M59 73H39v31h20M101 73h20v31h-20M65 16v-5M77 16v-5M89 16v-5M47 104v8M113 104v8" /></>,
    sportswear: <><path d="M54 17h12l14 15 14-15h12l18 22-15 17-9-8v56H60V48l-9 8-15-17 18-22Z" /><path d="M66 18c2 9 22 9 28 0M60 104h51" /></>,
    'decorated-top': <><path d="M47 28 67 16h26l20 12 27 20-12 22-17-10v44H49V60l-17 10-12-22 27-20Z" /><path d="M67 17c2 12 24 12 26 0M49 104h62M66 57h4M78 68h4M90 57h4" /></>,
  };
  return (
    <svg className="garment-sketch" viewBox="0 0 160 120" aria-hidden="true" focusable="false" data-illustration-kind={kind}>
      {paths[kind]}
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
        <StepIntro
          eyebrow={`${mission.order}번째 구조 요청`}
          title={`${mission.title.split('의 ')[0]} 구조 요청`}
          titleId="request-title"
          description={<><strong>이번 질문:</strong> {mission.openingPrompt}</>}
          nextActionLabel="표시 확대 버튼을 눌러 라벨 단서를 살펴봐요."
        />
      </div>
      <ActionButton type="button" className="primary-action" emphasis="required" onClick={onOpenMagnifier}>
        표시 확대
      </ActionButton>
      <SafetyNotice variant="compact" />

      <div className="garment-list">
        {mission.garments.map((garment) => (
          <article key={garment.id} className="garment-card" data-garment-id={garment.id}>
            <div className="garment-visual"><GarmentSketch garmentId={garment.id} /></div>
            <div>
              <h3>{garment.name}</h3>
              <dl className="garment-facts">
                <dt>재료</dt>
                <dd>{garment.materialModel}</dd>
                <dt>{learnerCopy.materialBoundary}</dt>
                <dd>{garment.materialBoundary}</dd>
                <dt>{learnerCopy.scenario}</dt>
                <dd>{garment.contaminationScenario}</dd>
              </dl>
            </div>
          </article>
        ))}
      </div>

      <p className="learning-boundary"><strong>학습 범위:</strong> 이 화면의 옷과 재료는 실제 측정값이 아닌 가상 학습 자료예요.</p>
    </section>
  );
}
