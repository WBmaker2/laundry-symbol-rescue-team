import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const publishedSymbolIds = [
  'care-wash-30-gentle', 'care-no-bleach', 'care-flat-dry', 'care-tumble-low',
  'care-no-tumble', 'care-iron-low', 'care-no-iron', 'care-professional',
].sort();

async function expectNamedControls(page: Page, role: 'radio' | 'checkbox') {
  const controls = await page.getByRole(role).all();
  expect(controls.length).toBeGreaterThan(0);
  for (const control of controls) await expect(control).toHaveAccessibleName(/.+/);
}

async function tabTo(page: Page, selector: string, index = 0) {
  const visited: string[] = [];
  for (let attempt = 0; attempt < 80; attempt += 1) {
    const isTarget = await page.evaluate(({ targetSelector, targetIndex }) => {
      const elements = [...document.querySelectorAll(targetSelector)];
      return elements[targetIndex] === document.activeElement;
    }, { targetSelector: selector, targetIndex: index });
    if (isTarget) return;
    visited.push(await page.evaluate(() => `${document.activeElement?.tagName ?? 'none'}:${document.activeElement?.className ?? ''}:${document.activeElement?.outerHTML?.slice(0, 90) ?? ''}`));
    await page.keyboard.press('Tab');
  }
  const active = await page.evaluate(() => `${document.activeElement?.tagName ?? 'none'}:${document.activeElement?.className ?? ''}:${document.activeElement?.getAttribute('aria-label') ?? ''}`);
  throw new Error(`Tab order did not reach ${selector}[${index}] (active ${active}; visited ${visited.slice(0, 15).join('|')})`);
}

async function expectStatus(page: Page, scope: string, text: RegExp) {
  const status = page.locator(`${scope} [role="status"]`).filter({ hasText: text }).last();
  await expect(status).toHaveAttribute('aria-live', 'polite');
  await expect(status).toBeVisible();
  await expect(status).toContainText(text);
}

test.describe('classroom accessibility', () => {
  test('shows focus and has no critical or serious axe violations', async ({ page }) => {
    await page.goto('./');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus-visible')).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
  });

  test('exposes progress, pressed controls, native choices, and computed symbol context', async ({ page }) => {
    await page.goto('./');
    await expect(page.getByRole('navigation', { name: '학습 진행 7단계' })).toBeVisible();
    await expect(page.locator('[aria-current="step"]')).toHaveCount(1);
    await expect(page.getByRole('button', { name: '고대비 모드' })).toHaveAttribute('aria-pressed', 'false');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
    await page.getByRole('button', { name: '표시 확대' }).click();
    const symbolCard = page.getByRole('article', { name: /현재 계획.*허용/ });
    await expect(symbolCard).toHaveAccessibleName(/뜻|세탁|건조|다림질/);
    await expect(symbolCard).toHaveAccessibleName(/현재 계획.*허용/);
    await expect(symbolCard.locator('img')).toHaveAttribute('alt', /뜻|의미|세탁|건조|다림질/);
    await expect(symbolCard.locator('input[type="radio"]')).toHaveCount(3);
    await expect(symbolCard.locator('label')).toHaveCount(3);
    await expect(symbolCard.getByRole('button', { name: '뜻 확인' })).toBeVisible();
    await expectNamedControls(page, 'radio');
    await page.getByRole('button', { name: '고대비 모드' }).click();
    await expect(page.getByRole('button', { name: '고대비 모드' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('advances the first mission with the real keyboard tab order only', async ({ page }) => {
    await page.goto('./');
    await tabTo(page, '.mission-card', 0);
    await expect(page.locator('.mission-card').first()).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('[data-app-step="request"]')).toBeVisible();
    await tabTo(page, '[data-app-step="request"] .primary-action');
    await expect(page.getByRole('button', { name: '표시 확대' })).toBeFocused();
    await page.keyboard.press('Enter');

    for (let symbolIndex = 0; symbolIndex < 3; symbolIndex += 1) {
      await tabTo(page, 'input[type="radio"]', 0);
      await expect(page.locator('input[type="radio"]').first()).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await page.keyboard.press('ArrowDown');
      if (symbolIndex === 0) {
        await page.keyboard.press('Shift+Tab');
        await expect(page.locator('[data-app-step="magnifier"] .symbol-expand-button')).toBeFocused();
        await page.keyboard.press('Tab');
        await expect(page.locator('input[type="radio"]').first()).toBeFocused();
      }
      await page.keyboard.press('Space');
      await tabTo(page, '[data-app-step="magnifier"] .primary-action');
      await expect(page.getByRole('button', { name: '뜻 확인' })).toBeFocused();
      await page.keyboard.press('Enter');
    }

    await expect(page.locator('[aria-current="step"]')).toContainText('관리 순서판');
    await expect(page.locator('[data-app-step="plan"]')).toBeVisible();
    await expectNamedControls(page, 'checkbox');
    await expectStatus(page, '[data-app-step="plan"]', /단계가 배치/);
    for (const [optionId, placement] of [
      ['plan-wash-gentle-30', '세탁 단계에 놓기'],
      ['plan-dry-tumble-low', '건조 단계에 놓기'],
      ['plan-iron-none', '다림질 단계에 놓기'],
    ] as const) {
      await tabTo(page, `[data-care-option-id="${optionId}"]`);
      await expect(page.locator(`[data-care-option-id="${optionId}"]`)).toBeFocused();
      await page.keyboard.press('Enter');
      await tabTo(page, '.stage-place-button:not([disabled])');
      await expect(page.getByRole('button', { name: placement })).toBeFocused();
      await page.keyboard.press('Enter');
    }
    for (const id of ['care-no-bleach', 'care-tumble-low']) {
      await tabTo(page, `input[data-restriction-id="${id}"]`);
      await page.keyboard.press('Space');
    }
    await tabTo(page, '[data-app-step="plan"] .primary-action');
    await expect(page.getByRole('button', { name: '관리 계획 확인' })).toBeFocused();
    await page.keyboard.press('Enter');

    await expect(page.locator('[aria-current="step"]')).toContainText('손상 예보');
    await expect(page.locator('section.forecast-screen')).toBeVisible();
    await tabTo(page, 'input[data-risk-selection-id="shrinkage"]');
    await page.keyboard.press('Space');
    await tabTo(page, 'input[data-evidence-symbol-id="care-wash-30-gentle"]');
    await page.keyboard.press('Space');
    await tabTo(page, '[data-app-step="forecast"] .primary-action');
    await page.keyboard.press('Enter');
    await expectStatus(page, '[data-app-step="forecast"]', /예측|예보|가능성/);
    await tabTo(page, '[data-app-step="forecast"] .simulation-action:not([disabled])');
    await page.keyboard.press('Enter');

    await expect(page.locator('[aria-current="step"]')).toContainText('가상 관리');
    await expect(page.locator('section.virtual-care-screen')).toBeVisible();
    await tabTo(page, 'section.virtual-care-screen .simulation-action');
    await page.keyboard.press('Enter');
    await expect(page.locator('[aria-current="step"]')).toContainText('계획 수정');
    await expect(page.locator('section.revision-screen')).toBeVisible();
    await expectStatus(page, '[data-app-step="revision"]', /예측|가능성/);
    await expectNamedControls(page, 'radio');
    await expectNamedControls(page, 'checkbox');
    await tabTo(page, '[data-app-step="revision"] .revision-reasons input[type="radio"]', 0);
    for (let reasonIndex = 0; reasonIndex < 5; reasonIndex += 1) await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Space');
    await tabTo(page, '[data-app-step="revision"] .revision-evidence input[type="checkbox"]', 0);
    await page.keyboard.press('Space');
    await tabTo(page, '[data-app-step="revision"] .management-board .primary-action');
    await page.keyboard.press('Enter');
    await expect(page.locator('[aria-current="step"]')).toContainText('구조 보고서');
    await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
  });

  test('names every published symbol with meaning and current-plan context', async ({ page }) => {
    const missionNames = [/기본 티셔츠의 세탁/, /부드러운 목도리의 강한/, /운동복의 낮은/, /장식이 붙은 상의의 제한/, /서로 다른 세 벌/];
    const symbolIds = new Set<string>();
    for (const missionName of missionNames) {
      await page.goto('./');
      await page.getByRole('button', { name: missionName }).click();
      await page.getByRole('button', { name: '표시 확대' }).click();
      for (let attempt = 0; attempt < 8; attempt += 1) {
        const card = page.locator('.care-symbol-card');
        if (await card.count() === 0) break;
        const symbolId = await card.getAttribute('data-symbol-id');
        expect(symbolId).toBeTruthy();
        symbolIds.add(symbolId ?? '');
        await expect(page.getByRole('article', { name: /현재 계획.*허용/ })).toHaveAccessibleName(/표시|관리|확인/);
        await expect(card.locator('img')).toHaveAttribute('alt', /뜻|의미|세탁|건조|다림질/);
        await card.locator('input[type="radio"]').first().check();
        await card.getByRole('button', { name: '뜻 확인' }).click();
      }
    }
    expect([...symbolIds].sort()).toEqual(publishedSymbolIds);
  });

  test('opens the update dialog, traps focus, and returns focus on Escape', async ({ page }) => {
    await page.goto('./');
    const trigger = page.getByRole('button', { name: '업데이트 내역' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: '업데이트 내역' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: '닫기' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(dialog.getByRole('button', { name: '닫기' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('keeps required action text and removes decorative motion when requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('./');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
    const required = page.getByRole('button', { name: '표시 확대' });
    await expect(required).toHaveClass(/required-action/);
    await expect(required).toHaveCSS('animation-name', 'none');
    const badgeContent = await required.evaluate((element) => getComputedStyle(element, '::after').content);
    expect(badgeContent).toContain('필수');
  });

  test('announces evaluation results and exposes named native controls', async ({ page }) => {
    await page.goto('./');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
    await page.getByRole('button', { name: '표시 확대' }).click();
    await expectNamedControls(page, 'radio');
    await page.getByRole('radio').first().check();
    await page.getByRole('button', { name: '뜻 확인' }).click();
    await expectStatus(page, '[data-app-step="magnifier"]', /표시|확인|가능성/);
  });
});
