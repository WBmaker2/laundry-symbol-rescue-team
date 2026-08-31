import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import { AppShell } from '../app/AppShell';
import { LearnerSessionProvider } from '../app/LearnerSessionProvider';
import { evaluatePrediction } from '../domain/evaluatePrediction';
import { achievementSummary } from '../features/report/RescueReportScreen';
import { buildLearnerSessionAtStep, renderAppAtStep } from './renderApp';
import { missionById } from '../content/missions';

describe('Task 12 구조 보고서와 업데이트 내역', () => {
  afterEach(() => cleanup());

  it('shows initial and revised plans with responsible-care evidence', () => {
    renderAppAtStep({ missionId: 'decorated-top', step: 'report', scenario: 'completed-revision' });
    expect(screen.getByRole('heading', { name: '구조 보고서' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '최초 계획' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '수정 계획' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '안전한 관리와 도움 요청' })).toBeInTheDocument();
    expect(screen.getByText(/실제 옷에서는 제품 라벨/)).toBeInTheDocument();
    expect(screen.getByText(/낮음|보통|높음/)).toBeInTheDocument();
    expect(screen.getByText(/책임 있는 관리/)).toBeInTheDocument();
  });

  it('opens update history and returns focus to its small button', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report' });
    const button = screen.getByRole('button', { name: '업데이트 내역' });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    expect(screen.getByRole('dialog', { name: '업데이트 내역' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '닫기' })).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: '업데이트 내역' })).not.toBeInTheDocument();
    expect(button).toHaveFocus();
  });

  it('keeps the update action at the mobile bottom-right contract', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report' });
    const button = screen.getByRole('button', { name: '업데이트 내역' });
    expect(button).toHaveAttribute('data-placement', 'bottom-right');
    expect(button).toHaveClass('update-history-button');
    expect(button.closest('footer')).toHaveClass('app-footer');
  });

  it('shows five learning achievements, one source disclosure, and a restart action', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'decorated-top', step: 'report', scenario: 'completed-revision' });
    expect(screen.getByRole('heading', { name: '구조 미션을 끝냈어요!' })).toBeInTheDocument();
    expect(document.querySelectorAll('.achievement-checklist li')).toHaveLength(5);
    expect(screen.getByText('출처와 검수일 보기')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '다른 미션 해보기' }));
    expect(screen.getByRole('heading', { name: '구조할 가상 옷을 골라 보세요' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '구조할 가상 옷을 골라 보세요' })).toHaveFocus();
  });
  it('보고서 상단에서 배운 점과 다음 행동을 먼저 보여 준다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report' });
    const nextAction = screen.getByRole('region', { name: '다음 행동' });
    expect(nextAction).toHaveTextContent('배운 점');
    expect(nextAction).toHaveTextContent('다른 미션 해보기');
  });

  it('does not turn an unsupported selected risk into another predicted risk', () => {
    const state = buildLearnerSessionAtStep({ missionId: 'decorated-top', step: 'report', scenario: 'outside-limits' });
    const initialEvaluation = state.initialEvaluation!;
    const evaluationWithoutHeat = {
      ...initialEvaluation,
      findings: initialEvaluation.findings.map((finding) => ({
        ...finding,
        riskIds: finding.riskIds.filter((riskId) => riskId !== 'heat-damage'),
      })),
    };
    const reasonSymbolId = state.prediction!.reasonSymbolIds[0]!;
    const selection = { riskIds: ['heat-damage'] as const, reasonSymbolIds: [reasonSymbolId] as const };
    const feedback = evaluatePrediction({ evaluation: evaluationWithoutHeat, selection });
    const result = render(
      <LearnerSessionProvider initialState={{ ...state, initialEvaluation: evaluationWithoutHeat, prediction: selection, predictionFeedback: feedback }}>
        <AppShell />
      </LearnerSessionProvider>,
    );
    const riskRegion = screen.getByRole('region', { name: '예측한 손상 가능성과 관련 표시' });
    expect(riskRegion).toHaveTextContent(/선택했지만 초기 평가 근거가 없는 위험.*열 손상/);
    const predictedLine = [...riskRegion.querySelectorAll('li')].find((line) => line.textContent?.includes('예측한 가능성(평가가 연결된 위험)'));
    expect(predictedLine).toHaveTextContent(/연결된 위험 없음/);
    expect(predictedLine).not.toHaveTextContent(/줄어듦|변형|색 변화|장식 손상/);
    expect(achievementSummary({
      missionId: state.missionId,
      interpretations: state.interpretations,
      initialEvaluation: evaluationWithoutHeat,
      initialGroupingEvaluation: state.initialGroupingEvaluation,
      predictionFeedback: { ...feedback, supportedRiskIds: [], supportedReasonSymbolIds: [reasonSymbolId] },
      revisedEvaluation: state.revisedEvaluation,
      revisedGroupingEvaluation: state.revisedGroupingEvaluation,
      revisionEvidence: state.revisionEvidence,
    }, missionById.get('decorated-top')!).connectedRiskEvidence).toBe(false);
    result.unmount();
  });
});
