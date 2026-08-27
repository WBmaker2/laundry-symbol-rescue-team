import { cleanup } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';

afterEach(() => cleanup());

describe('Task 11 단계별 가상 가능성', () => {
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
});
