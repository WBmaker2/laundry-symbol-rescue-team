import { useEffect, useRef, useState } from 'react';
import type { GarmentMission } from '../../domain/missionTypes';
import type { CareSymbol } from '../../domain/careTypes';
import type { InterpretationFeedback } from '../../domain/evaluationTypes';
import type { SymbolInterpretationAttempt } from '../../domain/sessionReducer';
import { careSymbolById } from '../../content/symbols';
import { missionById } from '../../content/missions';
import { validatePublishedSymbolCatalog } from '../../content/validateSymbolCatalog';
import { validateMissionCatalog } from '../../content/validateMissionCatalog';
import { CareSymbolCard } from './CareSymbolCard';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { learnerGlossaryTerms } from '../../content/learnerCopy';
import { StepIntro } from '../../components/ui/StepIntro';

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
      <h2 id="magnifier-error-title" data-step-heading="true" tabIndex={-1}>표시 자료를 불러올 수 없어요</h2>
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
  const symbols = missionSymbols(mission);
  const completedIds = new Set(
    interpretations.filter(({ isCorrect }) => isCorrect).map(({ symbolId }) => symbolId),
  );
  const activeSymbol = symbols?.find((symbol) => !completedIds.has(symbol.id));
  const activeSymbolHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousSymbolIdRef = useRef<string | null>(null);

  useEffect(() => {
    const symbolId = activeSymbol?.id;
    if (!symbolId) return;
    if (previousSymbolIdRef.current === null) {
      previousSymbolIdRef.current = symbolId;
      return;
    }
    if (previousSymbolIdRef.current === symbolId) return;
    previousSymbolIdRef.current = symbolId;
    const heading = activeSymbolHeadingRef.current;
    if (!heading) return;
    heading.scrollIntoView?.({ block: 'start', behavior: 'auto' });
    heading.focus({ preventScroll: true });
  }, [activeSymbol?.id]);

  if (!validatePublishedSymbolCatalog(careSymbolById)
    || !validateMissionCatalog(missionById, careSymbolById)
    || !symbols) return <CatalogError />;

  if (!activeSymbol) {
    return (
      <section className="magnifier-screen" data-app-step="magnifier" aria-labelledby="magnifier-title">
        <h2 id="magnifier-title" data-step-heading="true" tabIndex={-1}>표시 해석을 모두 확인했어요</h2>
        <p>모든 고유 표시를 맞혔어요. 이제 관리 순서판으로 이어집니다.</p>
      </section>
    );
  }

  const completedCount = completedIds.size;
  const latestAttempt = [...interpretations].reverse().find(({ symbolId }) => symbolId === activeSymbol.id);
  return (
    <section className="magnifier-screen" data-app-step="magnifier" aria-labelledby="magnifier-title">
      <StepIntro
        eyebrow="두 번째 단계"
        title="표시 확대경"
        titleId="magnifier-title"
        description="한 번에 표시 하나씩 살펴봐요. 틀려도 같은 표시에서 다시 생각할 수 있어요."
        nextActionLabel="뜻 후보를 고르고 뜻 확인을 눌러요."
      />
      <p className="symbol-progress" aria-live="polite">표시 진행: {completedCount}/{symbols.length}</p>
      <CareSymbolCard
        key={activeSymbol.id}
        symbol={activeSymbol}
        attempt={latestAttempt}
        headingRef={activeSymbolHeadingRef}
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
          {learnerGlossaryTerms.map(([term, description]) => (
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
