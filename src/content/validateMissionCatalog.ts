import { careOptionById } from './careOptions';
import { missionIds, validateMissionReferences, validateMissionShape } from '../domain/validateMissionInput';

export function validateMissionCatalog(
  missionMap: ReadonlyMap<string, unknown>,
  symbolMap: ReadonlyMap<string, unknown>,
): boolean {
  if (missionMap.size !== missionIds.length) return false;
  for (const id of missionIds) {
    const mission = missionMap.get(id);
    if (validateMissionShape(mission) !== null
      || (mission as { id?: unknown } | undefined)?.id !== id
      || validateMissionReferences(mission, symbolMap, careOptionById) !== null) {
      return false;
    }
  }
  for (const key of missionMap.keys()) {
    if (typeof key !== 'string' || !missionIds.includes(key as typeof missionIds[number])) return false;
  }
  return true;
}
