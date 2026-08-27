import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';
import {
  REAL_LABEL_PRIORITY_NOTICE,
  SERVICE_LIMIT_NOTICE,
  STANDARD_VARIATION_NOTICE,
  STUDENT_SAFETY_NOTICE,
} from '../components/ui/SafetyNotice';

function sourceText(): string {
  const sourceFiles = readdirSync('src', { recursive: true })
    .filter((file): file is string => typeof file === 'string' && /\.(ts|tsx)$/.test(file))
    .filter((file) => !file.startsWith('test/') && !/\.(test|spec)\.(ts|tsx)$/.test(file));
  return sourceFiles.map((file) => readFileSync(join('src', file), 'utf8')).join('\n');
}

describe('Task 14 safety and privacy boundaries', () => {
  it('collects no identity, image, brand, or persistent progress data', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'request' });
    expect(result.container.querySelector('input[type="file"]')).toBeNull();
    expect(result.container.querySelector('input[type="image"]')).toBeNull();
    expect(result.container.querySelector('input[name="name"], input[name="class"], input[name="brand"]')).toBeNull();
    expect(screenText(result.container)).not.toMatch(/이름|학급|브랜드/);
    expect(window.localStorage.length).toBe(0);
    expect(window.sessionStorage.length).toBe(0);
    result.unmount();
  });

  it('shows all safety and service limits on an outside-limits virtual result', () => {
    const result = renderAppAtStep({
      missionId: 'sportswear',
      step: 'simulation',
      scenario: 'outside-limits',
    });
    expect(result.getByText(REAL_LABEL_PRIORITY_NOTICE)).toBeInTheDocument();
    expect(result.getByText(STUDENT_SAFETY_NOTICE)).toBeInTheDocument();
    expect(result.getByText(STANDARD_VARIATION_NOTICE)).toBeInTheDocument();
    expect(result.getAllByText(SERVICE_LIMIT_NOTICE).length).toBeGreaterThan(0);
    result.unmount();
  });

  it('keeps forbidden data APIs and network calls out of app source', () => {
    expect(sourceText()).not.toMatch(/localStorage|sessionStorage|document\.cookie|fetch\(|analytics/i);
  });
});

function screenText(container: HTMLElement): string {
  return container.textContent ?? '';
}
