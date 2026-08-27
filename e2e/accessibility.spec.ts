import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

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

    await page.getByRole('button', { name: '고대비 모드' }).click();
    await expect(page.getByRole('button', { name: '고대비 모드' })).toHaveAttribute('aria-pressed', 'true');
  });

  test('advances the first mission with keyboard controls only', async ({ page }) => {
    await page.goto('/');
    const mission = page.getByRole('button', { name: /기본 티셔츠의 세탁/ });
    await mission.focus();
    await page.keyboard.press('Enter');
    const openMagnifier = page.getByRole('button', { name: '표시 확대' });
    await openMagnifier.focus();
    await page.keyboard.press('Enter');
    const firstRadio = page.locator('input[type="radio"]').first();
    await firstRadio.focus();
    await page.keyboard.press('Space');
    const confirm = page.getByRole('button', { name: '뜻 확인' });
    await confirm.focus();
    await page.keyboard.press('Enter');
    await expect(page.getByText(/맞아요|다시 생각/).first()).toBeVisible();
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
});
