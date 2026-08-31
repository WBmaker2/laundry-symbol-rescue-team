import { describe, expect, it } from 'vitest';
import { careSymbolById } from '../content/symbols';
import { evaluateInterpretation } from './evaluateInterpretation';

describe('evaluateInterpretation', () => {
  it('returns the reviewed explanation for a correct meaning', () => {
    const symbol = careSymbolById.get('care-wash-30-gentle');
    if (symbol === undefined) throw new Error('fixture symbol is missing');

    const result = evaluateInterpretation({
      symbol,
      selectedMeaningOptionId: symbol.correctMeaningOptionId,
    });

    expect(result).toMatchObject({
      symbolId: symbol.id,
      isCorrect: true,
      categoryHint: symbol.categoryHint,
      explanation: symbol.shortDescription,
    });
    expect(result.returnPrompt).toContain('관리');
  });

  it('asks the learner to return to the label after an incorrect meaning', () => {
    const symbol = careSymbolById.get('care-no-iron');
    if (symbol === undefined) throw new Error('fixture symbol is missing');

    const result = evaluateInterpretation({
      symbol,
      selectedMeaningOptionId: 'meaning-iron-low',
    });

    expect(result.isCorrect).toBe(false);
    expect(result.returnPrompt).toContain('표시');
    expect(result.returnPrompt).toContain('아직 맞지 않아요');
    expect(result.returnPrompt).toContain('다리미');
    expect(result.returnPrompt).toContain('다른 뜻');
    expect(result.returnPrompt).not.toContain('온도와 줄');
    expect(result.returnPrompt).not.toMatch(/반드시|확실히/);
  });

  it('uses the current symbol shape when the no-bleach meaning is wrong', () => {
    const symbol = careSymbolById.get('care-no-bleach');
    if (symbol === undefined) throw new Error('fixture symbol is missing');

    const result = evaluateInterpretation({
      symbol,
      selectedMeaningOptionId: 'meaning-oxygen-bleach',
    });

    expect(result.isCorrect).toBe(false);
    expect(result.returnPrompt).toContain('아직 맞지 않아요');
    expect(result.returnPrompt).toContain('삼각형');
    expect(result.returnPrompt).toContain('엑스');
    expect(result.returnPrompt).toContain('다른 뜻');
    expect(result.returnPrompt).not.toContain('온도와 줄');
  });

  it.each([
    { selectedMeaningOptionId: 'missing-meaning', correctMeaningOptionId: 'meaning-no-iron' },
    { selectedMeaningOptionId: 'meaning-no-iron', correctMeaningOptionId: 'missing-meaning' },
  ])('is false when a selected or correct meaning is not visible', ({ selectedMeaningOptionId, correctMeaningOptionId }) => {
    const symbol = careSymbolById.get('care-no-iron');
    if (symbol === undefined) throw new Error('fixture symbol is missing');

    const malformedSymbol = { ...symbol, correctMeaningOptionId };
    const result = evaluateInterpretation({
      symbol: malformedSymbol,
      selectedMeaningOptionId,
    });

    expect(result.isCorrect).toBe(false);
  });
});
