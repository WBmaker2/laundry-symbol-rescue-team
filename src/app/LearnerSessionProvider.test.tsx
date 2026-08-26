import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { initialLearnerSession, type LearnerSession } from '../domain/sessionReducer';
import { LearnerSessionProvider } from './LearnerSessionProvider';
import { useLearnerSession } from './useLearnerSession';

function Probe({ onValue }: { onValue?: (value: ReturnType<typeof useLearnerSession>) => void }) {
  const value = useLearnerSession();
  onValue?.(value);
  return <output>{value.state.step}</output>;
}

describe('LearnerSessionProvider and useLearnerSession', () => {
  it('uses the supplied initialState', () => {
    const initialState: LearnerSession = { ...initialLearnerSession, missionId: 'basic-t-shirt', step: 'magnifier' };
    render(<LearnerSessionProvider initialState={initialState}><Probe /></LearnerSessionProvider>);
    expect(screen.getByText('magnifier')).toBeInTheDocument();
  });

  it('throws the exact Korean error outside the provider', () => {
    expect(() => render(<Probe />)).toThrow('useLearnerSession은 LearnerSessionProvider 안에서 사용해야 합니다.');
  });

  it('keeps the context value identity stable when the provider rerenders without state changes', () => {
    const values: Array<ReturnType<typeof useLearnerSession>> = [];
    const first = render(<LearnerSessionProvider><Probe onValue={(value) => values.push(value)} /></LearnerSessionProvider>);
    first.rerender(<LearnerSessionProvider><Probe onValue={(value) => values.push(value)} /></LearnerSessionProvider>);
    expect(values).toHaveLength(2);
    expect(values[0]).toBe(values[1]);
  });
});
