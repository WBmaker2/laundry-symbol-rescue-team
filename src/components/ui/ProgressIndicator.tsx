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
  return (
    <nav aria-label="학습 진행 7단계">
      <ol className="progress-list">
        {steps.map((step, index) => (
          <li key={step.id} className={step.id === currentStep ? 'is-current' : undefined}>
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

