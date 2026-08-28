import type { CareSymbol } from './careTypes';
import type { InterpretationFeedback } from './evaluationTypes';

export function evaluateInterpretation({
  symbol,
  selectedMeaningOptionId,
}: {
  symbol: CareSymbol;
  selectedMeaningOptionId: string;
}): InterpretationFeedback {
  const visibleMeaningIds = new Set(
    Array.isArray(symbol.meaningOptions) ? symbol.meaningOptions.map(({ id }) => id) : [],
  );
  const isCorrect =
    visibleMeaningIds.has(selectedMeaningOptionId) &&
    visibleMeaningIds.has(symbol.correctMeaningOptionId) &&
    selectedMeaningOptionId === symbol.correctMeaningOptionId;

  return {
    symbolId: symbol.id,
    isCorrect,
    categoryHint: symbol.categoryHint,
    explanation: symbol.shortDescription,
    returnPrompt: isCorrect
      ? '이 표시가 관리 행동과 어떻게 이어지는지 확인해 보세요.'
      : '기호 옆 설명에서 온도와 줄 표시를 다시 찾아보세요.',
  };
}
