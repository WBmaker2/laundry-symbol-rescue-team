import { useState } from 'react';
import type { GarmentMission } from '../../domain/missionTypes';
import type { CareSymbol } from '../../domain/careTypes';
import type { InterpretationFeedback } from '../../domain/evaluationTypes';
import type { SymbolInterpretationAttempt } from '../../domain/sessionReducer';
import { careSymbolById } from '../../content/symbols';
import { validatePublishedSymbolCatalog } from '../../content/validateSymbolCatalog';
import { CareSymbolCard } from './CareSymbolCard';
import { SafetyNotice } from '../../components/ui/SafetyNotice';

const glossaryTerms = [
  ['완화 조건', '강한 과정 대신 옷을 덜 자극하는 조건을 말해요.'],
  ['회전식 건조', '통이 돌아가며 옷을 말리는 방법을 말해요.'],
  ['전문 관리', '가정에서 바로 처리하기 전에 보호자나 전문가에게 확인하는 범위예요.'],
  ['학습용 재료 모형', '실제 옷의 성능을 재는 자료가 아니라 수업을 위한 가상 재료예요.'],
] as const;

function missionSymbols(mission: GarmentMission): readonly CareSymbol[] | null {
  if (!mission || !Array.isArray(mission.garments) || mission.garments.length === 0) return null;
  const ids: string[] = [];
  for (const garment of mission.garments) {
    if (!garment || !Array.isArray(garment.symbolIds)) return null;
    for (const id of garment.symbolIds) if (!ids.includes(id)) ids.push(id);
  }
  const symbols = ids.map((id) => careSymbolById.get(id as CareSymbol['id']));
  if (symbols.length === 0 || symbols.some((symbol) => symbol === undefined)) return null;
  return symbols as readonly CareSymbol[];
}

function CatalogError() {
  return (
    <section className="magnifier-error" role="alert" aria-labelledby="magnifier-error-title">
      <h2 id="magnifier-error-title">표시 자료를 불러올 수 없어요</h2>
      <p>이 미션의 표시 자료가 완전하지 않아 해석 활동을 안전하게 시작할 수 없어요.</p>
      <p>표시를 건너뛰지 않고, 보호자·교사에게 자료를 확인해 달라고 요청해 주세요.</p>
    </section>
  );
}

export function SymbolMagnifierScreen({
  mission,
  interpretations,
  onChoose,
}: {
  mission: GarmentMission;
  interpretations: readonly SymbolInterpretationAttempt[];
  onChoose: (attempt: SymbolInterpretationAttempt) => void;
}) {
  const [lastCorrectFeedback, setLastCorrectFeedback] = useState<InterpretationFeedback | null>(null);
  if (!validatePublishedSymbolCatalog(careSymbolById)) return <CatalogError />;
  const symbols = missionSymbols(mission);
  if (!symbols) return <CatalogError />;

  const completedIds = new Set(
    interpretations.filter(({ isCorrect }) => isCorrect).map(({ symbolId }) => symbolId),
  );
  const activeSymbol = symbols.find((symbol) => !completedIds.has(symbol.id));
  if (!activeSymbol) {
    return (
      <section className="magnifier-screen" data-app-step="magnifier" aria-labelledby="magnifier-title">
        <h2 id="magnifier-title">표시 해석을 모두 확인했어요</h2>
        <p>모든 고유 표시를 맞혔어요. 이제 관리 순서판으로 이어집니다.</p>
      </section>
    );
  }

  const completedCount = completedIds.size;
  const latestAttempt = [...interpretations].reverse().find(({ symbolId }) => symbolId === activeSymbol.id);
  return (
    <section className="magnifier-screen" data-app-step="magnifier" aria-labelledby="magnifier-title">
      <p className="eyebrow">두 번째 단계</p>
      <h2 id="magnifier-title">표시 확대경</h2>
      <p className="symbol-progress" aria-live="polite">표시 진행: {completedCount}/{symbols.length}</p>
      <p>한 번에 표시 하나씩 살펴봐요. 틀려도 같은 표시에서 다시 생각할 수 있어요.</p>
      <CareSymbolCard
        key={activeSymbol.id}
        symbol={activeSymbol}
        attempt={latestAttempt}
        onChoose={(attempt, feedback) => {
          setLastCorrectFeedback(feedback.isCorrect ? feedback : null);
          onChoose(attempt);
        }}
      />
      {lastCorrectFeedback && (
        <p className="interpretation-feedback" role="status" aria-live="polite">
          {lastCorrectFeedback.returnPrompt}
        </p>
      )}
      <details className="glossary-help">
        <summary>용어 도움</summary>
        <dl>
          {glossaryTerms.map(([term, description]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{description}</dd>
            </div>
          ))}
        </dl>
      </details>
      <SafetyNotice />
      <p className="adult-safety-reminder">실제 라벨과 어려운 관리는 보호자·교사와 함께 확인해요.</p>
    </section>
  );
}
