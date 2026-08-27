import type { ReactNode } from 'react';

export interface BeforeAfterComparisonProps {
  stageLabel: string;
  before: ReactNode;
  after: ReactNode;
  possibility: ReactNode;
}

/**
 * A text-first comparison. The small motion class is decorative only: all
 * three messages are rendered immediately for keyboard and reduced-motion
 * users.
 */
export function BeforeAfterComparison({ stageLabel, before, after, possibility }: BeforeAfterComparisonProps) {
  return (
    <article className="before-after-comparison" aria-label={`${stageLabel} 전후 비교`}>
      <h4>{stageLabel} 전후 비교</h4>
      <div className="comparison-panels static-before-after">
        <section className="comparison-panel" aria-label={`${stageLabel} 변화 전`}>
          <p className="comparison-label">변화 전</p>
          <div className="comparison-illustration" role="img" aria-label={`가상 옷 ${stageLabel} 변화 전`}>
            <span className="comparison-garment comparison-garment-before" aria-hidden="true">옷</span>
          </div>
          <p>{before}</p>
        </section>
        <section className="comparison-panel" aria-label={`${stageLabel} 변화 후`}>
          <p className="comparison-label">변화 후</p>
          <div className="comparison-illustration comparison-illustration-animated" role="img" aria-label={`가상 옷 ${stageLabel} 변화 후`}>
            <span className="comparison-garment comparison-garment-after animated-garment-state" aria-hidden="true">옷</span>
          </div>
          <p>{after}</p>
        </section>
      </div>
      <p className="comparison-possibility"><strong>변화 가능성</strong>: {possibility}</p>
    </article>
  );
}
