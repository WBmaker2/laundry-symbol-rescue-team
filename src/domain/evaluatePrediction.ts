import type { DamageRiskId } from './careTypes';
import type { PlanEvaluation } from './evaluationTypes';

export interface PredictionSelection {
  riskIds: readonly DamageRiskId[];
  reasonSymbolIds: readonly import('./careTypes').CareSymbolId[];
}

export interface PredictionFeedback {
  supportedRiskIds: readonly DamageRiskId[];
  unsupportedRiskIds: readonly DamageRiskId[];
  missedRiskIds: readonly DamageRiskId[];
  message: string;
}

const riskIds: readonly DamageRiskId[] = [
  'shrinkage',
  'deformation',
  'color-change',
  'decoration-damage',
  'heat-damage',
];

function isRiskId(value: unknown): value is DamageRiskId {
  return typeof value === 'string' && riskIds.includes(value as DamageRiskId);
}

function uniqueRisks(values: readonly unknown[]): readonly DamageRiskId[] {
  return [...new Set(values.filter(isRiskId))];
}

function safeSelection(selection: unknown): readonly DamageRiskId[] {
  if (!selection || typeof selection !== 'object' || !Array.isArray((selection as { riskIds?: unknown }).riskIds)) {
    return [];
  }
  return uniqueRisks((selection as { riskIds: readonly unknown[] }).riskIds);
}

function evidenceFrom(evaluation: unknown): { risks: readonly DamageRiskId[]; invalid: boolean } {
  if (!evaluation || typeof evaluation !== 'object' || !Array.isArray((evaluation as { findings?: unknown }).findings)) {
    return { risks: [], invalid: true };
  }
  const findings = (evaluation as { findings: readonly unknown[] }).findings;
  const invalid = findings.some((finding) => {
    return Boolean(finding && typeof finding === 'object'
      && (finding as { status?: unknown }).status === 'invalid-input');
  });
  const risks = uniqueRisks(findings.flatMap((finding) => {
    if (!finding || typeof finding !== 'object') return [];
    const typedFinding = finding as { status?: unknown; riskIds?: unknown };
    if (typedFinding.status === 'allowed' || !Array.isArray(typedFinding.riskIds)) return [];
    return typedFinding.riskIds;
  }));
  return { risks, invalid };
}

export function evaluatePrediction(input: {
  evaluation: PlanEvaluation;
  selection: PredictionSelection;
}): PredictionFeedback {
  const selection = safeSelection(input && typeof input === 'object' ? input.selection : null);
  const { risks: evidence, invalid } = evidenceFrom(input && typeof input === 'object' ? input.evaluation : null);
  if (invalid) {
    return {
      supportedRiskIds: [],
      unsupportedRiskIds: selection,
      missedRiskIds: [],
      message: '입력 자료를 확인할 수 없어 손상 가능성을 연결할 수 없어요. 표시와 관리 계획을 다시 살펴보세요.',
    };
  }

  const evidenceSet = new Set(evidence);
  const selectedSet = new Set(selection);
  const supportedRiskIds = selection.filter((riskId) => evidenceSet.has(riskId));
  const unsupportedRiskIds = selection.filter((riskId) => !evidenceSet.has(riskId));
  const missedRiskIds = evidence.filter((riskId) => !selectedSet.has(riskId));
  const message = evidence.length === 0
    ? '현재 판정에서 연결할 손상 가능성 근거가 아직 없어요. 표시와 관리 계획을 다시 살펴보세요.'
    : '선택한 위험과 표시·관리 계획의 근거를 연결해 보았어요. 손상 가능성을 단정하지 말고 표시를 다시 확인해 보세요.';
  return { supportedRiskIds, unsupportedRiskIds, missedRiskIds, message };
}
