import type { CareOptionId } from '../../domain/careTypes';
import type { CareOption } from '../../domain/missionTypes';

const friendlyNames: Partial<Record<CareOptionId, string>> = {
  'plan-wash-gentle-30': '부드러운 30도 세탁',
};

export function careOptionTitle(option: CareOption): string {
  return friendlyNames[option.id] ?? option.label;
}
