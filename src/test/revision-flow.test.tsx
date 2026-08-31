import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

describe('수정 계획의 단계별 카드 흐름', () => {
  afterEach(() => cleanup());

  it('세탁 카드를 놓으면 건조, 건조 카드를 놓으면 다림질로 이동한다', async () => {
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'revision', scenario: 'outside-limits' });

    await user.click(screen.getByRole('button', { name: /부드러운 30도 세탁/ }));
    await user.click(screen.getByRole('button', { name: '선택한 카드 세탁 단계에 놓기' }));
    expect(screen.getByRole('button', { name: '건조 단계 보기' })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: /낮은 열 회전 건조/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /부드러운 30도 세탁/ })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /낮은 열 회전 건조/ }));
    await user.click(screen.getByRole('button', { name: '선택한 카드 건조 단계에 놓기' }));
    expect(screen.getByRole('button', { name: '다림질 단계 보기' })).toHaveAttribute('aria-current', 'step');
    expect(screen.getByRole('button', { name: /다림질하지 않는 조건/ })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /낮은 열 회전 건조/ })).not.toBeInTheDocument();
  });
});
