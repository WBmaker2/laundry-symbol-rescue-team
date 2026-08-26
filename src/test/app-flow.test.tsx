import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { cleanup } from '@testing-library/react';
import { App } from '../App';
import { buildLearnerSessionAtStep, renderAppAtStep } from './renderApp';
import { missions } from '../content/missions';
import { planningStages } from './factories';

describe('Task 7 앱 시작 흐름', () => {
  afterEach(() => cleanup());
  it('다섯 미션을 제목과 학습 초점이 함께 읽히는 버튼으로 보여 준다', () => {
    render(<App />);

    expect(screen.getAllByRole('button', { name: /미션 선택/ })).toHaveLength(5);
    expect(screen.getByRole('button', { name: /기본 티셔츠.*세탁 표시와 건조 표시/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /섞|서로 다른 세 벌/ })).toBeInTheDocument();
  });

  it('미션 선택은 구조 요청 화면을 보여 주고 요청에서 바로 건너뛰지 않는다', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole('button', { name: /기본 티셔츠.*미션 선택/ }));

    expect(screen.getByRole('heading', { name: /기본 티셔츠 구조 요청/ })).toBeInTheDocument();
    expect(screen.getByText(/면 중심 재료 모형/)).toBeInTheDocument();
    expect(screen.getByText(/학습용 재료 모형/)).toBeInTheDocument();
    expect(screen.getByText(/흙먼지가 조금 묻은/)).toBeInTheDocument();
    expect(screen.getByText(/실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '표시 확대' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /표시 확대경/ })).not.toBeInTheDocument();
  });

  it('표시 확대는 요청 화면을 건너뛰지 않고 magnifier 단계로 이동시킨다', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /기본 티셔츠.*미션 선택/ }));
    await user.click(screen.getByRole('button', { name: '표시 확대' }));

    expect(screen.getByRole('heading', { name: /표시 확대경 준비 화면/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /표시 확대/ })).not.toBeInTheDocument();
  });

  it('진행 표시는 7단계 순서와 현재 단계만 의미론적으로 알린다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'request' });

    const list = screen.getByRole('navigation', { name: '학습 진행 7단계' }).querySelector('ol');
    if (!list) throw new Error('진행 목록이 없습니다.');
    expect(list.querySelectorAll('li')).toHaveLength(7);
    expect(screen.getByText('구조 요청')).toHaveAttribute('aria-current', 'step');
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('고대비는 wrapper의 앱 메모리 상태만 바꾸고 aria-pressed를 갱신한다', async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole('button', { name: '고대비 모드' });
    const shell = screen.getByTestId('app-shell');
    expect(toggle).toHaveAttribute('aria-pressed', 'false');
    expect(shell).toHaveAttribute('data-contrast', 'normal');

    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-pressed', 'true');
    expect(shell).toHaveAttribute('data-contrast', 'high');
    expect(window.localStorage.length).toBe(0);
    expect(document.documentElement).not.toHaveAttribute('data-contrast');
  });

  it('대표 미래 단계의 렌더 헬퍼는 canonical 선행 상태를 만든다', () => {
    for (const step of ['magnifier', 'plan', 'forecast', 'simulation', 'revision'] as const) {
      const result = renderAppAtStep({ missionId: 'decorated-top', step, scenario: 'outside-limits' });
      expect(result.container.querySelector('[data-app-step]')).toHaveAttribute('data-app-step', step);
      result.unmount();
    }
  });

  it('completed-revision은 두 계획과 평가를 가진 report만 허용한다', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report', scenario: 'completed-revision' });
    expect(result.container.querySelector('[data-app-step]')).toHaveAttribute('data-app-step', 'report');
    expect(screen.getByText(/최초 계획/)).toBeInTheDocument();
    expect(screen.getByText(/수정 계획/)).toBeInTheDocument();
    result.unmount();

    expect(() => renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan', scenario: 'completed-revision' }))
      .toThrow(/report 단계/);
  });

  it.each(missions)('completed-revision evidence is canonical for %s', (mission) => {
    const state = buildLearnerSessionAtStep({
      missionId: mission.id,
      step: 'report',
      scenario: 'completed-revision',
    });
    expect(state.step).toBe('report');
    expect(state.initialPlan).not.toEqual(state.revisedPlan);
    expect(state.initialEvaluation).not.toBeNull();
    expect(state.revisedEvaluation).not.toBeNull();
    expect(state.revisionEvidence).not.toBeNull();

    const changedStages = planningStages.filter((stage) =>
      state.initialPlan!.stageOptions[stage] !== state.revisedPlan!.stageOptions[stage]);
    expect(state.revisionEvidence!.changedStages).toEqual(changedStages);

    const planEvidence = state.initialEvaluation!.findings
      .filter(({ status }) => status !== 'allowed')
      .flatMap(({ relatedSymbolIds }) => relatedSymbolIds);
    const groupingEvidence = state.initialGroupingEvaluation?.findings
      .filter(({ code }) => code !== 'compatible-group')
      .flatMap(({ relatedSymbolIds }) => relatedSymbolIds) ?? [];
    const canonicalReasons = new Set([...planEvidence, ...groupingEvidence]);
    expect(state.revisionEvidence!.relatedSymbolIds.length).toBeGreaterThan(0);
    expect(state.revisionEvidence!.relatedSymbolIds.every((id) => canonicalReasons.has(id))).toBe(true);

    if (mission.id === 'mixed-load') {
      expect(state.revisionEvidence!.reasonId).toBe('separate-incompatible-garment');
      expect(state.revisionEvidence!.relatedSymbolIds).toContain('care-professional');
    } else {
      expect(state.revisionEvidence!.reasonId).toBe('follow-label-limit');
    }
  });

  it('shows the opening prompt exactly once', () => {
    const mission = missions.find(({ id }) => id === 'basic-t-shirt')!;
    renderAppAtStep({ missionId: mission.id, step: 'request' });
    expect(screen.getAllByText(mission.openingPrompt, { exact: true })).toHaveLength(1);
  });

  it('uses distinct non-answer silhouettes for scarf and sportswear', () => {
    const scarf = renderAppAtStep({ missionId: 'soft-scarf', step: 'request' });
    expect(scarf.container.querySelector('[data-illustration-kind="scarf"]')).toBeInTheDocument();
    expect(scarf.container.querySelector('[data-illustration-kind="shirt"]')).toBeNull();
    scarf.unmount();

    const sportswear = renderAppAtStep({ missionId: 'sportswear', step: 'request' });
    expect(sportswear.container.querySelector('[data-illustration-kind="sportswear"]')).toBeInTheDocument();
    expect(sportswear.container.querySelector('[data-illustration-kind="decorated-top"]')).toBeNull();
    sportswear.unmount();
  });
});
