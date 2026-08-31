import { test, expect, type Page } from '@playwright/test';

async function assertNoHorizontalOverflow(page: Page) {
  const metrics = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
}

async function assertVisibleWithinViewport(page: Page, selector: string) {
  const clipped = await page.locator(selector).evaluateAll((elements) => elements
    .filter((element) => {
      const rect = element.getBoundingClientRect();
      return rect.width === 0 || rect.height === 0 || rect.left < 0 || rect.right > window.innerWidth;
    })
    .map((element) => ({ selector, text: element.textContent?.trim().slice(0, 30) })));
  expect(clipped).toEqual([]);
}

async function assertNoOverlappingSiblings(page: Page, selector: string) {
  const violations = await page.locator(selector).evaluateAll((elements) => {
    const boxes = elements.map((element) => {
      const rect = element.getBoundingClientRect();
      return { element, left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height };
    }).filter(({ width, height }) => width > 0 && height > 0);
    const problems: string[] = [];
    for (let i = 0; i < boxes.length; i += 1) {
      const a = boxes[i];
      if (a.left < 0 || a.right > window.innerWidth) problems.push(`out-of-bounds:${i}`);
      for (let j = i + 1; j < boxes.length; j += 1) {
        const b = boxes[j];
        if (a.element.contains(b.element) || b.element.contains(a.element)) continue;
        if (a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top) problems.push(`overlap:${i}:${j}`);
      }
    }
    return problems;
  });
  expect(violations, `overlap or clipping in ${selector}`).toEqual([]);
}

async function assertStepLayout(page: Page, selector = 'button, fieldset, [role="region"]') {
  await assertNoHorizontalOverflow(page);
  await assertVisibleWithinViewport(page, selector);
  await assertNoOverlappingSiblings(page, selector);
}

async function assertSingleColumn(page: Page, selector: string) {
  const tracks = await page.locator(selector).first().evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
  expect(tracks).toBe(1);
}

async function driveFirstMission(page: Page, stopAt: 'plan' | 'forecast' | 'simulation' | 'report' = 'report', requireSingleColumn = true) {
  await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter');
  await assertStepLayout(page);
  await page.getByRole('button', { name: '표시 확대' }).press('Enter');
  for (let symbolIndex = 0; symbolIndex < 3; symbolIndex += 1) {
    const radio = page.locator('input[type="radio"]').first();
    await radio.press('Space');
    await page.getByRole('button', { name: '뜻 확인' }).press('Enter');
  }
  await expect(page.locator('[data-app-step="plan"]')).toBeVisible();
  await assertStepLayout(page);
  await expect(page.locator('[data-care-option-id]')).toHaveCount(3);
  await expect(page.locator('.stage-option-hint')).toHaveText(/지금은 세탁 카드만 보여요/);
  if (requireSingleColumn) {
    await assertSingleColumn(page, '.plan-stage-list');
    await assertSingleColumn(page, '.care-option-grid');
  }
  if (stopAt === 'plan') return;
  await page.getByRole('button', { name: '세탁 단계 보기' }).press('Enter');
  await page.locator('[data-care-option-id="plan-wash-gentle-30"]').press('Enter');
  await page.getByRole('button', { name: '선택한 카드 세탁 단계에 놓기' }).press('Enter');
  await page.getByRole('button', { name: '건조 단계 보기' }).press('Enter');
  await page.locator('[data-care-option-id="plan-dry-tumble-low"]').press('Enter');
  await page.getByRole('button', { name: '선택한 카드 건조 단계에 놓기' }).press('Enter');
  await page.getByRole('button', { name: '다림질 단계 보기' }).press('Enter');
  await page.locator('[data-care-option-id="plan-iron-none"]').press('Enter');
  await page.getByRole('button', { name: '선택한 카드 다림질 단계에 놓기' }).press('Enter');
  await page.getByRole('checkbox', { name: /표백 금지 확인/ }).press('Space');
  await page.getByRole('checkbox', { name: /낮은 열 회전식 건조 확인/ }).press('Space');
  await page.getByRole('button', { name: '관리 계획 확인' }).press('Enter');
  await expect(page.locator('section.forecast-screen')).toBeVisible();
  await assertStepLayout(page);
  if (requireSingleColumn) await assertSingleColumn(page, '.risk-card-grid');
  if (stopAt === 'forecast') return;
  await page.getByRole('checkbox', { name: /줄어듦 가능성 선택/ }).press('Space');
  await page.getByRole('checkbox', { name: /세탁 제한 표시를 근거로 선택/ }).first().press('Space');
  await page.getByRole('button', { name: '손상 예보 확인' }).press('Enter');
  await page.getByRole('button', { name: '가상 결과 보기' }).press('Enter');
  await expect(page.locator('section.virtual-care-screen')).toBeVisible();
  await assertStepLayout(page);
  if (requireSingleColumn) await assertSingleColumn(page, '.comparison-panels');
  if (stopAt === 'simulation') return;
  await page.getByRole('button', { name: '계획 수정하기' }).press('Enter');
  await expect(page.locator('section.revision-screen')).toBeVisible();
  await assertStepLayout(page);
  await page.getByRole('radio', { name: /현재 계획의 근거를 다시 확인/ }).press('Space');
  await page.getByRole('checkbox', { name: /30°C 약한 세탁 표시를 근거로 선택/ }).press('Space');
  await page.getByRole('button', { name: '수정 계획 확인' }).press('Enter');
  await expect(page.locator('section.rescue-report-screen')).toBeVisible();
  await assertStepLayout(page, 'button, [role="region"], .report-section');
  await assertNoOverlappingSiblings(page, '.report-symbol-list, .report-section');
}

test.describe('responsive classroom layout', () => {
  test('reflows the picker at 375px and 320px without horizontal scroll', async ({ page }) => {
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto('./');
      await assertNoHorizontalOverflow(page);
      const tracks = await page.locator('.mission-grid').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
      expect(tracks).toBe(1);
      await expect(page.getByText('현재 단계: 1/7 · 구조 요청')).toBeVisible();
      const currentProgress = await page.locator('.progress-list li.is-current').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      });
      expect(currentProgress.left).toBeGreaterThanOrEqual(0);
      expect(currentProgress.right).toBeLessThanOrEqual(width);
      await expect(page.getByRole('button', { name: '업데이트 내역' })).toBeVisible();
    }
  });

  test('keeps the request action in the first viewport beside compact safety guidance', async ({ page }) => {
    for (const [width, height] of [[375, 812], [1280, 800]] as const) {
      await page.setViewportSize({ width, height });
      await page.goto('./');
      await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
      const actionBounds = await page.getByRole('button', { name: '표시 확대' }).evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { top: rect.top, bottom: rect.bottom };
      });
      expect(actionBounds.top).toBeGreaterThanOrEqual(0);
      expect(actionBounds.bottom).toBeLessThanOrEqual(height);
      await expect(page.locator('.request-screen .safety-notice[data-variant="compact"]')).toBeVisible();
    }
  });

  test('keeps the first mission path inside 375px and 320px bounds', async ({ page }) => {
    for (const width of [375, 320]) {
      await page.setViewportSize({ width, height: 812 });
      await page.goto('./');
      await driveFirstMission(page);
      await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
      await expect(page.getByRole('heading', { name: '구조 미션을 끝냈어요!' })).toBeVisible();
      await expect(page.getByText('출처와 검수일 보기')).toBeVisible();
      await expect(page.getByRole('button', { name: '다른 미션 해보기' })).toBeVisible();
      await expect(page.getByText('현재 단계: 7/7 · 구조 보고서')).toBeVisible();
      const currentProgress = await page.locator('.progress-list li.is-current').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right };
      });
      expect(currentProgress.left).toBeGreaterThanOrEqual(0);
      expect(currentProgress.right).toBeLessThanOrEqual(width);
      await assertNoHorizontalOverflow(page);
      await assertVisibleWithinViewport(page, 'button, fieldset, [role="region"], .report-section');
      const sourceWraps = await page.locator('.source-links a').evaluateAll((elements) => elements.every((element) => getComputedStyle(element).overflowWrap === 'anywhere'));
      expect(sourceWraps).toBe(true);
      const updatePosition = await page.locator('.update-history-button').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        const footer = element.closest('.app-footer')?.getBoundingClientRect();
        return { right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height, footerBottom: footer?.bottom ?? 0 };
      });
      expect(updatePosition.right).toBeLessThanOrEqual(width);
      expect(updatePosition.bottom).toBeLessThanOrEqual(updatePosition.footerBottom);
      expect(updatePosition.width).toBeGreaterThanOrEqual(44);
      expect(updatePosition.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('keeps controls and cards usable at 200% root font size', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('./');
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await expect(page.locator('.app-shell')).toBeVisible();
    await assertNoHorizontalOverflow(page);
    await expect(page.getByRole('button', { name: '업데이트 내역' })).toHaveCSS('min-height', '44px');
    await expect(page.locator('.mission-card').first()).toBeVisible();
    await driveFirstMission(page, 'report', false);
    await expect(page.getByRole('heading', { name: '구조 미션을 끝냈어요!' })).toBeVisible();
    await expect(page.getByRole('button', { name: '다른 미션 해보기' })).toBeVisible();
    await assertNoHorizontalOverflow(page);
    await assertVisibleWithinViewport(page, '[data-app-step="report"] button, [data-app-step="report"] [role="region"], .report-section');
    await assertNoOverlappingSiblings(page, '[data-app-step="report"] button, [data-app-step="report"] [role="region"], .report-section');
    await assertSingleColumn(page, '.report-symbol-list');
    const updatePosition = await page.locator('.update-history-button').evaluate((element) => {
      const rect = element.getBoundingClientRect();
      const footer = element.closest('.app-footer')?.getBoundingClientRect();
      return { right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height, footerBottom: footer?.bottom ?? 0 };
    });
    expect(updatePosition.right).toBeLessThanOrEqual(1280);
    expect(updatePosition.bottom).toBeLessThanOrEqual(updatePosition.footerBottom);
    expect(updatePosition.width).toBeGreaterThanOrEqual(44);
    expect(updatePosition.height).toBeGreaterThanOrEqual(44);
  });

  test('makes high contrast and selected states distinguishable beyond color', async ({ page }) => {
    await page.goto('./');
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
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter');
    await page.getByRole('button', { name: '표시 확대' }).press('Enter');
    await page.getByRole('radio').first().press('Space');
    const selected = page.locator('.meaning-option').first();
    await expect(selected).toHaveCSS('min-height', '44px');
    await expect(page.getByRole('button', { name: '표시 크게 보기' })).toBeVisible();

    await page.goto('./');
    await page.getByRole('button', { name: '고대비 모드' }).press('Enter');
    await driveFirstMission(page, 'plan', false);
    await page.getByRole('button', { name: '세탁 단계 보기' }).press('Enter');
    await page.locator('[data-care-option-id="plan-wash-gentle-30"]').press('Enter');
    const selectedCard = page.locator('.care-option-card.is-selected').first();
    await expect(selectedCard).toHaveCSS('border-width', '4px');
    const selectedMarker = await selectedCard.evaluate((element) => getComputedStyle(element, '::before').content);
    expect(selectedMarker).toContain('선택됨');

    const updateButton = page.locator('.update-history-button');
    const footer = page.locator('.app-footer');
    const positions = await updateButton.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { right: rect.right, bottom: rect.bottom, width: rect.width, height: rect.height };
    });
    const footerBottom = await footer.evaluate((element) => element.getBoundingClientRect().bottom);
    expect(positions.right).toBeLessThanOrEqual(1280);
    expect(positions.bottom).toBeLessThanOrEqual(footerBottom);
    expect(positions.width).toBeGreaterThanOrEqual(44);
    expect(positions.height).toBeGreaterThanOrEqual(44);
  });

  test('uses one-column grids and reduced-motion static comparison at representative screens', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('./');
    await driveFirstMission(page, 'simulation');
    await expect(page.locator('.app-shell')).toHaveAttribute('data-contrast', 'normal');
    await expect(page.locator('[data-comparison-state="allowed"]')).toHaveCount(3);
    await expect(page.locator('.comparison-state')).toHaveCount(3);
    await expect(page.locator('.static-before-after').first()).toHaveCSS('display', 'grid');
    await expect(page.locator('.animated-garment-state').first()).toHaveCSS('display', 'none');
    await expect(page.getByRole('button', { name: '계획 수정하기' })).toHaveCSS('animation-name', 'none');
    const comparisonTracks = await page.locator('.comparison-panels').first().evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    expect(comparisonTracks).toBe(1);
    await page.goto('./');
    await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter');
    await expect(page.getByRole('button', { name: '표시 확대' })).toHaveCSS('animation-name', 'none');
    await expect(page.getByRole('button', { name: '표시 확대' })).toHaveCSS('min-height', '44px');
    const badgeContent = await page.getByRole('button', { name: '표시 확대' }).evaluate((element) => getComputedStyle(element, '::after').content);
    expect(badgeContent).toContain('필수');
  });

  test('keeps every visible interactive control at least 44px tall', async ({ page }) => {
    await page.goto('./');
    const tooSmall = await page.locator('button, input[type="radio"], input[type="checkbox"], label').evaluateAll((elements) => elements
      .filter((element) => {
        const style = getComputedStyle(element);
        return Math.max(Number.parseFloat(style.minHeight), Number.parseFloat(style.minWidth), element.getBoundingClientRect().height) < 44;
      })
      .map((element) => ({ tag: element.tagName, className: element.className })));
    expect(tooSmall).toEqual([]);
  });
});
