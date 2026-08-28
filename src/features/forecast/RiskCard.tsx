import type { ChangeEvent } from 'react';
import type { DamageRiskId } from '../../domain/careTypes';
import { learnerRiskCopy } from '../../content/learnerCopy';

interface RiskInfo {
  label: string;
  cue: string;
  mark: string;
}

const riskInfo: Readonly<Record<DamageRiskId, RiskInfo>> = {
  shrinkage: {
    ...learnerRiskCopy.shrinkage,
    mark: '↕',
  },
  deformation: {
    ...learnerRiskCopy.deformation,
    mark: '◇',
  },
  'color-change': {
    ...learnerRiskCopy['color-change'],
    mark: '●',
  },
  'decoration-damage': {
    ...learnerRiskCopy['decoration-damage'],
    mark: '✦',
  },
  'heat-damage': {
    ...learnerRiskCopy['heat-damage'],
    mark: '☼',
  },
};

export interface RiskCardProps {
  riskId: DamageRiskId;
  selected: boolean;
  onToggle: (riskId: DamageRiskId, selected: boolean) => void;
}

export function RiskCard({ riskId, selected, onToggle }: RiskCardProps) {
  const info = riskInfo[riskId];
  const titleId = `risk-card-title-${riskId}`;
  const descriptionId = `risk-card-description-${riskId}`;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onToggle(riskId, event.currentTarget.checked);
  }

  return (
    <article className={`risk-card${selected ? ' is-selected' : ''}`} data-risk-id={riskId} aria-labelledby={titleId}>
      <div className="risk-mark" data-risk-illustration={riskId} aria-hidden="true">{info.mark}</div>
      <div className="risk-card-copy">
        <h3 id={titleId}>{info.label} 가능성</h3>
        <p className="risk-possibility"><strong>살펴볼 점</strong>: {info.cue}</p>
        <p id={descriptionId}>이 변화가 생길 수 있는 조건을 표시와 비교해 봐요.</p>
      </div>
      <label className="risk-choice">
        <input
          type="checkbox"
          data-risk-selection-id={riskId}
          checked={selected}
          aria-describedby={descriptionId}
          onChange={handleChange}
        />
        <span>{info.label} 가능성 선택</span>
      </label>
    </article>
  );
}
