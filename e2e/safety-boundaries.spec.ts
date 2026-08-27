import { test, expect } from '@playwright/test';

const REAL_LABEL_PRIORITY_NOTICE = '실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요.';
const STUDENT_SAFETY_NOTICE = '실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요.';
const STANDARD_VARIATION_NOTICE = '표시는 국가·시기·제품에 따라 다를 수 있어요. 모르는 표시는 보호자·교사 또는 제품 공식 안내에 확인하세요.';
const SERVICE_LIMIT_NOTICE = '이 앱은 가상 의류를 위한 학습 도구이며 실제 손상이나 안전을 보증하는 전문 서비스가 아니에요.';

test('keeps a local-only, safety-bounded learner completion path', async ({ page }) => {
  await page.goto('/');
  const appOrigin = new URL(page.url()).origin;
  const forbiddenRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== appOrigin) forbiddenRequests.push(request.url());
  });
  await page.reload();

  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByText(/구매|광고|AI 자동 판정/)).toHaveCount(0);
  await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
  await page.getByRole('button', { name: '표시 확대' }).click();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const card = page.locator('.care-symbol-card');
    if (await card.count() === 0) break;
    await card.locator('input[type="radio"]').first().check();
    await card.getByRole('button', { name: '뜻 확인' }).click();
  }

  for (const [optionId, stageLabel] of [
    ['plan-wash-gentle-30', '세탁 단계에 놓기'],
    ['plan-dry-tumble-low', '건조 단계에 놓기'],
    ['plan-iron-none', '다림질 단계에 놓기'],
  ] as const) {
    await page.locator(`[data-care-option-id="${optionId}"]`).click();
    await page.getByRole('button', { name: stageLabel }).click();
  }
  for (const id of ['care-no-bleach', 'care-tumble-low']) {
    await page.locator(`input[data-restriction-id="${id}"]`).check();
  }
  await page.getByRole('button', { name: '관리 계획 확인' }).click();

  await page.locator('input[data-risk-selection-id="shrinkage"]').check();
  await page.locator('input[data-evidence-symbol-id="care-wash-30-gentle"]').check();
  await page.getByRole('button', { name: '손상 예보 확인' }).click();
  await page.getByRole('button', { name: '가상 결과 보기' }).click();
  await expect(page.getByRole('heading', { name: '가상 결과 확인' })).toBeVisible();
  for (const notice of [REAL_LABEL_PRIORITY_NOTICE, STUDENT_SAFETY_NOTICE, STANDARD_VARIATION_NOTICE, SERVICE_LIMIT_NOTICE]) {
    await expect(page.getByText(notice, { exact: true }).last()).toBeVisible();
  }

  await page.getByRole('button', { name: '계획 수정하기' }).click();
  await page.getByRole('radio', { name: '현재 계획의 근거를 다시 확인하기' }).check();
  await page.locator('.revision-evidence input[type="checkbox"]').first().check();
  await page.getByRole('button', { name: '수정 계획 확인' }).click();
  await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
  for (const notice of [REAL_LABEL_PRIORITY_NOTICE, STUDENT_SAFETY_NOTICE, STANDARD_VARIATION_NOTICE, SERVICE_LIMIT_NOTICE]) {
    await expect(page.getByText(notice, { exact: true }).last()).toBeVisible();
  }

  expect(forbiddenRequests).toEqual([]);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByText(/구매|광고|AI 자동 판정/)).toHaveCount(0);
});
