import { useEffect, useRef, useState, type MouseEvent } from 'react';
import type { CareSymbol, CareSymbolId, DamageRiskId } from '../../domain/careTypes';
import type { GarmentMission } from '../../domain/missionTypes';
import { evaluatePrediction, type PredictionFeedback, type PredictionSelection } from '../../domain/evaluatePrediction';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import { careSymbolById } from '../../content/symbols';
import { missionById } from '../../content/missions';
import { validatePublishedSymbolCatalog } from '../../content/validateSymbolCatalog';
import { validateMissionCatalog } from '../../content/validateMissionCatalog';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { SymbolFigure } from '../../components/ui/SymbolFigure';
import { RiskCard } from './RiskCard';
import { learnerPredictionMessage, learnerRiskCopy } from '../../content/learnerCopy';
import { ActionButton } from '../../components/ui/ActionButton';
import { StepIntro } from '../../components/ui/StepIntro';

const riskIds: readonly DamageRiskId[] = [
  'shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage',
];

function unique<T>(values: readonly T[]): readonly T[] {
  return [...new Set(values)];
}

function sameIds(left: readonly string[], right: readonly string[]): boolean {
  return left.length === right.length && left.every((id) => right.includes(id));
}

function missionSymbols(mission: GarmentMission): readonly CareSymbol[] | null {
  const candidates: readonly (CareSymbol | undefined)[] = unique(mission.garments.flatMap(({ symbolIds }) => symbolIds))
    .map((symbolId) => careSymbolById.get(symbolId));
  if (candidates.some((symbol) => symbol === undefined)) return null;
  return candidates as readonly CareSymbol[];
}

function CatalogError() {
  return (
    <section className="magnifier-error" role="alert" aria-labelledby="forecast-error-title">
      <h2 id="forecast-error-title" data-step-heading="true" tabIndex={-1}>표시 자료를 불러올 수 없어요</h2>
      <p>이 미션의 표시 자료가 완전하지 않아 손상 예보를 안전하게 시작할 수 없어요.</p>
      <p>표시를 건너뛰지 않고, 보호자·교사에게 자료를 확인해 달라고 요청해 주세요.</p>
    </section>
  );
}

function evidenceLabel(symbol: CareSymbol): string {
  if (symbol.category === 'iron') return '다림질 제한 표시';
  if (symbol.category === 'dry') return '건조 제한 표시';
  if (symbol.category === 'wash') return '세탁 제한 표시';
  if (symbol.category === 'bleach') return '표백 제한 표시';
  return '관리 제한 표시';
}

function feedbackDetailLines(feedback: PredictionFeedback, symbols: readonly CareSymbol[]): readonly string[] {
  const riskNames = (ids: readonly DamageRiskId[]) => ids.map((riskId) => learnerRiskCopy[riskId].label).join(', ') || '없음';
  const symbolNames = (ids: readonly CareSymbolId[]) => ids.map((symbolId) => symbols.find((symbol) => symbol.id === symbolId)?.name ?? '표시').join(', ') || '없음';
  return [
    `연결된 위험: ${riskNames(feedback.supportedRiskIds)} (${feedback.supportedRiskIds.length}개)`,
    `연결되지 않은 위험: ${riskNames(feedback.unsupportedRiskIds)}`,
    `놓친 위험: ${riskNames(feedback.missedRiskIds)}`,
    `연결된 근거 표시: ${symbolNames(feedback.supportedReasonSymbolIds)} (${feedback.supportedReasonSymbolIds.length}개)`,
    `연결되지 않은 근거 표시: ${symbolNames(feedback.unsupportedReasonSymbolIds)}`,
  ];
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
  const catalogIsValid = validatePublishedSymbolCatalog(careSymbolById)
    && validateMissionCatalog(missionById, careSymbolById);
  const availableSymbols = symbols ?? [];
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
  ]).filter((symbolId) => availableSymbols.some((symbol) => symbol.id === symbolId));
  const openSymbol = openSymbolId === null ? undefined : availableSymbols.find((symbol) => symbol.id === openSymbolId);

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

  if (!catalogIsValid || !symbols) return <CatalogError />;

  return (
    <section className="forecast-screen" data-app-step="forecast" aria-labelledby="forecast-title">
      <StepIntro
        eyebrow="네 번째 단계"
        title="손상 가능성 예보"
        titleId="forecast-title"
        description="처음 세운 관리 계획을 보고, 생길 수 있는 변화를 위험이 아닌 가능성으로 골라 봐요."
        nextActionLabel="가능한 변화와 관련 표시를 고른 뒤 손상 예보를 확인해요."
      />
      <p className="learning-boundary">확률이나 실제 손상 사진은 사용하지 않아요. 표시와 가상 계획을 연결해 상대적으로 살펴봅니다.</p>

      <fieldset className="risk-card-grid" aria-describedby="risk-selection-description">
        <legend>손상 가능성</legend>
        <p id="risk-selection-description">가능한 변화를 하나 이상 선택해요.</p>
        {riskIds.map((riskId) => (
          <RiskCard
            key={riskId}
            riskId={riskId}
            selected={selectedRisks.includes(riskId)}
            onToggle={toggleRisk}
          />
        ))}
      </fieldset>

      <fieldset className="evidence-list" aria-describedby="evidence-selection-description">
        <legend>근거 표시</legend>
        <p id="evidence-selection-description">관련 표시를 근거로 하나 이상 선택해요.</p>
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
        <div className="forecast-feedback">
          <div role="status" aria-live="polite">
            <h3>예보 피드백</h3>
            <p>{learnerPredictionMessage(feedback, (symbolId) => symbols.find((symbol) => symbol.id === symbolId)?.name ?? '관련 표시')}</p>
          </div>
          <details className="forecast-detail">
            <summary>자세한 연결 결과 보기</summary>
            <ul>{feedbackDetailLines(feedback, symbols).map((line) => <li key={line}>{line}</li>)}</ul>
          </details>
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
        <div
          className="symbol-review-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="symbol-review-title"
          tabIndex={-1}
          ref={dialogRef}
          onKeyDown={(event) => { if (event.key === 'Escape') closeReview(); }}
        >
          <div className="symbol-review-dialog-card" data-symbol-id={openSymbol.id}>
            <p className="eyebrow">관련 표시 확대경</p>
            <h3 id="symbol-review-title">{openSymbol.name} 다시 확인</h3>
            <SymbolFigure symbol={openSymbol} expanded descriptionRef={undefined} />
            <button type="button" className="dialog-close-button" onClick={closeReview}>예보 화면으로 돌아가기</button>
          </div>
        </div>
      )}

      <SafetyNotice />
      <ActionButton type="button" className="primary-action" emphasis={feedback === null ? 'required' : 'normal'} onClick={submit}>손상 예보 확인</ActionButton>
      <ActionButton type="button" className="simulation-action" emphasis={feedback === null ? 'normal' : 'required'} disabled={feedback === null} onClick={onShowSimulation}>가상 결과 보기</ActionButton>
    </section>
  );
}
