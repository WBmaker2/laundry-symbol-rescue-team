import { useRef, useState } from 'react';
import { MissionPicker } from '../features/mission/MissionPicker';
import { RescueRequestScreen } from '../features/mission/RescueRequestScreen';
import { HighContrastToggle } from '../components/ui/HighContrastToggle';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { useLearnerSession } from './useLearnerSession';
import { missionById } from '../content/missions';
import type { SessionStep } from '../domain/sessionReducer';
import { SymbolMagnifierScreen } from '../features/magnifier/SymbolMagnifierScreen';
import { ManagementBoardScreen } from '../features/plan/ManagementBoardScreen';
import { DamageForecastScreen } from '../features/forecast/DamageForecastScreen';
import { VirtualCareScreen } from '../features/simulation/VirtualCareScreen';
import { RevisionScreen } from '../features/revision/RevisionScreen';
import { RescueReportScreen } from '../features/report/RescueReportScreen';
import { UpdateHistoryButton } from '../features/updates/UpdateHistoryButton';
import { UpdateHistoryDialog } from '../features/updates/UpdateHistoryDialog';
import './app-shell.css';

function StepContent({ step }: { step: SessionStep }) {
  const { state, dispatch } = useLearnerSession();
  switch (step) {
    case 'request': {
      if (state.missionId === null) {
        return <MissionPicker onSelect={(missionId) => dispatch({ type: 'SELECT_MISSION', missionId })} />;
      }
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('선택한 미션을 찾을 수 없습니다.');
      return <RescueRequestScreen mission={mission} onOpenMagnifier={() => dispatch({ type: 'OPEN_MAGNIFIER' })} />;
    }
    case 'magnifier': {
      if (state.missionId === null) throw new Error('표시 확대경을 열 미션이 없습니다.');
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('표시 확대경의 미션을 찾을 수 없습니다.');
      return (
        <SymbolMagnifierScreen
          mission={mission}
          interpretations={state.interpretations}
          onChoose={(attempt) => dispatch({ type: 'RECORD_INTERPRETATION', attempt })}
        />
      );
    }
    case 'plan': {
      if (state.missionId === null) throw new Error('관리 순서판을 열 미션이 없습니다.');
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('관리 순서판의 미션을 찾을 수 없습니다.');
      return (
        <ManagementBoardScreen
          mission={mission}
          onSubmit={(plan, evaluation, groupingEvaluation) => dispatch({
            type: 'SUBMIT_INITIAL_PLAN', plan, evaluation, groupingEvaluation,
          })}
        />
      );
    }
    case 'forecast': {
      if (state.missionId === null || state.initialEvaluation === null) {
        throw new Error('손상 예보의 초기 평가가 없습니다.');
      }
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('손상 예보의 미션을 찾을 수 없습니다.');
      return (
        <DamageForecastScreen
          mission={mission}
          evaluation={state.initialEvaluation}
          prediction={state.prediction}
          predictionFeedback={state.predictionFeedback}
          onSubmit={(selection, feedback) => dispatch({ type: 'SUBMIT_PREDICTION', selection, feedback })}
          onShowSimulation={() => dispatch({ type: 'SHOW_SIMULATION' })}
        />
      );
    }
    case 'simulation': {
      if (state.missionId === null || state.initialPlan === null || state.initialEvaluation === null) {
        throw new Error('가상 결과에 필요한 처음 계획 자료가 없습니다.');
      }
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('가상 결과의 미션을 찾을 수 없습니다.');
      return (
        <VirtualCareScreen
          mission={mission}
          plan={state.initialPlan}
          evaluation={state.initialEvaluation}
          predictionFeedback={state.predictionFeedback}
          onStartRevision={() => dispatch({ type: 'START_REVISION' })}
        />
      );
    }
    case 'revision': {
      if (state.missionId === null || state.initialPlan === null || state.initialEvaluation === null) {
        throw new Error('수정 계획에 필요한 처음 계획 자료가 없습니다.');
      }
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('수정 계획의 미션을 찾을 수 없습니다.');
      return (
        <RevisionScreen
          mission={mission}
          initialPlan={state.initialPlan}
          initialEvaluation={state.initialEvaluation}
          initialGroupingEvaluation={state.initialGroupingEvaluation}
          prediction={state.prediction}
          predictionFeedback={state.predictionFeedback}
          onSubmit={(plan, evaluation, groupingEvaluation, evidence) => dispatch({
            type: 'SUBMIT_REVISION', plan, evaluation, groupingEvaluation, evidence,
          })}
        />
      );
    }
    case 'report': {
      if (state.missionId === null || !state.initialPlan || !state.initialEvaluation || !state.revisedPlan || !state.revisedEvaluation || !state.revisionEvidence) {
        throw new Error('구조 보고서에 필요한 세션 자료가 없습니다.');
      }
      const mission = missionById.get(state.missionId);
      if (!mission) throw new Error('구조 보고서의 미션을 찾을 수 없습니다.');
      return (
        <RescueReportScreen
          mission={mission}
          interpretations={state.interpretations}
          initialPlan={state.initialPlan}
          initialEvaluation={state.initialEvaluation}
          initialGroupingEvaluation={state.initialGroupingEvaluation}
          prediction={state.prediction}
          predictionFeedback={state.predictionFeedback}
          revisedPlan={state.revisedPlan}
          revisedEvaluation={state.revisedEvaluation}
          revisedGroupingEvaluation={state.revisedGroupingEvaluation}
          revisionEvidence={state.revisionEvidence}
        />
      );
    }
    default: {
      const unknownStep: never = step;
      throw new Error(`알 수 없는 학습 단계예요: ${String(unknownStep)}`);
    }
  }
}

export function AppShell() {
  const { state } = useLearnerSession();
  const [highContrast, setHighContrast] = useState(false);
  const [updateHistoryOpen, setUpdateHistoryOpen] = useState(false);
  const updateHistoryButtonRef = useRef<HTMLButtonElement>(null);
  const mission = state.missionId === null ? null : missionById.get(state.missionId);

  return (
    <div
      className="app-shell"
      data-testid="app-shell"
      data-contrast={highContrast ? 'high' : 'normal'}
    >
      <header className="app-header">
        <div>
          <h1 className="service-name">세탁표시 구조대</h1>
          <p className="mission-status">{mission ? `현재 미션: ${mission.title}` : '미션을 선택하지 않았어요.'}</p>
        </div>
        <HighContrastToggle enabled={highContrast} onToggle={() => setHighContrast((value) => !value)} />
        <ProgressIndicator currentStep={state.step} />
      </header>
      <main className="app-main" data-app-step={state.step}>
        <StepContent step={state.step} />
      </main>
      <footer className="app-footer">
        <span>가상 학습 도구 · 실제 제품 안내를 대신하지 않아요.</span>
        <UpdateHistoryButton
          buttonRef={updateHistoryButtonRef}
          expanded={updateHistoryOpen}
          onClick={() => setUpdateHistoryOpen((open) => !open)}
        />
      </footer>
      <UpdateHistoryDialog
        open={updateHistoryOpen}
        onClose={() => setUpdateHistoryOpen(false)}
        triggerRef={updateHistoryButtonRef}
      />
    </div>
  );
}
