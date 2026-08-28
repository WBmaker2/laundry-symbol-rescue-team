import { useEffect, useRef } from 'react';
import type { SessionStep } from '../../domain/sessionReducer';

const steps: readonly { id: SessionStep; label: string }[] = [
  { id: 'request', label: '구조 요청' },
  { id: 'magnifier', label: '표시 확대경' },
  { id: 'plan', label: '관리 순서판' },
  { id: 'forecast', label: '손상 예보' },
  { id: 'simulation', label: '가상 관리' },
  { id: 'revision', label: '계획 수정' },
  { id: 'report', label: '구조 보고서' },
];

export function ProgressIndicator({ currentStep }: { currentStep: SessionStep }) {
  const currentIndex = steps.findIndex((step) => step.id === currentStep);
  const current = steps[currentIndex] ?? steps[0]!;
  const currentItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const item = currentItemRef.current;
    if (item && typeof item.scrollIntoView === 'function') {
      item.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
  }, [currentStep]);

  return (
    <nav aria-label="학습 진행 7단계">
      <p className="progress-summary" aria-live="polite">현재 단계: {currentIndex + 1}/7 · {current.label}</p>
      <ol className="progress-list" aria-label="7단계 학습 진행, 가로로 이동할 수 있어요">
        {steps.map((step, index) => (
          <li
            key={step.id}
            ref={step.id === currentStep ? currentItemRef : undefined}
            className={step.id === currentStep ? 'is-current' : undefined}
          >
            <span aria-current={step.id === currentStep ? 'step' : undefined}>
              <span className="progress-number" aria-hidden="true">{index + 1}</span>
              {step.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
