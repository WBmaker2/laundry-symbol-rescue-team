import { useState } from 'react';
import { MissionPicker } from '../features/mission/MissionPicker';
import { RescueRequestScreen } from '../features/mission/RescueRequestScreen';
import { HighContrastToggle } from '../components/ui/HighContrastToggle';
import { ProgressIndicator } from '../components/ui/ProgressIndicator';
import { useLearnerSession } from './useLearnerSession';
import { missionById } from '../content/missions';
import type { SessionStep } from '../domain/sessionReducer';
import { SymbolMagnifierScreen } from '../features/magnifier/SymbolMagnifierScreen';
import { ManagementBoardScreen } from '../features/plan/ManagementBoardScreen';
import './app-shell.css';
import '../styles/motion.css';

function FutureStepPlaceholder({ step, title, reportReady }: { step: Exclude<SessionStep, 'request'>; title: string; reportReady?: boolean }) {
  return (
    <section className="future-placeholder" data-app-step={step} aria-labelledby={`${step}-placeholder-title`}>
      <p className="eyebrow">다음 학습 단계</p>
      <h2 id={`${step}-placeholder-title`}>{title} 준비 화면</h2>
      <p>이 단계의 학습 활동은 다음 구현에서 이어집니다. 아직 완료된 것으로 표시하지 않아요.</p>
      <p>현재는 앞 단계의 내용을 확인한 뒤 다음 안내를 기다려 주세요.</p>
      {reportReady && (
        <div className="report-preview" aria-label="보고서 자료 미리 보기">
          <p><strong>최초 계획</strong>: 앞 단계에서 만든 자료가 보관되어 있어요.</p>
          <p><strong>수정 계획</strong>: 앞 단계에서 확인한 자료가 보관되어 있어요.</p>
        </div>
      )}
    </section>
  );
}

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
    case 'forecast': return <FutureStepPlaceholder step={step} title="손상 예보" />;
    case 'simulation': return <FutureStepPlaceholder step={step} title="가상 관리" />;
    case 'revision': return <FutureStepPlaceholder step={step} title="계획 수정" />;
    case 'report': return <FutureStepPlaceholder step={step} title="구조 보고서" reportReady={state.revisedPlan !== null} />;
    default: {
      const unknownStep: never = step;
      throw new Error(`알 수 없는 학습 단계예요: ${String(unknownStep)}`);
    }
  }
}

export function AppShell() {
  const { state } = useLearnerSession();
  const [highContrast, setHighContrast] = useState(false);
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
      <footer className="app-footer">가상 학습 도구 · 실제 제품 안내를 대신하지 않아요.</footer>
    </div>
  );
}
