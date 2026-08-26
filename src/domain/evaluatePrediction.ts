import type { CareSymbolId, DamageRiskId } from './careTypes';
import type { PlanEvaluation } from './evaluationTypes';

export interface PredictionSelection {
  riskIds: readonly DamageRiskId[];
  reasonSymbolIds: readonly CareSymbolId[];
}

export interface PredictionFeedback {
  selectionIsValid: boolean;
  supportedRiskIds: readonly DamageRiskId[];
  unsupportedRiskIds: readonly DamageRiskId[];
  missedRiskIds: readonly DamageRiskId[];
  supportedReasonSymbolIds: readonly CareSymbolId[];
  unsupportedReasonSymbolIds: readonly CareSymbolId[];
  missedReasonSymbolIds: readonly CareSymbolId[];
  invalidRiskIds: readonly string[];
  invalidReasonSymbolIds: readonly string[];
  message: string;
}

const riskIds: readonly DamageRiskId[] = [
  'shrinkage',
  'deformation',
  'color-change',
  'decoration-damage',
  'heat-damage',
];
const symbolIds: readonly CareSymbolId[] = [
  'care-wash-30-gentle',
  'care-no-bleach',
  'care-flat-dry',
  'care-tumble-low',
  'care-no-tumble',
  'care-iron-low',
  'care-no-iron',
  'care-professional',
];
const evidenceStatuses = ['outside-limit', 'missing-step', 'unread-restriction'] as const;

function isRiskId(value: unknown): value is DamageRiskId {
  return typeof value === 'string' && riskIds.includes(value as DamageRiskId);
}

function isSymbolId(value: unknown): value is CareSymbolId {
  return typeof value === 'string' && symbolIds.includes(value as CareSymbolId);
}

function isDenseArray(value: unknown): value is readonly unknown[] {
  if (!Array.isArray(value)) return false;
  for (let index = 0; index < value.length; index += 1) {
    if (!Object.prototype.hasOwnProperty.call(value, index)) return false;
  }
  return true;
}

function uniqueStrings(values: readonly unknown[]): readonly string[] {
  return [...new Set(values.filter((value): value is string => typeof value === 'string'))];
}

function uniqueTyped<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

interface ParsedSelection {
  valid: boolean;
  risks: readonly DamageRiskId[];
  invalidRisks: readonly string[];
  reasons: readonly CareSymbolId[];
  invalidReasons: readonly string[];
}

function parseSelection(selection: unknown): ParsedSelection {
  if (!selection || typeof selection !== 'object') {
    return { valid: false, risks: [], invalidRisks: [], reasons: [], invalidReasons: [] };
  }
  const rawRisks = (selection as { riskIds?: unknown }).riskIds;
  const rawReasons = (selection as { reasonSymbolIds?: unknown }).reasonSymbolIds;
  if (!isDenseArray(rawRisks) || !isDenseArray(rawReasons)) {
    return { valid: false, risks: [], invalidRisks: [], reasons: [], invalidReasons: [] };
  }
  const riskValues = Array.isArray(rawRisks) ? uniqueStrings(rawRisks) : [];
  const reasonValues = Array.isArray(rawReasons) ? uniqueStrings(rawReasons) : [];
  return {
    valid: rawRisks.every((value) => typeof value === 'string')
      && rawReasons.every((value) => typeof value === 'string')
      && riskValues.every(isRiskId)
      && reasonValues.every(isSymbolId),
    risks: riskValues.filter(isRiskId),
    invalidRisks: riskValues.filter((riskId) => !isRiskId(riskId)),
    reasons: reasonValues.filter(isSymbolId),
    invalidReasons: reasonValues.filter((symbolId) => !isSymbolId(symbolId)),
  };
}

interface Evidence {
  valid: boolean;
  risks: readonly DamageRiskId[];
  reasons: readonly CareSymbolId[];
}

function validEvidenceList<T>(value: unknown, predicate: (value: unknown) => value is T): value is readonly T[] {
  return isDenseArray(value) && value.every(predicate);
}

function readEvidence(evaluation: unknown): Evidence {
  if (!evaluation || typeof evaluation !== 'object'
    || !Array.isArray((evaluation as { findings?: unknown }).findings)) {
    return { valid: false, risks: [], reasons: [] };
  }
  const risks: DamageRiskId[] = [];
  const reasons: CareSymbolId[] = [];
  for (const finding of (evaluation as { findings: readonly unknown[] }).findings) {
    if (!finding || typeof finding !== 'object') return { valid: false, risks: [], reasons: [] };
    const typedFinding = finding as { status?: unknown; riskIds?: unknown; relatedSymbolIds?: unknown };
    if (typedFinding.status !== 'allowed'
      && !evidenceStatuses.includes(typedFinding.status as typeof evidenceStatuses[number])) {
      return { valid: false, risks: [], reasons: [] };
    }
    if (!validEvidenceList(typedFinding.riskIds, isRiskId)
      || !validEvidenceList(typedFinding.relatedSymbolIds, isSymbolId)) {
      return { valid: false, risks: [], reasons: [] };
    }
    if (typedFinding.status === 'allowed') continue;
    risks.push(...typedFinding.riskIds);
    reasons.push(...typedFinding.relatedSymbolIds);
  }
  return { valid: true, risks: uniqueTyped(risks), reasons: uniqueTyped(reasons) };
}

export function evaluatePrediction(input: {
  evaluation: PlanEvaluation;
  selection: PredictionSelection;
}): PredictionFeedback {
  const selection = parseSelection(input && typeof input === 'object' ? input.selection : null);
  const evidence = readEvidence(input && typeof input === 'object' ? input.evaluation : null);
  const evidenceRisks = new Set(evidence.risks);
  const evidenceReasons = new Set(evidence.reasons);
  const selectedRisks = new Set(selection.risks);
  const selectedReasons = new Set(selection.reasons);
  const supportedRiskIds = selection.valid && evidence.valid
    ? selection.risks.filter((riskId) => evidenceRisks.has(riskId))
    : [];
  const unsupportedRiskIds = !selection.valid
    ? selection.risks
    : selection.risks.filter((riskId) => !evidenceRisks.has(riskId));
  const missedRiskIds = selection.valid && evidence.valid
    ? evidence.risks.filter((riskId) => !selectedRisks.has(riskId))
    : [];
  const supportedReasonSymbolIds = selection.valid && evidence.valid
    ? selection.reasons.filter((symbolId) => evidenceReasons.has(symbolId))
    : [];
  const unsupportedReasonSymbolIds = !selection.valid
    ? selection.reasons
    : selection.reasons.filter((symbolId) => !evidenceReasons.has(symbolId));
  const missedReasonSymbolIds = selection.valid && evidence.valid
    ? evidence.reasons.filter((symbolId) => !selectedReasons.has(symbolId))
    : [];
  const message = !selection.valid
    ? '선택 자료를 확인할 수 없어요. 위험과 근거 표시 선택을 다시 확인해 주세요.'
    : !evidence.valid
    ? '입력 자료를 확인할 수 없어 손상 가능성을 연결하지 못했어요. 표시와 관리 계획을 다시 살펴보세요.'
    : evidence.risks.length === 0 && evidence.reasons.length === 0
      ? '연결할 손상 가능성 근거가 아직 없어요. 표시와 관리 계획을 다시 살펴보세요.'
      : '선택한 위험과 표시·관리 계획의 근거를 연결해 보았어요. 손상 가능성을 단정하지 말고 표시를 다시 확인해 보세요.';
  return {
    selectionIsValid: selection.valid,
    supportedRiskIds,
    unsupportedRiskIds,
    missedRiskIds,
    supportedReasonSymbolIds,
    unsupportedReasonSymbolIds,
    missedReasonSymbolIds,
    invalidRiskIds: selection.invalidRisks,
    invalidReasonSymbolIds: selection.invalidReasons,
    message,
  };
}
