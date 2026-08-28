import type { DamageRiskId } from '../domain/careTypes';
import type { PredictionFeedback } from '../domain/evaluatePrediction';

export const learnerGlossaryTerms: readonly (readonly [string, string])[] = [
  ['옷을 덜 세게 다루는 방법', '강한 과정 대신 옷을 덜 자극하는 조건을 말해요.'],
  ['통이 빙글빙글 도는 건조', '통이 돌아가며 옷을 말리는 방법을 말해요.'],
  ['어른이나 전문가에게 먼저 물어보기', '가정에서 바로 처리하기 전에 보호자나 전문가에게 확인하는 범위예요.'],
  ['학습용 재료 모형', '실제 옷의 성능을 재는 자료가 아니라 수업을 위한 가상 재료예요.'],
] as const;

export interface LearnerRiskCopy {
  label: string;
  cue: string;
}

export const learnerRiskCopy: Readonly<Record<DamageRiskId, LearnerRiskCopy>> = {
  shrinkage: {
    label: '줄어듦',
    cue: '뜨거운 물이나 강한 과정이면 옷의 크기나 길이를 다시 살펴봐요.',
  },
  deformation: {
    label: '변형',
    cue: '비비거나 비틀면 옷의 모양이 달라질 수 있는지 살펴봐요.',
  },
  'color-change': {
    label: '색 변화',
    cue: '표백하거나 다른 색 옷과 함께할 때 색 변화를 살펴봐요.',
  },
  'decoration-damage': {
    label: '장식 손상',
    cue: '붙은 장식이 떨어지거나 흔들리지 않는지 살펴봐요.',
  },
  'heat-damage': {
    label: '열 손상',
    cue: '높은 열을 가까이하면 재료 변화가 생길 수 있는지 살펴봐요.',
  },
};

export function learnerPredictionMessage(
  feedback: PredictionFeedback,
  symbolName: (symbolId: string) => string,
): string {
  if (!feedback.selectionIsValid) {
    return '위험과 근거 표시를 골랐는지 다시 확인해 보세요.';
  }

  const riskNames = feedback.supportedRiskIds.map((riskId) => learnerRiskCopy[riskId].label);
  const reasonNames = feedback.supportedReasonSymbolIds.map(symbolName);
  if (riskNames.length > 0 && reasonNames.length > 0) {
    return `${riskNames.join(', ')} 가능성을 ${reasonNames.join(', ')} 표시와 연결했어요. 표시의 온도·줄·모양을 다시 살펴보며 이유를 말해 보세요.`;
  }
  if (riskNames.length > 0) {
    return `${riskNames.join(', ')} 가능성은 찾았어요. 이제 그 이유가 되는 표시를 다시 골라 보세요.`;
  }
  if (reasonNames.length > 0) {
    return `${reasonNames.join(', ')} 표시는 찾았어요. 어떤 변화 가능성과 이어지는지 다시 생각해 보세요.`;
  }
  return '고른 위험과 표시가 아직 이어지지 않았어요. 표시의 설명과 관리 계획을 다시 살펴보세요.';
}
