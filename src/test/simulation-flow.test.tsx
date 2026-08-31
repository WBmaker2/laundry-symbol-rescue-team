import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

afterEach(() => cleanup());

describe('Task 11 단계별 가상 가능성', () => {
  it('가상 결과 상단에서 세 단계의 상태를 한눈에 요약한다', () => {
    const result = renderAppAtStep({ missionId: 'decorated-top', step: 'simulation', scenario: 'outside-limits' });
    expect(result.getByRole('region', { name: '결과 한눈에 보기' })).toHaveTextContent('세탁');
    expect(result.getByRole('region', { name: '결과 한눈에 보기' })).toHaveTextContent(/살펴볼 필요|가능성/);
    result.unmount();
  });

  it('does not show risk wording for allowed basic-t-shirt stages', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'simulation', scenario: 'within-limits' });
    for (const stage of ['wash', 'dry', 'iron']) {
      expect(result.container.querySelector(`[data-stage="${stage}"]`)?.textContent).not.toMatch(/손상 가능성|줄어듦|변형|색 변화|장식 손상|열 손상/);
    }
    result.unmount();
  });

  it('keeps decorated-top risks on their finding stage', () => {
    const result = renderAppAtStep({ missionId: 'decorated-top', step: 'simulation', scenario: 'outside-limits' });
    const text = (stage: string) => result.container.querySelector(`[data-stage="${stage}"]`)?.textContent ?? '';
    expect(text('wash')).toContain('줄어듦');
    expect(text('wash')).not.toContain('장식 손상');
    expect(text('dry')).toContain('장식 손상');
    expect(text('dry')).not.toContain('색 변화');
    expect(text('iron')).toContain('장식 손상');
    expect(text('iron')).not.toContain('색 변화');
    result.unmount();
  });

  it('labels allowed and caution comparisons without claiming real damage', () => {
    const allowed = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'simulation', scenario: 'within-limits' });
    expect(allowed.getByRole('button', { name: '계획 수정하기' })).toHaveClass('required-action');
    expect(allowed.container.querySelectorAll('[data-comparison-state="allowed"]')).toHaveLength(3);
    expect(allowed.container.textContent).toContain('눈에 띄는 변화가 두드러지지 않아요');
    allowed.unmount();

    const caution = renderAppAtStep({ missionId: 'decorated-top', step: 'simulation', scenario: 'outside-limits' });
    expect(caution.container.querySelectorAll('[data-comparison-state="caution"]').length).toBeGreaterThan(0);
    expect(caution.container.textContent).toContain('크기·모양·열을 더 살펴볼 가능성이 있어요');
    caution.unmount();
  });
});
