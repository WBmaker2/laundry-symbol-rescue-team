import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { App } from '../App';
import { careSymbolById } from '../content/symbols';
import { renderAppAtStep } from './renderApp';

describe('교육 리디자인의 단계 안내와 전환', () => {
  afterEach(() => cleanup());

  it('첫 단계는 목적과 바로 할 일을 하나의 step intro로 묶는다', () => {
    render(<App />);
    const intro = document.querySelector('.step-intro');
    expect(intro).not.toBeNull();
    expect(intro).toHaveTextContent('첫 번째 단계');
    expect(intro).toHaveTextContent('이번에 할 일');
    expect(screen.getByRole('heading', { name: '구조할 가상 옷을 골라 보세요' })).toHaveAttribute('data-step-heading', 'true');
  });

  it('키보드 사용자가 반복 헤더를 건너뛸 본문 링크를 제공한다', () => {
    render(<App />);
    expect(screen.getByRole('link', { name: '본문으로 건너뛰기' })).toHaveAttribute('href', '#main-content');
    expect(document.getElementById('main-content')).toHaveAttribute('tabindex', '-1');
  });

  it('정답을 확인하면 다음 표시 제목으로 초점을 옮긴다', async () => {
    const originalScrollIntoView = HTMLElement.prototype.scrollIntoView;
    if (!originalScrollIntoView) {
      Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
        configurable: true,
        value: () => undefined,
      });
    }
    const scrollSpy = vi.spyOn(HTMLElement.prototype, 'scrollIntoView').mockImplementation(() => undefined);
    const user = userEvent.setup();
    renderAppAtStep({ missionId: 'basic-t-shirt', step: 'magnifier' });
    const firstSymbol = careSymbolById.get('care-wash-30-gentle');
    const nextSymbol = careSymbolById.get('care-no-bleach');
    if (!firstSymbol || !nextSymbol) throw new Error('기호 fixture가 없습니다.');
    const correct = firstSymbol.meaningOptions.find(({ id }) => id === firstSymbol.correctMeaningOptionId);
    if (!correct) throw new Error('첫 기호 정답이 없습니다.');
    await user.click(screen.getByRole('radio', { name: correct.label }));
    await user.click(screen.getByRole('button', { name: '뜻 확인' }));
    const nextHeading = document.querySelector<HTMLHeadingElement>(`#symbol-card-title-${nextSymbol.id}`);
    expect(nextHeading).not.toBeNull();
    expect(nextHeading).toHaveFocus();
    expect(scrollSpy).toHaveBeenCalled();
    scrollSpy.mockRestore();
    if (!originalScrollIntoView) delete (HTMLElement.prototype as Partial<HTMLElement>).scrollIntoView;
  });
});
