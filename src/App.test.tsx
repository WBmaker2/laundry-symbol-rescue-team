import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('shows the Korean service name and real-label priority notice', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '세탁표시 구조대' })).toBeInTheDocument();
    expect(screen.getByText(/실제 옷에서는 제품 라벨과 제조사 안내/)).toBeInTheDocument();
  });
});
