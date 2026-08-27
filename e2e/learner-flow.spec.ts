import { expect, test, type Page } from '@playwright/test';
import { careOptionById } from '../src/content/careOptions';
import { careSymbolById } from '../src/content/symbols';
import { missionById } from '../src/content/missions';
import { evaluatePlan } from '../src/domain/evaluatePlan';
import type { CareOptionId, DamageRiskId, PlanningStage } from '../src/domain/careTypes';
import type { MissionId } from '../src/domain/missionTypes';
import { makePlanFixture } from '../src/test/factories';

const missionIds = [
  'basic-t-shirt',
  'soft-scarf',
  'sportswear',
  'decorated-top',
  'mixed-load',
] as const satisfies readonly MissionId[];

for (const missionId of missionIds) {
  test(`${missionId} completes interpretation, plan, prediction, revision, and report`, async ({ page }) => {
    await page.goto('/');
    await chooseMission(page, missionId);
    await completeInterpretations(page, missionId);
    await submitInitialPlan(page, missionId);
    await submitPrediction(page, missionId);
    await revisePlan(page, missionId);
    await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible();
    await expect(page.getByText(/실제 옷에서는 제품 라벨/)).toBeVisible();
  });
}

const riskLabels: Readonly<Record<DamageRiskId, string>> = {
  shrinkage: '줄어듦',
  deformation: '변형',
  'color-change': '색 변화',
  'decoration-damage': '장식 손상',
  'heat-damage': '열 손상',
};

async function chooseMission(page: Page, missionId: MissionId): Promise<void> {
  const mission = missionById.get(missionId);
  if (!mission) throw new Error(`Unknown mission: ${missionId}`);
  await page.locator(`[data-mission-id="${missionId}"]`)
    .getByRole('button', { name: new RegExp(`${mission.title}.*미션 선택`) }).click();
  await page.getByRole('button', { name: '표시 확대' }).click();
}

async function completeInterpretations(page: Page, missionId: MissionId): Promise<void> {
  const mission = missionById.get(missionId);
  if (!mission) throw new Error(`Unknown mission: ${missionId}`);
  const symbolIds = [...new Set(mission.garments.flatMap(({ symbolIds: ids }) => ids))];
  for (const symbolId of symbolIds) {
    const symbol = careSymbolById.get(symbolId);
    if (!symbol) throw new Error(`Unknown symbol: ${symbolId}`);
    const correct = symbol.meaningOptions.find(({ id }) => id === symbol.correctMeaningOptionId);
    if (!correct) throw new Error(`Missing correct meaning: ${symbolId}`);
    const card = page.locator(`[data-symbol-id="${symbolId}"]`);
    await card.getByRole('radio', { name: correct.label }).check();
    await card.getByRole('button', { name: '뜻 확인' }).click();
  }
  // The reducer advances to the plan screen immediately after the final correct symbol.
}

async function placeOption(page: Page, optionId: CareOptionId, stage: PlanningStage): Promise<void> {
  await page.locator(`[data-care-option-id="${optionId}"]`).click();
  const stageName = { wash: '세탁', dry: '건조', iron: '다림질' }[stage];
  await page.getByRole('button', { name: `${stageName} 단계에 놓기` }).click();
}

async function submitInitialPlan(page: Page, missionId: MissionId): Promise<void> {
  const plan = makePlanFixture(missionId, 'outside-limits');
  for (const stage of ['wash', 'dry', 'iron'] as const) {
    const optionId = plan.stageOptions[stage];
    if (!optionId) throw new Error(`Missing outside option for ${stage}`);
    await placeOption(page, optionId, stage);
  }
  for (const checkbox of await page.getByRole('group', { name: '추가 제한 확인' }).getByRole('checkbox').all()) {
    await checkbox.check();
  }
  if (missionId === 'mixed-load') {
    const mission = missionById.get(missionId)!;
    for (const garment of mission.garments) {
      await page.locator(`[data-garment-id="${garment.id}"]`)
        .getByRole('button', { name: /^함께 관리/ }).click();
    }
  }
  await page.getByRole('button', { name: '관리 계획 확인' }).click();
}

async function submitPrediction(page: Page, missionId: MissionId): Promise<void> {
  const mission = missionById.get(missionId)!;
  const plan = makePlanFixture(missionId, 'outside-limits');
  const evaluation = evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById });
  const finding = evaluation.findings.find(({ status, riskIds, relatedSymbolIds }) =>
    status !== 'allowed' && riskIds.length > 0 && relatedSymbolIds.length > 0,
  );
  if (!finding) throw new Error(`No evidence finding for ${missionId}`);
  const riskId = finding.riskIds[0];
  const symbolId = finding.relatedSymbolIds[0];
  await page.getByRole('group', { name: '손상 가능성' })
    .getByRole('checkbox', { name: `${riskLabels[riskId]} 가능성 선택` }).check();
  const symbol = careSymbolById.get(symbolId);
  if (!symbol) throw new Error(`Unknown evidence symbol: ${symbolId}`);
  await page.getByRole('group', { name: '근거 표시' })
    .getByRole('checkbox', { name: new RegExp(symbol.name) }).check();
  await page.getByRole('button', { name: '손상 예보 확인' }).click();
  await page.getByRole('button', { name: '가상 결과 보기' }).click();
  await page.getByRole('button', { name: '계획 수정하기' }).click();
}

async function revisePlan(page: Page, missionId: MissionId): Promise<void> {
  const plan = makePlanFixture(missionId, 'within-limits');
  for (const stage of ['wash', 'dry', 'iron'] as const) {
    const optionId = plan.stageOptions[stage];
    if (!optionId) throw new Error(`Missing within-limits option for ${stage}`);
    await placeOption(page, optionId, stage);
  }
  for (const symbolId of plan.acknowledgedRestrictionIds) {
    await page.locator(`[data-restriction-id="${symbolId}"]`).check();
  }
  if (plan.grouping) {
    for (const garmentId of plan.grouping.togetherGarmentIds) {
      await page.locator(`[data-garment-id="${garmentId}"]`)
        .getByRole('button', { name: /^함께 관리/ }).click();
    }
    for (const garmentId of plan.grouping.separateGarmentIds) {
      await page.locator(`[data-garment-id="${garmentId}"]`)
        .getByRole('button', { name: /^분리 관리/ }).click();
    }
    for (const symbolId of plan.grouping.reasonSymbolIds) {
      await page.locator(`[data-grouping-reason-symbol-id="${symbolId}"]`).check();
    }
  }
  await page.getByRole('radio', { name: '표시의 제한을 따르기 위해' }).check();
  await page.getByRole('group', { name: '관련 표시 근거' }).getByRole('checkbox').first().check();
  await page.getByRole('button', { name: '수정 계획 확인' }).click();
}
