import type { ReactNode } from 'react';

export interface StepIntroProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  nextActionLabel?: string;
  titleId?: string;
}

export function StepIntro({ eyebrow, title, description, nextActionLabel, titleId }: StepIntroProps) {
  return (
    <div className="step-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={titleId} data-step-heading="true" tabIndex={-1}>{title}</h2>
      <p>{description}</p>
      {nextActionLabel && (
        <p className="step-next-action"><strong>이번에 할 일:</strong> {nextActionLabel}</p>
      )}
    </div>
  );
}
