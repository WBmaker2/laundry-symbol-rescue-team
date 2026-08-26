import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

describe('Task 9 접근 가능한 관리 순서판', () => {
  afterEach(() => cleanup());

  it('카드를 선택한 뒤 단계 버튼으로 배치하고 드래그 없이 현재 계획을 갱신한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    await user.click(screen.getByRole('button', { name: /부드러운 30도 세탁 카드 선택/ }));
    await user.click(screen.getByRole('button', { name: /세탁 단계에 놓기/ }));
    expect(screen.getByRole('region', { name: '현재 관리 계획' })).toHaveTextContent(/세탁.*부드러운/);
    expect(document.querySelector('[draggable="true"]')).toBeNull();
    expect(screen.getByRole('button', { name: /세탁 단계에 놓기/ })).toHaveAttribute('aria-pressed', 'true');
  });

  it('단계가 비어 있으면 가장 앞선 단계 제목으로 초점을 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '세탁 단계' })).toHaveFocus();
    expect(screen.getByRole('status')).toHaveTextContent(/세탁·건조·다림질 단계를 모두/);
  });

  it('계획 제출은 모든 단계를 채우고 제한을 확인한 뒤 다음 단계로 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });
    for (const [cardName, stageName] of [
      ['부드러운 30도 세탁 카드 선택', '세탁 단계에 놓기'],
      ['낮은 열 회전 건조 비교하기 카드 선택', '건조 단계에 놓기'],
      ['다림질하지 않는 조건 비교하기 카드 선택', '다림질 단계에 놓기'],
    ] as const) {
      await user.click(screen.getByRole('button', { name: cardName }));
      await user.click(screen.getByRole('button', { name: stageName }));
    }
    for (const checkbox of screen.getAllByRole('checkbox')) await user.click(checkbox);
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '손상 예보 준비 화면' })).toBeInTheDocument();
  });

  it('혼합 미션은 세 의류를 그룹에 배정하고 분리 근거 표시를 고르게 한다', () => {
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    expect(screen.getAllByRole('article').filter((node) => node.hasAttribute('data-garment-id'))).toHaveLength(3);
    expect(screen.getAllByRole('checkbox').some((node) => node.closest('[data-grouping-reason-symbol-id]'))).toBe(true);
    expect(screen.getByRole('heading', { name: '세 벌을 함께 또는 따로 관리하기' })).toBeInTheDocument();
  });

  it('혼합 계획 제출은 canonical groupingEvaluation을 포함해 다음 단계로 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'mixed-load', step: 'plan' });
    await user.click(screen.getAllByRole('button', { name: '함께 관리에 넣기' })[0]!);
    await user.click(screen.getAllByRole('button', { name: '함께 관리에 넣기' })[1]!);
    await user.click(screen.getAllByRole('button', { name: '따로 관리에 넣기' })[2]!);
    await user.click(screen.getByRole('checkbox', { name: /전문 섬유 관리 확인 표시를 분리 근거로 선택/ }));
    for (const [cardName, stageName] of [
      ['잠깐 멈추고 도움 요청하기 카드 선택', '세탁 단계에 놓기'],
      ['잠깐 멈추고 건조 도움 요청하기 카드 선택', '건조 단계에 놓기'],
      ['다림질 판단을 멈추고 도움 요청하기 카드 선택', '다림질 단계에 놓기'],
    ] as const) {
      await user.click(screen.getByRole('button', { name: cardName }));
      await user.click(screen.getByRole('button', { name: stageName }));
    }
    for (const checkbox of document.querySelectorAll<HTMLInputElement>('[data-restriction-id]')) {
      await user.click(checkbox);
    }
    await user.click(screen.getByRole('button', { name: '관리 계획 확인' }));
    expect(screen.getByRole('heading', { name: '손상 예보 준비 화면' })).toBeInTheDocument();
  });
});
