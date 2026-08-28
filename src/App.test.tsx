import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from './App';

describe('App', () => {
  it('shows the Korean service name and real-label priority notice', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: '세탁표시 구조대' })).toBeInTheDocument();
    expect(screen.getByText(/실제 옷에서는 제품 라벨과 제조사 안내/)).toBeInTheDocument();
  });

  it('marks the current learning heading and exposes a progress summary', () => {
    render(<App />);
    expect(screen.getAllByRole('heading', { name: '구조할 가상 옷을 골라 보세요' }).at(-1))
      .toHaveAttribute('data-step-heading', 'true');
    expect(screen.getAllByText('현재 단계: 1/7 · 구조 요청').at(-1)).toBeInTheDocument();
  });
});
