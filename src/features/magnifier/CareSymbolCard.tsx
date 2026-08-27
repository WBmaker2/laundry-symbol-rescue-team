import { useRef, useState } from 'react';
import type { CareSymbol } from '../../domain/careTypes';
import { evaluateInterpretation } from '../../domain/evaluateInterpretation';
import type { InterpretationFeedback } from '../../domain/evaluationTypes';
import type { SymbolInterpretationAttempt } from '../../domain/sessionReducer';
import { SymbolFigure } from '../../components/ui/SymbolFigure';

export interface CareSymbolCardProps {
  symbol: CareSymbol;
  attempt?: SymbolInterpretationAttempt | undefined;
  onChoose: (attempt: SymbolInterpretationAttempt, feedback: InterpretationFeedback) => void;
}

export function CareSymbolCard({ symbol, attempt, onChoose }: CareSymbolCardProps) {
  const [selectedMeaningOptionId, setSelectedMeaningOptionId] = useState(
    attempt?.selectedMeaningOptionId ?? '',
  );
  const [expanded, setExpanded] = useState(false);
  const [feedback, setFeedback] = useState<InterpretationFeedback | null>(null);
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const radioGroupName = `meaning-options-${symbol.id}`;

  function submitChoice() {
    if (!selectedMeaningOptionId) {
      setSelectionMessage('뜻 후보를 하나 골라 주세요.');
      return;
    }
    const nextFeedback = evaluateInterpretation({ symbol, selectedMeaningOptionId });
    const nextAttempt = {
      symbolId: symbol.id,
      selectedMeaningOptionId,
      isCorrect: nextFeedback.isCorrect,
    } satisfies SymbolInterpretationAttempt;
    setFeedback(nextFeedback);
    setSelectionMessage(null);
    onChoose(nextAttempt, nextFeedback);
    if (!nextFeedback.isCorrect) descriptionRef.current?.focus();
  }

  return (
    <article
      className="care-symbol-card"
      data-symbol-id={symbol.id}
      aria-label={`${symbol.name} 표시. ${symbol.shortDescription} 현재 계획에서 허용 범위를 확인하는 표시예요.`}
    >
      <div className="symbol-card-heading">
        <p className="eyebrow">현재 살펴볼 표시</p>
        <h2 id={`symbol-card-title-${symbol.id}`}>{symbol.name}</h2>
      </div>
      <SymbolFigure symbol={symbol} expanded={expanded} descriptionRef={descriptionRef} />
      <button
        type="button"
        className="symbol-expand-button"
        aria-expanded={expanded}
        onClick={() => setExpanded((value) => !value)}
      >
        {expanded ? '표시 작게 보기' : '표시 크게 보기'}
      </button>
      <fieldset className="meaning-options">
        <legend>뜻 후보 선택</legend>
        {symbol.meaningOptions.map((option) => (
          <label key={option.id} className="meaning-option">
            <input
              type="radio"
              name={radioGroupName}
              value={option.label}
              checked={selectedMeaningOptionId === option.id}
              onChange={() => setSelectedMeaningOptionId(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <button type="button" className="primary-action" onClick={submitChoice}>뜻 확인</button>
      {(selectionMessage || feedback) && (
        <p className="interpretation-feedback" role="status" aria-live="polite">
          {selectionMessage ?? (feedback?.isCorrect ? `맞아요. ${feedback.explanation}` : feedback?.returnPrompt)}
        </p>
      )}
    </article>
  );
}
