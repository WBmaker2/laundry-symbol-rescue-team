import { test, expect, type Page } from '@playwright/test';

async function assertNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

test.describe('responsive classroom layout', () => {
  test('reflows the picker at 375px and 320px without horizontal scroll', async ({ page }) => {
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto('/');
      await assertNoHorizontalOverflow(page);
      const tracks = await page.locator('.mission-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
      expect(tracks).toBe(1);
      await expect(page.getByRole('button', { name: '업데이트 내역' })).toBeVisible();
    }
  });

  test('keeps controls and cards usable at 200% root font size', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await expect(page.locator('.app-shell')).toBeVisible();
    await assertNoHorizontalOverflow(page);
    await expect(page.getByRole('button', { name: '업데이트 내역' })).toHaveCSS('min-height', '44px');
    await expect(page.locator('.mission-card').first()).toBeVisible();
  });

  test('makes high contrast and selected states distinguishable beyond color', async ({ page }) => {
    await page.goto('/');
    const shell = page.locator('.app-shell');
    const normal = await shell.evaluate((element) => {
      const button = element.querySelector('button');
      return button ? getComputedStyle(button).borderWidth : '';
    });
    await page.getByRole('button', { name: '고대비 모드' }).click();
    const high = await shell.evaluate((element) => {
      const button = element.querySelector('button');
      return button ? getComputedStyle(button).borderWidth : '';
    });
    expect(high).not.toBe(normal);
    await expect(shell).toHaveAttribute('data-contrast', 'high');
  });

  test('keeps every visible interactive control at least 44px tall', async ({ page }) => {
    await page.goto('/');
    const tooSmall = await page.locator('button, input[type="radio"], input[type="checkbox"], label').evaluateAll((elements) => elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return Math.max(Number.parseFloat(style.minHeight), Number.parseFloat(style.minWidth), element.getBoundingClientRect().height) < 44;
      })
      .map((element) => ({ tag: element.tagName, className: element.className })));
    expect(tooSmall).toEqual([]);
  });
});
