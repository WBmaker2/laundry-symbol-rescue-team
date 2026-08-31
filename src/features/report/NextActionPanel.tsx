import type { ReactNode } from 'react';

export interface NextActionPanelProps {
  description: ReactNode;
  actionLabel: string;
  actionId: string;
}

export function NextActionPanel({ description, actionLabel, actionId }: NextActionPanelProps) {
  return (
    <section className="next-action-panel" aria-labelledby="next-action-title">
      <h3 id="next-action-title">다음 행동</h3>
      <p>{description}</p>
      <p className="next-action-link-line"><strong>다음:</strong> {actionLabel}</p>
      <a className="next-action-jump" href={`#${actionId}`}>마지막 버튼으로 이동</a>
    </section>
  );
}
