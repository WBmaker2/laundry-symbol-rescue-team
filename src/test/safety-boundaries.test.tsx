import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { renderAppAtStep } from './renderApp';
import {
  REAL_LABEL_PRIORITY_NOTICE,
  SERVICE_LIMIT_NOTICE,
  STANDARD_VARIATION_NOTICE,
  STUDENT_SAFETY_NOTICE,
  PROFESSIONAL_HELP_NOTICE,
} from '../components/ui/SafetyNotice';
import { SAFETY_NOTICES } from '../content/safetyNotices';
import { evaluatePlan } from '../domain/evaluatePlan';
import { careOptionById } from '../content/careOptions';
import { careSymbolById } from '../content/symbols';
import { missionById } from '../content/missions';
import { makePlanFixture } from './factories';

const expectedNotices = [
  REAL_LABEL_PRIORITY_NOTICE,
  STUDENT_SAFETY_NOTICE,
  STANDARD_VARIATION_NOTICE,
  SERVICE_LIMIT_NOTICE,
] as const;

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

  it('returns the canonical safety notice list from plan evaluation', () => {
    const mission = missionById.get('sportswear');
    expect(mission).toBeDefined();
    const evaluation = evaluatePlan({
      mission: mission!,
      plan: makePlanFixture('sportswear', 'within-limits'),
      symbols: careSymbolById,
      options: careOptionById,
    });
    expect(evaluation.safetyNotices).toEqual(SAFETY_NOTICES);
  });

  it.each([
    ['plan', 'within-limits'],
    ['forecast', 'outside-limits'],
  ] as const)('shows every canonical notice and exact professional-help copy on %s', (step, scenario) => {
    const result = renderAppAtStep({ missionId: 'sportswear', step, scenario });
    for (const notice of expectedNotices) {
      expect(result.getByText(notice, { exact: true })).toBeInTheDocument();
    }
    expect(result.getAllByText(PROFESSIONAL_HELP_NOTICE, { exact: true }).length).toBeGreaterThan(0);
    result.unmount();
  });

  it('keeps identity inputs absent from the learner DOM and source', () => {
    const result = renderAppAtStep({ missionId: 'basic-t-shirt', step: 'report', scenario: 'completed-revision' });
    expect(result.container.querySelector('input[name="name"], input[name="class"], input[name="brand"]')).toBeNull();
    expect(result.container.textContent).not.toMatch(/이름|학급|브랜드/);
    expect(sourceText()).not.toMatch(/input\s+[^>]*(name|aria-label)=['"][^'"]*(이름|학급|브랜드)/i);
    expect(result.getAllByText(PROFESSIONAL_HELP_NOTICE, { exact: true }).length).toBeGreaterThan(0);
    result.unmount();
  });

  it('keeps forbidden data APIs and network calls out of app source', () => {
    expect(sourceText()).not.toMatch(/localStorage|sessionStorage|document\.cookie|fetch\(|analytics/i);
  });
});

function screenText(container: HTMLElement): string {
  return container.textContent ?? '';
}
