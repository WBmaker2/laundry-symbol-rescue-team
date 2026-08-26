import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { CareSymbol, CareSymbolId, DamageRiskId } from '../../domain/careTypes';
import type { GarmentMission } from '../../domain/missionTypes';
import { evaluatePrediction, type PredictionFeedback, type PredictionSelection } from '../../domain/evaluatePrediction';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import { careSymbolById } from '../../content/symbols';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { SymbolFigure } from '../../components/ui/SymbolFigure';
import { RiskCard } from './RiskCard';

const riskIds: readonly DamageRiskId[] = [
  'shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage',
];

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function sameIds(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((id) => right.includes(id));
}

function missionSymbols(mission: GarmentMission): readonly CareSymbol[] {
  const candidates: readonly (CareSymbol | undefined)[] = unique(mission.garments.flatMap(({ symbolIds }) => symbolIds))
    .map((symbolId) => careSymbolById.get(symbolId))
  return candidates.filter((symbol): symbol is CareSymbol => symbol !== undefined);
}

function evidenceLabel(symbol: CareSymbol): string {
  if (symbol.category === 'iron') return '다림질 제한 표시';
  if (symbol.category === 'dry') return '건조 제한 표시';
  if (symbol.category === 'wash') return '세탁 제한 표시';
  if (symbol.category === 'bleach') return '표백 제한 표시';
  return '관리 제한 표시';
}

function feedbackSummary(feedback: PredictionFeedback): string {
  const supported = feedback.supportedRiskIds.length;
  const selected = feedback.supportedRiskIds.length + feedback.unsupportedRiskIds.length;
  const evidence = feedback.supportedReasonSymbolIds.length;
  return `연결된 손상 가능성 ${supported}/${selected}, 연결된 표시 근거 ${evidence}개. ${feedback.message}`;
}

export interface DamageForecastScreenProps {
  mission: GarmentMission;
  evaluation: PlanEvaluation;
  prediction: PredictionSelection | null;
  predictionFeedback: PredictionFeedback | null;
  onSubmit: (selection: PredictionSelection, feedback: PredictionFeedback) => void;
  onShowSimulation: () => void;
}

export function DamageForecastScreen({
  mission,
  evaluation,
  prediction,
  predictionFeedback,
  onSubmit,
  onShowSimulation,
}: DamageForecastScreenProps) {
  const symbols = missionSymbols(mission);
  const [selectedRisks, setSelectedRisks] = useState<DamageRiskId[]>(() => [...(prediction?.riskIds ?? [])]);
  const [selectedReasons, setSelectedReasons] = useState<CareSymbolId[]>(() => [...(prediction?.reasonSymbolIds ?? [])]);
  const [selectionMessage, setSelectionMessage] = useState<string | null>(null);
  const [openSymbolId, setOpenSymbolId] = useState<CareSymbolId | null>(null);
  const lastReviewTrigger = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const currentFeedback = prediction && predictionFeedback
    && sameIds(selectedRisks, prediction.riskIds)
    && sameIds(selectedReasons, prediction.reasonSymbolIds)
    ? predictionFeedback
    : null;
  const feedback = currentFeedback;
  const needsEvidenceReview = feedback !== null
    && (feedback.unsupportedReasonSymbolIds.length > 0 || feedback.missedReasonSymbolIds.length > 0);
  const reviewSymbolIds = feedback === null ? [] : unique([
    ...feedback.unsupportedReasonSymbolIds,
    ...feedback.missedReasonSymbolIds,
  ]).filter((symbolId) => symbols.some((symbol) => symbol.id === symbolId));
  const openSymbol = openSymbolId === null ? undefined : symbols.find((symbol) => symbol.id === openSymbolId);

  useEffect(() => {
    if (openSymbol && dialogRef.current) {
      dialogRef.current.focus();
    }
  }, [openSymbol]);

  function toggleRisk(riskId: DamageRiskId, checked: boolean) {
    setSelectedRisks((current) => checked
      ? [...new Set([...current, riskId])]
      : current.filter((id) => id !== riskId));
    setSelectionMessage(null);
  }

  function toggleReason(symbolId: CareSymbolId, checked: boolean) {
    setSelectedReasons((current) => checked
      ? [...new Set([...current, symbolId])]
      : current.filter((id) => id !== symbolId));
    setSelectionMessage(null);
  }

  function submit() {
    if (selectedRisks.length === 0) {
      setSelectionMessage('손상 가능성을 하나 이상 골라 주세요.');
      return;
    }
    if (selectedReasons.length === 0) {
      setSelectionMessage('관련 표시 근거를 하나 이상 골라 주세요.');
      return;
    }
    const selection = { riskIds: selectedRisks, reasonSymbolIds: selectedReasons } satisfies PredictionSelection;
    const nextFeedback = evaluatePrediction({ evaluation, selection });
    setSelectionMessage(null);
    onSubmit(selection, nextFeedback);
  }

  function openReview(symbolId: CareSymbolId, event: MouseEvent<HTMLButtonElement>) {
    lastReviewTrigger.current = event.currentTarget;
    setOpenSymbolId(symbolId);
  }

  function closeReview() {
    setOpenSymbolId(null);
    lastReviewTrigger.current?.focus();
  }

  return (
    <section className="forecast-screen" data-app-step="forecast" aria-labelledby="forecast-title">
      <p className="eyebrow">네 번째 단계</p>
      <h2 id="forecast-title">손상 가능성 예보</h2>
      <p>처음 세운 관리 계획을 보고, 생길 수 있는 변화를 위험이 아닌 가능성으로 골라 봐요.</p>
      <p className="learning-boundary">확률이나 실제 손상 사진은 사용하지 않아요. 표시와 가상 계획을 연결해 상대적으로 살펴봅니다.</p>

      <fieldset className="risk-card-grid">
        <legend>가능한 변화를 하나 이상 선택</legend>
        {riskIds.map((riskId) => (
          <RiskCard
            key={riskId}
            riskId={riskId}
            selected={selectedRisks.includes(riskId)}
            onToggle={toggleRisk}
          />
        ))}
      </fieldset>

      <fieldset className="evidence-list">
        <legend>관련 표시를 근거로 하나 이상 선택</legend>
        <p>선택한 표시는 왜 그렇게 생각했는지 보여 주는 근거예요.</p>
        {symbols.map((symbol) => {
          const label = `${evidenceLabel(symbol)}를 근거로 선택 — ${symbol.name}`;
          return (
            <label key={symbol.id} className="evidence-item">
              <input
                type="checkbox"
                data-evidence-symbol-id={symbol.id}
                checked={selectedReasons.includes(symbol.id)}
                aria-describedby={`evidence-description-${symbol.id}`}
                onChange={(event) => toggleReason(symbol.id, event.currentTarget.checked)}
              />
              <span>
                <strong>{label}</strong>
                <span id={`evidence-description-${symbol.id}`} className="evidence-description">{symbol.shortDescription}</span>
              </span>
            </label>
          );
        })}
      </fieldset>

      {selectionMessage && <p className="forecast-message" role="status" aria-live="polite">{selectionMessage}</p>}
      {feedback && (
        <div className="forecast-feedback" role="status" aria-live="polite">
          <h3>예보 피드백</h3>
          <p>{feedbackSummary(feedback)}</p>
          {needsEvidenceReview && (
            <div className="evidence-review">
              <p>근거가 부족해요. 관련 표시의 확대경 내용을 다시 확인해 보세요.</p>
              {reviewSymbolIds.map((symbolId) => {
                const symbol = symbols.find((item) => item.id === symbolId);
                if (!symbol) return null;
                return (
                  <button
                    key={symbolId}
                    type="button"
                    className="evidence-review-button"
                    data-review-symbol-id={symbolId}
                    onClick={(event) => openReview(symbolId, event)}
                  >
                    {symbol.name} 표시 다시 확인
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {openSymbol && (
        <div className="symbol-review-dialog" role="dialog" aria-modal="true" aria-labelledby="symbol-review-title" tabIndex={-1} ref={dialogRef}>
          <div className="symbol-review-dialog-card" data-symbol-id={openSymbol.id}>
            <p className="eyebrow">관련 표시 확대경</p>
            <h3 id="symbol-review-title">{openSymbol.name} 다시 확인</h3>
            <SymbolFigure symbol={openSymbol} expanded descriptionRef={undefined} />
            <button type="button" className="dialog-close-button" onClick={closeReview}>예보 화면으로 돌아가기</button>
          </div>
        </div>
      )}

      <SafetyNotice />
      <button type="button" className="primary-action" onClick={submit}>손상 예보 확인</button>
      <button type="button" className="simulation-action" disabled={feedback === null} onClick={onShowSimulation}>가상 결과 보기</button>
    </section>
  );
}
