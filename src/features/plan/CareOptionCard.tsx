import type { CareOption } from '../../domain/missionTypes';
import type { CareOptionId } from '../../domain/careTypes';
import { ActionButton } from '../../components/ui/ActionButton';
import { careOptionTitle } from './planLabels';

export interface CareOptionCardProps {
  option: CareOption;
  selected: boolean;
  onSelect: (optionId: CareOptionId) => void;
}

export function CareOptionCard({ option, selected, onSelect }: CareOptionCardProps) {
  const title = careOptionTitle(option);
  return (
    <article className={`care-option-card${selected ? ' is-selected' : ''}`}>
      <div>
        <h3>{title}</h3>
        <p>{option.learningDescription}</p>
        {option.requiresAdult && <p className="adult-safety-reminder">보호자·교사와 먼저 확인해요.</p>}
      </div>
      <ActionButton
        type="button"
        className="care-option-select"
        data-care-option-id={option.id}
        aria-pressed={selected}
        aria-label={`${title} 카드 선택`}
        onClick={() => onSelect(option.id)}
      >
        {selected ? '선택한 카드' : '카드 선택'}
      </ActionButton>
    </article>
  );
}
