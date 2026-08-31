import { useRef, useState } from 'react';
import type { CareOptionId, CareSymbolId, PlanningStage } from '../../domain/careTypes';
import type { GarmentMission, GroupingChoice, StudentPlan } from '../../domain/missionTypes';
import type { GroupingEvaluation } from '../../domain/evaluateGrouping';
import type { PlanEvaluation } from '../../domain/evaluationTypes';
import { careOptionById, careOptions } from '../../content/careOptions';
import { careSymbolById } from '../../content/symbols';
import { evaluateGrouping } from '../../domain/evaluateGrouping';
import { evaluatePlan } from '../../domain/evaluatePlan';
import { ActionButton } from '../../components/ui/ActionButton';
import { CurrentPlanSummary } from './CurrentPlanSummary';
import { CareOptionCard } from './CareOptionCard';
import { SafetyNotice } from '../../components/ui/SafetyNotice';
import { PlanStageNavigator } from './PlanStageNavigator';
import { StepIntro } from '../../components/ui/StepIntro';

const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron'];
const stageLabels: Readonly<Record<PlanningStage, string>> = {
  wash: '세탁',
  dry: '건조',
  iron: '다림질',
};

function emptyStageOptions(): Record<PlanningStage, CareOptionId | null> {
  return { wash: null, dry: null, iron: null };
}

function initialGrouping(mission: GarmentMission): GroupingChoice | null {
  return mission.requiresGrouping
    ? { togetherGarmentIds: [], separateGarmentIds: [], reasonSymbolIds: [] }
    : null;
}

function restrictionIds(mission: GarmentMission): readonly CareSymbolId[] {
  return [...new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds))]
    .filter((id) => careSymbolById.get(id)?.requiresAcknowledgement);
}

export interface ManagementBoardScreenProps {
  mission: GarmentMission;
  mode?: 'initial' | 'revision';
  initialPlan?: StudentPlan | null;
  onSubmit: (plan: StudentPlan, evaluation: PlanEvaluation, groupingEvaluation: GroupingEvaluation | null) => void;
}

export function ManagementBoardScreen({ mission, mode = 'initial', initialPlan = null, onSubmit }: ManagementBoardScreenProps) {
  const [stageOptions, setStageOptions] = useState(() => initialPlan?.stageOptions ?? emptyStageOptions());
  const [selectedOptionId, setSelectedOptionId] = useState<CareOptionId | null>(null);
  const [acknowledgedRestrictionIds, setAcknowledgedRestrictionIds] = useState<CareSymbolId[]>(() => [...(initialPlan?.acknowledgedRestrictionIds ?? [])]);
  const [grouping, setGrouping] = useState<GroupingChoice | null>(() => initialPlan?.grouping ?? initialGrouping(mission));
  const [message, setMessage] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<PlanningStage>(() => stages.find((stage) => initialPlan?.stageOptions[stage] === null) ?? 'wash');
  const headingRefs = useRef<Partial<Record<PlanningStage, HTMLHeadingElement | null>>>({});
  const restrictions = restrictionIds(mission);
  const selectedOption = selectedOptionId === null ? undefined : careOptionById.get(selectedOptionId);
  const visibleCareOptions = careOptions.filter((option) => option.stage === activeStage);

  function chooseOption(optionId: CareOptionId) {
    setSelectedOptionId(optionId);
    setMessage(null);
  }

  function placeOption(stage: PlanningStage) {
    if (!selectedOption || selectedOption.stage !== stage) return;
    setStageOptions((current) => ({ ...current, [stage]: selectedOption.id }));
    setSelectedOptionId(null);
    if (mode === 'revision') {
      const currentIndex = stages.indexOf(stage);
      setActiveStage(stages[(currentIndex + 1) % stages.length] ?? stage);
    } else {
      setActiveStage(stages.find((nextStage) => nextStage !== stage && stageOptions[nextStage] === null) ?? stage);
    }
    setMessage(null);
  }

  function toggleRestriction(symbolId: CareSymbolId) {
    setAcknowledgedRestrictionIds((current) => current.includes(symbolId)
      ? current.filter((id) => id !== symbolId)
      : [...current, symbolId]);
  }

  function assignGarment(garmentId: string, destination: 'together' | 'separate') {
    setGrouping((current) => {
      if (!current) return current;
      const togetherGarmentIds = destination === 'together'
        ? [...current.togetherGarmentIds.filter((id) => id !== garmentId), garmentId]
        : current.togetherGarmentIds.filter((id) => id !== garmentId);
      const separateGarmentIds = destination === 'separate'
        ? [...current.separateGarmentIds.filter((id) => id !== garmentId), garmentId]
        : current.separateGarmentIds.filter((id) => id !== garmentId);
      return {
        ...current,
        togetherGarmentIds: [...new Set(togetherGarmentIds)],
        separateGarmentIds: [...new Set(separateGarmentIds)],
      };
    });
    setMessage(null);
  }

  function toggleReason(symbolId: CareSymbolId) {
    setGrouping((current) => {
      if (!current) return current;
      const reasonSymbolIds = current.reasonSymbolIds.includes(symbolId)
        ? current.reasonSymbolIds.filter((id) => id !== symbolId)
        : [...current.reasonSymbolIds, symbolId];
      return { ...current, reasonSymbolIds };
    });
  }

  function submit() {
    const plan: StudentPlan = {
      missionId: mission.id,
      garmentIds: mission.garments.map(({ id }) => id),
      stageOptions,
      acknowledgedRestrictionIds,
      grouping,
    };
    const evaluation = evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById });
    const missingStage = stages.find((stage) => evaluation.findings.some(
      (finding) => finding.stage === stage && finding.status === 'missing-step',
    ));
    if (missingStage) {
      setMessage('세탁·건조·다림질 단계를 모두 채운 뒤 확인해 주세요.');
      headingRefs.current[missingStage]?.focus();
      return;
    }
    if (mission.requiresGrouping && grouping) {
      const assigned = [...grouping.togetherGarmentIds, ...grouping.separateGarmentIds];
      if (assigned.length !== mission.garments.length || new Set(assigned).size !== mission.garments.length) {
        setMessage('세 벌을 함께 관리하거나 따로 관리하는 그룹에 모두 배정해 주세요.');
        return;
      }
      const groupingEvaluation = evaluateGrouping({
        mission,
        grouping,
        symbols: careSymbolById,
        options: careOptionById,
      });
      onSubmit(plan, evaluation, groupingEvaluation);
      return;
    }
    onSubmit(plan, evaluation, null);
  }

  return (
    <section className="management-board" data-mission-id={mission.id} aria-labelledby="management-board-title">
      {mode === 'initial' ? (
        <StepIntro
          eyebrow="세 번째 단계"
          title="관리 순서판"
          titleId="management-board-title"
          description="관리 방법 카드를 먼저 고르고, 카드를 놓을 단계를 버튼으로 선택해요."
          nextActionLabel="관리 방법 카드 하나를 고른 뒤 맞는 단계에 놓아요."
        />
      ) : (
        <>
          <p className="eyebrow">여섯 번째 단계</p>
          <h2 id="management-board-title">새 수정 계획 만들기</h2>
          <p>최초 계획을 살펴본 뒤, 바꿀 카드만 다시 골라 단계에 놓아요.</p>
        </>
      )}
      <p className="learning-boundary">카드의 조건은 가상 재료 모형을 비교하는 학습 자료예요. 실제 옷은 제품 라벨과 보호자·교사 안내를 먼저 확인해요.</p>

      <PlanStageNavigator
        activeStage={activeStage}
        completedStages={stages.filter((stage) => stageOptions[stage] !== null)}
        onStageChange={(stage) => {
          setActiveStage(stage);
          headingRefs.current[stage]?.scrollIntoView?.({ block: 'start', behavior: 'auto' });
        }}
      />

      <CurrentPlanSummary
        stageOptions={stageOptions}
        options={careOptionById}
        acknowledgedRestrictionIds={acknowledgedRestrictionIds}
        restrictionCount={restrictions.length}
      />

      <div className="plan-stage-list" aria-label="관리 단계 배치">
        {stages.map((stage) => (
          <section key={stage} className="plan-stage" aria-labelledby={`${stage}-stage-title`}>
            <h3
              id={`${stage}-stage-title`}
              tabIndex={-1}
              ref={(node) => { headingRefs.current[stage] = node; }}
            >
              {stageLabels[stage]} 단계
            </h3>
            <ActionButton
              type="button"
              className="stage-place-button"
              aria-pressed={stageOptions[stage] !== null}
              disabled={!selectedOption || selectedOption.stage !== stage}
              aria-describedby={!selectedOption || selectedOption.stage !== stage ? `${stage}-stage-help` : undefined}
              onClick={() => placeOption(stage)}
            >
              {stageLabels[stage]} 단계에 놓기
            </ActionButton>
            {(!selectedOption || selectedOption.stage !== stage) && (
              <p id={`${stage}-stage-help`} className="plan-stage-help">
                {!selectedOption ? '카드를 먼저 고르면 이 단계에 놓을 수 있어요.' : `지금 고른 카드는 ${stageLabels[selectedOption.stage]} 단계에 놓을 수 있어요.`}
              </p>
            )}
          </section>
        ))}
      </div>

      <section className="care-options" aria-labelledby="care-options-title">
        <h3 id="care-options-title">관리 방법 카드 고르기</h3>
        <p className="stage-option-hint" role="status" aria-live="polite">
          지금은 {stageLabels[activeStage]} 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요.
        </p>
        <div className="care-option-grid">
          {visibleCareOptions.map((option) => (
            <CareOptionCard
              key={option.id}
              option={option}
              stageLabel={stageLabels[option.stage]}
              selected={selectedOptionId === option.id}
              onSelect={chooseOption}
            />
          ))}
        </div>
        {selectedOption ? (
          <div className="selected-option-action" aria-label="선택 카드 배치">
            <p><strong>{careOptionById.get(selectedOption.id)?.label ?? selectedOption.id}</strong> 카드를 골랐어요. 이제 {stageLabels[selectedOption.stage]} 단계에 놓아 보세요.</p>
            <ActionButton
              type="button"
              className="selected-option-place-button"
              onClick={() => placeOption(selectedOption.stage)}
            >
              선택한 카드 {stageLabels[selectedOption.stage]} 단계에 놓기
            </ActionButton>
          </div>
        ) : (
          <p className="selection-help" role="status" aria-live="polite">먼저 관리 방법 카드 하나를 골라 주세요.</p>
        )}
      </section>

      {restrictions.length > 0 && (
        <fieldset className="restriction-list">
          <legend>추가 제한 확인</legend>
          <p>표시의 추가 제한도 확인했는지 선택해요.</p>
          {restrictions.map((symbolId) => {
            const symbol = careSymbolById.get(symbolId);
            if (!symbol) return null;
            return (
              <label key={symbolId} className="restriction-item">
                <input
                  type="checkbox"
                  data-restriction-id={symbolId}
                  checked={acknowledgedRestrictionIds.includes(symbolId)}
                  onChange={() => toggleRestriction(symbolId)}
                />
                <span>{symbol.name} 확인</span>
              </label>
            );
          })}
        </fieldset>
      )}

      {mission.requiresGrouping && grouping && (
        <section className="grouping-board" aria-labelledby="grouping-title">
          <h3 id="grouping-title">세 벌을 함께 또는 따로 관리하기</h3>
          <p>각 옷을 한 번씩 그룹에 배정하고, 따로 둔 옷은 표시 근거를 골라요.</p>
          <div className="mixed-garment-list">
            {mission.garments.map((garment) => (
              <article key={garment.id} className="mixed-garment" data-garment-id={garment.id}>
                <h4>{garment.name}</h4>
                <div className="grouping-actions">
                  <ActionButton
                    type="button"
                    className="grouping-choice"
                    aria-label={`함께 관리 — ${garment.name}`}
                    aria-pressed={grouping.togetherGarmentIds.includes(garment.id)}
                    onClick={() => assignGarment(garment.id, 'together')}
                  >
                    함께 관리
                  </ActionButton>
                  <ActionButton
                    type="button"
                    className="grouping-choice"
                    aria-label={`분리 관리 — ${garment.name}`}
                    aria-pressed={grouping.separateGarmentIds.includes(garment.id)}
                    onClick={() => assignGarment(garment.id, 'separate')}
                  >
                    분리 관리
                  </ActionButton>
                </div>
              </article>
            ))}
          </div>
          <fieldset className="grouping-reasons">
            <legend>분리 근거 표시 선택</legend>
            {careSymbolById && [...new Set(mission.garments.flatMap(({ symbolIds }) => symbolIds))].map((symbolId) => {
              const symbol = careSymbolById.get(symbolId);
              if (!symbol) return null;
              return (
                <label key={symbolId} className="restriction-item">
                  <input
                    type="checkbox"
                    data-grouping-reason-symbol-id={symbolId}
                    checked={grouping.reasonSymbolIds.includes(symbolId)}
                    onChange={() => toggleReason(symbolId)}
                  />
                  <span>{symbol.name} 표시를 분리 근거로 선택</span>
                </label>
              );
            })}
          </fieldset>
        </section>
      )}

      {message && <p className="plan-message" role="status" aria-live="polite">{message}</p>}
      <SafetyNotice />
      <ActionButton type="button" className="primary-action" emphasis="required" onClick={submit}>
        {mode === 'revision' ? '수정 계획 확인' : '관리 계획 확인'}
      </ActionButton>
    </section>
  );
}
