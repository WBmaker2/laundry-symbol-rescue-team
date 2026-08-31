import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

describe('관리 단계별 카드 보기', () => {
  afterEach(() => cleanup());

  it('처음에는 세탁 카드만 보이고 단계 안내가 현재 단계와 맞는다', () => {
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });

    expect(document.querySelectorAll('[data-care-option-id]')).toHaveLength(3);
    const washHint = screen.getByText('지금은 세탁 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요.');
    expect(washHint).toHaveAttribute('role', 'status');
    expect(washHint).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('button', { name: /부드러운 30도 세탁/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /낮은 열 회전 건조/ })).not.toBeInTheDocument();
  });

  it('navigator를 누르면 해당 단계 카드만 보여 준다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' });

    await user.click(screen.getByRole('button', { name: '건조 단계 보기' }));

    expect(document.querySelectorAll('[data-care-option-id]')).toHaveLength(5);
    const dryHint = screen.getByText('지금은 건조 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요.');
    expect(dryHint).toHaveAttribute('role', 'status');
    expect(dryHint).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('button', { name: /낮은 열 회전 건조/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /부드러운 30도 세탁/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '다림질 단계 보기' }));

    expect(document.querySelectorAll('[data-care-option-id]')).toHaveLength(4);
    const ironHint = screen.getByText('지금은 다림질 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요.');
    expect(ironHint).toHaveAttribute('role', 'status');
    expect(ironHint).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByRole('button', { name: /다림질하지 않는 조건/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /낮은 열 회전 건조/ })).not.toBeInTheDocument();
  });
});
