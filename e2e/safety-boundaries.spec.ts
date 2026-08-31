import { test, expect } from '@playwright/test';
import {
  PROFESSIONAL_HELP_NOTICE,
  SAFETY_NOTICES,
} from '../src/content/safetyNotices';

test('keeps a local-only, safety-bounded learner completion path', async ({ page }) => {
  const initialDocumentOrigin = new URL(process.env.BASE_URL ?? 'http://127.0.0.1:4173').origin;
  let appOrigin = initialDocumentOrigin;
  const forbiddenRequests: string[] = [];
  page.on('request', (request) => {
    const url = new URL(request.url());
    if (url.origin !== appOrigin) forbiddenRequests.push(request.url());
  });
  await page.goto('./');
  appOrigin = new URL(page.url()).origin;
  await page.reload();

  const identityInputs = 'input[name="name"], input[name="class"], input[name="brand"], input[aria-label*="이름"], input[aria-label*="학급"], input[aria-label*="브랜드"], input[placeholder*="이름"], input[placeholder*="학급"], input[placeholder*="브랜드"]';
  const assertIdentityInputsAbsent = async () => expect(page.locator(identityInputs)).toHaveCount(0);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await assertIdentityInputsAbsent();
  await expect(page.getByText(/구매|광고|AI 자동 판정/)).toHaveCount(0);
  await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click();
  await assertIdentityInputsAbsent();
  await page.getByRole('button', { name: '표시 확대' }).click();

  for (let attempt = 0; attempt < 8; attempt += 1) {
    const card = page.locator('.care-symbol-card');
    if (await card.count() === 0) break;
    await card.locator('input[type="radio"]').first().check();
    await card.getByRole('button', { name: '뜻 확인' }).click();
  }
  await assertIdentityInputsAbsent();

  for (const [optionId, stageLabel] of [
    ['plan-wash-gentle-30', '세탁 단계에 놓기'],
    ['plan-dry-tumble-low', '건조 단계에 놓기'],
    ['plan-iron-none', '다림질 단계에 놓기'],
  ] as const) {
    const stageName = stageLabel.replace(' 단계에 놓기', '');
    await page.getByRole('button', { name: `${stageName} 단계 보기` }).click();
    await page.locator(`[data-care-option-id="${optionId}"]`).click();
    await page.getByRole('button', { name: `선택한 카드 ${stageName} 단계에 놓기` }).click();
  }
  for (const id of ['care-no-bleach', 'care-tumble-low']) {
    await page.locator(`input[data-restriction-id="${id}"]`).check();
  }
  await page.getByRole('button', { name: '관리 계획 확인' }).click();
  await assertIdentityInputsAbsent();

  await page.locator('input[data-risk-selection-id="shrinkage"]').check();
  await page.locator('input[data-evidence-symbol-id="care-wash-30-gentle"]').check();
  await page.getByRole('button', { name: '손상 예보 확인' }).click();
  await assertIdentityInputsAbsent();
  await page.getByRole('button', { name: '가상 결과 보기' }).click();
  await assertIdentityInputsAbsent();
  await expect(page.getByRole('heading', { name: '가상 결과 확인' })).toBeVisible();
  for (const notice of SAFETY_NOTICES) {
    await expect(page.getByText(notice, { exact: true }).last()).toBeVisible();
  }
  await expect(page.getByText(PROFESSIONAL_HELP_NOTICE, { exact: true }).last()).toBeVisible();

  await page.getByRole('button', { name: '계획 수정하기' }).click();
  await page.getByRole('radio', { name: '현재 계획의 근거를 다시 확인하기' }).check();
  await page.locator('.revision-evidence input[type="checkbox"]').first().check();
  await page.getByRole('button', { name: '수정 계획 확인' }).click();
  await assertIdentityInputsAbsent();
  await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
  for (const notice of SAFETY_NOTICES) {
    await expect(page.getByText(notice, { exact: true }).last()).toBeVisible();
  }
  await expect(page.getByText(PROFESSIONAL_HELP_NOTICE, { exact: true }).last()).toBeVisible();

  expect(forbiddenRequests).toEqual([]);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await assertIdentityInputsAbsent();
  await expect(page.getByText(/구매|광고|AI 자동 판정/)).toHaveCount(0);
});
