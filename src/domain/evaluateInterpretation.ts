import type { CareSymbol } from './careTypes';
import type { InterpretationFeedback } from './evaluationTypes';
import { interpretationRetryHints, learnerCopy } from '../content/learnerCopy';

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
      : `아직 맞지 않아요. 이 표시에서 ${interpretationRetryHints[symbol.id] ?? learnerCopy.wrongAnswerHint}를 다시 찾아보고 다른 뜻을 골라 보세요.`,
  };
}
