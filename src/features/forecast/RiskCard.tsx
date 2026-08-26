import type { ChangeEvent } from 'react';
import type { DamageRiskId } from '../../domain/careTypes';

interface RiskInfo {
  label: string;
  possibility: string;
  description: string;
  mark: string;
}

const riskInfo: Readonly<Record<DamageRiskId, RiskInfo>> = {
  shrinkage: {
    label: '줄어듦',
    possibility: '조건에 따라 커질 수 있음',
    description: '옷의 크기나 길이가 달라질 수 있는지 생각해 봐요.',
    mark: '↕',
  },
  deformation: {
    label: '변형',
    possibility: '조건에 따라 커질 수 있음',
    description: '옷의 모양이 달라질 수 있는지 살펴봐요.',
    mark: '◇',
  },
  'color-change': {
    label: '색 변화',
    possibility: '조건에 따라 커질 수 있음',
    description: '색이 달라질 수 있는 조건인지 확인해 봐요.',
    mark: '●',
  },
  'decoration-damage': {
    label: '장식 손상',
    possibility: '조건에 따라 커질 수 있음',
    description: '붙은 장식이 영향을 받을 수 있는지 생각해 봐요.',
    mark: '✦',
  },
  'heat-damage': {
    label: '열 손상',
    possibility: '조건에 따라 커질 수 있음',
    description: '열이 재료에 영향을 줄 수 있는 조건인지 확인해 봐요.',
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
        <p className="risk-possibility">상대 가능성: {info.possibility}</p>
        <p id={descriptionId}>{info.description}</p>
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
