import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

describe('Task 9 접근 가능한 관리 순서판', () => {
  afterEach(() => cleanup());

  it('필수 행동 두 개에만 gi-pulse를 적용한다', () => {
    const request = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'request' });
    expect([...document.querySelectorAll('.gi-pulse')].map((node) => node.textContent?.trim())).toEqual(['표시 확대']);
    request.unmount();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    expect([...document.querySelectorAll('.gi-pulse')].map((node) => node.textContent?.trim())).toEqual(['관리 계획 확인']);
  });

  it('카드를 선택한 뒤 단계 버튼으로 배치하고 드래그 없이 현재 계획을 갱신한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    await user.click(screen.getByRole('button', { name: /부드러운 30도 세탁 — 세탁 단계 카드 고르기/ }));
    await user.click(document.querySelector('.stage-place-button') as HTMLElement);
    expect(screen.getByRole('region', { name: '현재 관리 계획' })).toHaveTextContent(/세탁.*부드러운/);
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(document.querySelector('.stage-place-button')).toHaveAttribute('aria-pressed', 'true');
  });

  it('요청 화면은 핵심 버튼을 안전 안내보다 먼저 보여 준다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'request' });
    const root = document.querySelector('.request-screen');
    const action = root?.querySelector('.primary-action');
    const safety = root?.querySelector('.safety-notice');
    expect(action).not.toBeNull();
    expect(safety).not.toBeNull();
    expect(action!.compareDocumentPosition(safety!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(safety).toHaveAttribute('data-variant', 'compact');
  });

  it('선택한 카드 아래에서 알맞은 단계 배치 행동을 바로 실행한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    expect(document.querySelector('.selection-help')).toHaveTextContent('먼저 관리 방법 카드 하나를 골라 주세요');
    expect(document.querySelector('.stage-place-button')).toHaveAttribute('aria-describedby', 'wash-stage-help');
    await user.click(screen.getByRole('button', { name: '부드러운 30도 세탁 — 세탁 단계 카드 고르기' }));
    const directPlacement = screen.getByRole('button', { name: '선택한 카드 세탁 단계에 놓기' });
    expect(directPlacement).toBeEnabled();
    expect(directPlacement).not.toHaveClass('required-action');
    await user.click(directPlacement);
    expect(screen.getByRole('region', { name: '현재 관리 계획' })).toHaveTextContent(/세탁.*부드러운/);
  });

  it('단계가 비어 있으면 가장 앞선 단계 제목으로 초점을 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '세탁 단계' })).toHaveFocus();
    expect(screen.getAllByRole('status').some((status) => /세탁·건조·다림질 단계를 모두/.test(status.textContent ?? ''))).toBe(true);
  });

  it('계획 제출은 모든 단계를 채우고 제한을 확인한 뒤 다음 단계로 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    for (const [cardName, stageName] of [
      ['부드러운 30도 세탁 — 세탁 단계 카드 고르기', '세탁 단계에 놓기'],
      ['낮은 열 회전 건조 비교하기 — 건조 단계 카드 고르기', '건조 단계에 놓기'],
      ['다림질하지 않는 조건 비교하기 — 다림질 단계 카드 고르기', '다림질 단계에 놓기'],
    ] as const) {
      await user.click(screen.getByRole('button', { name: cardName }));
      const stageButton = [...document.querySelectorAll<HTMLButtonElement>('.stage-place-button')]
        .find((button) => button.textContent?.trim() === stageName);
      await user.click(stageButton as HTMLElement);
    }
    for (const checkbox of screen.getAllByRole('checkbox')) await user.click(checkbox);
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '손상 가능성 예보' })).toBeInTheDocument();
  });

  it('혼합 미션은 세 의류를 그룹에 배정하고 분리 근거 표시를 고르게 한다', () => {
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    expect(screen.getAllByRole('article').filter((node) => node.hasAttribute('data-garment-id'))).toHaveLength(3);
    expect(screen.getAllByRole('checkbox').some((node) => node.closest('[data-grouping-reason-symbol-id]'))).toBe(true);
    expect(screen.getByRole('heading', { name: '세 벌을 함께 또는 따로 관리하기' })).toBeInTheDocument();
  });

  it('E2E data hooks identify one symbol card, its option button, and reason checkbox', async () => {
    const user = userEvent.setup();
    const magnifier = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
    const symbolCard = document.querySelector('[data-symbol-id="care-wash-30-gentle"]');
    expect(document.querySelectorAll('[data-symbol-id="care-wash-30-gentle"]')).toHaveLength(1);
    expect(symbolCard?.querySelectorAll('input')).not.toHaveLength(0);
    magnifier.unmount();

    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    const optionButton = document.querySelector('[data-care-option-id="plan-wash-gentle-30"]');
    expect(optionButton?.tagName).toBe('BUTTON');
    await user.click(optionButton as HTMLElement);
    expect(optionButton).toHaveAttribute('aria-pressed', 'true');

    cleanup();
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    const reasonCheckbox = document.querySelector('input[data-grouping-reason-symbol-id="care-professional"]');
    expect(reasonCheckbox?.tagName).toBe('INPUT');
    await user.click(reasonCheckbox as HTMLElement);
    expect(reasonCheckbox).toBeChecked();
  });

  it('혼합 의류별 분리 관리 버튼은 의류 이름을 accessible name에 포함한다', () => {
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    const separationButtons = screen.getAllByRole('button', { name: /분리 관리 —/ });
    expect(separationButtons).toHaveLength(3);
    expect(new Set(separationButtons.map((button) => button.getAttribute('aria-label'))).size).toBe(3);
  });

  it('혼합 계획 제출은 canonical groupingEvaluation을 포함해 다음 단계로 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    await user.click(screen.getAllByRole('button', { name: /함께 관리 —/ })[0]!);
    await user.click(screen.getAllByRole('button', { name: /함께 관리 —/ })[1]!);
    await user.click(screen.getAllByRole('button', { name: /분리 관리 —/ })[2]!);
    await user.click(screen.getByRole('checkbox', { name: /전문 섬유 관리 확인 표시를 분리 근거로 선택/ }));
    for (const [cardName, stageName] of [
      ['잠깐 멈추고 도움 요청하기 — 세탁 단계 카드 고르기', '세탁 단계에 놓기'],
      ['잠깐 멈추고 건조 도움 요청하기 — 건조 단계 카드 고르기', '건조 단계에 놓기'],
      ['다림질 판단을 멈추고 도움 요청하기 — 다림질 단계 카드 고르기', '다림질 단계에 놓기'],
    ] as const) {
      await user.click(screen.getByRole('button', { name: cardName }));
      const stageButton = [...document.querySelectorAll<HTMLButtonElement>('.stage-place-button')]
        .find((button) => button.textContent?.trim() === stageName);
      await user.click(stageButton as HTMLElement);
    }
    for (const checkbox of document.querySelectorAll<HTMLInputElement>('[data-restriction-id]')) {
      await user.click(checkbox);
    }
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '손상 가능성 예보' })).toBeInTheDocument();
  });
});
