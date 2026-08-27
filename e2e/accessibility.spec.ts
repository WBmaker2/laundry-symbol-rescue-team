import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function expectNamedControls(page: import('@playwright/test').Page, role: 'radio' | 'checkbox') {
  const controls = await page.getByRole(role).all();
  for (const control of controls) {
    const name = await control.evaluate((element) => element.getAttribute('aria-label') || element.closest('label')?.textContent?.trim() || '');
    expect(name.length).toBeGreaterThan(0);
  }
}

test.describe('classroom accessibility', () => {
  test('shows focus and has no critical or serious axe violations', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus-visible')).toBeVisible();

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious')).toEqual([]);
  });

  test('exposes progress, pressed controls, native choices, and symbol context', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('navigation', { name: '학습 진행 7단계' })).toBeVisible();
    await expect(page.locator('[aria-current="step"]')).toHaveCount(1);
    await expect(page.getByRole('button', { name: '고대비 모드' })).toHaveAttribute('aria-pressed', 'false');

    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
    await page.getByRole('button', { name: '표시 확대' }).click();
    const symbolCard = page.locator('.care-symbol-card');
    await expect(symbolCard).toHaveAttribute('aria-label', /현재 계획/);
    await expect(symbolCard.locator('img')).toHaveAttribute('alt', /뜻|의미|세탁|건조|다림질/);
    await expect(symbolCard.locator('input[type="radio"]')).toHaveCount(3);
    await expect(symbolCard.locator('label')).toHaveCount(3);
    await expect(symbolCard.getByRole('button', { name: '뜻 확인' })).toBeVisible();

    const unnamedChoices = await page.locator('input[type="radio"], input[type="checkbox"]').evaluateAll((elements) => elements
      .filter((element) => !element.getAttribute('aria-label') && !element.id && !element.closest('label'))
      .map((element) => element.outerHTML));
    expect(unnamedChoices).toEqual([]);

    await page.getByRole('button', { name: '고대비 모드' }).click();
    await expect(page.getByRole('button', { name: '고대비 모드' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('advances the first mission with keyboard controls only', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter');
    await expect(page.locator('[data-app-step="request"]')).toBeVisible();
    await page.getByRole('button', { name: '표시 확대' }).press('Enter');

    for (let symbolIndex = 0; symbolIndex < 3; symbolIndex += 1) {
      const radio = page.locator('input[type="radio"]').first();
      await radio.press('ArrowUp');
      await radio.press('Space');
      await page.getByRole('button', { name: '뜻 확인' }).press('Enter');
      if (symbolIndex < 2) await expect(page.locator('section.magnifier-screen')).toBeVisible();
    }

    await expect(page.locator('[data-app-step="plan"]')).toBeVisible();
    await expectNamedControls(page, 'checkbox');
    await expect(page.locator('[data-app-step="plan"] [aria-live="polite"]')).toBeVisible();
    await page.locator('[data-care-option-id="plan-wash-gentle-30"]').press('Enter');
    await page.getByRole('button', { name: '세탁 단계에 놓기' }).press('Enter');
    await page.locator('[data-care-option-id="plan-dry-tumble-low"]').press('Enter');
    await page.getByRole('button', { name: '건조 단계에 놓기' }).press('Enter');
    await page.locator('[data-care-option-id="plan-iron-none"]').press('Enter');
    await page.getByRole('button', { name: '다림질 단계에 놓기' }).press('Enter');
    await page.getByRole('checkbox', { name: /표백 금지 확인/ }).press('Space');
    await page.getByRole('checkbox', { name: /낮은 열 회전식 건조 확인/ }).press('Space');
    await page.getByRole('button', { name: '관리 계획 확인' }).press('Enter');

    await expect(page.locator('section.forecast-screen')).toBeVisible();
    await page.getByRole('checkbox', { name: /줄어듦 가능성 선택/ }).press('Space');
    await page.getByRole('checkbox', { name: /세탁 제한 표시를 근거로 선택/ }).first().press('Space');
    await page.getByRole('button', { name: '손상 예보 확인' }).press('Enter');
    await expect(page.locator('[data-app-step="forecast"] [role="status"][aria-live="polite"]')).toBeVisible();
    await page.getByRole('button', { name: '가상 결과 보기' }).press('Enter');

    await expect(page.locator('section.virtual-care-screen')).toBeVisible();
    await page.getByRole('button', { name: '계획 수정하기' }).press('Enter');
    await expect(page.locator('section.revision-screen')).toBeVisible();
    await expect(page.locator('[data-app-step="revision"] [role="status"][aria-live="polite"]')).toContainText(/예측|가능성/);
    await expectNamedControls(page, 'radio');
    await expectNamedControls(page, 'checkbox');
    await page.getByRole('radio', { name: /현재 계획의 근거를 다시 확인/ }).press('Space');
    await page.getByRole('checkbox', { name: /30°C 약한 세탁 표시를 근거로 선택/ }).press('Space');
    await page.getByRole('button', { name: '수정 계획 확인' }).press('Enter');
    await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
  });

  test('names every published symbol with its meaning and current-plan context', async ({ page }) => {
    const missionNames = [
      /기본 티셔츠의 세탁/, /부드러운 목도리의 강한/, /운동복의 낮은/,
      /장식이 붙은 상의의 제한/, /서로 다른 세 벌/,
    ];
    const symbolIds = new Set<string>();
    for (const missionName of missionNames) {
      await page.goto('/');
      await page.getByRole('button', { name: missionName }).click();
      await page.getByRole('button', { name: '표시 확대' }).click();
      for (let attempt = 0; attempt < 4; attempt += 1) {
        const card = page.locator('.care-symbol-card');
        if (await card.count() === 0) break;
        const symbolId = await card.getAttribute('data-symbol-id');
        expect(symbolId).toBeTruthy();
        symbolIds.add(symbolId ?? '');
        await expect(card).toHaveAttribute('aria-label', /표시.*현재 계획.*허용/);
        await expect(card.locator('img')).toHaveAttribute('alt', /뜻|의미|세탁|건조|다림질/);
        await card.locator('input[type="radio"]').first().check();
        await card.getByRole('button', { name: '뜻 확인' }).click();
      }
    }
    // Every symbol used by a learner-facing mission is visited here. The
    // source registry may contain an intentionally unused reference symbol.
    expect(symbolIds.size).toBeGreaterThanOrEqual(7);
  });

  test('opens the update dialog, traps focus, and returns focus on Escape', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: '업데이트 내역' });
    await trigger.focus();
    await page.keyboard.press('Enter');
    const dialog = page.getByRole('dialog', { name: '업데이트 내역' });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('button', { name: '닫기' })).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test('keeps required action text and removes decorative motion when requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
    const required = page.getByRole('button', { name: '표시 확대' });
    await expect(required).toHaveClass(/required-action/);
    await expect(required).toHaveCSS('animation-name', 'none');
    await expect(required, 'the reduced-motion replacement remains textual').toBeVisible();
    const badgeContent = await required.evaluate((element) => getComputedStyle(element, '::after').content);
    expect(badgeContent).toContain('필수');
  });

  test('announces evaluation results and exposes named controls', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter');
    await page.getByRole('button', { name: '표시 확대' }).press('Enter');
    const radioNames = await page.getByRole('radio').evaluateAll((elements) => elements.map((element) => element.getAttribute('aria-label') || element.closest('label')?.textContent?.trim() || ''));
    expect(radioNames.every((name) => name.length > 0)).toBe(true);
    await page.getByRole('radio').first().press('Space');
    await page.getByRole('button', { name: '뜻 확인' }).press('Enter');
    await expect(page.locator('[role="status"][aria-live="polite"]')).toHaveCount(1);
    await expect(page.locator('[role="status"][aria-live="polite"]')).toContainText(/표시|확인|가능성/);
  });
});
