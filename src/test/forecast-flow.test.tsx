import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { AppShell } from '../app/AppShell';
import { LearnerSessionProvider } from '../app/LearnerSessionProvider';
import { careSymbolById } from '../content/symbols';
import { buildLearnerSessionAtStep, renderAppAtStep } from './renderApp';

describe('Task 10 예보 접근성·자료 경계', () => {
  afterEach(() => cleanup());

  it('names the risk and evidence groups separately and renders all five risks', () => {
    renderAppAtStep({ missionId: 'decorated-top', step: 'forecast', scenario: 'outside-limits' });
    expect(screen.getByRole('group', { name: '손상 가능성' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: '근거 표시' })).toBeInTheDocument();
    expect(screen.getAllByRole('article').filter((node) => node.hasAttribute('data-risk-id'))).toHaveLength(5);
    expect(document.querySelectorAll('[data-evidence-symbol-id]')).toHaveLength(4);
  });

  it('fails closed when a canonical evidence symbol is missing', () => {
    const state = buildLearnerSessionAtStep({ missionId: 'decorated-top', step: 'forecast', scenario: 'outside-limits' });
    const original = careSymbolById.get('care-no-iron');
    careSymbolById.delete('care-no-iron');
    try {
      render(<LearnerSessionProvider initialState={state}><AppShell /></LearnerSessionProvider>);
      expect(screen.getByRole('alert')).toHaveTextContent(/표시 자료를 불러올 수 없어요/);
      expect(screen.queryByRole('heading', { name: '손상 가능성 예보' })).not.toBeInTheDocument();
    } finally {
      if (original) careSymbolById.set('care-no-iron', original);
    }
  });

  it('shows a child-friendly connection sentence and keeps numeric detail secondary', () => {
    renderAppAtStep({ missionId: 'decorated-top', step: 'forecast', scenario: 'outside-limits' });
    expect(screen.getByRole('button', { name: '손상 예보 확인' })).not.toHaveClass('required-action');
    expect(screen.getByRole('button', { name: '가상 결과 보기' })).toHaveClass('required-action');
    const feedback = document.querySelector('.forecast-feedback [role="status"]');
    expect(feedback).not.toBeNull();
    expect(feedback).toHaveTextContent(/표시.*가능성|가능성.*표시/);
    expect(feedback).not.toHaveTextContent(/\d+\/\d+|\d+개/);
    expect(screen.getByText('자세한 연결 결과 보기')).toBeInTheDocument();
    expect(screen.getByText(/연결된 위험/)).toBeInTheDocument();
  });
});
