# Learner Text Inventory

- Root: `/Volumes/ External Drive 256G/Dev2/codex/laundry-symbol-rescue-team`
- Files scanned: `90`
- Candidates: `1899`
- Status: `triage only`; not a grade-level certification or automatic rewrite.

## Candidate strings

| Source | Surface | Text | Role hints | Review signals |
| --- | --- | --- | --- | --- |
| e2e/accessibility.spec.ts:26:45 | text | ${document.activeElement?.tagName ?? 'none'}:${document.activeElement?.className ?? ''}:${document.activeElement?.getAttribute('aria-label') ?? ''} | learner-text-candidate | long-or-dense, technical-or-internal |
| e2e/accessibility.spec.ts:27:20 | text | Tab order did not reach ${selector}[${index}] (active ${active}; visited ${visited.slice(0, 15).join('\|')}) | feedback-or-error | long-or-dense, technical-or-internal |
| e2e/accessibility.spec.ts:48:56 | text | 학습 진행 7단계 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:49:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:50:34 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:50:52 | text | 고대비 모드 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:50:81 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:50:97 | text | false | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:51:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:52:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:52:45 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:58:38 | text | label | learner-text-candidate | — |
| e2e/accessibility.spec.ts:59:40 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:59:58 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:61:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:61:45 | text | 고대비 모드 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:62:34 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:62:52 | text | 고대비 모드 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:62:81 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:62:97 | text | true | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:67:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:68:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:68:45 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:71:32 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:71:50 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:73:32 | text | [data-app-step="magnifier"] [role="status"] | learner-text-candidate | — |
| e2e/accessibility.spec.ts:75:32 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:75:50 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:79:35 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:79:53 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:81:98 | text | 온도와 줄 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:90:32 | text | [data-app-step="request"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:91:37 | text | window.scrollY)).toBeLessThanOrEqual(1); await tabTo(page, '[data-app-step="request"] .primary-action'); await expect(page.getByRole('button', { name: '표시 확대' })).toBeFocused(); await page.keyboard.press('Enter'); for (let symbolIndex = 0; symbolIndex | button-or-action | long-or-dense |
| e2e/accessibility.spec.ts:93:34 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:93:52 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:103:36 | text | [data-app-step="magnifier"] .symbol-expand-button | button-or-action | long-or-dense |
| e2e/accessibility.spec.ts:109:36 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:109:54 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:113:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:113:72 | text | 관리 순서판 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:115:32 | text | [data-app-step="plan"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:116:37 | text | window.scrollY)).toBeLessThanOrEqual(1); await expectNamedControls(page, 'checkbox'); await expectStatus(page, '[data-app-step="plan"]', /단계가 배치/); await expect(page.locator('.stage-option-hint')).toHaveAttribute('aria-live', 'polite'); await expect(page.locator('[data-care-option-id]')).toHaveCount(3); for (const [stageIndex, [optionId, placement]] of [ ['plan-wash-gentle-30', '세탁 단계에 놓기'], ['plan-dry-tumble-low', '건조 단계에 놓기'], ['plan-iron-none', '다림질 단계에 놓기'], ].entries()) { await tabTo(page, '.plan-stage-nav-button', stageIndex); await page.keyboard.press('Enter'); await tabTo(page, `[data-care-option-id="${optionId}"]`); await expect(page.locator(`[data-care-option-id="${optionId}"]`)).toBeFocused(); await page.keyboard.press('Enter'); await tabTo(page, '.selected-option-place-button'); await expect(page.getByRole('button', { name: `선택한 카드 ${placement.replace(' 단계에 놓기', '')} 단계에 놓기` })).toBeFocused(); await page.keyboard.press('Enter'); } for (const id of ['care-no-bleach', 'care-tumble-low']) { await tabTo(page, `input[data-restriction-id="${id}"]`); await page.keyboard.press('Space'); } await tabTo(page, '[data-app-step="plan"] .primary-action'); await expect(page.getByRole('button', { name: '관리 계획 확인' })).toBeFocused(); await page.keyboard.press('Enter'); await expect(page.locator('[aria-current="step"]')).toContainText('손상 예보'); await expect(page.locator('section.forecast-screen')).toBeVisible(); await expect(page.locator('[data-app-step="forecast"] [data-step-heading="true"]')).toBeFocused(); await tabTo(page, 'input[data-risk-selection-id="shrinkage"]'); await page.keyboard.press('Space'); await tabTo(page, 'input[data-evidence-symbol-id="care-wash-30-gentle"]'); await page.keyboard.press('Space'); await tabTo(page, '[data-app-step="forecast"] .primary-action'); await page.keyboard.press('Enter'); await expectStatus(page, '[data-app-step="forecast"]', /예측\|예보\|가능성/); const studentFeedback = page.locator('[data-app-step="forecast"] .forecast-feedback [role="status"]'); await expect(studentFeedback).toContainText(/표시\|가능성/); await expect(studentFeedback).not.toContainText(/\d+\/\d+\|\d+개/); await expect(page.getByText('자세한 연결 결과 보기')).toBeVisible(); await tabTo(page, '[data-app-step="forecast"] .simulation-action:not([disabled])'); await page.keyboard.press('Enter'); await expect(page.locator('[aria-current="step"]')).toContainText('가상 관리'); await expect(page.locator('section.virtual-care-screen')).toBeVisible(); await expect(page.locator('[data-app-step="simulation"] [data-step-heading="true"]')).toBeFocused(); await tabTo(page, 'section.virtual-care-screen .simulation-action'); await page.keyboard.press('Enter'); await expect(page.locator('[aria-current="step"]')).toContainText('계획 수정'); await expect(page.locator('section.revision-screen')).toBeVisible(); await expect(page.locator('[data-app-step="revision"] [data-step-heading="true"]')).toBeFocused(); await expectStatus(page, '[data-app-step="revision"]', /예측\|가능성/); await expectNamedControls(page, 'radio'); await expectNamedControls(page, 'checkbox'); await tabTo(page, '[data-app-step="revision"] .revision-reasons input[type="radio"]', 0); for (let reasonIndex = 0; reasonIndex | heading, button-or-action, feedback-or-error, hint, input | long-or-dense, multiple-actions, technical-or-internal |
| e2e/accessibility.spec.ts:119:32 | text | .stage-option-hint | hint | repeated-text |
| e2e/accessibility.spec.ts:122:32 | text | 세탁 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:123:32 | text | 건조 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:124:27 | text | 다림질 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:126:26 | text | .plan-stage-nav-button | button-or-action | — |
| e2e/accessibility.spec.ts:131:26 | text | .selected-option-place-button | button-or-action | — |
| e2e/accessibility.spec.ts:132:36 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:132:54 | text | 선택한 카드 ${placement.replace(' 단계에 놓기', '')} 단계에 놓기 | button-or-action | — |
| e2e/accessibility.spec.ts:140:34 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:140:52 | text | 관리 계획 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:143:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:143:72 | text | 손상 예보 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:145:32 | text | [data-app-step="forecast"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:153:43 | text | [data-app-step="forecast"] .forecast-feedback [role="status"] | feedback-or-error | long-or-dense |
| e2e/accessibility.spec.ts:156:34 | text | 자세한 연결 결과 보기 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:160:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:160:72 | text | 가상 관리 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:162:32 | text | [data-app-step="simulation"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:165:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:165:72 | text | 계획 수정 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:167:32 | text | [data-app-step="revision"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:178:32 | text | [aria-current="step"] | learner-text-candidate | repeated-text, technical-or-internal |
| e2e/accessibility.spec.ts:178:72 | text | 구조 보고서 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:179:34 | text | heading | heading | repeated-text |
| e2e/accessibility.spec.ts:179:53 | text | 구조 보고서 | heading | repeated-text |
| e2e/accessibility.spec.ts:180:32 | text | [data-app-step="report"] [data-step-heading="true"] | heading | long-or-dense |
| e2e/accessibility.spec.ts:183:97 | text | { const missionNames = [/기본 티셔츠의 세탁/, /부드러운 목도리의 강한/, /운동복의 낮은/, /장식이 붙은 상의의 제한/, /서로 다른 세 벌/]; const symbolIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| e2e/accessibility.spec.ts:185:38 | text | (); for (const missionName of missionNames) { await page.goto('./'); await page.getByRole('button', { name: missionName }).click(); await page.getByRole('button', { name: '표시 확대' }).click(); for (let attempt = 0; attempt | button-or-action | long-or-dense |
| e2e/accessibility.spec.ts:188:29 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:189:29 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:189:47 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:199:31 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:199:49 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:207:37 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:207:55 | text | 업데이트 내역 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:210:54 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:212:36 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:212:54 | text | 닫기 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:214:36 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:214:54 | text | 닫기 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:223:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:224:38 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:224:56 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:228:37 | text | 필수 | learner-text-candidate | repeated-text |
| e2e/accessibility.spec.ts:233:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:234:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:234:45 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:237:27 | text | button | button-or-action | repeated-text |
| e2e/accessibility.spec.ts:237:45 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:19:108 | text | { await page.goto('./'); await chooseMission(page, missionId); await completeInterpretations(page, missionId); await submitInitialPlan(page, missionId); await submitPrediction(page, missionId); await revisePlan(page, missionId); await expect(page.getByRole('heading', { name: '구조 보고서' })).toBeVisible(); await expect(page.getByRole('heading', { name: '구조 미션을 끝냈어요!' })).toBeVisible(); await expect(page.getByRole('region', { name: '최초 계획' })).toBeVisible(); await expect(page.getByRole('region', { name: '수정 계획' })).toBeVisible(); await expect(page.getByText(/실제 옷에서는 제품 라벨/)).toBeVisible(); await expect(page.getByRole('button', { name: '다른 미션 해보기' })).toHaveClass(/required-action/); await page.getByRole('button', { name: '다른 미션 해보기' }).click(); await expect(page.getByRole('heading', { name: '구조할 가상 옷을 골라 보세요' })).toBeFocused(); }); } const riskLabels: Readonly | heading, button-or-action | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:26:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:26:53 | text | 구조 보고서 | heading | repeated-text |
| e2e/learner-flow.spec.ts:27:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:27:53 | text | 구조 미션을 끝냈어요! | heading | repeated-text |
| e2e/learner-flow.spec.ts:28:52 | text | 최초 계획 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:29:52 | text | 수정 계획 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:31:34 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:31:52 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:32:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:32:45 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:33:34 | text | heading | heading | repeated-text |
| e2e/learner-flow.spec.ts:33:53 | text | 구조할 가상 옷을 골라 보세요 | heading | repeated-text |
| e2e/learner-flow.spec.ts:37:57 | text | = { shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화', 'decoration-damage': '장식 손상', 'heat-damage': '열 손상', }; async function chooseMission(page: Page, missionId: MissionId): Promise | learner-text-candidate | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:38:15 | text | 줄어듦 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:39:17 | text | 변형 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:40:20 | text | 색 변화 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:41:25 | text | 장식 손상 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:42:19 | text | 열 손상 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:45:78 | text | { const mission = missionById.get(missionId); if (!mission) throw new Error(`Unknown mission: ${missionId}`); await page.locator(`[data-mission-id="${missionId}"]`) .getByRole('button', { name: new RegExp(`${mission.title}.*미션 선택`) }).click(); await page.getByRole('button', { name: '표시 확대' }).click(); } async function completeInterpretations(page: Page, missionId: MissionId): Promise | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:47:34 | text | Unknown mission: ${missionId} | feedback-or-error | repeated-text, technical-or-internal |
| e2e/learner-flow.spec.ts:49:17 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:49:46 | text | ${mission.title}.*미션 선택 | button-or-action | — |
| e2e/learner-flow.spec.ts:50:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:50:43 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:55:34 | text | Unknown mission: ${missionId} | feedback-or-error | repeated-text, technical-or-internal |
| e2e/learner-flow.spec.ts:59:35 | text | Unknown symbol: ${symbolId} | feedback-or-error | technical-or-internal |
| e2e/learner-flow.spec.ts:60:59 | text | id === symbol.correctMeaningOptionId); if (!correct) throw new Error(`Missing correct meaning: ${symbolId}`); const card = page.locator(`[data-symbol-id="${symbolId}"]`); await card.getByRole('radio', { name: correct.label }).check(); await card.getByRole('button', { name: '뜻 확인' }).click(); } // The reducer advances to the plan screen immediately after the final correct symbol. } async function placeOption(page: Page, optionId: CareOptionId, stage: PlanningStage): Promise | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:61:36 | text | Missing correct meaning: ${symbolId} | feedback-or-error | technical-or-internal |
| e2e/learner-flow.spec.ts:63:27 | text | radio | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:64:27 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:64:45 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:69:100 | text | { const stageName = { wash: '세탁', dry: '건조', iron: '다림질' }[stage]; await page.getByRole('button', { name: `${stageName} 단계 보기` }).click(); await page.locator(`[data-care-option-id="${optionId}"]`).click(); await page.getByRole('button', { name: `선택한 카드 ${stageName} 단계에 놓기` }).click(); } async function submitInitialPlan(page: Page, missionId: MissionId): Promise | button-or-action | long-or-dense, technical-or-internal |
| e2e/learner-flow.spec.ts:70:30 | text | 세탁 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:70:41 | text | 건조 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:70:53 | text | 다림질 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:71:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:71:43 | text | ${stageName} 단계 보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:73:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:73:43 | text | 선택한 카드 ${stageName} 단계에 놓기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:76:82 | text | { const plan = makePlanFixture(missionId, 'outside-limits'); for (const stage of ['wash', 'dry', 'iron'] as const) { const optionId = plan.stageOptions[stage]; if (!optionId) throw new Error(`Missing outside option for ${stage}`); await placeOption(page, optionId, stage); } for (const checkbox of await page.getByRole('group', { name: '추가 제한 확인' }).getByRole('checkbox').all()) { await checkbox.check(); } if (missionId === 'mixed-load') { const mission = missionById.get(missionId)!; for (const garment of mission.garments) { await page.locator(`[data-garment-id="${garment.id}"]`) .getByRole('button', { name: /^함께 관리/ }).click(); } } await page.getByRole('button', { name: '관리 계획 확인' }).click(); } async function submitPrediction(page: Page, missionId: MissionId): Promise | button-or-action, feedback-or-error | long-or-dense, multiple-actions, technical-or-internal |
| e2e/learner-flow.spec.ts:80:37 | text | Missing outside option for ${stage} | feedback-or-error | missing-term-explanation, technical-or-internal |
| e2e/learner-flow.spec.ts:83:65 | text | 추가 제한 확인 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:90:21 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:93:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:93:43 | text | 관리 계획 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:101:76 | text | 0, ); if (!finding) throw new Error(`No evidence finding for ${missionId}`); const riskId = finding.riskIds[0]; const symbolId = finding.relatedSymbolIds[0]; await page.getByRole('group', { name: '손상 가능성' }) .getByRole('checkbox', { name: `${riskLabels[riskId]} 가능성 선택` }).check(); const symbol = careSymbolById.get(symbolId); if (!symbol) throw new Error(`Unknown evidence symbol: ${symbolId}`); await page.getByRole('group', { name: '근거 표시' }) .getByRole('checkbox', { name: new RegExp(symbol.name) }).check(); await page.getByRole('button', { name: '손상 예보 확인' }).click(); await page.getByRole('button', { name: '가상 결과 보기' }).click(); await page.getByRole('button', { name: '계획 수정하기' }).click(); } async function revisePlan(page: Page, missionId: MissionId): Promise | button-or-action, feedback-or-error | long-or-dense, multiple-actions, technical-or-internal |
| e2e/learner-flow.spec.ts:103:34 | text | No evidence finding for ${missionId} | feedback-or-error | missing-term-explanation, technical-or-internal |
| e2e/learner-flow.spec.ts:106:42 | text | 손상 가능성 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:107:17 | text | checkbox | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:107:37 | text | ${riskLabels[riskId]} 가능성 선택 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| e2e/learner-flow.spec.ts:109:33 | text | Unknown evidence symbol: ${symbolId} | feedback-or-error | technical-or-internal |
| e2e/learner-flow.spec.ts:110:42 | text | 근거 표시 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:112:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:112:43 | text | 손상 예보 확인 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:113:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:113:43 | text | 가상 결과 보기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:114:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:114:43 | text | 계획 수정하기 | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:121:37 | text | Missing within-limits option for ${stage} | feedback-or-error | — |
| e2e/learner-flow.spec.ts:130:21 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:134:21 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:140:42 | text | 표시의 제한을 따르기 위해 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:141:42 | text | 관련 표시 근거 | learner-text-candidate | repeated-text |
| e2e/learner-flow.spec.ts:142:25 | text | button | button-or-action | repeated-text |
| e2e/learner-flow.spec.ts:142:43 | text | 수정 계획 확인 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:42:57 | text | button, fieldset, [role="region"] | button-or-action | — |
| e2e/responsive.spec.ts:49:76 | text | getComputedStyle(element).gridTemplateColumns.split(' ').length); expect(tracks).toBe(1); } async function driveFirstMission(page: Page, stopAt: 'plan' \| 'forecast' \| 'simulation' \| 'report' = 'report', requireSingleColumn = true) { await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).press('Enter'); await assertStepLayout(page); await page.getByRole('button', { name: '표시 확대' }).press('Enter'); for (let symbolIndex = 0; symbolIndex | button-or-action | long-or-dense, technical-or-internal |
| e2e/responsive.spec.ts:54:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:54:65 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:56:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:56:43 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:56:60 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:60:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:60:45 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:60:61 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:65:30 | text | .stage-option-hint | hint | repeated-text |
| e2e/responsive.spec.ts:71:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:71:43 | text | 세탁 단계 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:71:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:73:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:73:43 | text | 선택한 카드 세탁 단계에 놓기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:73:71 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:74:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:74:43 | text | 건조 단계 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:74:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:76:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:76:43 | text | 선택한 카드 건조 단계에 놓기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:76:71 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:77:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:77:43 | text | 다림질 단계 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:77:64 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:79:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:79:43 | text | 선택한 카드 다림질 단계에 놓기 | button-or-action | — |
| e2e/responsive.spec.ts:79:72 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:82:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:82:43 | text | 관리 계획 확인 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:82:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:89:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:89:43 | text | 손상 예보 확인 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:89:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:90:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:90:43 | text | 가상 결과 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:90:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:95:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:95:43 | text | 계획 수정하기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:95:62 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:100:25 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:100:43 | text | 수정 계획 확인 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:100:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:102:33 | text | button, [role="region"], .report-section | button-or-action | — |
| e2e/responsive.spec.ts:114:36 | text | 현재 단계: 1/7 · 구조 요청 | learner-text-candidate | repeated-text |
| e2e/responsive.spec.ts:121:36 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:121:54 | text | 업데이트 내역 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:129:29 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:130:50 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:130:68 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:136:34 | text | .request-screen .safety-notice[data-variant="compact"] | learner-text-candidate | long-or-dense, technical-or-internal |
| e2e/responsive.spec.ts:145:36 | text | heading | heading | repeated-text |
| e2e/responsive.spec.ts:145:55 | text | 구조 보고서 | heading | repeated-text |
| e2e/responsive.spec.ts:146:36 | text | heading | heading | repeated-text |
| e2e/responsive.spec.ts:146:55 | text | 구조 미션을 끝냈어요! | heading | repeated-text |
| e2e/responsive.spec.ts:147:36 | text | 출처와 검수일 보기 | learner-text-candidate | repeated-text |
| e2e/responsive.spec.ts:148:36 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:148:54 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:149:36 | text | 현재 단계: 7/7 · 구조 보고서 | learner-text-candidate | — |
| e2e/responsive.spec.ts:157:48 | text | button, fieldset, [role="region"], .report-section | button-or-action | long-or-dense |
| e2e/responsive.spec.ts:160:50 | text | .update-history-button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:178:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:178:52 | text | 업데이트 내역 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:178:76 | text | min-height | button-or-action | repeated-text |
| e2e/responsive.spec.ts:178:90 | text | 44px | button-or-action | repeated-text |
| e2e/responsive.spec.ts:181:34 | text | heading | heading | repeated-text |
| e2e/responsive.spec.ts:181:53 | text | 구조 미션을 끝냈어요! | heading | repeated-text |
| e2e/responsive.spec.ts:182:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:182:52 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:184:46 | text | [data-app-step="report"] button, [data-app-step="report"] [role="region"], .report-section | button-or-action | long-or-dense, repeated-text |
| e2e/responsive.spec.ts:185:46 | text | [data-app-step="report"] button, [data-app-step="report"] [role="region"], .report-section | button-or-action | long-or-dense, repeated-text |
| e2e/responsive.spec.ts:187:48 | text | .update-history-button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:202:45 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:205:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:205:45 | text | 고대비 모드 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:207:45 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:212:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:212:67 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:213:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:213:45 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:213:62 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:217:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:217:52 | text | 표시 크게 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:220:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:220:45 | text | 고대비 모드 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:220:63 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:222:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:222:45 | text | 세탁 단계 보기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:222:65 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:227:39 | text | 선택됨 | learner-text-candidate | — |
| e2e/responsive.spec.ts:229:40 | text | .update-history-button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:252:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:252:52 | text | 계획 수정하기 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:252:76 | text | animation-name | button-or-action | repeated-text |
| e2e/responsive.spec.ts:252:94 | text | none | button-or-action | repeated-text |
| e2e/responsive.spec.ts:256:27 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:256:67 | text | Enter | button-or-action | repeated-text |
| e2e/responsive.spec.ts:257:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:257:52 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:257:74 | text | animation-name | button-or-action | repeated-text |
| e2e/responsive.spec.ts:257:92 | text | none | button-or-action | repeated-text |
| e2e/responsive.spec.ts:258:34 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:258:52 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:258:74 | text | min-height | button-or-action | repeated-text |
| e2e/responsive.spec.ts:258:88 | text | 44px | button-or-action | repeated-text |
| e2e/responsive.spec.ts:259:48 | text | button | button-or-action | repeated-text |
| e2e/responsive.spec.ts:259:66 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/responsive.spec.ts:259:125 | text | ::after | button-or-action | — |
| e2e/responsive.spec.ts:260:37 | text | 필수 | learner-text-candidate | repeated-text |
| e2e/responsive.spec.ts:265:42 | text | button, input[type="radio"], input[type="checkbox"], label | button-or-action, input | long-or-dense |
| e2e/safety-boundaries.spec.ts:19:27 | text | input[name="name"], input[name="class"], input[name="brand"], input[aria-label*="이름"], input[aria-label*="학급"], input[aria-label*="브랜드"], input[placeholder*="이름"], input[placeholder*="학급"], input[placeholder*="브랜드"] | input | long-or-dense, technical-or-internal |
| e2e/safety-boundaries.spec.ts:20:49 | text | expect(page.locator(identityInputs)).toHaveCount(0); await expect(page.locator('input[type="file"]')).toHaveCount(0); await assertIdentityInputsAbsent(); await expect(page.getByText(/구매\|광고\|AI 자동 판정/)).toHaveCount(0); await page.getByRole('button', { name: /기본 티셔츠의 세탁/ }).click(); await assertIdentityInputsAbsent(); await page.getByRole('button', { name: '표시 확대' }).click(); for (let attempt = 0; attempt | button-or-action, input | long-or-dense, technical-or-internal |
| e2e/safety-boundaries.spec.ts:24:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:26:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:26:43 | text | 표시 확대 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:32:27 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:32:45 | text | 뜻 확인 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:37:30 | text | 세탁 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/safety-boundaries.spec.ts:38:30 | text | 건조 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/safety-boundaries.spec.ts:39:25 | text | 다림질 단계에 놓기 | learner-text-candidate | repeated-text |
| e2e/safety-boundaries.spec.ts:41:43 | text | 단계에 놓기 | learner-text-candidate | — |
| e2e/safety-boundaries.spec.ts:42:27 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:42:45 | text | ${stageName} 단계 보기 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:44:27 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:44:45 | text | 선택한 카드 ${stageName} 단계에 놓기 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:49:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:49:43 | text | 관리 계획 확인 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:54:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:54:43 | text | 손상 예보 확인 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:56:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:56:43 | text | 가상 결과 보기 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:58:32 | text | heading | heading | repeated-text |
| e2e/safety-boundaries.spec.ts:58:51 | text | 가상 결과 확인 | heading | repeated-text |
| e2e/safety-boundaries.spec.ts:64:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:64:43 | text | 계획 수정하기 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:65:42 | text | 현재 계획의 근거를 다시 확인하기 | learner-text-candidate | repeated-text |
| e2e/safety-boundaries.spec.ts:67:25 | text | button | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:67:43 | text | 수정 계획 확인 | button-or-action | repeated-text |
| e2e/safety-boundaries.spec.ts:69:32 | text | heading | heading | repeated-text |
| e2e/safety-boundaries.spec.ts:69:51 | text | 구조 보고서 | heading | repeated-text |
| index.html:9:12 | text | 세탁표시 구조대 | learner-text-candidate | repeated-text |
| scripts/pages-assets-smoke.mjs:9:20 | text | Pages asset smoke: dist/index.html이 없습니다. 먼저 프로덕션 빌드를 실행하세요. | feedback-or-error | long-or-dense |
| scripts/pages-assets-smoke.mjs:15:47 | text | Pages asset smoke: index.html에 정적 자산 참조가 없습니다. | feedback-or-error | — |
| scripts/pages-assets-smoke.mjs:18:22 | text | Pages asset smoke: 자산 참조가 상대 경로가 아닙니다: ${reference} | feedback-or-error | — |
| scripts/pages-assets-smoke.mjs:24:20 | text | Pages asset smoke: 상대 favicon app-icon.svg가 없습니다. | feedback-or-error | — |
| scripts/pages-assets-smoke.mjs:39:48 | text | Pages asset smoke: 심볼 SVG가 없습니다: ${assetPath} | feedback-or-error | — |
| scripts/pages-assets-smoke.mjs:42:22 | text | Pages asset smoke: 하위 경로 심볼 URL이 잘못되었습니다: ${nestedUrl.pathname} | feedback-or-error | long-or-dense |
| scripts/pages-assets-smoke.mjs:51:20 | text | Pages asset smoke: 심볼 URL에 사용할 상대 BASE_URL이 bundle에 없습니다. | feedback-or-error | long-or-dense |
| src/App.test.tsx:6:7 | text | shows the Korean service name and real-label priority notice | learner-text-candidate | long-or-dense |
| src/App.test.tsx:6:75 | text | { render( | learner-text-candidate | repeated-text |
| src/App.test.tsx:8:30 | text | heading | heading | repeated-text |
| src/App.test.tsx:8:49 | text | 세탁표시 구조대 | heading | repeated-text |
| src/App.test.tsx:12:7 | text | marks the current learning heading and exposes a progress summary | heading | long-or-dense |
| src/App.test.tsx:12:80 | text | { render( | heading | repeated-text |
| src/App.test.tsx:14:33 | text | heading | heading | repeated-text |
| src/App.test.tsx:14:52 | text | 구조할 가상 옷을 골라 보세요 | heading | repeated-text |
| src/App.test.tsx:15:25 | text | data-step-heading | heading | repeated-text |
| src/App.test.tsx:15:46 | text | true | heading | repeated-text |
| src/App.test.tsx:16:33 | text | 현재 단계: 1/7 · 구조 요청 | learner-text-candidate | repeated-text |
| src/app/AppShell.tsx:24:107 | text | ; } const mission = missionById.get(state.missionId); if (!mission) throw new Error('선택한 미션을 찾을 수 없습니다.'); return | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:27:38 | text | 선택한 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:28:116 | text | ; } case 'magnifier': { if (state.missionId === null) throw new Error('표시 확대경을 열 미션이 없습니다.'); const mission = missionById.get(state.missionId); if (!mission) throw new Error('표시 확대경의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:31:54 | text | 표시 확대경을 열 미션이 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:33:38 | text | 표시 확대경의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:39:11 | text | ); } case 'plan': { if (state.missionId === null) throw new Error('관리 순서판을 열 미션이 없습니다.'); const mission = missionById.get(state.missionId); if (!mission) throw new Error('관리 순서판의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:43:54 | text | 관리 순서판을 열 미션이 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:45:38 | text | 관리 순서판의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:52:11 | text | ); } case 'forecast': { if (state.missionId === null \|\| state.initialEvaluation === null) { throw new Error('손상 예보의 초기 평가가 없습니다.'); } const mission = missionById.get(state.missionId); if (!mission) throw new Error('손상 예보의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:57:26 | text | 손상 예보의 초기 평가가 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:60:38 | text | 손상 예보의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:67:64 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/app/AppShell.tsx:69:11 | text | ); } case 'simulation': { if (state.missionId === null \|\| state.initialPlan === null \|\| state.initialEvaluation === null) { throw new Error('가상 결과에 필요한 처음 계획 자료가 없습니다.'); } const mission = missionById.get(state.missionId); if (!mission) throw new Error('가상 결과의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:74:26 | text | 가상 결과에 필요한 처음 계획 자료가 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:77:38 | text | 가상 결과의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:85:11 | text | ); } case 'revision': { if (state.missionId === null \|\| state.initialPlan === null \|\| state.initialEvaluation === null) { throw new Error('수정 계획에 필요한 처음 계획 자료가 없습니다.'); } const mission = missionById.get(state.missionId); if (!mission) throw new Error('수정 계획의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:90:26 | text | 수정 계획에 필요한 처음 계획 자료가 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:93:38 | text | 수정 계획의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:105:11 | text | ); } case 'report': { if (state.missionId === null \|\| !state.initialPlan \|\| !state.initialEvaluation \|\| !state.revisedPlan \|\| !state.revisedEvaluation \|\| !state.revisionEvidence) { throw new Error('구조 보고서에 필요한 세션 자료가 없습니다.'); } const mission = missionById.get(state.missionId); if (!mission) throw new Error('구조 보고서의 미션을 찾을 수 없습니다.'); return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:110:26 | text | 구조 보고서에 필요한 세션 자료가 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:113:38 | text | 구조 보고서의 미션을 찾을 수 없습니다. | feedback-or-error | — |
| src/app/AppShell.tsx:128:11 | text | ); } default: { const unknownStep: never = step; throw new Error(`알 수 없는 학습 단계예요: ${String(unknownStep)}`); } } } export function AppShell() { const { state } = useLearnerSession(); const [highContrast, setHighContrast] = useState(false); const [updateHistoryOpen, setUpdateHistoryOpen] = useState(false); const updateHistoryButtonRef = useRef | feedback-or-error | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:133:24 | text | 알 수 없는 학습 단계예요: ${String(unknownStep)} | feedback-or-error | — |
| src/app/AppShell.tsx:142:59 | text | (null); const mainRef = useRef | learner-text-candidate | technical-or-internal |
| src/app/AppShell.tsx:148:18 | text | { if (previousViewKeyRef.current === null) { previousViewKeyRef.current = viewKey; return; } if (previousViewKeyRef.current === viewKey) return; previousViewKeyRef.current = viewKey; window.scrollTo({ top: 0, behavior: 'auto' }); const heading = mainRef.current?.querySelector | heading | long-or-dense, technical-or-internal |
| src/app/AppShell.tsx:157:64 | text | ('[data-step-heading="true"]'); heading?.focus({ preventScroll: true }); }, [viewKey]); return ( | heading | long-or-dense |
| src/app/AppShell.tsx:157:66 | text | [data-step-heading="true"] | heading | — |
| src/app/AppShell.tsx:167:53 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/app/AppShell.tsx:170:40 | text | 세탁표시 구조대 | heading | repeated-text |
| src/app/AppShell.tsx:171:41 | text | {mission ? `현재 미션: ${mission.title}` : '미션을 선택하지 않았어요.'} | learner-text-candidate | long-or-dense |
| src/app/AppShell.tsx:171:53 | text | 현재 미션: ${mission.title} | learner-text-candidate | — |
| src/app/AppShell.tsx:171:81 | text | 미션을 선택하지 않았어요. | learner-text-candidate | — |
| src/app/AppShell.tsx:180:15 | text | 가상 학습 도구 · 실제 제품 안내를 대신하지 않아요. | instruction | — |
| src/app/LearnerSessionProvider.test.tsx:20:7 | text | throws the exact Korean error outside the provider | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/app/LearnerSessionProvider.test.tsx:21:46 | text | useLearnerSession은 LearnerSessionProvider 안에서 사용해야 합니다. | learner-text-candidate | long-or-dense, missing-term-explanation, repeated-text, technical-or-internal |
| src/app/useLearnerSession.ts:7:22 | text | useLearnerSession은 LearnerSessionProvider 안에서 사용해야 합니다. | feedback-or-error | long-or-dense, missing-term-explanation, repeated-text, technical-or-internal |
| src/components/ui/ActionButton.tsx:1:44 | text | react | learner-text-candidate | — |
| src/components/ui/ActionButton.tsx:3:83 | text | { emphasis?: 'normal' \| 'required'; } export function ActionButton({ emphasis = 'normal', className = '', ...props }: ActionButtonProps) { const classes = [className, emphasis === 'required' ? 'gi-pulse required-action' : ''] .filter(Boolean) .join(' '); return | button-or-action | long-or-dense |
| src/components/ui/ActionButton.tsx:7:44 | text | normal | learner-text-candidate | repeated-text |
| src/components/ui/AppDialog.tsx:7:17 | text | void; children: ReactNode; triggerRef?: RefObject | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ui/AppDialog.tsx:9:51 | text | ; id?: string; } export function AppDialog({ open, title, onClose, children, triggerRef, id }: AppDialogProps) { const dialogRef = useRef | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ui/AppDialog.tsx:14:43 | text | (null); const closeRef = useRef | learner-text-candidate | technical-or-internal |
| src/components/ui/AppDialog.tsx:15:45 | text | (null); const previousFocusRef = useRef | learner-text-candidate | technical-or-internal |
| src/components/ui/AppDialog.tsx:32:10 | text | button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]) | button-or-action, input | long-or-dense |
| src/components/ui/AppDialog.tsx:48:17 | text | { document.removeEventListener('keydown', handleKeyDown); const returnTarget = triggerElement ?? previousFocusRef.current; if (returnTarget && document.contains(returnTarget)) returnTarget.focus(); }; }, [onClose, open, triggerRef]); if (!open) return null; const titleId = 'app-dialog-title'; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/components/ui/AppDialog.tsx:69:98 | text | 닫기 | button-or-action | repeated-text |
| src/components/ui/HighContrastToggle.tsx:3:18 | text | void; } export function HighContrastToggle({ enabled, onToggle }: HighContrastToggleProps) { return ( | button-or-action | long-or-dense, technical-or-internal |
| src/components/ui/HighContrastToggle.tsx:10:19 | aria-label | 고대비 모드 | aria-label | repeated-text |
| src/components/ui/HighContrastToggle.tsx:13:6 | text | {enabled ? '일반 대비' : '고대비 모드'} | button-or-action | — |
| src/components/ui/HighContrastToggle.tsx:14:19 | text | 일반 대비 | learner-text-candidate | — |
| src/components/ui/HighContrastToggle.tsx:14:29 | text | 고대비 모드 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:5:10 | text | request | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:5:28 | text | 구조 요청 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:6:10 | text | magnifier | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:6:30 | text | 표시 확대경 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:7:10 | text | plan | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:7:25 | text | 관리 순서판 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:8:10 | text | forecast | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:8:29 | text | 손상 예보 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:9:10 | text | simulation | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:9:31 | text | 가상 관리 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:10:10 | text | revision | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:10:29 | text | 계획 수정 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:11:10 | text | report | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:11:27 | text | 구조 보고서 | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:19:18 | text | { const item = currentItemRef.current; if (item && typeof item.scrollIntoView === 'function') { item.scrollIntoView({ inline: 'center', block: 'nearest' }); } }, [currentStep]); return ( | learner-text-candidate | long-or-dense |
| src/components/ui/ProgressIndicator.tsx:27:22 | aria-label | 학습 진행 7단계 | aria-label | repeated-text |
| src/components/ui/ProgressIndicator.tsx:28:50 | text | polite | learner-text-candidate | repeated-text |
| src/components/ui/ProgressIndicator.tsx:28:58 | text | 현재 단계: {currentIndex + 1}/7 · {current.label} | learner-text-candidate | — |
| src/components/ui/ProgressIndicator.tsx:29:49 | aria-label | 7단계 학습 진행, 가로로 이동할 수 있어요 | aria-label | — |
| src/components/ui/ProgressIndicator.tsx:37:68 | text | {index + 1} | learner-text-candidate | — |
| src/components/ui/SafetyNotice.tsx:24:75 | aria-label | 안전 안내 | aria-label, instruction | repeated-text |
| src/components/ui/SafetyNotice.tsx:25:13 | text | 안전하게 살펴보기 | heading | repeated-text |
| src/components/ui/SafetyNotice.tsx:29:20 | text | 안전 안내 더 보기 | instruction | — |
| src/components/ui/SafetyNotice.tsx:32:22 | text | 전문 도움: | hint | repeated-text |
| src/components/ui/SafetyNotice.tsx:34:15 | text | ); } return ( | instruction | — |
| src/components/ui/SafetyNotice.tsx:39:70 | aria-label | 안전 안내 | aria-label, instruction | repeated-text |
| src/components/ui/SafetyNotice.tsx:40:11 | text | 안전하게 살펴보기 | heading | repeated-text |
| src/components/ui/SafetyNotice.tsx:42:18 | text | 전문 도움: | hint | repeated-text |
| src/components/ui/StepIntro.tsx:16:27 | text | {nextActionLabel && ( | learner-text-candidate | — |
| src/components/ui/StepIntro.tsx:18:49 | text | 이번에 할 일: | learner-text-candidate | — |
| src/components/ui/SymbolFigure.tsx:5:45 | text | displayKind | learner-text-candidate | — |
| src/components/ui/SymbolFigure.tsx:5:67 | text | = { 'official-standard-symbol': '공식 취급 표시', 'learning-icon': '학습용 아이콘', }; function assetUrl(assetPath: CareSymbol['assetPath']): string { const baseUrl = import.meta.env.BASE_URL \|\| '/'; const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`; return `${base}${assetPath.replace(/^\/+/, '')}`; } export function SymbolFigure({ symbol, expanded, descriptionRef, }: { symbol: CareSymbol; expanded: boolean; descriptionRef?: RefObject | learner-text-candidate | long-or-dense |
| src/components/ui/SymbolFigure.tsx:6:32 | text | 공식 취급 표시 | learner-text-candidate | — |
| src/components/ui/SymbolFigure.tsx:7:21 | text | 학습용 아이콘 | learner-text-candidate | repeated-text |
| src/components/ui/SymbolFigure.tsx:28:12 | text | 표시 이미지를 안전하게 불러올 수 없어요. | learner-text-candidate | — |
| src/components/ui/SymbolFigure.tsx:42:12 | text | {displayKindLabels[symbol.displayKind]} | learner-text-candidate | — |
| src/content/careOptions.test.ts:20:7 | text | labels misconception cards as comparisons rather than instructions | instruction | long-or-dense |
| src/content/careOptions.ts:10:4 | text | 학습에서 조건 차이를 비교하는 카드이며, 실제 기기 조작이나 제품별 관리 지시가 아니에요. | instruction | — |
| src/content/careOptions.ts:11:21 | text | 실제 도구나 의류는 보호자·교사와 먼저 확인해요. | learner-text-candidate | — |
| src/content/careOptions.ts:17:13 | text | 약한 세탁 조건 살펴보기 | learner-text-candidate | — |
| src/content/careOptions.ts:18:27 | text | 표시와 재료 모형을 보고 약한 세탁 조건을 고르는 카드예요. | learner-text-candidate | — |
| src/content/careOptions.ts:27:13 | text | 더 강한 세탁 조건 오해 카드 | learner-text-candidate | — |
| src/content/careOptions.ts:28:27 | text | 강한 조건을 고른 오해를 비교해 보는 카드예요. ${comparisonNotice} | learner-text-candidate | — |
| src/content/careOptions.ts:37:13 | text | 잠깐 멈추고 도움 요청하기 | hint | — |
| src/content/careOptions.ts:38:27 | text | 표시나 재료가 헷갈릴 때 판단을 멈추고 보호자·교사에게 물어보는 카드예요. | learner-text-candidate | — |
| src/content/careOptions.ts:47:13 | text | 평평하게 자연 건조 비교하기 | learner-text-candidate | — |
| src/content/careOptions.ts:48:27 | text | 옷을 평평하게 두는 자연 건조 조건을 재료 모형과 비교하는 카드예요. | learner-text-candidate | — |
| src/content/careOptions.ts:57:13 | text | 걸어서 자연 건조 비교하기 | learner-text-candidate | — |
| src/content/careOptions.ts:58:27 | text | 걸어서 자연 건조하는 조건을 재료 모형과 비교하는 카드예요. | learner-text-candidate | — |
| src/content/careOptions.ts:67:13 | text | 낮은 열 회전 건조 비교하기 | learner-text-candidate | — |
| src/content/careOptions.ts:68:27 | text | 낮은 열의 회전 건조 조건을 표시와 재료 모형으로 비교하는 카드예요. | learner-text-candidate | — |
| src/content/careOptions.ts:77:13 | text | 더 높은 열 건조 오해 카드 | learner-text-candidate | — |
| src/content/careOptions.ts:78:27 | text | 높은 열 조건을 괜찮다고 여기는 오해를 비교해 보는 카드예요. ${comparisonNotice} | learner-text-candidate | ambiguous-reference, long-or-dense |
| src/content/careOptions.ts:87:13 | text | 잠깐 멈추고 건조 도움 요청하기 | hint | — |
| src/content/careOptions.ts:88:27 | text | 건조 방법이 헷갈리거나 열이 걱정될 때 보호자·교사에게 확인하는 카드예요. | learner-text-candidate | multiple-conditions |
| src/content/careOptions.ts:97:13 | text | 다림질하지 않는 조건 비교하기 | learner-text-candidate | — |
| src/content/careOptions.ts:98:27 | text | 다림질하지 않는 선택을 표시와 비교하는 카드예요. ${adultCheck} | learner-text-candidate | multiple-actions |
| src/content/careOptions.ts:107:13 | text | 보호자와 낮은 열 범위 확인하기 | learner-text-candidate | — |
| src/content/careOptions.ts:108:27 | text | 낮은 열 범위를 보호자와 확인하는 비교 카드예요. 학생이 실제 도구를 조작하라는 안내가 아니에요. ${adultCheck} | instruction | long-or-dense, multiple-actions |
| src/content/careOptions.ts:117:13 | text | 높은 열도 괜찮다는 오해 카드 | learner-text-candidate | — |
| src/content/careOptions.ts:118:27 | text | 높은 열도 괜찮다고 여기는 오해를 비교해 보는 카드예요. ${comparisonNotice} ${adultCheck} | learner-text-candidate | ambiguous-reference, long-or-dense |
| src/content/careOptions.ts:127:13 | text | 다림질 판단을 멈추고 도움 요청하기 | hint | — |
| src/content/careOptions.ts:128:27 | text | 다림질이 필요한지 헷갈리면 판단을 멈추고 도움을 요청하는 카드예요. ${adultCheck} | hint | — |
| src/content/learnerCopy.test.ts:5:11 | text | interpretation retry hints | hint | — |
| src/content/learnerCopy.ts:18:78 | text | = { 'care-wash-30-gentle': '세탁통 안 숫자 30과 아래 한 줄', 'care-no-bleach': '삼각형 안의 엑스', 'care-flat-dry': '네모 안 가로선', 'care-tumble-low': '네모 안 원과 점 하나', 'care-no-tumble': '네모 안 원 안의 엑스', 'care-iron-low': '다리미 안 점 하나', 'care-no-iron': '다리미 안의 엑스', 'care-professional': '원 안의 P 글자', }; export const learnerCopy: LearnerCopy = { materialBoundary: '이 재료에 대해 꼭 기억할 점', scenario: '이번에 가정한 상황', gentleCare: '옷을 덜 세게 다루는 방법', tumbleDrying: '통이 빙글빙글 도는 건조', professionalCare: '어른이나 전문가에게 먼저 물어보기', allowedRange: '표시에 맞는 방법', wrongAnswerHint: '표시 안의 숫자·점·선·모양을 다시 찾아보세요.', }; export const learnerGlossaryTerms: readonly (readonly [string, string])[] = [ ['옷을 덜 세게 다루는 방법', '강한 과정 대신 옷을 덜 자극하는 조건을 말해요.'], ['통이 빙글빙글 도는 건조', '통이 돌아가며 옷을 말리는 방법을 말해요.'], ['어른이나 전문가에게 먼저 물어보기', '가정에서 바로 처리하기 전에 보호자나 전문가에게 확인하는 범위예요.'], ['학습용 재료 모형', '실제 옷의 성능을 재는 자료가 아니라 수업을 위한 가상 재료예요.'], ] as const; export interface LearnerRiskCopy { label: string; cue: string; } export const learnerRiskCopy: Readonly | feedback-or-error, hint | long-or-dense, multiple-actions |
| src/content/learnerCopy.ts:19:27 | text | 세탁통 안 숫자 30과 아래 한 줄 | learner-text-candidate | — |
| src/content/learnerCopy.ts:20:22 | text | 삼각형 안의 엑스 | learner-text-candidate | — |
| src/content/learnerCopy.ts:21:21 | text | 네모 안 가로선 | learner-text-candidate | — |
| src/content/learnerCopy.ts:22:23 | text | 네모 안 원과 점 하나 | learner-text-candidate | — |
| src/content/learnerCopy.ts:23:22 | text | 네모 안 원 안의 엑스 | learner-text-candidate | — |
| src/content/learnerCopy.ts:24:21 | text | 다리미 안 점 하나 | learner-text-candidate | — |
| src/content/learnerCopy.ts:25:20 | text | 다리미 안의 엑스 | learner-text-candidate | — |
| src/content/learnerCopy.ts:26:25 | text | 원 안의 P 글자 | learner-text-candidate | — |
| src/content/learnerCopy.ts:30:22 | text | 이 재료에 대해 꼭 기억할 점 | learner-text-candidate | — |
| src/content/learnerCopy.ts:31:14 | text | 이번에 가정한 상황 | learner-text-candidate | — |
| src/content/learnerCopy.ts:32:16 | text | 옷을 덜 세게 다루는 방법 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:33:18 | text | 통이 빙글빙글 도는 건조 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:34:22 | text | 어른이나 전문가에게 먼저 물어보기 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:35:18 | text | 표시에 맞는 방법 | learner-text-candidate | — |
| src/content/learnerCopy.ts:36:21 | text | 표시 안의 숫자·점·선·모양을 다시 찾아보세요. | feedback-or-error, hint | — |
| src/content/learnerCopy.ts:40:5 | text | 옷을 덜 세게 다루는 방법 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:40:23 | text | 강한 과정 대신 옷을 덜 자극하는 조건을 말해요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:41:5 | text | 통이 빙글빙글 도는 건조 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:41:22 | text | 통이 돌아가며 옷을 말리는 방법을 말해요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:42:5 | text | 어른이나 전문가에게 먼저 물어보기 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:42:27 | text | 가정에서 바로 처리하기 전에 보호자나 전문가에게 확인하는 범위예요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:43:5 | text | 학습용 재료 모형 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:43:18 | text | 실제 옷의 성능을 재는 자료가 아니라 수업을 위한 가상 재료예요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:53:13 | text | 줄어듦 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:54:11 | text | 뜨거운 물이나 강한 과정이면 옷의 크기나 길이를 다시 살펴봐요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:57:13 | text | 변형 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:58:11 | text | 비비거나 비틀면 옷의 모양이 달라질 수 있는지 살펴봐요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:61:13 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:62:11 | text | 표백하거나 다른 색 옷과 함께할 때 색 변화를 살펴봐요. | learner-text-candidate | multiple-conditions |
| src/content/learnerCopy.ts:65:13 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:66:11 | text | 붙은 장식이 떨어지거나 흔들리지 않는지 살펴봐요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:69:13 | text | 열 손상 | learner-text-candidate | repeated-text |
| src/content/learnerCopy.ts:70:11 | text | 높은 열을 가까이하면 재료 변화가 생길 수 있는지 살펴봐요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:79:13 | text | 위험과 근거 표시를 골랐는지 다시 확인해 보세요. | learner-text-candidate | — |
| src/content/learnerCopy.ts:85:13 | text | ${riskNames.join(', ')} 가능성을 ${reasonNames.join(', ')} 표시와 연결했어요. 표시의 온도·줄·모양을 다시 살펴보며 이유를 말해 보세요. | learner-text-candidate | long-or-dense |
| src/content/learnerCopy.ts:88:13 | text | ${riskNames.join(', ')} 가능성은 찾았어요. 이제 그 이유가 되는 표시를 다시 골라 보세요. | learner-text-candidate | long-or-dense |
| src/content/learnerCopy.ts:91:13 | text | ${reasonNames.join(', ')} 표시는 찾았어요. 어떤 변화 가능성과 이어지는지 다시 생각해 보세요. | learner-text-candidate | long-or-dense |
| src/content/learnerCopy.ts:93:11 | text | 고른 위험과 표시가 아직 이어지지 않았어요. 표시의 설명과 관리 계획을 다시 살펴보세요. | learner-text-candidate | — |
| src/content/missions.ts:5:4 | text | 재료 특성은 학습용 재료 모형에만 해당하며 실제 의류의 성능이나 관리 결과를 보장하지 않아요. | learner-text-candidate | ambiguous-reference |
| src/content/missions.ts:7:77 | text | ; function stageOptions( wash: readonly CareOptionId[], dry: readonly CareOptionId[], iron: readonly CareOptionId[], ): StageOptions { return { wash, dry, iron }; } function garment( id: string, name: string, materialModel: string, contaminationScenario: string, symbolIds: readonly CareSymbolId[], materialAllowedOptionIdsByStage: StageOptions, ): VirtualGarment { return { id, name, materialModel, materialBoundary, contaminationScenario, symbolIds, materialAllowedOptionIdsByStage, }; } const basicTShirt = garment( 'basic-t-shirt', '면 중심 기본 티셔츠', '면 중심 재료 모형', '흙먼지가 조금 묻은 가상 상황이에요. 실제 오염 세기를 재는 활동은 아니에요.', ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low'], stageOptions( ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'], ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'], ), ); const softScarf = garment( 'soft-scarf', '부드러운 섬유 모형 목도리', '부드럽고 민감한 섬유 재료 모형', '향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 판정하지 않아요.', ['care-professional', 'care-flat-dry', 'care-no-tumble', 'care-no-iron'], stageOptions( ['plan-wash-pause-and-ask'], ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-pause-and-ask'], ), ); const sportswear = garment( 'sportswear', '합성 섬유 모형 운동복', '합성 섬유 재료 모형', '운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 흡수량이나 기능을 측정하지 않아요.', ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low', 'care-iron-low'], stageOptions( ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'], ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'], ), ); const decoratedTop = garment( 'decorated-top', '장식이 붙은 가상 상의', '장식 부착 재료 모형', '장식 주변에 먼지가 묻었다고 가정한 가상 상황이에요. 실제 접착력이나 손상을 시험하지 않아요.', ['care-no-bleach', 'care-no-tumble', 'care-flat-dry', 'care-no-iron'], stageOptions( ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'], ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-pause-and-ask'], ), ); const mixedCottonShirt = garment( 'mixed-cotton-shirt', '혼합 적재용 면 중심 셔츠', '면 중심 재료 모형', '가벼운 흙먼지가 묻은 가상 상황이에요. 실제 오염 정도는 판단하지 않아요.', ['care-wash-30-gentle', 'care-no-bleach', 'care-no-tumble'], stageOptions( ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'], ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'], ), ); const mixedSportswear = garment( 'mixed-synthetic-sportswear', '혼합 적재용 합성 섬유 운동복', '합성 섬유 재료 모형', '운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 기능이나 흡수량을 보장하지 않아요.', ['care-wash-30-gentle', 'care-no-bleach', 'care-tumble-low', 'care-no-iron'], stageOptions( ['plan-wash-gentle-30', 'plan-wash-pause-and-ask'], ['plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-pause-and-ask'], ), ); const mixedDelicateScarf = garment( 'mixed-delicate-scarf', '혼합 적재용 민감한 목도리', '민감한 섬유 재료 모형', '향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 확인하지 않아요.', ['care-professional', 'care-flat-dry', 'care-no-tumble', 'care-no-iron'], stageOptions( ['plan-wash-pause-and-ask'], ['plan-dry-flat', 'plan-dry-line', 'plan-dry-pause-and-ask'], ['plan-iron-none', 'plan-iron-pause-and-ask'], ), ); export const missions = [ { id: 'basic-t-shirt', order: 1, title: '기본 티셔츠의 세탁·건조 표시 읽기', learningFocus: '세탁 표시와 건조 표시를 함께 읽고, 두 단계의 조건을 연결해 봐요.', garments: [basicTShirt], requiresGrouping: false, openingPrompt: '티셔츠의 세탁 표시와 건조 표시를 모두 살펴보고 관리 순서를 골라 보세요.', }, { id: 'soft-scarf', order: 2, title: '부드러운 목도리의 강한 세탁·열 피하기', learningFocus: '강한 세탁과 열을 피하고, 전문 관리나 도움 요청이 필요한 근거를 찾아봐요.', garments: [softScarf], requiresGrouping: false, openingPrompt: '민감한 재료 모형의 표시에서 열과 세탁 제한의 근거를 찾아보세요.', }, { id: 'sportswear', order: 3, title: '운동복의 낮은 열 조건 비교', learningFocus: '합성 섬유 재료 모형에서 자연 건조와 낮은 열 조건을 비교해 봐요.', garments: [sportswear], requiresGrouping: false, openingPrompt: '운동복 표시를 읽고 자연 건조와 낮은 열 조건을 비교해 보세요.', }, { id: 'decorated-top', order: 4, title: '장식이 붙은 상의의 제한 찾기', learningFocus: '장식 손상 가능성과 여러 제한 표시를 확인해 가장 조심스러운 조건을 찾아봐요.', garments: [decoratedTop], requiresGrouping: false, openingPrompt: '장식이 손상될 수 있다는 가상 상황을 생각하며 제한 표시를 모두 찾아보세요.', }, { id: 'mixed-load', order: 5, title: '서로 다른 세 벌의 함께 관리하기', learningFocus: '공통으로 허용할 수 있는 범위를 찾고, 따로 확인할 물품과 근거 표시를 정해 봐요.', garments: [mixedCottonShirt, mixedSportswear, mixedDelicateScarf], requiresGrouping: true, openingPrompt: '세 벌의 표시를 비교해 함께 살펴볼 옷과 따로 확인할 옷을 나누어 보세요.', }, ] as const satisfies readonly GarmentMission[]; export const missionById = new Map | hint | long-or-dense, multiple-actions, technical-or-internal |
| src/content/missions.ts:38:4 | text | 면 중심 기본 티셔츠 | learner-text-candidate | — |
| src/content/missions.ts:39:4 | text | 면 중심 재료 모형 | learner-text-candidate | repeated-text |
| src/content/missions.ts:40:4 | text | 흙먼지가 조금 묻은 가상 상황이에요. 실제 오염 세기를 재는 활동은 아니에요. | learner-text-candidate | — |
| src/content/missions.ts:51:4 | text | 부드러운 섬유 모형 목도리 | learner-text-candidate | — |
| src/content/missions.ts:52:4 | text | 부드럽고 민감한 섬유 재료 모형 | learner-text-candidate | — |
| src/content/missions.ts:53:4 | text | 향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 판정하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:64:4 | text | 합성 섬유 모형 운동복 | learner-text-candidate | — |
| src/content/missions.ts:65:4 | text | 합성 섬유 재료 모형 | learner-text-candidate | repeated-text |
| src/content/missions.ts:66:4 | text | 운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 흡수량이나 기능을 측정하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:77:4 | text | 장식이 붙은 가상 상의 | learner-text-candidate | — |
| src/content/missions.ts:78:4 | text | 장식 부착 재료 모형 | learner-text-candidate | — |
| src/content/missions.ts:79:4 | text | 장식 주변에 먼지가 묻었다고 가정한 가상 상황이에요. 실제 접착력이나 손상을 시험하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:90:4 | text | 혼합 적재용 면 중심 셔츠 | learner-text-candidate | — |
| src/content/missions.ts:91:4 | text | 면 중심 재료 모형 | learner-text-candidate | repeated-text |
| src/content/missions.ts:92:4 | text | 가벼운 흙먼지가 묻은 가상 상황이에요. 실제 오염 정도는 판단하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:103:4 | text | 혼합 적재용 합성 섬유 운동복 | learner-text-candidate | — |
| src/content/missions.ts:104:4 | text | 합성 섬유 재료 모형 | learner-text-candidate | repeated-text |
| src/content/missions.ts:105:4 | text | 운동 뒤 땀이 묻었다고 가정한 가상 상황이에요. 실제 기능이나 흡수량을 보장하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:116:4 | text | 혼합 적재용 민감한 목도리 | learner-text-candidate | — |
| src/content/missions.ts:117:4 | text | 민감한 섬유 재료 모형 | learner-text-candidate | — |
| src/content/missions.ts:118:4 | text | 향이 묻었다고 가정한 가상 상황이에요. 실제 섬유 성분이나 오염을 확인하지 않아요. | learner-text-candidate | — |
| src/content/missions.ts:131:13 | text | 기본 티셔츠의 세탁·건조 표시 읽기 | learner-text-candidate | — |
| src/content/missions.ts:132:21 | text | 세탁 표시와 건조 표시를 함께 읽고, 두 단계의 조건을 연결해 봐요. | learner-text-candidate | — |
| src/content/missions.ts:135:21 | text | 티셔츠의 세탁 표시와 건조 표시를 모두 살펴보고 관리 순서를 골라 보세요. | learner-text-candidate | — |
| src/content/missions.ts:140:13 | text | 부드러운 목도리의 강한 세탁·열 피하기 | learner-text-candidate | — |
| src/content/missions.ts:141:21 | text | 강한 세탁과 열을 피하고, 전문 관리나 도움 요청이 필요한 근거를 찾아봐요. | hint | — |
| src/content/missions.ts:144:21 | text | 민감한 재료 모형의 표시에서 열과 세탁 제한의 근거를 찾아보세요. | learner-text-candidate | — |
| src/content/missions.ts:149:13 | text | 운동복의 낮은 열 조건 비교 | learner-text-candidate | — |
| src/content/missions.ts:150:21 | text | 합성 섬유 재료 모형에서 자연 건조와 낮은 열 조건을 비교해 봐요. | learner-text-candidate | — |
| src/content/missions.ts:153:21 | text | 운동복 표시를 읽고 자연 건조와 낮은 열 조건을 비교해 보세요. | learner-text-candidate | — |
| src/content/missions.ts:158:13 | text | 장식이 붙은 상의의 제한 찾기 | learner-text-candidate | — |
| src/content/missions.ts:159:21 | text | 장식 손상 가능성과 여러 제한 표시를 확인해 가장 조심스러운 조건을 찾아봐요. | learner-text-candidate | multiple-actions |
| src/content/missions.ts:162:21 | text | 장식이 손상될 수 있다는 가상 상황을 생각하며 제한 표시를 모두 찾아보세요. | learner-text-candidate | — |
| src/content/missions.ts:167:13 | text | 서로 다른 세 벌의 함께 관리하기 | learner-text-candidate | — |
| src/content/missions.ts:168:21 | text | 공통으로 허용할 수 있는 범위를 찾고, 따로 확인할 물품과 근거 표시를 정해 봐요. | learner-text-candidate | — |
| src/content/missions.ts:171:21 | text | 세 벌의 표시를 비교해 함께 살펴볼 옷과 따로 확인할 옷을 나누어 보세요. | learner-text-candidate | multiple-actions |
| src/content/safetyNotices.ts:2:4 | text | 실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요. | instruction | repeated-text |
| src/content/safetyNotices.ts:4:4 | text | 실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요. | learner-text-candidate | repeated-text |
| src/content/safetyNotices.ts:6:4 | text | 표시는 국가·시기·제품에 따라 다를 수 있어요. 모르는 표시는 보호자·교사 또는 제품 공식 안내에 확인하세요. | instruction | long-or-dense, multiple-conditions |
| src/content/safetyNotices.ts:8:4 | text | 이 앱은 가상 의류를 위한 학습 도구이며 실제 손상이나 안전을 보증하는 전문 서비스가 아니에요. | learner-text-candidate | — |
| src/content/safetyNotices.ts:9:42 | text | 보호자·교사 또는 제품 공식 안내에 확인하기 | hint, instruction | multiple-conditions |
| src/content/sources.ts:7:13 | text | ISO 3758:2023 — Textiles — Care labelling code using symbols | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/sources.ts:14:8 | text | 세탁·표백·건조·다림질·전문 섬유 관리의 그래픽 기호와 적용 범위. 산업 세탁과 전문 카펫 세탁은 제외. | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/content/sources.ts:19:17 | text | GINETEX — International Association for Textile Care Labelling | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/content/sources.ts:20:13 | text | Care symbols under ISO 3758:2023 | learner-text-candidate | technical-or-internal |
| src/content/sources.ts:23:28 | text | 현재 웹 개요; 게시일은 페이지에 명시되지 않음 | learner-text-candidate | — |
| src/content/sources.ts:27:8 | text | 기호의 기본 도형·선·점·사선과 세탁, 표백, 건조, 다림질, 전문 관리의 의미. 페이지에서 ISO 3758:2023을 명시. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/sources.ts:32:17 | text | GINETEX — International Association for Textile Care Labelling | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/content/sources.ts:33:13 | text | Textile Care Symbols: Care Instructions and Symbols | instruction | long-or-dense |
| src/content/sources.ts:36:28 | text | PDF 발행일은 문서에 명시되지 않음; 15쪽 안내서 | instruction | technical-or-internal |
| src/content/sources.ts:40:8 | text | 기호 도형의 범주별 의미, 선·점의 강도 의미, 전문 관리의 가정용 처리 한계와 상표 이용 제한. | learner-text-candidate | — |
| src/content/sources.ts:45:17 | text | 국가기술표준원·e나라 표준인증 | learner-text-candidate | — |
| src/content/sources.ts:46:13 | text | KS K 0021 섬유 제품의 취급에 관한 표시 기호 및 그 표시 방법 | learner-text-candidate | technical-or-internal |
| src/content/sources.ts:49:28 | text | 최종개정확인일 2024-12-31 | learner-text-candidate | — |
| src/content/sources.ts:53:8 | text | 국내 섬유 제품에 세탁 등의 취급 방법을 알리기 위해 표시하는 기호의 표준 식별자·적용 범위. | learner-text-candidate | abstract-or-formal |
| src/content/sources.ts:57:10 | text | katri-care-label-cardnews | learner-text-candidate | repeated-text |
| src/content/sources.ts:58:17 | text | KATRI시험연구원 | learner-text-candidate | repeated-text |
| src/content/sources.ts:59:13 | text | [카드뉴스 5호] 케어라벨(세탁기호) 어떻게 읽나요? | learner-text-candidate | — |
| src/content/sources.ts:61:28 | text | KATRI 카드뉴스 5호 | learner-text-candidate | technical-or-internal |
| src/content/sources.ts:62:28 | text | 게시일 2021-02-19; 첨부 이미지 1~8 | learner-text-candidate | — |
| src/content/sources.ts:66:8 | text | 국내 섬유시험연구원의 소비자용 케어라벨 설명 이미지 8장. 표준 기호를 실제 제품 라벨로 오인하지 않도록 의미 대조용으로만 사용. | learner-text-candidate | long-or-dense |
| src/content/sources.ts:71:17 | text | KATRI시험연구원 | learner-text-candidate | repeated-text |
| src/content/sources.ts:72:13 | text | KATRI시험연구원, 국내 최초로 GINETEX ISO 3758 지원 시험실 지정 | learner-text-candidate | technical-or-internal |
| src/content/sources.ts:74:28 | text | KATRI 보도자료 2025-03-12; ISO 3758 지원 시험실 지정 | learner-text-candidate | technical-or-internal |
| src/content/sources.ts:75:28 | text | 게시일 2025-03-12 | learner-text-candidate | — |
| src/content/sources.ts:79:8 | text | 국내 시험인증기관의 ISO 3758 기호·표시방법 설명, KS K 0021과 ISO 3758의 부합화 관계, GINETEX 상표권·올바른 사용 경계. | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/symbols.test.ts:41:40 | text | 높은 온도로 다림질하기 | learner-text-candidate | — |
| src/content/symbols.ts:24:4 | text | katri-care-label-cardnews | learner-text-candidate | repeated-text |
| src/content/symbols.ts:28:29 | text | 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | — |
| src/content/symbols.ts:29:26 | text | ISO 3758:2023와 국내 공신력 출처를 대조한 학습용 자료예요. | learner-text-candidate | technical-or-internal |
| src/content/symbols.ts:78:12 | text | 30°C 약한 세탁 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:79:20 | text | 세탁 · 물세탁 | hint | repeated-text |
| src/content/symbols.ts:80:24 | text | 30°C와 한 줄은 약한 세탁을 뜻해요. ${learningIconNotice} | learner-text-candidate | — |
| src/content/symbols.ts:82:8 | text | 세탁통 안에 30이 있고 아래에 한 줄이 있는 그림입니다. 30°C의 약한 세탁을 뜻합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:88:14 | text | meaning-wash-30-gentle | learner-text-candidate | — |
| src/content/symbols.ts:88:47 | text | 30°C의 약한 과정으로 세탁하기 | learner-text-candidate | — |
| src/content/symbols.ts:89:14 | text | meaning-wash-40-normal | learner-text-candidate | — |
| src/content/symbols.ts:89:47 | text | 40°C의 보통 과정으로 세탁하기 | learner-text-candidate | — |
| src/content/symbols.ts:90:14 | text | meaning-wash-forbidden | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/symbols.ts:90:47 | text | 물세탁하지 않기 | learner-text-candidate | — |
| src/content/symbols.ts:102:12 | text | 표백 금지 | learner-text-candidate | — |
| src/content/symbols.ts:103:20 | text | 표백 · 금지 | hint | — |
| src/content/symbols.ts:104:24 | text | 표백하지 않는다는 뜻이에요. ${learningIconNotice} | learner-text-candidate | — |
| src/content/symbols.ts:106:8 | text | 삼각형 안에 엑스가 있는 그림입니다. 표백 처리를 하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:112:14 | text | meaning-no-bleach | learner-text-candidate | — |
| src/content/symbols.ts:112:42 | text | 표백하지 않기 | learner-text-candidate | — |
| src/content/symbols.ts:113:14 | text | meaning-oxygen-bleach | learner-text-candidate | — |
| src/content/symbols.ts:113:46 | text | 산소계 표백만 허용하기 | learner-text-candidate | — |
| src/content/symbols.ts:114:14 | text | meaning-any-bleach | learner-text-candidate | — |
| src/content/symbols.ts:114:43 | text | 모든 표백을 허용하기 | learner-text-candidate | — |
| src/content/symbols.ts:126:12 | text | 평평하게 자연 건조 | learner-text-candidate | — |
| src/content/symbols.ts:127:20 | text | 건조 · 자연 건조 | hint | — |
| src/content/symbols.ts:128:24 | text | 네모 안 가로선은 평평하게 펴서 자연 건조하는 뜻이에요. ${learningIconNotice} | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:130:8 | text | 네모 안에 가로선 하나가 있는 그림입니다. 옷을 평평하게 펴서 자연 건조하는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:136:14 | text | meaning-flat-dry | learner-text-candidate | repeated-text |
| src/content/symbols.ts:136:41 | text | 평평하게 펴서 자연 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:137:14 | text | meaning-line-dry | learner-text-candidate | repeated-text |
| src/content/symbols.ts:137:41 | text | 옷걸이에 걸어 자연 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:138:14 | text | meaning-tumble-low | learner-text-candidate | repeated-text |
| src/content/symbols.ts:138:43 | text | 회전식 건조기의 낮은 열로 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:150:12 | text | 낮은 열 회전식 건조 | learner-text-candidate | — |
| src/content/symbols.ts:151:20 | text | 건조 · 회전식 건조 | hint | — |
| src/content/symbols.ts:152:24 | text | 네모 안 원과 점 하나는 낮은 열의 회전식 건조를 뜻해요. ${learningIconNotice} | learner-text-candidate | — |
| src/content/symbols.ts:154:8 | text | 네모 안 원에 점 하나가 있는 그림입니다. 낮은 열의 회전식 건조 범위를 뜻합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:160:14 | text | meaning-tumble-low | learner-text-candidate | repeated-text |
| src/content/symbols.ts:160:43 | text | 회전식 건조기의 낮은 열로 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:161:14 | text | meaning-flat-dry | learner-text-candidate | repeated-text |
| src/content/symbols.ts:161:41 | text | 평평하게 펴서 자연 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:162:14 | text | meaning-no-tumble | learner-text-candidate | repeated-text |
| src/content/symbols.ts:162:42 | text | 회전식 건조하지 않기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:174:12 | text | 회전식 건조 금지 | learner-text-candidate | — |
| src/content/symbols.ts:175:20 | text | 건조 · 금지 | hint | — |
| src/content/symbols.ts:176:24 | text | 네모 안 원에 엑스가 있으면 회전식 건조를 하지 않아요. ${learningIconNotice} | learner-text-candidate | — |
| src/content/symbols.ts:178:8 | text | 네모 안 원에 엑스가 있는 그림입니다. 회전식 건조기를 사용하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:184:14 | text | meaning-no-tumble | learner-text-candidate | repeated-text |
| src/content/symbols.ts:184:42 | text | 회전식 건조하지 않기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:185:14 | text | meaning-tumble-low | learner-text-candidate | repeated-text |
| src/content/symbols.ts:185:43 | text | 회전식 건조기의 낮은 열로 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:186:14 | text | meaning-line-dry | learner-text-candidate | repeated-text |
| src/content/symbols.ts:186:41 | text | 옷걸이에 걸어 자연 건조하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:198:12 | text | 낮은 온도 다림질 | learner-text-candidate | — |
| src/content/symbols.ts:199:20 | text | 다림질 · 낮은 열 | hint | — |
| src/content/symbols.ts:200:24 | text | 점 하나의 다리미는 낮은 온도 범위예요. 실제 다림질은 보호자와 확인해요. ${learningIconNotice} | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:202:8 | text | 다리미 모양 안에 점 하나가 있는 그림입니다. 낮은 온도 범위에서 다림질할 수 있다는 뜻이며, 실제 도구는 보호자와 확인해야 합니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense, multiple-conditions |
| src/content/symbols.ts:208:14 | text | meaning-iron-low | learner-text-candidate | repeated-text |
| src/content/symbols.ts:208:41 | text | 보호자와 낮은 온도 범위 확인하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:209:14 | text | meaning-iron-high | learner-text-candidate | repeated-text |
| src/content/symbols.ts:209:42 | text | 높은 온도도 괜찮다는 오해 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:210:14 | text | meaning-no-iron | learner-text-candidate | repeated-text |
| src/content/symbols.ts:210:40 | text | 다림질하지 않기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:222:12 | text | 다림질 금지 | learner-text-candidate | — |
| src/content/symbols.ts:223:20 | text | 다림질 · 금지 | hint | — |
| src/content/symbols.ts:224:24 | text | 다리미에 엑스가 있으면 다림질하지 않아요. ${learningIconNotice} | learner-text-candidate | — |
| src/content/symbols.ts:226:8 | text | 다리미 모양에 엑스가 있는 그림입니다. 다림질하지 않는다는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:232:14 | text | meaning-no-iron | learner-text-candidate | repeated-text |
| src/content/symbols.ts:232:40 | text | 다림질하지 않기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:233:14 | text | meaning-iron-low | learner-text-candidate | repeated-text |
| src/content/symbols.ts:233:41 | text | 보호자와 낮은 온도 범위 확인하기 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:234:14 | text | meaning-iron-high | learner-text-candidate | repeated-text |
| src/content/symbols.ts:234:42 | text | 높은 온도도 괜찮다는 오해 | learner-text-candidate | repeated-text |
| src/content/symbols.ts:246:12 | text | 전문 섬유 관리 확인 | learner-text-candidate | — |
| src/content/symbols.ts:247:20 | text | 전문 관리 · 도움 요청 | hint | — |
| src/content/symbols.ts:248:24 | text | 원 안의 표시는 전문 관리 범위를 확인하는 정보예요. 먼저 보호자·전문가에게 물어봐요. ${learningIconNotice} | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:250:8 | text | 원 안에 P 글자가 있는 단순화한 그림입니다. 가정에서 바로 처리하기 전에 보호자나 전문 관리 전문가에게 범위를 확인하는 뜻입니다. 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요. | learner-text-candidate | long-or-dense |
| src/content/symbols.ts:256:14 | text | meaning-professional-check | learner-text-candidate | — |
| src/content/symbols.ts:256:51 | text | 보호자·전문가와 관리 범위 확인하기 | learner-text-candidate | — |
| src/content/symbols.ts:257:14 | text | meaning-home-wash-direct | learner-text-candidate | — |
| src/content/symbols.ts:257:49 | text | 가정 세탁기로 바로 처리하기 | learner-text-candidate | — |
| src/content/symbols.ts:258:14 | text | meaning-ignore-label | learner-text-candidate | — |
| src/content/symbols.ts:258:45 | text | 표시를 확인하지 않고 처리하기 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:4:11 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:5:7 | text | 첫 기록과 다섯 가지 변경 범위를 날짜순으로 보존한다 | learner-text-candidate | — |
| src/content/updateHistory.test.ts:8:18 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:9:17 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:17 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:23 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:29 | text | 콘텐츠 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:36 | text | 안전 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:12:42 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:18:63 | text | 콘텐츠 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:19:63 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:20:63 | text | 안전 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:21:63 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:23:18 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:24:17 | text | 5개 미션 전체 흐름과 Pages 릴리스 자동 게이트 추가 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:28:18 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:29:17 | text | 학습 흐름 포커스·학생용 보고서·반응형 CTA 개선 | button-or-action | repeated-text, technical-or-internal |
| src/content/updateHistory.test.ts:33:18 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:34:17 | text | 학습 단계별 화면 계층·기호 전환 포커스·결과 요약 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:38:18 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.test.ts:39:17 | text | 표시별 오답 단서와 단계별 관리 카드 보기 개선 | feedback-or-error | repeated-text |
| src/content/updateHistory.ts:1:31 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:1:38 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:1:45 | text | 콘텐츠 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:1:53 | text | 안전 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:1:60 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:10:36 | text | 설계 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:10:51 | text | 최초 설계 문서 작성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:11:36 | text | 콘텐츠 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:11:52 | text | 핵심 표시 8개 출처와 의미 검수 | learner-text-candidate | — |
| src/content/updateHistory.ts:12:36 | text | 안전 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:12:51 | text | 실제 라벨 우선과 학생 단독 조작 금지 문구 반영 | learner-text-candidate | — |
| src/content/updateHistory.ts:13:36 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:13:51 | text | 5개 미션의 MVP 학습 흐름 구현 | learner-text-candidate | technical-or-internal |
| src/content/updateHistory.ts:14:36 | text | 접근성 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:14:52 | text | 5개 미션 전체 흐름과 Pages 릴리스 자동 게이트 추가 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:15:36 | text | 접근성 | button-or-action | repeated-text |
| src/content/updateHistory.ts:15:52 | text | 학습 흐름 포커스·학생용 보고서·반응형 CTA 개선 | button-or-action | repeated-text, technical-or-internal |
| src/content/updateHistory.ts:16:36 | text | 개발 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:16:51 | text | 학습 단계별 화면 계층·기호 전환 포커스·결과 요약 개선 | learner-text-candidate | repeated-text |
| src/content/updateHistory.ts:17:36 | text | 접근성 | feedback-or-error | repeated-text |
| src/content/updateHistory.ts:17:52 | text | 표시별 오답 단서와 단계별 관리 카드 보기 개선 | feedback-or-error | repeated-text |
| src/content/validateContent.test.ts:70:8 | text | title | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:88:69 | text | ISO 3758: TBD | input | technical-or-internal |
| src/content/validateContent.test.ts:113:58 | text | ks-k-0021-2024 | learner-text-candidate | — |
| src/content/validateContent.test.ts:113:76 | text | katri-care-label-cardnews | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:127:27 | text | 첫 선택지 | learner-text-candidate | — |
| src/content/validateContent.test.ts:128:16 | text | duplicate | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:128:36 | text | 두 번째 선택지 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:129:16 | text | duplicate | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:129:36 | text | 두 번째 선택지 | learner-text-candidate | repeated-text |
| src/content/validateContent.test.ts:130:16 | text | extra | learner-text-candidate | — |
| src/content/validateContent.test.ts:130:32 | text | 네 번째 선택지 | learner-text-candidate | — |
| src/content/validateContent.ts:20:47 | text | (REQUIRED_SYMBOL_IDS); const ISO_SOURCE_ID = 'iso-3758-2023'; const DOMESTIC_SOURCE_IDS = new Set([ 'ks-k-0021-2024', 'katri-care-label-cardnews', 'katri-iso-3758-press', ]); const CARE_OPTION_IDS = [ 'plan-wash-gentle-30', 'plan-wash-strong-40', 'plan-wash-pause-and-ask', 'plan-dry-flat', 'plan-dry-line', 'plan-dry-tumble-low', 'plan-dry-tumble-high', 'plan-dry-pause-and-ask', 'plan-iron-none', 'plan-iron-low-with-adult', 'plan-iron-high-with-adult', 'plan-iron-pause-and-ask', ] as const satisfies readonly CareOptionId[]; const CARE_OPTION_ID_SET = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:24:4 | text | katri-care-label-cardnews | learner-text-candidate | repeated-text |
| src/content/validateContent.ts:41:43 | text | (CARE_OPTION_IDS); const CARE_STAGE_SET = new Set(['wash', 'bleach', 'dry', 'iron', 'professional']); const DAMAGE_RISK_IDS = new Set(['shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage']); const PLACEHOLDER_PATTERN = /(?:^\|[\s_./:-])(?:x{2,}\|tbd\|todo\|placeholder\|unknown\|n[./-]?a\|not[\s_-]*available)(?:$\|[\s_./:-])/i; const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/; function issue( code: ContentValidationIssue['code'], message: string, symbolId?: CareSymbol['id'], ): ContentValidationIssue { return symbolId === undefined ? { code, message } : { code, symbolId, message }; } function asRecord(value: unknown): Record | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:56:89 | text | ) : undefined; } function hasUsableText(value: unknown): value is string { return typeof value === 'string' && value.trim() !== '' && !PLACEHOLDER_PATTERN.test(value); } function hasValidIsoDate(value: unknown): value is string { if (typeof value !== 'string' \|\| !ISO_DATE_PATTERN.test(value)) return false; const parsed = new Date(`${value}T00:00:00Z`); return !Number.isNaN(parsed.getTime()) && parsed.toISOString().startsWith(value); } function hasApprovedHttpsUrl(value: unknown): value is string { if (!hasUsableText(value)) return false; try { const parsed = new URL(value); return parsed.protocol === 'https:' && parsed.hostname !== ''; } catch { return false; } } function isCareSymbolId(value: string): value is CareSymbolId { return REQUIRED_SYMBOL_ID_SET.has(value); } function symbolIssueId(value: string): CareSymbolId \| undefined { return isCareSymbolId(value) ? value : undefined; } function isApprovedSource(source: SourceRecord): boolean { const record = asRecord(source); return record?.status === 'approved' && hasApprovedHttpsUrl(record.officialUrl); } function validateSourceRecords( sourceRecords: readonly unknown[], issues: ContentValidationIssue[], ): Map | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:96:51 | text | (); const sourceFields = [ 'publisher', 'title', 'standardOrDocumentId', 'editionOrPublishedAt', 'accessedAt', 'reviewedAt', 'coverage', ] as const; for (const source of sourceRecords) { const record = asRecord(source); if (record === undefined) { issues.push(issue('invalid-source-record', '출처 레코드가 객체가 아닙니다.')); continue; } const sourceId = typeof record.id === 'string' ? record.id.trim() : ''; const sourceLabel = sourceId \|\| ' | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:99:6 | text | title | learner-text-candidate | repeated-text |
| src/content/validateContent.ts:110:51 | text | 출처 레코드가 객체가 아닙니다. | learner-text-candidate | — |
| src/content/validateContent.ts:115:38 | text | <missing-source-id> | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:115:57 | text | '; if (!hasUsableText(sourceId)) { issues.push(issue('invalid-source-record', `출처 ID가 비어 있거나 placeholder입니다: ${sourceLabel}`)); } if (sourceId !== '' && sourceById.has(sourceId)) { issues.push(issue('duplicate-source-id', `출처 ID가 중복됩니다: ${sourceId}`)); } else if (sourceId !== '') { sourceById.set(sourceId, source as SourceRecord); } for (const field of sourceFields) { if (!hasUsableText(record[field])) { issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 ${field}가 비어 있거나 placeholder입니다.`)); } } if (!hasValidIsoDate(record.accessedAt) \|\| !hasValidIsoDate(record.reviewedAt)) { issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 접근일 또는 검수일이 YYYY-MM-DD가 아닙니다.`)); } if (!hasApprovedHttpsUrl(record.officialUrl)) { issues.push(issue('invalid-source-record', `출처 ${sourceLabel}의 공식 URL이 유효한 HTTPS URL이 아닙니다.`)); } if (record.status !== 'approved') { issues.push(issue('unapproved-source', `출처가 approved 상태가 아닙니다: ${sourceLabel}`)); } } return sourceById; } function validateMeaningOptions( symbolRecord: Record | input | abstract-or-formal, long-or-dense, technical-or-internal |
| src/content/validateContent.ts:117:26 | text | invalid-source-record | input | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/validateContent.ts:117:51 | text | 출처 ID가 비어 있거나 placeholder입니다: ${sourceLabel} | input | technical-or-internal |
| src/content/validateContent.ts:120:49 | text | 출처 ID가 중복됩니다: ${sourceId} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:127:28 | text | invalid-source-record | input | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/validateContent.ts:127:53 | text | 출처 ${sourceLabel}의 ${field}가 비어 있거나 placeholder입니다. | input | long-or-dense |
| src/content/validateContent.ts:131:26 | text | invalid-source-record | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/validateContent.ts:131:51 | text | 출처 ${sourceLabel}의 접근일 또는 검수일이 YYYY-MM-DD가 아닙니다. | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:134:26 | text | invalid-source-record | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/content/validateContent.ts:134:51 | text | 출처 ${sourceLabel}의 공식 URL이 유효한 HTTPS URL이 아닙니다. | learner-text-candidate | abstract-or-formal, missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:137:26 | text | unapproved-source | learner-text-candidate | — |
| src/content/validateContent.ts:137:47 | text | 출처가 approved 상태가 아닙니다: ${sourceLabel} | learner-text-candidate | — |
| src/content/validateContent.ts:148:15 | text | { const meaningOptions = Array.isArray(symbolRecord.meaningOptions) ? symbolRecord.meaningOptions : []; if (meaningOptions.length !== 3) { issues.push(issue('meaning-choice-count', '보이는 의미 선택지는 정확히 3개여야 합니다.', symbolId)); } const meaningIds = new Set | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:151:48 | text | 보이는 의미 선택지는 정확히 3개여야 합니다. | learner-text-candidate | — |
| src/content/validateContent.ts:154:37 | text | (); const meaningLabels = new Set | learner-text-candidate | — |
| src/content/validateContent.ts:155:40 | text | (); for (const option of meaningOptions) { const record = asRecord(option); const optionId = typeof record?.id === 'string' ? record.id.trim() : ''; const label = typeof record?.label === 'string' ? record.label.trim() : ''; if (!hasUsableText(optionId) \|\| !hasUsableText(label)) { issues.push(issue('invalid-meaning-choice', '의미 선택지의 ID와 문구는 비어 있지 않아야 합니다.', symbolId)); continue; } if (meaningIds.has(optionId) \|\| meaningLabels.has(label)) { issues.push(issue('invalid-meaning-choice', '의미 선택지의 ID와 문구는 서로 중복되지 않아야 합니다.', symbolId)); } meaningIds.add(optionId); meaningLabels.add(label); } return meaningIds; } function validateConstraintIds( symbolRecord: Record | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/content/validateContent.ts:159:45 | text | string | learner-text-candidate | repeated-text |
| src/content/validateContent.ts:161:52 | text | 의미 선택지의 ID와 문구는 비어 있지 않아야 합니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:165:52 | text | 의미 선택지의 ID와 문구는 서로 중복되지 않아야 합니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:174:40 | text | , key: 'allowedOptionIds' \| 'forbiddenOptionIds', symbolId: CareSymbolId \| undefined, issues: ContentValidationIssue[], ): string[] { const values = symbolRecord[key]; if (!Array.isArray(values)) { issues.push(issue('invalid-constraint-id', `${key}는 CareOptionId 배열이어야 합니다.`, symbolId)); return []; } const validIds: string[] = []; for (const value of values) { if (typeof value !== 'string' \|\| !CARE_OPTION_ID_SET.has(value)) { issues.push(issue('invalid-constraint-id', `${key}에 알 수 없는 CareOptionId가 있습니다: ${String(value)}`, symbolId)); } else { validIds.push(value); } } return validIds; } function isSafeSymbolAssetPath(symbolId: string, assetPath: unknown): boolean { return typeof assetPath === 'string' && !assetPath.includes('..') && !/%2e/i.test(assetPath) && !assetPath.includes('?') && !assetPath.includes('#') && assetPath === `/symbols/${symbolId}.svg`; } export function validatePublishedSymbolRecord( rawSymbol: unknown, sourceById: ReadonlyMap | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:181:49 | text | ${key}는 CareOptionId 배열이어야 합니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:187:51 | text | ${key}에 알 수 없는 CareOptionId가 있습니다: ${String(value)} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:204:48 | text | , ): readonly ContentValidationIssue[] { const issues: ContentValidationIssue[] = []; const symbolRecord = asRecord(rawSymbol); const rawId = typeof symbolRecord?.id === 'string' ? symbolRecord.id.trim() : ''; const symbolId = symbolIssueId(rawId); if (symbolRecord === undefined) return [issue('missing-accessible-text', '심볼 레코드가 객체가 아닙니다.')]; if (!REQUIRED_SYMBOL_ID_SET.has(rawId)) { issues.push(issue('unexpected-symbol-id', `요구된 8개 목록에 없는 심볼 ID입니다: ${rawId \|\| ' | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:210:77 | text | 심볼 레코드가 객체가 아닙니다. | learner-text-candidate | — |
| src/content/validateContent.ts:212:48 | text | 요구된 8개 목록에 없는 심볼 ID입니다: ${rawId \|\| '<missing-symbol-id>'} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/content/validateContent.ts:218:68 | text | 심볼에 연결된 출처가 없습니다. | learner-text-candidate | — |
| src/content/validateContent.ts:221:44 | text | 출처 ID가 비어 있거나 문자열이 아닙니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:225:80 | text | 심볼 출처 ID가 중복됩니다: ${sourceId} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:229:44 | text | 승인 출처를 찾을 수 없습니다: ${sourceId} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:233:76 | text | 출처가 승인되지 않았거나 HTTPS가 아닙니다: ${sourceId} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:235:50 | text | 심볼과 출처의 검수일이 다릅니다: ${String(symbolRecord.reviewedAt)} / ${String(source.reviewedAt)} | learner-text-candidate | long-or-dense |
| src/content/validateContent.ts:240:55 | text | 각 심볼은 승인된 ISO 3758 출처와 국내 공신력 출처를 모두 연결해야 합니다. | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:243:48 | text | 심볼 검수일이 유효한 YYYY-MM-DD가 아닙니다. | learner-text-candidate | abstract-or-formal, technical-or-internal |
| src/content/validateContent.ts:248:51 | text | 심볼의 이름·범주·문자 설명·provenanceNotes가 비어 있거나 placeholder입니다. | input | long-or-dense |
| src/content/validateContent.ts:251:48 | text | 심볼 범주가 올바르지 않습니다. | learner-text-candidate | — |
| src/content/validateContent.ts:254:48 | text | 심볼 자산 경로가 ID와 정확히 일치하지 않습니다. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/content/validateContent.ts:257:51 | text | 검증된 자산 이용권 증거가 없어 official-standard-symbol을 공개할 수 없습니다. | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/content/validateContent.ts:259:48 | text | 표시 구분 라벨이 없습니다. | learner-text-candidate | — |
| src/content/validateContent.ts:264:50 | text | 정답 의미가 보이는 선택지에 포함되지 않습니다. | feedback-or-error | — |
| src/content/validateContent.ts:269:51 | text | requiresAcknowledgement는 boolean이어야 합니다. | learner-text-candidate | — |
| src/content/validateContent.ts:272:48 | text | 허용·금지·추가 확인 제약이 없습니다. | learner-text-candidate | — |
| src/content/validateContent.ts:275:45 | text | typeof riskId !== 'string' \|\| !DAMAGE_RISK_IDS.has(riskId)) \|\| new Set(symbolRecord.riskIds).size !== symbolRecord.riskIds.length) { issues.push(issue('invalid-symbol-field', '심볼 위험 근거 목록이 올바르지 않습니다.', symbolId)); } return issues; } export function validatePublishedContent(input: { sources: readonly SourceRecord[]; symbols: readonly CareSymbol[]; }): readonly ContentValidationIssue[] { const issues: ContentValidationIssue[] = []; const runtimeInput = input as unknown as { sources?: unknown; symbols?: unknown } \| null \| undefined; const sourceRecords: readonly unknown[] = Array.isArray(runtimeInput?.sources) ? runtimeInput.sources : []; const symbols: readonly unknown[] = Array.isArray(runtimeInput?.symbols) ? runtimeInput.symbols : []; const sourceById = validateSourceRecords(sourceRecords, issues); if (symbols.length !== PUBLISHED_SYMBOL_COUNT) { issues.push( issue( 'symbol-count', `공개 심볼은 정확히 ${PUBLISHED_SYMBOL_COUNT}개여야 하지만 ${symbols.length}개입니다.`, ), ); } const seenIds = new Set | input | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:277:48 | text | 심볼 위험 근거 목록이 올바르지 않습니다. | learner-text-candidate | — |
| src/content/validateContent.ts:296:10 | text | 공개 심볼은 정확히 ${PUBLISHED_SYMBOL_COUNT}개여야 하지만 ${symbols.length}개입니다. | learner-text-candidate | long-or-dense |
| src/content/validateContent.ts:301:34 | text | (); for (const rawSymbol of symbols) { const symbolRecord = asRecord(rawSymbol); const rawId = typeof symbolRecord?.id === 'string' ? symbolRecord.id.trim() : ''; const currentSymbolId = symbolIssueId(rawId); if (rawId !== '' && seenIds.has(rawId)) { issues.push(issue('duplicate-symbol-id', `심볼 ID가 중복됩니다: ${rawId}`, currentSymbolId)); } if (rawId !== '') seenIds.add(rawId); if (!REQUIRED_SYMBOL_ID_SET.has(rawId)) { issues.push(issue('unexpected-symbol-id', `요구된 8개 목록에 없는 심볼 ID입니다: ${rawId \|\| ' | learner-text-candidate | long-or-dense, technical-or-internal |
| src/content/validateContent.ts:307:49 | text | 심볼 ID가 중복됩니다: ${rawId} | learner-text-candidate | technical-or-internal |
| src/content/validateContent.ts:311:50 | text | 요구된 8개 목록에 없는 심볼 ID입니다: ${rawId \|\| '<missing-symbol-id>'} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/content/validateContent.ts:319:56 | text | 필수 심볼 ID가 없습니다: ${requiredId} | learner-text-candidate | technical-or-internal |
| src/domain/evaluateGrouping.test.ts:142:16 | text | rejects %s before resolving options | input | — |
| src/domain/evaluateGrouping.test.ts:268:16 | text | fails closed for a %s before projecting IDs | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/evaluateGrouping.ts:9:81 | text | ; } export type GroupingFindingCode = \| 'invalid-membership' \| 'separation-needed' \| 'missing-reason' \| 'compatible-group'; export interface GroupingFinding { code: GroupingFindingCode; garmentIds: readonly string[]; relatedSymbolIds: readonly CareSymbolId[]; feedback: string; } const stages: readonly PlanningStage[] = ['wash', 'dry', 'iron']; const mixedGarmentIds = ['mixed-cotton-shirt', 'mixed-synthetic-sportswear', 'mixed-delicate-scarf'] as const; const emptyCommon: Readonly | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/evaluateGrouping.ts:81:63 | text | 옷 묶음을 확인할 수 없어요. ${message} | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:102:66 | text | 미션과 옷 묶음 자료를 다시 확인해 주세요. | input | repeated-text |
| src/domain/evaluateGrouping.ts:105:27 | text | 미션과 옷 묶음 자료를 다시 확인해 주세요. | learner-text-candidate | repeated-text |
| src/domain/evaluateGrouping.ts:113:27 | text | 혼합 미션은 지정된 세 벌과 그룹 단계가 필요해요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:120:27 | text | 함께 둘 옷과 따로 둘 옷을 다시 선택해 주세요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:129:27 | text | 각 옷은 한 번씩만 함께 두거나 따로 두어야 해요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:170:12 | text | 전문 관리나 도움 요청 표시가 있는 옷은 일반 묶음에서 따로 확인해요. | hint | — |
| src/domain/evaluateGrouping.ts:171:12 | text | 모든 단계에서 함께 허용되는 조건이 없어 옷을 나누어 살펴봐요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:188:8 | text | 따로 살펴볼 옷의 실제 제한 표시를 근거로 골라 주세요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:195:8 | text | 선택한 근거 표시가 현재 묶음의 분리 원인과 연결되지 않아요. | learner-text-candidate | — |
| src/domain/evaluateGrouping.ts:204:8 | text | 함께 둔 옷에서 세탁·건조·다림질의 공통 조건을 찾았어요. | learner-text-candidate | — |
| src/domain/evaluateInterpretation.test.ts:8:48 | text | fixture symbol is missing | feedback-or-error | repeated-text |
| src/domain/evaluateInterpretation.test.ts:21:44 | text | 관리 | learner-text-candidate | — |
| src/domain/evaluateInterpretation.test.ts:24:7 | text | asks the learner to return to the label after an incorrect meaning | feedback-or-error | long-or-dense |
| src/domain/evaluateInterpretation.test.ts:26:48 | text | fixture symbol is missing | feedback-or-error | repeated-text |
| src/domain/evaluateInterpretation.test.ts:34:44 | text | 표시 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:35:44 | text | 아직 맞지 않아요 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:36:44 | text | 다리미 | learner-text-candidate | — |
| src/domain/evaluateInterpretation.test.ts:37:44 | text | 다른 뜻 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:38:48 | text | 온도와 줄 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:44:48 | text | fixture symbol is missing | feedback-or-error | repeated-text |
| src/domain/evaluateInterpretation.test.ts:52:44 | text | 아직 맞지 않아요 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:53:44 | text | 삼각형 | learner-text-candidate | — |
| src/domain/evaluateInterpretation.test.ts:54:44 | text | 엑스 | learner-text-candidate | — |
| src/domain/evaluateInterpretation.test.ts:55:44 | text | 다른 뜻 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:56:48 | text | 온도와 줄 | learner-text-candidate | repeated-text |
| src/domain/evaluateInterpretation.test.ts:64:48 | text | fixture symbol is missing | feedback-or-error | repeated-text |
| src/domain/evaluateInterpretation.ts:26:10 | text | 이 표시가 관리 행동과 어떻게 이어지는지 확인해 보세요. | learner-text-candidate | — |
| src/domain/evaluateInterpretation.ts:27:10 | text | 아직 맞지 않아요. 이 표시에서 ${interpretationRetryHints[symbol.id] ?? learnerCopy.wrongAnswerHint}를 다시 찾아보고 다른 뜻을 골라 보세요. | feedback-or-error, hint | long-or-dense, technical-or-internal |
| src/domain/evaluatePlan.test.ts:69:7 | text | returns to related labels without claiming certain damage | learner-text-candidate | long-or-dense |
| src/domain/evaluatePlan.test.ts:74:63 | text | 표시 | feedback-or-error | repeated-text |
| src/domain/evaluatePlan.test.ts:101:8 | text | 실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요. | instruction | repeated-text |
| src/domain/evaluatePlan.test.ts:102:8 | text | 실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요. | learner-text-candidate | repeated-text |
| src/domain/evaluatePlan.test.ts:136:16 | text | rejects %s garment IDs | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/evaluatePlan.test.ts:172:16 | text | rejects a %s reference | learner-text-candidate | — |
| src/domain/evaluatePlan.test.ts:218:7 | text | uses Korean planning-stage labels in every stage finding | learner-text-candidate | long-or-dense |
| src/domain/evaluatePlan.test.ts:260:16 | text | returns a defensive invalid result for %s | input | missing-term-explanation, technical-or-internal |
| src/domain/evaluatePlan.test.ts:380:16 | text | rejects a malformed published symbol %s field | learner-text-candidate | — |
| src/domain/evaluatePlan.test.ts:380:83 | text | { const symbol = careSymbolById.get('care-wash-30-gentle')!; const malformedSymbol = { ...symbol, ...change } as unknown as CareSymbol; const symbols = new Map | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/evaluatePlan.test.ts:397:7 | text | mission title | learner-text-candidate | — |
| src/domain/evaluatePlan.test.ts:400:16 | text | rejects a malformed mission identity field: %s | learner-text-candidate | technical-or-internal |
| src/domain/evaluatePlan.test.ts:418:16 | text | rejects a malformed virtual garment field: %s | learner-text-candidate | — |
| src/domain/evaluatePlan.ts:14:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질', }; const relativeLevelRank: Readonly | learner-text-candidate | long-or-dense |
| src/domain/evaluatePlan.ts:15:10 | text | 세탁 | learner-text-candidate | repeated-text |
| src/domain/evaluatePlan.ts:16:9 | text | 건조 | learner-text-candidate | repeated-text |
| src/domain/evaluatePlan.ts:17:10 | text | 다림질 | learner-text-candidate | repeated-text |
| src/domain/evaluatePlan.ts:153:39 | text | symbols.get(symbolId)?.riskIds ?? []), ...(option?.riskIds ?? []), ]); } function optionLabel(optionId: CareOptionId, options: ReadonlyMap | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/evaluatePlan.ts:169:33 | text | relativeLevelRank[highest] ? value : highest, 'lower', ); } function outsideFeedback(stage: PlanningStage, optionName: string): string { return `${stageLabels[stage]}에서 '${optionName}' 선택은 관련 표시와 재료 모형의 허용 범위 밖일 수 있어요. 손상 가능성을 단정하지 말고 표시를 다시 살펴보며 보호자·교사에게 확인해 보세요.`; } function missingFeedback(stage: PlanningStage): string { return `${stageLabels[stage]} 관리 선택이 빠졌어요. 관련 표시와 재료 모형 조건을 다시 확인해 카드를 골라 보세요.`; } function allowedFeedback(stage: PlanningStage, optionName: string): string { return `${stageLabels[stage]} '${optionName}' 선택이 관련 표시와 재료 모형 조건 안에 있어요. 실제 의류에서는 표시 라벨을 우선하고 보호자·교사와 확인해요.`; } function restrictionFeedback(symbol: CareSymbol): string { return `'${symbol.name}' 표시의 추가 제한을 아직 확인하지 않았어요. 실제 라벨과 보호자·교사 안내를 먼저 살펴보세요.`; } function invalidEvaluation(message: string): PlanEvaluation { const finding: PlanFinding = { status: 'invalid-input', stage: 'restriction', garmentIds: [], optionId: null, relatedSymbolIds: [], riskIds: [], feedback: `입력 자료를 확인할 수 없어요. ${message} 표시와 선택 목록을 다시 확인하고 보호자·교사에게 물어보세요.`, }; return { status: 'revise', findings: [finding], combinedAllowedOptions: { wash: [], dry: [], iron: [] }, waterUse: null, energyUse: null, safetyNotices: [...SAFETY_NOTICES], }; } function resourceLevel( plan: StudentPlan, options: ReadonlyMap | feedback-or-error, input, instruction | abstract-or-formal, long-or-dense, multiple-actions, technical-or-internal |
| src/domain/evaluatePlan.ts:175:11 | text | ${stageLabels[stage]}에서 '${optionName}' 선택은 관련 표시와 재료 모형의 허용 범위 밖일 수 있어요. 손상 가능성을 단정하지 말고 표시를 다시 살펴보며 보호자·교사에게 확인해 보세요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/domain/evaluatePlan.ts:179:11 | text | ${stageLabels[stage]} 관리 선택이 빠졌어요. 관련 표시와 재료 모형 조건을 다시 확인해 카드를 골라 보세요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/domain/evaluatePlan.ts:183:11 | text | ${stageLabels[stage]} '${optionName}' 선택이 관련 표시와 재료 모형 조건 안에 있어요. 실제 의류에서는 표시 라벨을 우선하고 보호자·교사와 확인해요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/domain/evaluatePlan.ts:187:11 | text | '${symbol.name}' 표시의 추가 제한을 아직 확인하지 않았어요. 실제 라벨과 보호자·교사 안내를 먼저 살펴보세요. | instruction | long-or-dense, multiple-actions |
| src/domain/evaluatePlan.ts:198:16 | text | 입력 자료를 확인할 수 없어요. ${message} 표시와 선택 목록을 다시 확인하고 보호자·교사에게 물어보세요. | feedback-or-error, input | abstract-or-formal, long-or-dense, multiple-actions |
| src/domain/evaluatePrediction.test.ts:19:18 | text | 가능성이 있어요. | feedback-or-error | repeated-text |
| src/domain/evaluatePrediction.test.ts:61:24 | text | 가능성이 있어요. | feedback-or-error | repeated-text |
| src/domain/evaluatePrediction.test.ts:70:24 | text | 가능성을 다시 살펴봐요. | feedback-or-error | — |
| src/domain/evaluatePrediction.test.ts:100:22 | text | 허용 범위예요. | feedback-or-error | — |
| src/domain/evaluatePrediction.test.ts:149:16 | text | rejects %s findings without using their evidence | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/evaluatePrediction.test.ts:176:16 | text | marks %s selection invalid and asks for selection recheck | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/domain/evaluatePrediction.test.ts:194:16 | text | rejects %s even when both selection fields are arrays | learner-text-candidate | long-or-dense |
| src/domain/evaluatePrediction.test.ts:205:16 | text | rejects a %s as an invalid selection | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/evaluatePrediction.test.ts:224:16 | text | rejects %s without using its evidence | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/evaluatePrediction.ts:162:8 | text | 선택 자료를 확인할 수 없어요. 위험과 근거 표시 선택을 다시 확인해 주세요. | learner-text-candidate | multiple-actions |
| src/domain/evaluatePrediction.ts:164:8 | text | 입력 자료를 확인할 수 없어 손상 가능성을 연결하지 못했어요. 표시와 관리 계획을 다시 살펴보세요. | input | abstract-or-formal, multiple-actions, shaming-tone |
| src/domain/evaluatePrediction.ts:166:10 | text | 연결할 손상 가능성 근거가 아직 없어요. 표시와 관리 계획을 다시 살펴보세요. | learner-text-candidate | — |
| src/domain/evaluatePrediction.ts:167:10 | text | 선택한 위험과 표시·관리 계획의 근거를 연결해 보았어요. 손상 가능성을 단정하지 말고 표시를 다시 확인해 보세요. | learner-text-candidate | long-or-dense, multiple-actions |
| src/domain/missionTypes.ts:34:92 | text | ; } export interface GarmentMission { id: MissionId; order: 1 \| 2 \| 3 \| 4 \| 5; title: string; learningFocus: string; garments: readonly VirtualGarment[]; requiresGrouping: boolean; openingPrompt: string; } export interface GroupingChoice { togetherGarmentIds: readonly string[]; separateGarmentIds: readonly string[]; reasonSymbolIds: readonly CareSymbolId[]; } export interface StudentPlan { missionId: MissionId; garmentIds: readonly string[]; stageOptions: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/sessionReducer.test.ts:20:47 | text | fixture mission is missing | feedback-or-error | repeated-text |
| src/domain/sessionReducer.test.ts:32:92 | text | { const symbol = careSymbolById.get(symbolId); if (symbol === undefined) throw new Error('fixture symbol is missing'); return sessionReducer(current, { type: 'RECORD_INTERPRETATION', attempt: { symbolId, selectedMeaningOptionId: symbol.correctMeaningOptionId, isCorrect: true, }, }); }, session); } function evaluationFor(missionId: MissionId, plan: StudentPlan) { const mission = missionById.get(missionId); if (mission === undefined) throw new Error('fixture mission is missing'); return evaluatePlan({ mission, plan, symbols: careSymbolById, options: careOptionById }); } function groupingEvaluationFor(missionId: MissionId, plan: StudentPlan): GroupingEvaluation \| null { const mission = missionById.get(missionId); if (mission === undefined) throw new Error('fixture mission is missing'); if (!mission.requiresGrouping \|\| plan.grouping === null) return null; return evaluateGrouping({ mission, grouping: plan.grouping, symbols: careSymbolById, options: careOptionById }); } function predictionFor(evaluation: ReturnType | feedback-or-error | long-or-dense, technical-or-internal |
| src/domain/sessionReducer.test.ts:34:48 | text | fixture symbol is missing | feedback-or-error | repeated-text |
| src/domain/sessionReducer.test.ts:48:47 | text | fixture mission is missing | feedback-or-error | repeated-text |
| src/domain/sessionReducer.test.ts:54:47 | text | fixture mission is missing | feedback-or-error | repeated-text |
| src/domain/sessionReducer.test.ts:65:22 | text | fixture needs prediction evidence | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/domain/sessionReducer.test.ts:98:16 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:130:18 | text | 모든 표시 해석을 먼저 완료하세요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:175:7 | text | requires valid non-empty risk and reason selections with matching feedback | feedback-or-error | long-or-dense, missing-term-explanation, technical-or-internal |
| src/domain/sessionReducer.test.ts:211:14 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.test.ts:238:20 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:238:61 | text | care-wash-30-gentle | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:244:20 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:244:61 | text | care-professional | learner-text-candidate | — |
| src/domain/sessionReducer.test.ts:244:99 | text | dry | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:279:7 | text | rejects forged prediction feedback instead of trusting matching-shaped fields | feedback-or-error | long-or-dense |
| src/domain/sessionReducer.test.ts:285:53 | text | 조작된 피드백 | feedback-or-error | — |
| src/domain/sessionReducer.test.ts:306:14 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.test.ts:308:62 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.test.ts:314:30 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:314:71 | text | care-wash-30-gentle | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.test.ts:348:62 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.test.ts:383:14 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.ts:21:6 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:54:14 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.ts:63:4 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:63:26 | text | protect-material-or-decoration | learner-text-candidate | — |
| src/domain/sessionReducer.ts:63:60 | text | separate-incompatible-garment | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:96:38 | text | 지금은 ${expected} 단계에서 할 수 없는 행동이에요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:100:88 | text | 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/sessionReducer.ts:110:51 | text | typeof item !== 'string' \|\| item.trim() === '')) { fail(`${label} 목록이 올바르지 않아요.`); } return value as readonly string[]; } function exactKnownList | learner-text-candidate | long-or-dense |
| src/domain/sessionReducer.ts:111:11 | text | ${label} 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:118:26 | text | !known.includes(item as T))) fail(`${label}에 알 수 없는 항목이 있어요.`); return list as readonly T[]; } function structurallyEqual(left: unknown, right: unknown, seen = new WeakMap | learner-text-candidate | long-or-dense |
| src/domain/sessionReducer.ts:118:62 | text | ${label}에 알 수 없는 항목이 있어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:143:64 | text | 계획과 현재 미션의 ID가 서로 달라요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/sessionReducer.ts:144:57 | text | 계획 의류 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:147:31 | text | !expectedGarmentIds.includes(id))) { fail('계획의 의류가 현재 미션의 의류와 정확히 일치하지 않아요.'); } if (!isRecord(value.stageOptions)) fail('계획의 단계 선택이 올바르지 않아요.'); for (const key of Object.keys(value.stageOptions)) if (!stages.includes(key as PlanningStage)) fail('계획에 알 수 없는 단계가 있어요.'); const stageOptions = {} as Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/sessionReducer.ts:148:11 | text | 계획의 의류가 현재 미션의 의류와 정확히 일치하지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:150:44 | text | 계획의 단계 선택이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:151:104 | text | 계획에 알 수 없는 단계가 있어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:154:81 | text | ${stage} 단계 선택이 계획에 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:157:80 | text | ${stage} 단계 선택이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:161:92 | text | 확인 표시 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:162:65 | text | 확인 표시를 중복해서 적을 수 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:165:42 | text | 혼합 미션의 옷 묶음이 필요해요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:166:74 | text | 함께 둘 옷 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:167:74 | text | 따로 둘 옷 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:168:87 | text | 묶음 근거 표시 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:171:72 | text | 옷 묶음이 현재 미션의 의류와 정확히 일치하지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:172:57 | text | 묶음 근거 표시를 중복해서 적을 수 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:175:11 | text | 이 미션에는 옷 묶음 선택이 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:188:97 | text | 계획 평가의 발견 항목이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:189:55 | text | 평가 의류 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:191:35 | text | !missionGarmentIds.includes(garmentId))) fail('계획 평가에 현재 미션 밖의 의류가 있어요.'); const optionId = value.optionId === null ? null : value.optionId; if (optionId !== null && (typeof optionId !== 'string' \|\| !careOptionById.has(optionId as CareOptionId))) fail('계획 평가의 선택 ID가 올바르지 않아요.'); if ((value.stage === 'restriction' && optionId !== null) \|\| (value.stage !== 'restriction' && optionId !== null && careOptionById.get(optionId as CareOptionId)?.stage !== value.stage)) { fail('계획 평가의 단계와 선택이 맞지 않아요.'); } const symbols = exactKnownList(value.relatedSymbolIds, symbolIdsFor(missionId), '평가 표시'); const risks = exactKnownList(value.riskIds, riskIds, '평가 위험'); if (typeof value.feedback !== 'string' \|\| value.feedback.trim() === '') fail('계획 평가의 피드백이 올바르지 않아요.'); return { status: value.status as PlanFindingStatus, stage: value.stage as PlanningStage \| 'restriction', garmentIds: [...garments], optionId: optionId as CareOptionId \| null, relatedSymbolIds: [...symbols], riskIds: [...risks], feedback: value.feedback, }; } function validateEvaluation(value: unknown, missionId: MissionId): PlanEvaluation { if (!isRecord(value) \|\| (value.status !== 'ready' && value.status !== 'revise') \|\| !isDenseArray(value.findings)) fail('계획 평가 자료가 올바르지 않아요.'); if (!Object.prototype.hasOwnProperty.call(value, 'waterUse') \|\| !Object.prototype.hasOwnProperty.call(value, 'energyUse')) fail('계획 평가의 자원 자료가 없어요.'); if (!isRecord(value.combinedAllowedOptions)) fail('공통 허용 선택 자료가 올바르지 않아요.'); const combinedAllowedOptions = {} as Record | feedback-or-error | long-or-dense, multiple-actions, technical-or-internal |
| src/domain/sessionReducer.ts:191:83 | text | 계획 평가에 현재 미션 밖의 의류가 있어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:193:115 | text | 계획 평가의 선택 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/sessionReducer.ts:196:11 | text | 계획 평가의 단계와 선택이 맞지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:198:84 | text | 평가 표시 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:199:57 | text | 평가 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:200:34 | text | string | feedback-or-error | repeated-text |
| src/domain/sessionReducer.ts:200:81 | text | 계획 평가의 피드백이 올바르지 않아요. | feedback-or-error | — |
| src/domain/sessionReducer.ts:213:123 | text | 계획 평가 자료가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:214:132 | text | 계획 평가의 자원 자료가 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:215:54 | text | 공통 허용 선택 자료가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:218:102 | text | ${stage} 공통 선택 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:219:90 | text | 공통 선택의 단계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:223:120 | text | 상대 자원 평가가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:224:57 | text | 안전 안내 | instruction | repeated-text |
| src/domain/sessionReducer.ts:248:51 | text | 제출한 계획 평가가 실제 계획 판정과 일치하지 않아요. | learner-text-candidate | abstract-or-formal |
| src/domain/sessionReducer.ts:254:51 | text | 제출한 옷 묶음 평가가 실제 묶음 판정과 일치하지 않아요. | learner-text-candidate | abstract-or-formal |
| src/domain/sessionReducer.ts:259:31 | text | 예측 선택 자료가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:260:57 | text | 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:261:86 | text | 근거 표시 | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:262:57 | text | 위험과 근거 표시를 하나 이상 선택하세요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:267:134 | text | 예측 피드백이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:268:75 | text | 지원 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:269:79 | text | 미지원 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:270:104 | text | 지원 근거 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:271:108 | text | 미지원 근거 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:272:69 | text | 누락 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:273:98 | text | 누락 근거 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:274:63 | text | 무효 위험 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:275:73 | text | 무효 근거 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:276:67 | text | 유효하지 않은 예측 선택이 있어요. | learner-text-candidate | abstract-or-formal |
| src/domain/sessionReducer.ts:278:98 | text | 예측 피드백의 선택 분류가 선택 내용과 맞지 않아요. | learner-text-candidate | multiple-actions |
| src/domain/sessionReducer.ts:294:90 | text | 수정 근거가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:295:84 | text | 수정 근거 표시 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:296:64 | text | 변경 단계 | learner-text-candidate | — |
| src/domain/sessionReducer.ts:297:35 | text | 수정 근거 표시를 하나 이상 선택하세요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:298:99 | text | 수정 근거 목록을 중복해서 적을 수 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:317:67 | text | 세션 행동이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:326:43 | text | 미션을 먼저 선택하세요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:331:127 | text | 표시 해석 자료가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:335:79 | text | 현재 미션에 없는 표시를 해석할 수 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:337:62 | text | 표시 해석 결과가 선택 내용과 맞지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:343:45 | text | 모든 표시 해석을 먼저 완료하세요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:345:43 | text | 미션을 먼저 선택하세요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:353:51 | text | 처음 계획 평가가 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:355:66 | text | 예측 선택 자료에 알 수 없는 항목이 있어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:358:73 | text | 제출한 예측 피드백이 실제 판정과 일치하지 않아요. | feedback-or-error | abstract-or-formal |
| src/domain/sessionReducer.ts:363:81 | text | 예측 피드백을 먼저 확인하세요. | feedback-or-error | — |
| src/domain/sessionReducer.ts:370:109 | text | 처음 계획 자료가 없어요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:374:48 | text | 수정 계획은 허용 범위로 완성해야 해요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:375:93 | text | 수정한 옷 묶음은 허용 범위로 완성해야 해요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:378:154 | text | 실제 변경 단계와 수정 근거가 맞지 않아요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:383:87 | text | 옷 묶음도 먼저 수정하거나 확인해야 해요. | learner-text-candidate | multiple-conditions |
| src/domain/sessionReducer.ts:385:17 | text | 허용된 계획은 현재 계획 확인으로만 마무리할 수 있어요. | learner-text-candidate | repeated-text |
| src/domain/sessionReducer.ts:388:15 | text | 수정 계획은 실제 단계나 옷 묶음을 바꿔야 해요. | learner-text-candidate | — |
| src/domain/sessionReducer.ts:395:13 | text | 알 수 없는 세션 행동이에요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:14:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질' }; function isRecord(value: unknown): value is Record | learner-text-candidate | long-or-dense |
| src/domain/validateCareOption.ts:14:71 | text | 세탁 | learner-text-candidate | repeated-text |
| src/domain/validateCareOption.ts:14:82 | text | 건조 | learner-text-candidate | repeated-text |
| src/domain/validateCareOption.ts:14:94 | text | 다림질 | learner-text-candidate | repeated-text |
| src/domain/validateCareOption.ts:21:60 | text | 0; } export function validateCareOptionShape( key: unknown, value: unknown, expectedStage?: PlanningStage, ): string \| null { if (typeof key !== 'string' \|\| !isRecord(value)) return '선택 목록에 비어 있거나 올바르지 않은 항목이 있어요.'; const option = value as Partial | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validateCareOption.ts:29:60 | text | 선택 목록에 비어 있거나 올바르지 않은 항목이 있어요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:31:82 | text | '${key}' 선택의 ID가 목록과 달라요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validateCareOption.ts:32:64 | text | '${key}' 선택의 단계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:34:13 | text | '${key}' 선택이 ${stageLabels[expectedStage]} 단계와 맞지 않아요. | learner-text-candidate | long-or-dense |
| src/domain/validateCareOption.ts:37:13 | text | '${key}' 선택의 설명이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:39:58 | text | '${key}' 선택의 안전 경계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:41:13 | text | '${key}' 선택의 상대 자원 지표가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:44:39 | text | !riskIds.includes(riskId as DamageRiskId)) \|\| new Set(option.riskIds).size !== option.riskIds.length) { return `'${key}' 선택의 가능성 근거 목록이 올바르지 않아요.`; } return null; } export function validateCareOptionCatalog(options: ReadonlyMap | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validateCareOption.ts:46:13 | text | '${key}' 선택의 가능성 근거 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:52:54 | text | 선택 목록의 항목 수가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateCareOption.ts:59:15 | text | '${String(key)}' 선택의 ID가 목록과 달라요. | learner-text-candidate | technical-or-internal |
| src/domain/validateMissionInput.ts:26:13 | text | 미션 의류의 설명·재료 경계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:28:47 | text | 미션 의류의 표시 목록이 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validateMissionInput.ts:30:13 | text | '${garment.name}' 의류의 재료 조건이 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validateMissionInput.ts:34:13 | text | '${garment.name}' 의류의 재료 조건 단계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:38:15 | text | '${garment.name}' 의류의 ${stage} 재료 조건이 비어 있어요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:46:13 | text | 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/validateMissionInput.ts:49:48 | text | 미션 순서가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:51:56 | text | 미션 설명이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:52:62 | text | 미션의 그룹 단계 표시가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:53:82 | text | 미션 의류 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:55:111 | text | 1)) { return '미션의 의류 그룹 설정이 올바르지 않아요.'; } const garmentIds: string[] = []; for (const garment of mission.garments) { const issue = validateGarmentShape(garment); if (issue !== null) return issue; garmentIds.push((garment as { id: string }).id); } if (new Set(garmentIds).size !== garmentIds.length) return '미션에 중복된 의류 ID가 있어요.'; return null; } export function validateMissionReferences( mission: unknown, symbols: ReadonlyMap | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validateMissionInput.ts:56:13 | text | 미션의 의류 그룹 설정이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validateMissionInput.ts:64:63 | text | 미션에 중복된 의류 ID가 있어요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/validateMissionInput.ts:71:40 | text | , ): string \| null { const missionIssue = validateMissionShape(mission); if (missionIssue !== null \|\| !isRecord(mission) \|\| !Array.isArray(mission.garments)) return missionIssue; for (const garment of mission.garments) { if (!isRecord(garment)) return '미션 의류가 올바르지 않아요.'; for (const symbolId of garment.symbolIds as readonly unknown[]) { if (typeof symbolId !== 'string' \|\| !isRecord(symbols.get(symbolId)) \|\| (symbols.get(symbolId) as { id?: unknown }).id !== symbolId) { return `'${String(symbolId)}' 표시를 목록에서 찾을 수 없어요.`; } } const materialOptions = garment.materialAllowedOptionIdsByStage as Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validateMissionInput.ts:76:37 | text | 미션 의류가 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validateMissionInput.ts:80:17 | text | '${String(symbolId)}' 표시를 목록에서 찾을 수 없어요. | learner-text-candidate | technical-or-internal |
| src/domain/validateMissionInput.ts:88:19 | text | '${garment.name}' 재료 조건의 선택을 확인할 수 없어요. | learner-text-candidate | multiple-actions |
| src/domain/validatePlanInput.ts:17:49 | text | ; } export type PlanInputValidationResult = \| { valid: true; input: PlanEvaluationInput } \| { valid: false; message: string }; const planningStages: readonly PlanningStage[] = ['wash', 'dry', 'iron']; const careStages: readonly CareStage[] = ['wash', 'bleach', 'dry', 'iron', 'professional']; const stageLabels: Readonly | input | long-or-dense, technical-or-internal |
| src/domain/validatePlanInput.ts:26:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질', }; const damageRiskIds: readonly DamageRiskId[] = [ 'shrinkage', 'deformation', 'color-change', 'decoration-damage', 'heat-damage', ]; const displayKinds = ['official-standard-symbol', 'learning-icon'] as const; function isRecord(value: unknown): value is Record | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validatePlanInput.ts:27:10 | text | 세탁 | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:28:9 | text | 건조 | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:29:10 | text | 다림질 | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:58:13 | text | ${source}의 가능성 근거 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:68:74 | text | !nonEmptyString(item))) { return `${source}의 문자 목록이 올바르지 않아요.`; } return null; } function symbolShapeIssue(key: unknown, value: unknown): string \| null { if (typeof key !== 'string' \|\| !isRecord(value)) return '표시 목록에 비어 있거나 올바르지 않은 항목이 있어요.'; const symbol = value as Partial | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validatePlanInput.ts:69:13 | text | ${source}의 문자 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:75:60 | text | 표시 목록에 비어 있거나 올바르지 않은 항목이 있어요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:77:67 | text | '${key}' 표시의 ID가 목록과 달라요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:78:46 | text | '${key}' 표시의 범주가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:79:48 | text | '${key}' 표시의 이름이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:81:13 | text | '${key}' 표시의 공개 구분이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:85:13 | text | '${key}' 표시의 문자 설명이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:88:52 | text | '${key}' 표시 그림 경로가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:89:58 | text | '${key}' 표시 출처 | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:91:28 | text | '${key}' 표시 검수일이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:96:13 | text | '${key}' 표시 뜻 선택지가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:99:47 | text | isRecord(option) && option.id === symbol.correctMeaningOptionId)) { return `'${key}' 표시의 정답 선택지가 보이는 목록에 없어요.`; } if (!Array.isArray(symbol.allowedOptionIds) \|\| !Array.isArray(symbol.forbiddenOptionIds)) { return `'${key}' 표시의 조건 목록이 올바르지 않아요.`; } if (typeof symbol.requiresAcknowledgement !== 'boolean') return `'${key}' 표시의 확인 경계가 올바르지 않아요.`; return riskListIssue(symbol.riskIds, `'${key}' 표시`); } function optionReferenceIssue( optionId: unknown, stage: PlanningStage, options: ReadonlyMap | feedback-or-error | long-or-dense, multiple-actions, technical-or-internal |
| src/domain/validatePlanInput.ts:100:13 | text | '${key}' 표시의 정답 선택지가 보이는 목록에 없어요. | feedback-or-error | — |
| src/domain/validatePlanInput.ts:103:13 | text | '${key}' 표시의 조건 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:105:68 | text | '${key}' 표시의 확인 경계가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:106:41 | text | '${key}' 표시 | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:112:40 | text | , source: string, ): string \| null { if (typeof optionId !== 'string') return `${source}의 선택 ID가 올바르지 않아요.`; const option = options.get(optionId); if (option === undefined) return `${source} '${optionId}' 선택을 목록에서 찾을 수 없어요.`; return validateCareOptionShape(optionId, option, stage); } function symbolReferenceIssue(symbolId: unknown, symbols: ReadonlyMap | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/domain/validatePlanInput.ts:115:45 | text | ${source}의 선택 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:117:37 | text | ${source} '${optionId}' 선택을 목록에서 찾을 수 없어요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:121:87 | text | ): string \| null { if (typeof symbolId !== 'string') return '표시 ID가 올바르지 않아요.'; if (!isRecord(symbols.get(symbolId))) return `'${symbolId}' 표시를 목록에서 찾을 수 없어요.`; return null; } function validateMapCatalogs( symbols: ReadonlyMap | learner-text-candidate | long-or-dense, technical-or-internal |
| src/domain/validatePlanInput.ts:122:45 | text | 표시 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:123:49 | text | '${symbolId}' 표시를 목록에서 찾을 수 없어요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:139:90 | text | '${symbol.name}' 표시 조건 | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:142:88 | text | 0) { return `'${symbol.name}' 표시는 계획 단계 선택을 만들 수 없어요.`; } } return null; } export function validatePlanInput(input: unknown): PlanInputValidationResult { if (!isRecord(input)) return { valid: false, message: '계획 입력 자료가 비어 있거나 올바르지 않아요.' }; const candidate = input as Partial | input | abstract-or-formal, long-or-dense, multiple-actions, technical-or-internal |
| src/domain/validatePlanInput.ts:143:15 | text | '${symbol.name}' 표시는 계획 단계 선택을 만들 수 없어요. | learner-text-candidate | multiple-actions, repeated-text |
| src/domain/validatePlanInput.ts:150:58 | text | 계획 입력 자료가 비어 있거나 올바르지 않아요. | input | abstract-or-formal |
| src/domain/validatePlanInput.ts:154:38 | text | 표시·선택 목록이 Map 자료가 아니에요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:163:54 | text | 미션 ID 또는 의류 목록이 올바르지 않아요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:166:38 | text | 계획의 의류 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:168:71 | text | 계획과 미션의 ID가 서로 달라요. | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/domain/validatePlanInput.ts:173:103 | text | 미션 의류가 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:177:38 | text | 미션에 중복된 의류 ID가 있어요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/domain/validatePlanInput.ts:185:38 | text | 계획의 의류 목록이 미션의 의류와 정확히 일치하지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:188:70 | text | 세탁·건조·다림질 선택 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:191:40 | text | ${stageLabels[stage]} 선택이 계획에 없어요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:195:79 | text | ${stageLabels[stage]} 계획 | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:202:40 | text | 미션 의류의 표시 목록이 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:210:93 | text | '${symbol.name}' 표시 조건 | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:214:42 | text | '${symbol.name}' 표시는 계획 단계 선택을 만들 수 없어요. | learner-text-candidate | multiple-actions, repeated-text |
| src/domain/validatePlanInput.ts:219:70 | text | '${garment.name}' 의류의 재료 조건이 올바르지 않아요. | learner-text-candidate | repeated-text |
| src/domain/validatePlanInput.ts:223:42 | text | '${garment.name}' 의류의 ${stageLabels[stage]} 재료 조건이 비어 있어요. | learner-text-candidate | long-or-dense |
| src/domain/validatePlanInput.ts:226:81 | text | '${garment.name}' 재료 조건 | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:233:38 | text | 추가 제한 확인 목록이 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:246:40 | text | 혼합 의류 그룹 정보가 올바르지 않아요. | learner-text-candidate | — |
| src/domain/validatePlanInput.ts:254:40 | text | 혼합 의류 그룹이 미션의 의류와 정확히 일치하지 않아요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:32:34 | text | symbol === undefined)) return null; return candidates as readonly CareSymbol[]; } function CatalogError() { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:38:72 | text | forecast-error-title | feedback-or-error | — |
| src/features/forecast/DamageForecastScreen.tsx:39:76 | text | 표시 자료를 불러올 수 없어요 | heading, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:40:10 | text | 이 미션의 표시 자료가 완전하지 않아 손상 예보를 안전하게 시작할 수 없어요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:41:10 | text | 표시를 건너뛰지 않고, 보호자·교사에게 자료를 확인해 달라고 요청해 주세요. | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:47:43 | text | 다림질 제한 표시 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:48:42 | text | 건조 제한 표시 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:49:43 | text | 세탁 제한 표시 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:50:45 | text | 표백 제한 표시 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:51:11 | text | 관리 제한 표시 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:55:121 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:56:138 | text | 표시 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:56:158 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:58:6 | text | 연결된 위험: ${riskNames(feedback.supportedRiskIds)} (${feedback.supportedRiskIds.length}개) | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:59:6 | text | 연결되지 않은 위험: ${riskNames(feedback.unsupportedRiskIds)} | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:60:6 | text | 놓친 위험: ${riskNames(feedback.missedRiskIds)} | feedback-or-error | technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:61:6 | text | 연결된 근거 표시: ${symbolNames(feedback.supportedReasonSymbolIds)} (${feedback.supportedReasonSymbolIds.length}개) | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:62:6 | text | 연결되지 않은 근거 표시: ${symbolNames(feedback.unsupportedReasonSymbolIds)} | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:72:26 | text | void; } export function DamageForecastScreen({ mission, evaluation, prediction, predictionFeedback, onSubmit, onShowSimulation, }: DamageForecastScreenProps) { const symbols = missionSymbols(mission); const catalogIsValid = validatePublishedSymbolCatalog(careSymbolById) && validateMissionCatalog(missionById, careSymbolById); const availableSymbols = symbols ?? []; const [selectedRisks, setSelectedRisks] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:90:72 | text | (null); const lastReviewTrigger = useRef | learner-text-candidate | technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:91:61 | text | (null); const dialogRef = useRef | learner-text-candidate | technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:124:31 | text | id !== symbolId)); setSelectionMessage(null); } function submit() { if (selectedRisks.length === 0) { setSelectionMessage('손상 가능성을 하나 이상 골라 주세요.'); return; } if (selectedReasons.length === 0) { setSelectionMessage('관련 표시 근거를 하나 이상 골라 주세요.'); return; } const selection = { riskIds: selectedRisks, reasonSymbolIds: selectedReasons } satisfies PredictionSelection; const nextFeedback = evaluatePrediction({ evaluation, selection }); setSelectionMessage(null); onSubmit(selection, nextFeedback); } function openReview(symbolId: CareSymbolId, event: MouseEvent | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:130:28 | text | 손상 가능성을 하나 이상 골라 주세요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:134:28 | text | 관련 표시 근거를 하나 이상 골라 주세요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:143:83 | text | ) { lastReviewTrigger.current = event.currentTarget; setOpenSymbolId(symbolId); } function closeReview() { setOpenSymbolId(null); lastReviewTrigger.current?.focus(); } if (!catalogIsValid \|\| !symbols) return | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:153:59 | text | ; return ( | feedback-or-error | — |
| src/features/forecast/DamageForecastScreen.tsx:156:84 | text | forecast-title | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:158:18 | text | 네 번째 단계 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:159:16 | title | 손상 가능성 예보 | title | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:161:22 | text | 처음 세운 관리 계획을 보고, 생길 수 있는 변화를 위험이 아닌 가능성으로 골라 봐요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:162:26 | text | 가능한 변화와 관련 표시를 고른 뒤 손상 예보를 확인해요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:164:40 | text | 확률이나 실제 손상 사진은 사용하지 않아요. 표시와 가상 계획을 연결해 상대적으로 살펴봅니다. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:167:17 | text | 손상 가능성 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:168:44 | text | 가능한 변화를 하나 이상 선택해요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:180:17 | text | 근거 표시 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:181:48 | text | 관련 표시를 근거로 하나 이상 선택해요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:182:12 | text | 선택한 표시는 왜 그렇게 생각했는지 보여 주는 근거예요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:183:33 | text | { const label = `${evidenceLabel(symbol)}를 근거로 선택 — ${symbol.name}`; return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:184:26 | text | ${evidenceLabel(symbol)}를 근거로 선택 — ${symbol.name} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:191:36 | text | evidence-description-${symbol.id} | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:201:18 | text | {selectionMessage && | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:203:115 | text | } {feedback && ( | feedback-or-error | — |
| src/features/forecast/DamageForecastScreen.tsx:207:17 | text | 예보 피드백 | heading | — |
| src/features/forecast/DamageForecastScreen.tsx:208:90 | text | symbol.id === symbolId)?.name ?? '관련 표시')} | feedback-or-error | technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:208:125 | text | 관련 표시 | feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:211:22 | text | 자세한 연결 결과 보기 | learner-text-candidate | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:216:18 | text | 근거가 부족해요. 관련 표시의 확대경 내용을 다시 확인해 보세요. | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:218:54 | text | item.id === symbolId); if (!symbol) return null; return ( | button-or-action | long-or-dense, technical-or-internal |
| src/features/forecast/DamageForecastScreen.tsx:227:20 | text | {symbol.name} 표시 다시 확인 | button-or-action | — |
| src/features/forecast/DamageForecastScreen.tsx:242:28 | text | symbol-review-title | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:248:36 | text | 관련 표시 확대경 | learner-text-candidate | — |
| src/features/forecast/DamageForecastScreen.tsx:249:42 | text | {openSymbol.name} 다시 확인 | heading | — |
| src/features/forecast/DamageForecastScreen.tsx:251:89 | text | 예보 화면으로 돌아가기 | button-or-action | — |
| src/features/forecast/DamageForecastScreen.tsx:257:93 | text | required | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:257:106 | text | normal | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:257:132 | text | 손상 예보 확인 | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:258:96 | text | normal | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:258:107 | text | required | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/DamageForecastScreen.tsx:258:174 | text | 가상 결과 보기 | button-or-action, feedback-or-error | repeated-text |
| src/features/forecast/RiskCard.tsx:37:57 | text | void; } export function RiskCard({ riskId, selected, onToggle }: RiskCardProps) { const info = riskInfo[riskId]; const titleId = `risk-card-title-${riskId}`; const descriptionId = `risk-card-description-${riskId}`; function handleChange(event: ChangeEvent | input | long-or-dense, technical-or-internal |
| src/features/forecast/RiskCard.tsx:45:61 | text | ) { onToggle(riskId, event.currentTarget.checked); } return ( | input | long-or-dense, technical-or-internal |
| src/features/forecast/RiskCard.tsx:53:26 | text | {info.label} 가능성 | heading | — |
| src/features/forecast/RiskCard.tsx:54:49 | text | 살펴볼 점 | learner-text-candidate | — |
| src/features/forecast/RiskCard.tsx:55:31 | text | 이 변화가 생길 수 있는 조건을 표시와 비교해 봐요. | learner-text-candidate | — |
| src/features/forecast/RiskCard.tsx:65:15 | text | {info.label} 가능성 선택 | learner-text-candidate | — |
| src/features/magnifier/CareSymbolCard.tsx:13:88 | text | void; headingRef?: RefObject | heading, feedback-or-error | technical-or-internal |
| src/features/magnifier/CareSymbolCard.tsx:14:52 | text | ; } export function CareSymbolCard({ symbol, attempt, onChoose, headingRef }: CareSymbolCardProps) { const [selectedMeaningOptionId, setSelectedMeaningOptionId] = useState( attempt?.selectedMeaningOptionId ?? '', ); const [expanded, setExpanded] = useState(false); const [feedback, setFeedback] = useState | heading, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/CareSymbolCard.tsx:22:74 | text | (null); const [selectionMessage, setSelectionMessage] = useState | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/CareSymbolCard.tsx:24:54 | text | (null); const radioGroupName = `meaning-options-${symbol.id}`; function submitChoice() { if (!selectedMeaningOptionId) { setSelectionMessage('뜻 후보를 하나 골라 주세요.'); return; } const nextFeedback = evaluateInterpretation({ symbol, selectedMeaningOptionId }); const nextAttempt = { symbolId: symbol.id, selectedMeaningOptionId, isCorrect: nextFeedback.isCorrect, } satisfies SymbolInterpretationAttempt; setFeedback(nextFeedback); setSelectionMessage(null); onChoose(nextAttempt, nextFeedback); if (!nextFeedback.isCorrect) descriptionRef.current?.focus(); } return ( | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/CareSymbolCard.tsx:29:28 | text | 뜻 후보를 하나 골라 주세요. | learner-text-candidate | — |
| src/features/magnifier/CareSymbolCard.tsx:48:20 | text | ${symbol.name} 표시. ${symbol.shortDescription} 현재 계획에서 ${learnerCopy.allowedRange}을 확인하는 표시예요. | learner-text-candidate | long-or-dense |
| src/features/magnifier/CareSymbolCard.tsx:51:32 | text | 현재 살펴볼 표시 | learner-text-candidate | — |
| src/features/magnifier/CareSymbolCard.tsx:60:8 | text | {expanded ? '표시 작게 보기' : '표시 크게 보기'} | button-or-action | — |
| src/features/magnifier/CareSymbolCard.tsx:61:22 | text | 표시 작게 보기 | learner-text-candidate | — |
| src/features/magnifier/CareSymbolCard.tsx:61:35 | text | 표시 크게 보기 | learner-text-candidate | repeated-text |
| src/features/magnifier/CareSymbolCard.tsx:64:17 | text | 뜻 후보 선택 | learner-text-candidate | — |
| src/features/magnifier/CareSymbolCard.tsx:78:72 | text | required | button-or-action | repeated-text |
| src/features/magnifier/CareSymbolCard.tsx:78:105 | text | 뜻 확인 | button-or-action | repeated-text |
| src/features/magnifier/CareSymbolCard.tsx:78:124 | text | {(selectionMessage \|\| feedback) && ( | button-or-action, feedback-or-error | — |
| src/features/magnifier/CareSymbolCard.tsx:80:73 | text | polite | feedback-or-error | repeated-text |
| src/features/magnifier/CareSymbolCard.tsx:80:81 | text | {selectionMessage ?? (feedback?.isCorrect ? `맞아요. ${feedback.explanation}` : feedback?.returnPrompt)} | feedback-or-error | long-or-dense |
| src/features/magnifier/CareSymbolCard.tsx:81:56 | text | 맞아요. ${feedback.explanation} | feedback-or-error | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:23:55 | text | symbol === undefined)) return null; return symbols as readonly CareSymbol[]; } function CatalogError() { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:29:72 | text | magnifier-error-title | feedback-or-error | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:30:77 | text | 표시 자료를 불러올 수 없어요 | heading, feedback-or-error | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:31:10 | text | 이 미션의 표시 자료가 완전하지 않아 해석 활동을 안전하게 시작할 수 없어요. | learner-text-candidate | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:32:10 | text | 표시를 건너뛰지 않고, 보호자·교사에게 자료를 확인해 달라고 요청해 주세요. | learner-text-candidate | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:44:54 | text | void; }) { const [lastCorrectFeedback, setLastCorrectFeedback] = useState | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:51:49 | text | !completedIds.has(symbol.id)); const activeSymbolHeadingRef = useRef | heading | long-or-dense, technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:52:60 | text | (null); const previousSymbolIdRef = useRef | heading | technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:55:18 | text | { const symbolId = activeSymbol?.id; if (!symbolId) return; if (previousSymbolIdRef.current === null) { previousSymbolIdRef.current = symbolId; return; } if (previousSymbolIdRef.current === symbolId) return; previousSymbolIdRef.current = symbolId; const heading = activeSymbolHeadingRef.current; if (!heading) return; heading.scrollIntoView?.({ block: 'start', behavior: 'auto' }); heading.focus({ preventScroll: true }); }, [activeSymbol?.id]); if (!validatePublishedSymbolCatalog(careSymbolById) \|\| !validateMissionCatalog(missionById, careSymbolById) \|\| !symbols) return | heading, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:66:40 | text | start | heading | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:66:59 | text | auto | heading | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:72:41 | text | ; if (!activeSymbol) { return ( | feedback-or-error | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:76:88 | text | magnifier-title | learner-text-candidate | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:77:73 | text | 표시 해석을 모두 확인했어요 | heading | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:78:12 | text | 모든 고유 표시를 맞혔어요. 이제 관리 순서판으로 이어집니다. | learner-text-candidate | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:84:78 | text | symbolId === activeSymbol.id); return ( | learner-text-candidate | technical-or-internal |
| src/features/magnifier/SymbolMagnifierScreen.tsx:86:86 | text | magnifier-title | learner-text-candidate | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:88:18 | text | 두 번째 단계 | learner-text-candidate | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:89:16 | title | 표시 확대경 | title | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:91:22 | text | 한 번에 표시 하나씩 살펴봐요. 틀려도 같은 표시에서 다시 생각할 수 있어요. | learner-text-candidate | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:92:26 | text | 뜻 후보를 고르고 뜻 확인을 눌러요. | learner-text-candidate | multiple-actions |
| src/features/magnifier/SymbolMagnifierScreen.tsx:94:57 | text | 표시 진행: {completedCount}/{symbols.length} | learner-text-candidate | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:104:9 | text | {lastCorrectFeedback && ( | feedback-or-error | — |
| src/features/magnifier/SymbolMagnifierScreen.tsx:106:73 | text | polite | feedback-or-error | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:111:18 | text | 용어 도움 | hint | repeated-text |
| src/features/magnifier/SymbolMagnifierScreen.tsx:122:44 | text | 실제 라벨과 어려운 관리는 보호자·교사와 함께 확인해요. | learner-text-candidate | — |
| src/features/mission/MissionPicker.tsx:6:82 | text | void }) { return ( | learner-text-candidate | technical-or-internal |
| src/features/mission/MissionPicker.tsx:8:58 | text | mission-picker-title | learner-text-candidate | — |
| src/features/mission/MissionPicker.tsx:10:18 | text | 첫 번째 단계 | learner-text-candidate | repeated-text |
| src/features/mission/MissionPicker.tsx:11:16 | title | 구조할 가상 옷을 골라 보세요 | title | repeated-text |
| src/features/mission/MissionPicker.tsx:13:22 | text | 가상 옷의 재료와 취급 표시를 읽고 관리 순서를 정하는 활동이에요. | learner-text-candidate | — |
| src/features/mission/MissionPicker.tsx:14:26 | text | 미션 카드 하나를 골라 시작해요. | learner-text-candidate | — |
| src/features/mission/MissionPicker.tsx:22:28 | text | ${mission.title} 미션 선택 — ${mission.learningFocus} | learner-text-candidate | long-or-dense |
| src/features/mission/MissionPicker.tsx:25:66 | text | 미션 {mission.order} | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:23:177 | text | , }; return ( | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:26:126 | text | {paths[kind]} | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:33:25 | text | void; }) { return ( | learner-text-candidate | technical-or-internal |
| src/features/mission/RescueRequestScreen.tsx:36:87 | text | request-title | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:39:21 | text | ${mission.order}번째 구조 요청 | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:40:19 | text | ${mission.title.split('의 ')[0]} 구조 요청 | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:42:34 | text | 이번 질문: | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:43:28 | text | 표시 확대 버튼을 눌러 라벨 단서를 살펴봐요. | learner-text-candidate | multiple-actions |
| src/features/mission/RescueRequestScreen.tsx:46:72 | text | required | button-or-action | repeated-text |
| src/features/mission/RescueRequestScreen.tsx:46:108 | text | 표시 확대 | button-or-action | repeated-text |
| src/features/mission/RescueRequestScreen.tsx:58:21 | text | 재료 | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:70:48 | text | 학습 범위: | learner-text-candidate | — |
| src/features/mission/RescueRequestScreen.tsx:70:63 | text | 이 화면의 옷과 재료는 실제 측정값이 아닌 가상 학습 자료예요. | learner-text-candidate | — |
| src/features/plan/CareOptionCard.tsx:10:40 | text | void; } export function CareOptionCard({ option, stageLabel, selected, onSelect }: CareOptionCardProps) { const title = careOptionTitle(option); return ( | heading | long-or-dense, technical-or-internal |
| src/features/plan/CareOptionCard.tsx:20:71 | text | 보호자·교사와 먼저 확인해요. | learner-text-candidate | — |
| src/features/plan/CareOptionCard.tsx:27:22 | text | ${title} — ${stageLabel} 단계 카드 고르기 | learner-text-candidate | — |
| src/features/plan/CareOptionCard.tsx:29:8 | text | 이 카드 고르기 | learner-text-candidate | — |
| src/features/plan/CurrentPlanSummary.tsx:6:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질', }; export interface CurrentPlanSummaryProps { stageOptions: Readonly | learner-text-candidate | long-or-dense |
| src/features/plan/CurrentPlanSummary.tsx:7:10 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:8:9 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:9:10 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:25:42 | text | stageOptions[stage] !== null).length; return ( | learner-text-candidate | technical-or-internal |
| src/features/plan/CurrentPlanSummary.tsx:27:59 | aria-label | 현재 관리 계획 | aria-label | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:28:11 | text | 현재 관리 계획 | heading | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:29:43 | text | {filled}/3단계가 배치되었어요. 순서: 세탁 → 건조 → 다림질 | learner-text-candidate | — |
| src/features/plan/CurrentPlanSummary.tsx:36:23 | text | {stageLabels[stage]} | learner-text-candidate | repeated-text |
| src/features/plan/CurrentPlanSummary.tsx:37:21 | text | {option ? careOptionTitle(option) : '아직 카드를 놓지 않았어요.'} | learner-text-candidate | long-or-dense |
| src/features/plan/CurrentPlanSummary.tsx:37:58 | text | 아직 카드를 놓지 않았어요. | learner-text-candidate | — |
| src/features/plan/CurrentPlanSummary.tsx:42:42 | text | 추가 제한 확인: {acknowledgedRestrictionIds.length}/{restrictionCount} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:18:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질', }; function emptyStageOptions(): Record | learner-text-candidate | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:19:10 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:20:9 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:21:10 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:52:93 | text | initialPlan?.stageOptions[stage] === null) ?? 'wash'); const headingRefs = useRef | heading | long-or-dense, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:120:19 | text | finding.stage === stage && finding.status === 'missing-step', )); if (missingStage) { setMessage('세탁·건조·다림질 단계를 모두 채운 뒤 확인해 주세요.'); headingRefs.current[missingStage]?.focus(); return; } if (mission.requiresGrouping && grouping) { const assigned = [...grouping.togetherGarmentIds, ...grouping.separateGarmentIds]; if (assigned.length !== mission.garments.length \|\| new Set(assigned).size !== mission.garments.length) { setMessage('세 벌을 함께 관리하거나 따로 관리하는 그룹에 모두 배정해 주세요.'); return; } const groupingEvaluation = evaluateGrouping({ mission, grouping, symbols: careSymbolById, options: careOptionById, }); onSubmit(plan, evaluation, groupingEvaluation); return; } onSubmit(plan, evaluation, null); } return ( | heading, button-or-action | long-or-dense, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:123:19 | text | 세탁·건조·다림질 단계를 모두 채운 뒤 확인해 주세요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:130:21 | text | 세 벌을 함께 관리하거나 따로 관리하는 그룹에 모두 배정해 주세요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:146:89 | text | management-board-title | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:146:113 | text | {mode === 'initial' ? ( | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:149:20 | text | 세 번째 단계 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:150:18 | title | 관리 순서판 | title | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:152:24 | text | 관리 방법 카드를 먼저 고르고, 카드를 놓을 단계를 버튼으로 선택해요. | learner-text-candidate | multiple-actions |
| src/features/plan/ManagementBoardScreen.tsx:153:28 | text | 관리 방법 카드 하나를 고른 뒤 맞는 단계에 놓아요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:157:34 | text | 여섯 번째 단계 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:158:43 | text | 새 수정 계획 만들기 | heading | — |
| src/features/plan/ManagementBoardScreen.tsx:159:14 | text | 최초 계획을 살펴본 뒤, 바꿀 카드만 다시 골라 단계에 놓아요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:162:40 | text | 카드의 조건은 가상 재료 모형을 비교하는 학습 자료예요. 실제 옷은 제품 라벨과 보호자·교사 안내를 먼저 확인해요. | instruction | long-or-dense, multiple-actions |
| src/features/plan/ManagementBoardScreen.tsx:169:66 | text | start | heading | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:169:85 | text | auto | heading | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:180:52 | aria-label | 관리 단계 배치 | aria-label | — |
| src/features/plan/ManagementBoardScreen.tsx:182:73 | text | ${stage}-stage-title | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:187:14 | text | {stageLabels[stage]} 단계 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:195:86 | text | ${stage}-stage-help | hint | — |
| src/features/plan/ManagementBoardScreen.tsx:197:14 | text | {stageLabels[stage]} 단계에 놓기 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:199:28 | text | {(!selectedOption \|\| selectedOption.stage !== stage) && ( | hint | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:201:73 | text | {!selectedOption ? '카드를 먼저 고르면 이 단계에 놓을 수 있어요.' : `지금 고른 카드는 ${stageLabels[selectedOption.stage]} 단계에 놓을 수 있어요.`} | hint | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:202:37 | text | 카드를 먼저 고르면 이 단계에 놓을 수 있어요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:202:68 | text | 지금 고른 카드는 ${stageLabels[selectedOption.stage]} 단계에 놓을 수 있어요. | learner-text-candidate | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:209:58 | text | care-options-title | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:210:37 | text | 관리 방법 카드 고르기 | heading | — |
| src/features/plan/ManagementBoardScreen.tsx:211:75 | text | 지금은 {stageLabels[activeStage]} 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요. | hint | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:224:15 | text | {selectedOption ? ( | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:226:63 | aria-label | 선택 카드 배치 | aria-label | — |
| src/features/plan/ManagementBoardScreen.tsx:227:24 | text | {careOptionById.get(selectedOption.id)?.label ?? selectedOption.id} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:227:100 | text | 카드를 골랐어요. 이제 {stageLabels[selectedOption.stage]} 단계에 놓아 보세요. | learner-text-candidate | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:232:14 | text | 선택한 카드 {stageLabels[selectedOption.stage]} 단계에 놓기 | learner-text-candidate | long-or-dense |
| src/features/plan/ManagementBoardScreen.tsx:237:74 | text | 먼저 관리 방법 카드 하나를 골라 주세요. | hint | — |
| src/features/plan/ManagementBoardScreen.tsx:243:19 | text | 추가 제한 확인 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:244:14 | text | 표시의 추가 제한도 확인했는지 선택해요. | learner-text-candidate | multiple-actions |
| src/features/plan/ManagementBoardScreen.tsx:245:42 | text | { const symbol = careSymbolById.get(symbolId); if (!symbol) return null; return ( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:256:23 | text | {symbol.name} 확인 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:260:20 | text | )} {mission.requiresGrouping && grouping && ( | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:264:62 | text | grouping-title | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:265:35 | text | 세 벌을 함께 또는 따로 관리하기 | heading | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:266:14 | text | 각 옷을 한 번씩 그룹에 배정하고, 따로 둔 옷은 표시 근거를 골라요. | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:275:34 | text | 함께 관리 — ${garment.name} | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:278:20 | text | 함께 관리 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:284:34 | text | 분리 관리 — ${garment.name} | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:287:20 | text | 분리 관리 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:295:21 | text | 분리 근거 표시 선택 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:296:118 | text | { const symbol = careSymbolById.get(symbolId); if (!symbol) return null; return ( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/plan/ManagementBoardScreen.tsx:307:25 | text | {symbol.name} 표시를 분리 근거로 선택 | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:312:19 | text | )} {message && | learner-text-candidate | — |
| src/features/plan/ManagementBoardScreen.tsx:317:72 | text | required | button-or-action | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:317:99 | text | {mode === 'revision' ? '수정 계획 확인' : '관리 계획 확인'} | button-or-action | multiple-actions |
| src/features/plan/ManagementBoardScreen.tsx:318:33 | text | 수정 계획 확인 | learner-text-candidate | repeated-text |
| src/features/plan/ManagementBoardScreen.tsx:318:46 | text | 관리 계획 확인 | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:7:10 | text | wash | learner-text-candidate | — |
| src/features/plan/PlanStageNavigator.tsx:7:25 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:8:10 | text | dry | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:8:24 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:9:10 | text | iron | learner-text-candidate | — |
| src/features/plan/PlanStageNavigator.tsx:9:25 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:15:41 | text | void; } export function PlanStageNavigator({ activeStage, completedStages, onStageChange }: PlanStageNavigatorProps) { return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/plan/PlanStageNavigator.tsx:20:55 | aria-label | 관리 단계 | aria-label | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:21:84 | text | stage.id === activeStage)?.label ?? '세탁'} | learner-text-candidate | technical-or-internal |
| src/features/plan/PlanStageNavigator.tsx:21:122 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:23:39 | text | { const isCurrent = id === activeStage; const isComplete = completedStages.includes(id); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/plan/PlanStageNavigator.tsx:32:30 | text | ${label} 단계 보기 | learner-text-candidate | — |
| src/features/plan/PlanStageNavigator.tsx:35:36 | text | true | learner-text-candidate | repeated-text |
| src/features/plan/PlanStageNavigator.tsx:35:42 | text | {isComplete ? '✓' : '○'} | learner-text-candidate | — |
| src/features/plan/planLabels.ts:5:27 | text | 부드러운 30도 세탁 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:7:84 | text | = [ ['interpretedAllSymbols', '표시를 모두 해석했어요'], ['combinedRestrictions', '관리 제한을 확인했어요'], ['connectedRiskEvidence', '위험과 표시를 연결해 봤어요'], ['revisedPlan', '관리 계획을 완성했어요'], ['responsibleCare', '어른과 확인할 근거를 남겼어요'], ]; export function AchievementChecklist({ summary }: AchievementChecklistProps) { return ( | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/report/AchievementChecklist.tsx:8:30 | text | 표시를 모두 해석했어요 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:9:29 | text | 관리 제한을 확인했어요 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:10:30 | text | 위험과 표시를 연결해 봤어요 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:11:20 | text | 관리 계획을 완성했어요 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:12:24 | text | 어른과 확인할 근거를 남겼어요 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:17:65 | text | achievement-title | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:18:34 | text | 구조 미션을 끝냈어요! | heading | repeated-text |
| src/features/report/AchievementChecklist.tsx:19:10 | text | 이번 활동에서 확인한 내용을 다시 볼 수 있어요. | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:21:49 | text | { const complete = summary[key]; return ( | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:25:69 | text | {complete ? '✓' : '○'} | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:27:51 | text | {complete ? '완료' : '다시 보기'} | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:27:64 | text | 완료 | learner-text-candidate | — |
| src/features/report/AchievementChecklist.tsx:27:71 | text | 다시 보기 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:12:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질' }; function unique | learner-text-candidate | long-or-dense |
| src/features/report/ManagementCard.tsx:12:71 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:12:82 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:12:94 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:17:67 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:17:90 | text | 관련 표시 없음 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:25:85 | text | {source.publisher} · {source.standardOrDocumentId} (검수일 {source.reviewedAt}) | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/ManagementCard.tsx:53:19 | text | {stageLabels[stage]}{changedStages.includes(stage) ? ' · 바뀐 단계' : ''} | learner-text-candidate | long-or-dense |
| src/features/report/ManagementCard.tsx:53:73 | text | · 바뀐 단계 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:54:19 | text | {option ? careOptionTitle(option) : '아직 선택하지 않았어요.'} | learner-text-candidate | long-or-dense |
| src/features/report/ManagementCard.tsx:54:56 | text | 아직 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:59:18 | text | 평가 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:59:29 | text | : {evaluation.status === 'ready' ? '허용 범위' : '다시 살펴볼 부분이 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/report/ManagementCard.tsx:59:65 | text | 허용 범위 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:59:75 | text | 다시 살펴볼 부분이 있어요. | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:62:22 | text | 함께 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:62:115 | text | garment.id === id)?.name ?? '확인할 옷').join(', ') \|\| '없음'} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/report/ManagementCard.tsx:62:145 | text | 확인할 옷 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:62:168 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:63:22 | text | 따로 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:63:115 | text | garment.id === id)?.name ?? '확인할 옷').join(', ') \|\| '없음'} | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/features/report/ManagementCard.tsx:63:145 | text | 확인할 옷 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:63:168 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:64:22 | text | 옷 묶음 평가 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:64:38 | text | : {groupingEvaluation?.status === 'ready' ? '허용 범위' : '근거를 다시 확인해요.'} | learner-text-candidate | long-or-dense |
| src/features/report/ManagementCard.tsx:64:83 | text | 허용 범위 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:64:93 | text | 근거를 다시 확인해요. | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:67:18 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/report/ManagementCard.tsx:68:59 | text | 출처·검수일 | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:69:48 | text | status !== 'allowed') && ( | learner-text-candidate | — |
| src/features/report/ManagementCard.tsx:70:57 | aria-label | 계획 평가 근거 | aria-label | — |
| src/features/report/ManagementCard.tsx:71:67 | text | allowed | feedback-or-error | — |
| src/features/report/ManagementCard.tsx:71:111 | text | ${finding.stage}-${index} | feedback-or-error | repeated-text |
| src/features/report/ManagementCard.tsx:75:18 | text | ${finding.code}-${index} | feedback-or-error | repeated-text |
| src/features/report/ManagementCard.tsx:75:98 | text | ))} {includeLabelNotice && | feedback-or-error | — |
| src/features/report/ManagementCard.tsx:78:40 | text | 학습용 선택 카드이며 실제 옷의 상태나 결과를 보증하지 않아요. | learner-text-candidate | — |
| src/features/report/NextActionPanel.tsx:11:61 | text | next-action-title | learner-text-candidate | — |
| src/features/report/NextActionPanel.tsx:12:34 | text | 다음 행동 | heading | repeated-text |
| src/features/report/NextActionPanel.tsx:14:52 | text | 다음: | learner-text-candidate | — |
| src/features/report/NextActionPanel.tsx:15:61 | text | 마지막 버튼으로 이동 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:17:57 | text | = { shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화', 'decoration-damage': '장식 손상', 'heat-damage': '열 손상', }; const levelLabels: Readonly | learner-text-candidate | long-or-dense, repeated-text |
| src/features/report/RescueReportScreen.tsx:18:15 | text | 줄어듦 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:18:35 | text | 변형 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:18:57 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:19:25 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:19:49 | text | 열 손상 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:21:59 | text | = { lower: '낮음', medium: '보통', higher: '높음' }; const reasonLabels: Readonly | learner-text-candidate | long-or-dense |
| src/features/report/RescueReportScreen.tsx:21:72 | text | 낮음 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:21:86 | text | 보통 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:21:100 | text | 높음 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:22:63 | text | = { 'follow-label-limit': '표시의 제한을 따르기 위해', 'protect-material-or-decoration': '재료나 장식을 보호하기 위해', 'separate-incompatible-garment': '함께 관리하기 어려운 옷을 나누기 위해', 'ask-adult-or-professional': '보호자·교사 또는 전문가에게 확인하기 위해', 'reduce-relative-resource-use': '상대 자원 사용을 줄이기 위해', 'confirm-current-plan': '현재 계획의 근거를 다시 확인하기 위해', }; function unique | learner-text-candidate | long-or-dense, multiple-actions, multiple-conditions |
| src/features/report/RescueReportScreen.tsx:23:4 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:23:26 | text | 표시의 제한을 따르기 위해 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:24:38 | text | 재료나 장식을 보호하기 위해 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:25:37 | text | 함께 관리하기 어려운 옷을 나누기 위해 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:26:33 | text | 보호자·교사 또는 전문가에게 확인하기 위해 | learner-text-candidate | multiple-conditions, repeated-text |
| src/features/report/RescueReportScreen.tsx:27:36 | text | 상대 자원 사용을 줄이기 위해 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:28:28 | text | 현재 계획의 근거를 다시 확인하기 위해 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:31:19 | text | (values: readonly T[]): readonly T[] { return [...new Set(values)]; } export interface AchievementSummary { interpretedAllSymbols: boolean; combinedRestrictions: boolean; connectedRiskEvidence: boolean; revisedPlan: boolean; responsibleCare: boolean; } // eslint-disable-next-line react-refresh/only-export-components export function achievementSummary(state: Pick | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:42:65 | text | missionId | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:42:79 | text | interpretations | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:99 | text | initialEvaluation | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:121 | text | initialGroupingEvaluation | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:151 | text | predictionFeedback | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:174 | text | revisedEvaluation | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:196 | text | revisedGroupingEvaluation | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:42:226 | text | revisionEvidence | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:57:44 | text | id === sourceId); return source ? | learner-text-candidate | technical-or-internal |
| src/features/report/RescueReportScreen.tsx:58:74 | text | _blank | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:58:87 | text | noreferrer | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:58:99 | text | {source.title} · 검수일 {source.reviewedAt} | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:63:62 | text | initialPlan.stageOptions[stage] !== revisedPlan.stageOptions[stage]); } const stageLabels: Readonly | learner-text-candidate | long-or-dense |
| src/features/report/RescueReportScreen.tsx:67:10 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:67:21 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:67:33 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:71:57 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:75:59 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:75:82 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:79:67 | text | 바뀐 단계 없음 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:110:70 | text | careSymbolById.get(id)?.name ?? '관련 표시'); return ( | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:110:104 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:112:87 | text | rescue-report-title | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:114:18 | text | 일곱 번째 단계 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:115:16 | title | 구조 보고서 | title | repeated-text |
| src/features/report/RescueReportScreen.tsx:117:22 | text | 표시를 읽고 계획을 고친 과정을 한 장의 관리 카드로 정리해요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:118:26 | text | 배운 점을 확인하고 다른 미션으로 이어가요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:123:22 | text | 다른 미션 해보기 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:124:22 | text | 배운 점: 표시의 뜻을 관리 행동과 연결하고, 가장 조심스러운 조건을 골라 근거와 함께 계획을 바꿨어요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:127:60 | text | mission-boundary-title | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:128:41 | text | 미션·가상 재료와 학습 경계 | heading | — |
| src/features/report/RescueReportScreen.tsx:129:20 | text | 현재 미션 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:129:34 | text | : {mission.title} | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:132:42 | text | 이 보고서는 가상 재료 모형을 살펴본 학습용 결과이며 실제 옷의 상태를 판정하거나 보증하지 않아요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:135:60 | text | symbol-evidence-title | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:136:40 | text | 해석한 표시와 공식·학습용 구분 | heading | — |
| src/features/report/RescueReportScreen.tsx:137:66 | text | { const symbol = careSymbolById.get(id); if (!symbol) return null; const displayKind = (symbol.displayKind as string) === 'official-standard-symbol' ? '공식 표준 표시' : '학습용 아이콘'; return | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:140:96 | text | 공식 표준 표시 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:140:109 | text | 학습용 아이콘 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:141:155 | text | attempt.symbolId === id && attempt.isCorrect) ? '맞게 확인했어요.' : '다시 살펴봐요.'} | learner-text-candidate | long-or-dense, multiple-actions, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:141:205 | text | 맞게 확인했어요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:141:219 | text | 다시 살펴봐요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:143:12 | text | 학습용 아이콘은 실제 제품 라벨 표시를 대신하지 않아요. 출처와 검수일은 한곳에서 확인해요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:145:20 | text | 출처와 검수일 보기 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:146:14 | text | 표시를 확인하는 데 참고한 공식 자료예요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:151:55 | aria-label | 최초 계획 | aria-label | repeated-text |
| src/features/report/RescueReportScreen.tsx:152:13 | text | 최초 계획 | heading | repeated-text |
| src/features/report/RescueReportScreen.tsx:153:32 | title | 최초 세탁·건조·다림질 계획 | title | — |
| src/features/report/RescueReportScreen.tsx:156:60 | text | risk-title | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:156:84 | aria-label | 예측한 손상 가능성과 관련 표시 | aria-label | repeated-text |
| src/features/report/RescueReportScreen.tsx:157:29 | text | 예측한 손상 가능성과 관련 표시 | heading | repeated-text |
| src/features/report/RescueReportScreen.tsx:158:12 | text | {prediction ? '학생이 고른 위험·근거 표시와 평가 결과를 구분해 살펴봐요.' : '예측 선택 자료가 없어요.'} | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/report/RescueReportScreen.tsx:158:27 | text | 학생이 고른 위험·근거 표시와 평가 결과를 구분해 살펴봐요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:158:65 | text | 예측 선택 자료가 없어요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:160:23 | text | 학생이 선택한 위험 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:161:23 | text | 예측한 가능성(평가가 연결된 위험) | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:161:77 | text | 0 ? riskNames(supportedRisks) : '연결된 위험 없음 · 근거 부족'} | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:161:111 | text | 연결된 위험 없음 · 근거 부족 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:162:23 | text | 선택했지만 초기 평가 근거가 없는 위험 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:163:23 | text | 평가에서 놓친 위험 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:164:23 | text | 학생이 선택한 근거 표시 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:165:23 | text | 평가가 연결한 근거 표시 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:166:23 | text | 선택했지만 초기 평가 근거가 없는 표시 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:167:23 | text | 평가에서 놓친 표시 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:169:12 | text | {predictionFeedback?.message ?? '실제 옷의 상태를 예측하는 결과가 아니에요.'} | feedback-or-error | long-or-dense |
| src/features/report/RescueReportScreen.tsx:169:45 | text | 실제 옷의 상태를 예측하는 결과가 아니에요. | feedback-or-error | — |
| src/features/report/RescueReportScreen.tsx:172:55 | aria-label | 수정 계획 | aria-label | repeated-text |
| src/features/report/RescueReportScreen.tsx:173:13 | text | 수정 계획 | heading | repeated-text |
| src/features/report/RescueReportScreen.tsx:174:32 | title | 수정한 세탁·건조·다림질 계획 | title | — |
| src/features/report/RescueReportScreen.tsx:175:20 | text | 수정 이유 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:175:34 | text | : {reasonLabels[revisionEvidence.reasonId]} | learner-text-candidate | technical-or-internal |
| src/features/report/RescueReportScreen.tsx:176:20 | text | 바뀐 단계 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:177:20 | text | 근거 표시 | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:180:72 | aria-label | 상대 물·에너지 지표 | aria-label | repeated-text |
| src/features/report/RescueReportScreen.tsx:181:13 | text | 물·에너지 상대 지표 | heading | — |
| src/features/report/RescueReportScreen.tsx:182:20 | text | 물 사용 상대 수준 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:182:39 | text | : {revisedEvaluation.waterUse ? levelLabels[revisedEvaluation.waterUse] : '계획을 완성하면 확인할 수 있어요.'} · | learner-text-candidate | long-or-dense |
| src/features/report/RescueReportScreen.tsx:182:114 | text | 계획을 완성하면 확인할 수 있어요. | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:182:146 | text | 에너지 사용 상대 수준 | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:182:167 | text | : {revisedEvaluation.energyUse ? levelLabels[revisedEvaluation.energyUse] : '계획을 완성하면 확인할 수 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/report/RescueReportScreen.tsx:182:244 | text | 계획을 완성하면 확인할 수 있어요. | learner-text-candidate | repeated-text |
| src/features/report/RescueReportScreen.tsx:183:12 | text | 정확한 양이나 실제 절약량이 아닌 학습용 상대 비교예요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:186:81 | aria-label | 안전한 관리와 도움 요청 | aria-label, hint | repeated-text |
| src/features/report/RescueReportScreen.tsx:187:13 | text | 책임 있는 관리와 도움 요청 | heading, hint | — |
| src/features/report/RescueReportScreen.tsx:188:12 | text | 제품 정보를 보호자·교사와 함께 살펴보는 것이 안전한 관리의 출발점이에요. | learner-text-candidate | — |
| src/features/report/RescueReportScreen.tsx:190:12 | text | 이번 보고서의 근거: {summary.responsibleCare ? evidenceNames.join(', ') : '근거를 확인하지 못했어요.'} | learner-text-candidate | long-or-dense, shaming-tone, technical-or-internal |
| src/features/report/RescueReportScreen.tsx:190:79 | text | 근거를 확인하지 못했어요. | learner-text-candidate | shaming-tone |
| src/features/report/RescueReportScreen.tsx:194:118 | text | required | button-or-action | repeated-text |
| src/features/report/RescueReportScreen.tsx:194:155 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| src/features/revision/RevisionScreen.tsx:18:64 | text | confirm-current-plan | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:18:96 | text | = { 'follow-label-limit': '표시의 제한을 따르기 위해', 'protect-material-or-decoration': '재료나 장식을 보호하기 위해', 'separate-incompatible-garment': '함께 관리하기 어려운 옷을 나누기 위해', 'ask-adult-or-professional': '보호자·교사 또는 전문가에게 확인하기 위해', 'reduce-relative-resource-use': '상대 자원 사용을 줄이기 위해', }; function unique | learner-text-candidate | long-or-dense, multiple-conditions |
| src/features/revision/RevisionScreen.tsx:19:4 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:19:26 | text | 표시의 제한을 따르기 위해 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:20:38 | text | 재료나 장식을 보호하기 위해 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:21:37 | text | 함께 관리하기 어려운 옷을 나누기 위해 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:22:33 | text | 보호자·교사 또는 전문가에게 확인하기 위해 | learner-text-candidate | multiple-conditions, repeated-text |
| src/features/revision/RevisionScreen.tsx:23:36 | text | 상대 자원 사용을 줄이기 위해 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:45:125 | text | relatedSymbolIds) ?? []; return unique([...planIds, ...groupingIds]); } const riskLabels: Readonly | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:50:15 | text | 줄어듦 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:50:35 | text | 변형 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:50:57 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:51:25 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:51:49 | text | 열 손상 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:56:49 | text | 없음 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:60:66 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:61:49 | text | 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:65:45 | text | 선택한 위험 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:65:69 | text | 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:75:138 | text | void; } export function RevisionScreen({ mission, initialPlan, initialEvaluation, initialGroupingEvaluation, prediction, predictionFeedback, onSubmit }: RevisionScreenProps) { const [reasonId, setReasonId] = useState | button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:100:19 | text | 바꾼 단계와 근거 표시를 선택해 수정 계획을 만들어 주세요. | learner-text-candidate | multiple-actions |
| src/features/revision/RevisionScreen.tsx:104:19 | text | 옷 묶음도 실제로 바꾼 뒤 근거를 다시 확인해 주세요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:108:19 | text | 수정 이유를 하나 골라 주세요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:112:19 | text | 관련 표시 근거를 하나 이상 선택해 주세요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:117:19 | text | 처음 발견한 제한과 연결된 표시를 수정 근거로 골라 주세요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:125:19 | text | 수정 계획은 세탁·건조·다림질과 추가 제한을 모두 허용 범위로 완성해야 해요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:129:19 | text | 수정한 옷 묶음은 허용 범위로 완성해야 해요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:132:86 | text | 0 \|\| changedGrouping)) { setMessage('허용된 계획은 현재 계획 확인으로만 마무리할 수 있어요.'); return; } if (!canConfirmCurrent && reasonId === 'confirm-current-plan') { setMessage('아직 수정이 필요한 계획이에요. 계획을 바꾸고 근거를 확인해 주세요.'); return; } const evidence: RevisionEvidence = { reasonId, relatedSymbolIds, changedStages: changed }; onSubmit(plan, evaluation, groupingEvaluation, evidence); } return ( | button-or-action | long-or-dense, multiple-actions, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:133:19 | text | 허용된 계획은 현재 계획 확인으로만 마무리할 수 있어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:137:19 | text | 아직 수정이 필요한 계획이에요. 계획을 바꾸고 근거를 확인해 주세요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:145:84 | text | revision-title | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:147:18 | text | 여섯 번째 단계 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:148:16 | title | 관리 계획 수정 | title | repeated-text |
| src/features/revision/RevisionScreen.tsx:150:22 | text | 가상 결과는 가능성을 보여 줘요. 최초 계획과 발견을 근거로 필요한 부분만 다시 계획해요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:151:26 | text | 수정 이유와 근거를 고른 뒤 수정 계획을 확인해요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:152:9 | text | {predictionFeedback && | feedback-or-error | — |
| src/features/revision/RevisionScreen.tsx:153:88 | text | polite | feedback-or-error | repeated-text |
| src/features/revision/RevisionScreen.tsx:153:96 | text | 앞에서 확인한 예측: {predictionFeedback.message} | feedback-or-error | — |
| src/features/revision/RevisionScreen.tsx:155:64 | aria-label | 최초 계획과 비교 | aria-label | repeated-text |
| src/features/revision/RevisionScreen.tsx:156:13 | text | 최초 계획과 발견 | heading | — |
| src/features/revision/RevisionScreen.tsx:163:20 | text | 최초 평가 | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:163:34 | text | : {initialEvaluation.status === 'ready' ? '허용 범위' : '다시 살펴볼 부분이 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/revision/RevisionScreen.tsx:163:77 | text | 허용 범위 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:163:87 | text | 다시 살펴볼 부분이 있어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:166:23 | text | ${finding.stage}-${index} | feedback-or-error | repeated-text |
| src/features/revision/RevisionScreen.tsx:169:23 | text | ${finding.code}-${index} | feedback-or-error | repeated-text |
| src/features/revision/RevisionScreen.tsx:172:17 | text | {mission.requiresGrouping && initialPlan.grouping && ( | learner-text-candidate | long-or-dense |
| src/features/revision/RevisionScreen.tsx:175:59 | aria-label | 최초 그룹 배정 | aria-label | repeated-text |
| src/features/revision/RevisionScreen.tsx:176:15 | text | 최초 옷 묶음과 발견 | heading | — |
| src/features/revision/RevisionScreen.tsx:177:22 | text | 최초 묶음 평가 | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:177:39 | text | : {initialGroupingEvaluation?.status === 'ready' ? '허용 범위' : '나누어 살펴볼 부분이 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/revision/RevisionScreen.tsx:177:91 | text | 허용 범위 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:177:101 | text | 나누어 살펴볼 부분이 있어요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:178:58 | text | 함께 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:179:58 | text | 따로 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:180:22 | text | 최초 묶음 근거 | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:180:87 | text | 0 ? symbolNames(initialPlan.grouping.reasonSymbolIds) : '선택하지 않았어요.'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:182:16 | text | 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:184:22 | text | ${finding.code}-${index} | feedback-or-error | repeated-text |
| src/features/revision/RevisionScreen.tsx:189:59 | aria-label | 최초 예측 선택 | aria-label | repeated-text |
| src/features/revision/RevisionScreen.tsx:190:13 | text | 최초 예측 선택 | heading | repeated-text |
| src/features/revision/RevisionScreen.tsx:191:20 | text | 선택한 위험 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:191:35 | text | : {prediction ? selectedRiskNames(prediction.riskIds) : '선택하지 않았어요.'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:191:92 | text | 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:192:20 | text | 선택한 근거 표시 | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:192:38 | text | : {prediction ? symbolNames(prediction.reasonSymbolIds) : '선택하지 않았어요.'} | learner-text-candidate | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:192:97 | text | 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:196:17 | text | 수정 이유 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:196:31 | text | {(Object.entries(reasonLabels) as [Exclude | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:197:71 | text | confirm-current-plan | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:198:53 | text | revision-reason | input | repeated-text |
| src/features/revision/RevisionScreen.tsx:198:169 | text | ))} {canConfirmCurrent && ( | input | — |
| src/features/revision/RevisionScreen.tsx:201:44 | text | revision-reason | input | repeated-text |
| src/features/revision/RevisionScreen.tsx:201:84 | text | confirm-current-plan | input | repeated-text |
| src/features/revision/RevisionScreen.tsx:201:138 | text | confirm-current-plan | input | repeated-text |
| src/features/revision/RevisionScreen.tsx:201:185 | text | 현재 계획의 근거를 다시 확인하기 | input | repeated-text |
| src/features/revision/RevisionScreen.tsx:206:17 | text | 관련 표시 근거 | learner-text-candidate | repeated-text |
| src/features/revision/RevisionScreen.tsx:207:12 | text | 수정 이유와 연결되는 표시를 하나 이상 선택해요. | learner-text-candidate | — |
| src/features/revision/RevisionScreen.tsx:208:37 | text | { const symbol = careSymbolById.get(symbolId); if (!symbol) return null; return | input | long-or-dense, technical-or-internal |
| src/features/revision/RevisionScreen.tsx:211:151 | text | {symbol.name} 표시를 근거로 선택 | input | — |
| src/features/simulation/BeforeAfterComparison.tsx:18:8 | text | 크기·모양·열을 더 살펴볼 가능성이 있어요. | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:19:8 | text | 현재 가상 조건에서 눈에 띄는 변화가 두드러지지 않아요. | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:21:103 | text | ${stageLabel} 전후 비교 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:22:11 | text | {stageLabel} 전후 비교 | heading | — |
| src/features/simulation/BeforeAfterComparison.tsx:24:70 | text | {comparisonState === 'caution' ? '!' : '✓'} | learner-text-candidate | technical-or-internal |
| src/features/simulation/BeforeAfterComparison.tsx:28:60 | text | ${stageLabel} 변화 전 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:29:43 | text | 변화 전 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:30:76 | text | 가상 옷 ${stageLabel} 변화 전 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:35:60 | text | ${stageLabel} 변화 후 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:36:43 | text | 변화 후 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:37:109 | text | 가상 옷 ${stageLabel} 변화 후 | learner-text-candidate | — |
| src/features/simulation/BeforeAfterComparison.tsx:43:53 | text | 변화 가능성 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:14:59 | text | = { wash: '세탁', dry: '건조', iron: '다림질' }; const riskLabels: Readonly | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:14:71 | text | 세탁 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:14:82 | text | 건조 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:14:94 | text | 다림질 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:15:57 | text | = { shrinkage: '줄어듦', deformation: '변형', 'color-change': '색 변화', 'decoration-damage': '장식 손상', 'heat-damage': '열 손상', }; const levelLabels: Readonly | learner-text-candidate | long-or-dense, repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:16:15 | text | 줄어듦 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:16:35 | text | 변형 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:16:57 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:17:25 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:17:49 | text | 열 손상 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:19:59 | text | = { lower: '낮음', medium: '보통', higher: '높음' }; function unique | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:19:72 | text | 낮음 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:19:86 | text | 보통 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:19:100 | text | 높음 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:29:49 | text | 관련 표시를 다시 살펴봐요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:34:13 | text | 현재 가상 조건에서는 큰 변화가 두드러지지 않아요. 그래도 실제 라벨을 확인해요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:41:8 | text | 손상 가능성이 커질 수 있어요. ${risks.map((risk) => riskLabels[risk]).join(', ')} 가능성을 살펴봐요. | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:42:8 | text | 선택한 예측과 이 단계의 발견이 직접 연결되지 않았어요. 실제 라벨을 확인해요. | learner-text-candidate | multiple-actions |
| src/features/simulation/VirtualCareScreen.tsx:50:25 | text | void; } export function VirtualCareScreen({ mission, plan, evaluation, predictionFeedback, onStartRevision }: VirtualCareScreenProps) { return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/simulation/VirtualCareScreen.tsx:55:90 | text | virtual-care-title | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:55:128 | text | virtual-care-boundary | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:57:18 | text | 다섯 번째 단계 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:58:16 | title | 가상 결과 확인 | title | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:60:22 | text | 처음 세운 계획을 가상 재료 모형에 적용해 보고, 단계별 변화 가능성을 살펴봐요. | learner-text-candidate | abstract-or-formal |
| src/features/simulation/VirtualCareScreen.tsx:61:26 | text | 전후 비교를 읽고 계획 수정하기를 눌러요. | learner-text-candidate | multiple-actions |
| src/features/simulation/VirtualCareScreen.tsx:63:18 | text | 현재 미션 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:63:32 | text | : {mission.title} | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:64:40 | text | 결과는 가능성을 비교하는 학습 자료이며 실제 옷의 상태를 판정하지 않아요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:66:55 | aria-label | 결과 한눈에 보기 | aria-label | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:67:13 | text | 결과 한눈에 보기 | heading | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:74:25 | text | {stageLabels[stage]} | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:75:23 | text | {isAllowed ? '현재 조건을 그대로 비교해 봐요.' : '표시와 조건을 다시 살펴볼 필요가 있어요.'} | learner-text-candidate | long-or-dense, multiple-actions |
| src/features/simulation/VirtualCareScreen.tsx:75:37 | text | 현재 조건을 그대로 비교해 봐요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:75:60 | text | 표시와 조건을 다시 살펴볼 필요가 있어요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:82:54 | aria-label | 세탁·건조·다림질 순서 | aria-label | — |
| src/features/simulation/VirtualCareScreen.tsx:83:31 | text | { const optionId = plan.stageOptions[stage]; const option = optionId === null ? undefined : careOptionById.get(optionId); const finding = stageFinding(evaluation, stage); const related = finding?.relatedSymbolIds ?? []; const possibility = stage === 'wash' ? possibilityFor(finding, predictionFeedback) : possibilityFor(finding, predictionFeedback).replace('손상 가능성이 커질 수 있어요.', '단계별 변화 가능성을 살펴봐요.'); const isOutside = finding?.status === 'outside-limit' \|\| finding?.status === 'unread-restriction'; return ( | feedback-or-error | long-or-dense, technical-or-internal |
| src/features/simulation/VirtualCareScreen.tsx:90:68 | text | 손상 가능성이 커질 수 있어요. | feedback-or-error | — |
| src/features/simulation/VirtualCareScreen.tsx:90:89 | text | 단계별 변화 가능성을 살펴봐요. | feedback-or-error | — |
| src/features/simulation/VirtualCareScreen.tsx:94:42 | text | virtual-stage-${stage} | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:95:51 | text | {stageLabels[stage]} 단계 | heading | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:96:28 | text | 선택한 방법 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:96:43 | text | : {option ? careOptionTitle(option) : '아직 선택하지 않았어요.'} | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:96:82 | text | 아직 선택하지 않았어요. | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:97:28 | text | 관련 표시 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:99:27 | text | 발견 가능성 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:104:27 | text | 가상 옷의 처음 모습 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:105:39 | text | 조건 차이로 달라질 수 있는 모습 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:105:62 | text | 가상 옷의 모습을 그대로 비교하는 장면 | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:106:45 | text | 조건 차이에 따라 달라질 수 있어요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:106:70 | text | 실제 상태를 단정하지 않는 비교예요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:114:57 | aria-label | 상대 물·에너지 지표 | aria-label | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:115:13 | text | 상대 자원 지표 | heading | — |
| src/features/simulation/VirtualCareScreen.tsx:116:20 | text | 물 사용 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:116:33 | text | : {evaluation.waterUse ? levelLabels[evaluation.waterUse] : '계획을 완성하면 확인할 수 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:116:94 | text | 계획을 완성하면 확인할 수 있어요. | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:117:20 | text | 에너지 사용 | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:117:35 | text | : {evaluation.energyUse ? levelLabels[evaluation.energyUse] : '계획을 완성하면 확인할 수 있어요.'} | learner-text-candidate | long-or-dense |
| src/features/simulation/VirtualCareScreen.tsx:117:98 | text | 계획을 완성하면 확인할 수 있어요. | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:118:12 | text | 정확한 양이 아닌 가상 조건의 상대 비교예요. | learner-text-candidate | — |
| src/features/simulation/VirtualCareScreen.tsx:121:67 | text | 이 학습용 결과가 실제 옷의 상태를 보증하지 않아요. | learner-text-candidate | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:123:75 | text | required | button-or-action | repeated-text |
| src/features/simulation/VirtualCareScreen.tsx:123:111 | text | 계획 수정하기 | button-or-action | repeated-text |
| src/features/updates/UpdateHistoryButton.tsx:5:17 | text | void; buttonRef?: RefObject | learner-text-candidate | technical-or-internal |
| src/features/updates/UpdateHistoryButton.tsx:6:50 | text | ; } export function UpdateHistoryButton({ expanded, onClick, buttonRef }: UpdateHistoryButtonProps) { return ( | button-or-action | long-or-dense |
| src/features/updates/UpdateHistoryButton.tsx:19:6 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/features/updates/UpdateHistoryDialog.tsx:7:17 | text | void; triggerRef: RefObject | learner-text-candidate | technical-or-internal |
| src/features/updates/UpdateHistoryDialog.tsx:8:50 | text | ; } export function UpdateHistoryDialog({ open, onClose, triggerRef }: UpdateHistoryDialogProps) { return ( | learner-text-candidate | long-or-dense |
| src/features/updates/UpdateHistoryDialog.tsx:13:62 | title | 업데이트 내역 | title | repeated-text |
| src/main.tsx:13:20 | text | 앱을 표시할 root 요소를 찾을 수 없습니다. | feedback-or-error | — |
| src/test/app-flow.test.tsx:16:11 | text | Task 7 앱 시작 흐름 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:18:7 | text | 다섯 미션을 제목과 학습 초점이 함께 읽히는 버튼으로 보여 준다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:20:33 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:21:30 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:22:30 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:24:7 | text | 미션 선택은 구조 요청 화면을 보여 주고 요청에서 바로 건너뛰지 않는다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:27:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:28:30 | text | heading | heading | repeated-text |
| src/test/app-flow.test.tsx:33:30 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:33:48 | text | 표시 확대 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:34:32 | text | heading | heading | repeated-text |
| src/test/app-flow.test.tsx:36:7 | text | 표시 확대는 요청 화면을 건너뛰지 않고 magnifier 단계로 이동시킨다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:39:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:40:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:40:58 | text | 표시 확대 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:41:30 | text | heading | heading | repeated-text |
| src/test/app-flow.test.tsx:41:49 | text | 표시 확대경 | heading | repeated-text |
| src/test/app-flow.test.tsx:42:32 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:44:7 | text | 진행 표시는 7단계 순서와 현재 단계만 의미론적으로 알린다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:46:58 | text | 학습 진행 7단계 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:47:33 | text | 진행 목록이 없습니다. | feedback-or-error | — |
| src/test/app-flow.test.tsx:49:30 | text | 구조 요청 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:50:46 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:52:7 | text | 고대비는 wrapper의 앱 메모리 상태만 바꾸고 aria-pressed를 갱신한다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:52:67 | text | { const user = userEvent.setup(); render( | learner-text-candidate | — |
| src/test/app-flow.test.tsx:55:38 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:55:56 | text | 고대비 모드 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:65:7 | text | 대표 미래 단계의 렌더 헬퍼는 canonical 선행 상태를 만든다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:72:7 | text | completed-revision은 두 계획과 평가를 가진 report만 허용한다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:81:7 | text | 각 단계의 다음 행동 하나만 필수 행동으로 강조한다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:84:79 | text | 뜻 확인 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:89:78 | text | 수정 계획 확인 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:93:7 | text | 학생 화면에는 위험·표시·수정의 내부 ID를 노출하지 않는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:129:54 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:170:11 | text | Task 8 표시 확대경과 접근 가능한 뜻 해석 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:172:7 | text | 활성 표시 하나에 문자 설명과 표시 구분을 항상 함께 보여 준다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:174:33 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:174:51 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:176:33 | text | 30°C 약한 세탁 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:177:30 | text | 세탁 · 물세탁 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:178:30 | text | 학습용 아이콘 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:181:7 | text | 확대 버튼은 native 상태를 알리고 용어 도움은 정확한 용어를 제공한다 | hint | — |
| src/test/app-flow.test.tsx:184:38 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:184:56 | text | 표시 크게 보기 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:190:40 | text | 용어 도움 | hint | repeated-text |
| src/test/app-flow.test.tsx:192:26 | text | 옷을 덜 세게 다루는 방법 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:192:44 | text | 통이 빙글빙글 도는 건조 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:192:61 | text | 어른이나 전문가에게 먼저 물어보기 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:192:83 | text | 학습용 재료 모형 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:196:7 | text | native radio는 키보드로 고르고 오답 뒤 같은 카드 설명으로 돌아가 재시도할 수 있다 | feedback-or-error | — |
| src/test/app-flow.test.tsx:206:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:206:58 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:211:33 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:211:51 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:213:7 | text | 모든 고유 표시를 맞히기 전에는 계획으로 넘어가지 않고, 맞히면 계획으로 넘어간다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:218:30 | text | 표시 진행: 0/${expectedIds.length} | learner-text-candidate | technical-or-internal |
| src/test/app-flow.test.tsx:221:59 | text | id === symbol.correctMeaningOptionId)!.label; await user.click(screen.getByRole('radio', { name: label })); await user.click(screen.getByRole('button', { name: '뜻 확인' })); if (index | button-or-action | long-or-dense, technical-or-internal |
| src/test/app-flow.test.tsx:222:42 | text | radio | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:223:42 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:223:60 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:225:34 | text | 표시 진행: ${index + 1}/${expectedIds.length} | learner-text-candidate | technical-or-internal |
| src/test/app-flow.test.tsx:226:37 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:226:55 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:229:30 | text | heading | heading | repeated-text |
| src/test/app-flow.test.tsx:231:7 | text | 정답이 화면에 data-correct나 정답 ID로 새어 나오지 않는다 | feedback-or-error | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:236:7 | text | 중복 표시가 있는 미션도 고유 표시를 한 번씩만 묻는다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:242:30 | text | 표시 진행: 0/${uniqueCount} | learner-text-candidate | — |
| src/test/app-flow.test.tsx:243:33 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:243:51 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:245:7 | text | 표시 catalog가 빠지면 한국어 오류로 멈추고 조용히 건너뛰지 않는다 | feedback-or-error | — |
| src/test/app-flow.test.tsx:251:34 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:251:52 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:257:7 | text | 빈 accessibleDescription | learner-text-candidate | — |
| src/test/app-flow.test.tsx:258:7 | text | 중복 meaning options | learner-text-candidate | — |
| src/test/app-flow.test.tsx:262:7 | text | 공식 표시 provenance | learner-text-candidate | — |
| src/test/app-flow.test.tsx:263:7 | text | key/id 불일치 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:264:7 | text | 경로 traversal | learner-text-candidate | — |
| src/test/app-flow.test.tsx:266:7 | text | query 경로 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:267:7 | text | fragment 경로 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:268:7 | text | 변조한 %s catalog는 fail-closed 오류 화면으로 멈춘다 | feedback-or-error | — |
| src/test/app-flow.test.tsx:268:68 | text | { const symbolId = 'care-wash-30-gentle'; const original = careSymbolById.get(symbolId)! as CareSymbol; const symbolCatalog = careSymbolById as unknown as Map | feedback-or-error | long-or-dense, technical-or-internal |
| src/test/app-flow.test.tsx:282:7 | text | catalog 검증을 통과한 정상 Map은 기존 표시 경로로 렌더링된다 | learner-text-candidate | abstract-or-formal |
| src/test/app-flow.test.tsx:289:7 | text | title | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:332:7 | text | 변조한 %s mission은 fail-closed 오류 화면으로 멈춘다 | feedback-or-error | — |
| src/test/app-flow.test.tsx:332:68 | text | { const missionId = 'basic-t-shirt'; const missionCatalog = missionById as unknown as Map | feedback-or-error | long-or-dense, technical-or-internal |
| src/test/app-flow.test.tsx:341:34 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:341:52 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:346:7 | text | mission Map key와 mission.id가 다르면 표시 활동을 시작하지 않는다 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:359:7 | text | 빈 label | learner-text-candidate | — |
| src/test/app-flow.test.tsx:360:7 | text | 잘못된 requiresAdult | learner-text-candidate | — |
| src/test/app-flow.test.tsx:363:7 | text | option Map key-id 불일치 | learner-text-candidate | missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:364:7 | text | 변조한 %s option catalog는 확대경 진입을 fail-closed 한다 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:364:74 | text | { const optionId = 'plan-wash-gentle-30'; const original = careOptionById.get(optionId)! as CareOption; const optionCatalog = careOptionById as unknown as Map | learner-text-candidate | long-or-dense, technical-or-internal |
| src/test/app-flow.test.tsx:378:7 | text | SymbolFigure는 per-symbol review·provenance가 잘못되면 img를 렌더하지 않는다 | learner-text-candidate | long-or-dense |
| src/test/app-flow.test.tsx:380:116 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:383:110 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:386:92 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:389:84 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:392:95 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:395:93 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:398:91 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:401:92 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:404:100 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:407:124 | text | ); expect(screen.getByRole('alert')).toHaveTextContent(/표시 이미지를 안전하게 불러올 수 없어요/); expect(screen.queryByRole('img')).toBeNull(); rerender( | learner-text-candidate | long-or-dense, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:414:11 | text | Task 10 근거 기반 손상 예보 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:416:7 | text | asks for a possible outcome and a related label before showing feedback | feedback-or-error | long-or-dense |
| src/test/app-flow.test.tsx:421:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:421:58 | text | 손상 예보 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:426:11 | text | Task 11 가상 결과와 계획 수정 | learner-text-candidate | — |
| src/test/app-flow.test.tsx:437:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:437:58 | text | 계획 수정하기 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:438:30 | text | heading | heading | repeated-text |
| src/test/app-flow.test.tsx:438:49 | text | 관리 계획 수정 | heading | repeated-text |
| src/test/app-flow.test.tsx:439:48 | text | 최초 계획과 비교 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:441:7 | text | requires an actual change and label evidence after an outside-limit plan | learner-text-candidate | long-or-dense, missing-term-explanation, technical-or-internal |
| src/test/app-flow.test.tsx:448:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:448:58 | text | 수정 계획 확인 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:457:53 | text | 물 사용 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:458:53 | text | 에너지 사용 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:459:53 | text | 이 학습용 결과가 실제 옷의 상태를 보증하지 않아요. | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:464:48 | text | 최초 그룹 배정 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:465:48 | text | 최초 예측 선택 | learner-text-candidate | repeated-text |
| src/test/app-flow.test.tsx:466:30 | text | region | button-or-action | — |
| src/test/app-flow.test.tsx:466:48 | text | 최초 그룹 배정 | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:466:76 | text | [data-grouping-assignment="together"] | button-or-action | — |
| src/test/app-flow.test.tsx:466:163 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:466:220 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:466:236 | text | false | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:467:40 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:467:116 | text | checkbox | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:468:30 | text | button | button-or-action | repeated-text |
| src/test/app-flow.test.tsx:468:87 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/app-flow.test.tsx:468:103 | text | true | button-or-action | repeated-text |
| src/test/factories.ts:15:52 | text | 알 수 없는 미션 ID입니다: ${missionId} | feedback-or-error | technical-or-internal |
| src/test/factories.ts:56:22 | text | 혼합 미션은 세 벌의 가상 옷을 가져야 합니다. | feedback-or-error | — |
| src/test/forecast-flow.test.tsx:8:11 | text | Task 10 예보 접근성·자료 경계 | learner-text-candidate | — |
| src/test/forecast-flow.test.tsx:13:47 | text | 손상 가능성 | learner-text-candidate | repeated-text |
| src/test/forecast-flow.test.tsx:14:47 | text | 근거 표시 | learner-text-candidate | repeated-text |
| src/test/forecast-flow.test.tsx:26:34 | text | heading | heading | repeated-text |
| src/test/forecast-flow.test.tsx:26:53 | text | 손상 가능성 예보 | heading | repeated-text |
| src/test/forecast-flow.test.tsx:34:30 | text | button | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:34:48 | text | 손상 예보 확인 | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:34:79 | text | required-action | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:35:30 | text | button | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:35:48 | text | 가상 결과 보기 | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:35:75 | text | required-action | button-or-action | repeated-text |
| src/test/forecast-flow.test.tsx:36:46 | text | .forecast-feedback [role="status"] | feedback-or-error | — |
| src/test/forecast-flow.test.tsx:40:30 | text | 자세한 연결 결과 보기 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:6:11 | text | Task 9 접근 가능한 관리 순서판 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:9:7 | text | 필수 행동 두 개에만 gi-pulse를 적용한다 | learner-text-candidate | abstract-or-formal |
| src/test/plan-flow.test.tsx:11:107 | text | 표시 확대 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:14:107 | text | 관리 계획 확인 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:17:7 | text | 카드를 선택한 뒤 단계 버튼으로 배치하고 드래그 없이 현재 계획을 갱신한다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:20:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:21:46 | text | .stage-place-button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:22:48 | text | 현재 관리 계획 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:24:36 | text | .stage-place-button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:24:76 | text | aria-pressed | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/plan-flow.test.tsx:24:92 | text | true | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:27:7 | text | 요청 화면은 핵심 버튼을 안전 안내보다 먼저 보여 준다 | instruction | — |
| src/test/plan-flow.test.tsx:38:7 | text | 선택한 카드 아래에서 알맞은 단계 배치 행동을 바로 실행한다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:41:74 | text | 먼저 관리 방법 카드 하나를 골라 주세요 | hint | — |
| src/test/plan-flow.test.tsx:42:36 | text | .stage-place-button | button-or-action, hint | repeated-text |
| src/test/plan-flow.test.tsx:42:76 | text | aria-describedby | button-or-action, hint | missing-term-explanation, technical-or-internal |
| src/test/plan-flow.test.tsx:42:96 | text | wash-stage-help | button-or-action, hint | — |
| src/test/plan-flow.test.tsx:43:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:43:58 | text | 부드러운 30도 세탁 — 세탁 단계 카드 고르기 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:44:47 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:44:65 | text | 선택한 카드 세탁 단계에 놓기 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:48:48 | text | 현재 관리 계획 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:50:7 | text | 관리 단계 navigator가 현재 작업 단계와 완료 단계를 문자로 보여 준다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:53:30 | text | heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:53:49 | text | 관리 순서판 | heading | repeated-text |
| src/test/plan-flow.test.tsx:53:78 | text | data-step-heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:53:99 | text | true | heading | repeated-text |
| src/test/plan-flow.test.tsx:55:63 | text | 관리 단계 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:57:42 | text | 세탁 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:58:42 | text | 건조 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:59:42 | text | 다림질 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:60:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:60:58 | text | 건조 단계 보기 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:61:30 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:61:48 | text | 건조 단계 보기 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:61:79 | text | aria-current | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/plan-flow.test.tsx:61:95 | text | step | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:62:30 | text | 지금 살펴보는 단계: 건조 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:65:7 | text | 단계가 비어 있으면 가장 앞선 단계 제목으로 초점을 이동한다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:68:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:68:58 | text | 관리 계획 확인 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:69:30 | text | heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:69:49 | text | 세탁 단계 | heading | — |
| src/test/plan-flow.test.tsx:73:7 | text | 계획 제출은 모든 단계를 채우고 제한을 확인한 뒤 다음 단계로 이동한다 | learner-text-candidate | abstract-or-formal, multiple-actions |
| src/test/plan-flow.test.tsx:73:60 | text | { const user = userEvent.setup(); renderAppAtStep({ missionId: 'basic-t-shirt', step: 'plan' }); for (const [cardName, stageName] of [ ['부드러운 30도 세탁 — 세탁 단계 카드 고르기', '세탁 단계에 놓기'], ['낮은 열 회전 건조 비교하기 — 건조 단계 카드 고르기', '건조 단계에 놓기'], ['다림질하지 않는 조건 비교하기 — 다림질 단계 카드 고르기', '다림질 단계에 놓기'], ] as const) { await user.click(screen.getByRole('button', { name: cardName })); const stageButton = [...document.querySelectorAll | button-or-action | long-or-dense, multiple-actions, technical-or-internal |
| src/test/plan-flow.test.tsx:77:9 | text | 부드러운 30도 세탁 — 세탁 단계 카드 고르기 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:77:39 | text | 세탁 단계에 놓기 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:78:9 | text | 낮은 열 회전 건조 비교하기 — 건조 단계 카드 고르기 | learner-text-candidate | multiple-actions |
| src/test/plan-flow.test.tsx:78:43 | text | 건조 단계에 놓기 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:79:9 | text | 다림질하지 않는 조건 비교하기 — 다림질 단계 카드 고르기 | learner-text-candidate | multiple-actions |
| src/test/plan-flow.test.tsx:79:45 | text | 다림질 단계에 놓기 | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:81:42 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:82:77 | text | .stage-place-button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:87:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:87:58 | text | 관리 계획 확인 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:88:30 | text | heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:88:49 | text | 손상 가능성 예보 | heading | repeated-text |
| src/test/plan-flow.test.tsx:91:7 | text | 혼합 미션은 세 의류를 그룹에 배정하고 분리 근거 표시를 고르게 한다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:95:30 | text | heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:95:49 | text | 세 벌을 함께 또는 따로 관리하기 | heading | repeated-text |
| src/test/plan-flow.test.tsx:98:7 | text | E2E data hooks identify one symbol card, its option button, and reason checkbox | button-or-action | long-or-dense, missing-term-explanation, technical-or-internal |
| src/test/plan-flow.test.tsx:107:50 | text | [data-care-option-id="plan-wash-gentle-30"] | learner-text-candidate | technical-or-internal |
| src/test/plan-flow.test.tsx:108:41 | text | BUTTON | button-or-action | repeated-text, technical-or-internal |
| src/test/plan-flow.test.tsx:110:43 | text | aria-pressed | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/plan-flow.test.tsx:110:59 | text | true | learner-text-candidate | repeated-text |
| src/test/plan-flow.test.tsx:120:7 | text | 혼합 의류별 분리 관리 버튼은 의류 이름을 accessible name에 포함한다 | learner-text-candidate | — |
| src/test/plan-flow.test.tsx:122:52 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:124:75 | text | aria-label | button-or-action | missing-term-explanation, technical-or-internal |
| src/test/plan-flow.test.tsx:127:7 | text | 혼합 계획 제출은 canonical groupingEvaluation을 포함해 다음 단계로 이동한다 | learner-text-candidate | abstract-or-formal, long-or-dense |
| src/test/plan-flow.test.tsx:127:76 | text | { const user = userEvent.setup(); renderAppAtStep({ missionId: 'mixed-load', step: 'plan' }); await user.click(screen.getAllByRole('button', { name: /함께 관리 —/ })[0]!); await user.click(screen.getAllByRole('button', { name: /함께 관리 —/ })[1]!); await user.click(screen.getAllByRole('button', { name: /분리 관리 —/ })[2]!); await user.click(screen.getByRole('checkbox', { name: /전문 섬유 관리 확인 표시를 분리 근거로 선택/ })); for (const [cardName, stageName] of [ ['잠깐 멈추고 도움 요청하기 — 세탁 단계 카드 고르기', '세탁 단계에 놓기'], ['잠깐 멈추고 건조 도움 요청하기 — 건조 단계 카드 고르기', '건조 단계에 놓기'], ['다림질 판단을 멈추고 도움 요청하기 — 다림질 단계 카드 고르기', '다림질 단계에 놓기'], ] as const) { await user.click(screen.getByRole('button', { name: cardName })); const stageButton = [...document.querySelectorAll | button-or-action, hint | long-or-dense, multiple-actions, technical-or-internal |
| src/test/plan-flow.test.tsx:130:43 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:131:43 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:132:43 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:135:9 | text | 잠깐 멈추고 도움 요청하기 — 세탁 단계 카드 고르기 | hint | — |
| src/test/plan-flow.test.tsx:135:42 | text | 세탁 단계에 놓기 | hint | repeated-text |
| src/test/plan-flow.test.tsx:136:9 | text | 잠깐 멈추고 건조 도움 요청하기 — 건조 단계 카드 고르기 | hint | — |
| src/test/plan-flow.test.tsx:136:45 | text | 건조 단계에 놓기 | hint | repeated-text |
| src/test/plan-flow.test.tsx:137:9 | text | 다림질 판단을 멈추고 도움 요청하기 — 다림질 단계 카드 고르기 | hint | — |
| src/test/plan-flow.test.tsx:137:48 | text | 다림질 단계에 놓기 | hint | repeated-text |
| src/test/plan-flow.test.tsx:139:42 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:140:77 | text | .stage-place-button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:141:26 | text | button.textContent?.trim() === stageName); await user.click(stageButton as HTMLElement); } for (const checkbox of document.querySelectorAll | button-or-action, input | long-or-dense |
| src/test/plan-flow.test.tsx:147:40 | text | button | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:147:58 | text | 관리 계획 확인 | button-or-action | repeated-text |
| src/test/plan-flow.test.tsx:148:30 | text | heading | heading | repeated-text |
| src/test/plan-flow.test.tsx:148:49 | text | 손상 가능성 예보 | heading | repeated-text |
| src/test/plan-stage-filter.test.tsx:6:11 | text | 관리 단계별 카드 보기 | learner-text-candidate | — |
| src/test/plan-stage-filter.test.tsx:9:7 | text | 처음에는 세탁 카드만 보이고 단계 안내가 현재 단계와 맞는다 | instruction | — |
| src/test/plan-stage-filter.test.tsx:13:40 | text | 지금은 세탁 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요. | hint | — |
| src/test/plan-stage-filter.test.tsx:16:30 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:17:32 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:20:7 | text | navigator를 누르면 해당 단계 카드만 보여 준다 | learner-text-candidate | ambiguous-reference |
| src/test/plan-stage-filter.test.tsx:24:40 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:24:58 | text | 건조 단계 보기 | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:27:39 | text | 지금은 건조 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요. | hint | — |
| src/test/plan-stage-filter.test.tsx:30:30 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:31:32 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:33:40 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:33:58 | text | 다림질 단계 보기 | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:36:40 | text | 지금은 다림질 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요. | hint | — |
| src/test/plan-stage-filter.test.tsx:39:30 | text | button | button-or-action | repeated-text |
| src/test/plan-stage-filter.test.tsx:40:32 | text | button | button-or-action | repeated-text |
| src/test/redesign-flow.test.tsx:9:11 | text | 교육 리디자인의 단계 안내와 전환 | instruction | — |
| src/test/redesign-flow.test.tsx:12:7 | text | 첫 단계는 목적과 바로 할 일을 하나의 step intro로 묶는다 | learner-text-candidate | — |
| src/test/redesign-flow.test.tsx:16:38 | text | 첫 번째 단계 | learner-text-candidate | repeated-text |
| src/test/redesign-flow.test.tsx:17:38 | text | 이번에 할 일 | learner-text-candidate | — |
| src/test/redesign-flow.test.tsx:18:30 | text | heading | heading | repeated-text |
| src/test/redesign-flow.test.tsx:18:49 | text | 구조할 가상 옷을 골라 보세요 | heading | repeated-text |
| src/test/redesign-flow.test.tsx:18:88 | text | data-step-heading | heading | repeated-text |
| src/test/redesign-flow.test.tsx:18:109 | text | true | heading | repeated-text |
| src/test/redesign-flow.test.tsx:21:7 | text | 키보드 사용자가 반복 헤더를 건너뛸 본문 링크를 제공한다 | learner-text-candidate | — |
| src/test/redesign-flow.test.tsx:23:46 | text | 본문으로 건너뛰기 | learner-text-candidate | repeated-text |
| src/test/redesign-flow.test.tsx:27:7 | text | 정답을 확인하면 다음 표시 제목으로 초점을 옮긴다 | feedback-or-error | — |
| src/test/redesign-flow.test.tsx:40:55 | text | 기호 fixture가 없습니다. | feedback-or-error | — |
| src/test/redesign-flow.test.tsx:41:64 | text | id === firstSymbol.correctMeaningOptionId); if (!correct) throw new Error('첫 기호 정답이 없습니다.'); await user.click(screen.getByRole('radio', { name: correct.label })); await user.click(screen.getByRole('button', { name: '뜻 확인' })); const nextHeading = document.querySelector | heading, button-or-action, feedback-or-error | long-or-dense, technical-or-internal |
| src/test/redesign-flow.test.tsx:42:36 | text | 첫 기호 정답이 없습니다. | feedback-or-error | — |
| src/test/redesign-flow.test.tsx:43:40 | text | radio | learner-text-candidate | repeated-text |
| src/test/redesign-flow.test.tsx:44:40 | text | button | button-or-action | repeated-text |
| src/test/redesign-flow.test.tsx:44:58 | text | 뜻 확인 | button-or-action | repeated-text |
| src/test/redesign-flow.test.tsx:45:67 | text | (`#symbol-card-title-${nextSymbol.id}`); expect(nextHeading).not.toBeNull(); expect(nextHeading).toHaveFocus(); expect(scrollSpy).toHaveBeenCalled(); scrollSpy.mockRestore(); if (!originalScrollIntoView) delete (HTMLElement.prototype as Partial | heading | long-or-dense, technical-or-internal |
| src/test/redesign-flow.test.tsx:45:69 | text | #symbol-card-title-${nextSymbol.id} | heading | missing-term-explanation, technical-or-internal |
| src/test/renderApp.tsx:48:23 | text | 렌더할 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/renderApp.tsx:54:24 | text | 미션 표시 자료가 없어 렌더 선행 상태를 만들 수 없어요. | learner-text-candidate | — |
| src/test/renderApp.tsx:68:42 | text | 렌더할 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/renderApp.tsx:79:23 | text | 렌더할 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/renderApp.tsx:93:51 | text | 초기 평가가 없어 예측 선행 상태를 만들 수 없어요. | learner-text-candidate | — |
| src/test/renderApp.tsx:105:27 | text | 예측 근거 표시가 없어 렌더 선행 상태를 만들 수 없어요. | learner-text-candidate | — |
| src/test/renderApp.tsx:111:41 | text | SUBMIT_PREDICTION | button-or-action, feedback-or-error | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/renderApp.tsx:131:39 | text | relatedSymbolIds) ?? []; return unique([...planIds, ...groupingIds]); } export function buildLearnerSessionAtStep(input: RenderAppAtStepInput): LearnerSession { if (!input \|\| typeof input !== 'object' \|\| !missionById.has(input.missionId)) { fail('렌더할 미션 ID가 올바르지 않아요.'); } if (!sessionSteps.includes(input.step)) fail('렌더할 학습 단계가 올바르지 않아요.'); const scenario = input.scenario ?? 'within-limits'; if (!['within-limits', 'outside-limits', 'completed-revision'].includes(scenario)) { fail('렌더 시나리오가 올바르지 않아요.'); } if (scenario === 'completed-revision' && input.step !== 'report') { fail('completed-revision 시나리오는 report 단계에서만 사용할 수 있어요.'); } const initialScenario = scenario === 'within-limits' ? 'within-limits' : 'outside-limits'; let state = sessionReducer(initialLearnerSession, { type: 'SELECT_MISSION', missionId: input.missionId }); if (input.step === 'request') return state; state = advanceToMagnifier(input.missionId); if (input.step === 'magnifier') return state; state = advanceToPlan(input.missionId); const submitted = submitInitialPlan(state, input.missionId, initialScenario); state = submitted.state; if (input.step === 'plan') { // The reducer owns the plan transition, so restore the canonical predecessor for the plan screen. state = advanceToPlan(input.missionId); return state; } state = submitPrediction(state, input.missionId); if (input.step === 'forecast') return state; state = sessionReducer(state, { type: 'SHOW_SIMULATION' }); if (input.step === 'simulation') return state; state = sessionReducer(state, { type: 'START_REVISION' }); if (input.step === 'revision') return state; const mission = missionById.get(input.missionId); if (!mission \|\| !state.initialEvaluation) fail('report 선행 자료가 올바르지 않아요.'); const initialPlan = submitted.plan; const revisedPlan = scenario === 'within-limits' ? initialPlan : makePlanFixture(input.missionId, 'within-limits'); const revisedEvaluation = evaluatePlan({ mission, plan: revisedPlan, symbols: careSymbolById, options: careOptionById }); const revisedGroupingEvaluation = canonicalGrouping(input.missionId, revisedPlan); const relatedSymbolIds = nonAllowedEvidence(state); const fallbackSymbolId = mission.garments[0]?.symbolIds[0]; if (!fallbackSymbolId) fail('report 근거 표시가 없어 렌더할 수 없어요.'); const revisedGroupingChanged = groupingChanged(initialPlan, revisedPlan); const changedStages = changedStagesBetween(initialPlan, revisedPlan); let evidence; if (scenario === 'within-limits') { evidence = { reasonId: 'confirm-current-plan' as const, relatedSymbolIds: [fallbackSymbolId], changedStages: [] as const }; } else { if (relatedSymbolIds.length === 0) fail('report 근거 표시가 없어 렌더할 수 없어요.'); evidence = { reasonId: revisedGroupingChanged ? 'separate-incompatible-garment' as const : 'follow-label-limit' as const, relatedSymbolIds, changedStages, }; } if (input.missionId === 'mixed-load' && revisedGroupingChanged && !evidence.relatedSymbolIds.includes('care-professional')) { fail('혼합 미션의 분리 근거 표시가 canonical 평가에 없어요.'); } state = sessionReducer(state, { type: 'SUBMIT_REVISION', plan: revisedPlan, evaluation: revisedEvaluation, groupingEvaluation: revisedGroupingEvaluation, evidence, }); return state; } export function renderAppAtStep(input: RenderAppAtStepInput): RenderResult { return renderWithState(buildLearnerSessionAtStep(input)); } function renderWithState(state: LearnerSession): RenderResult { const element: ReactElement = ( | button-or-action, input | long-or-dense, technical-or-internal |
| src/test/renderApp.tsx:137:11 | text | 렌더할 미션 ID가 올바르지 않아요. | learner-text-candidate | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/renderApp.tsx:139:49 | text | 렌더할 학습 단계가 올바르지 않아요. | input | — |
| src/test/renderApp.tsx:142:11 | text | 렌더 시나리오가 올바르지 않아요. | learner-text-candidate | — |
| src/test/renderApp.tsx:145:11 | text | completed-revision 시나리오는 report 단계에서만 사용할 수 있어요. | learner-text-candidate | — |
| src/test/renderApp.tsx:171:51 | text | report 선행 자료가 올바르지 않아요. | learner-text-candidate | — |
| src/test/renderApp.tsx:178:32 | text | report 근거 표시가 없어 렌더할 수 없어요. | learner-text-candidate | repeated-text |
| src/test/renderApp.tsx:185:46 | text | report 근거 표시가 없어 렌더할 수 없어요. | learner-text-candidate | repeated-text |
| src/test/renderApp.tsx:187:43 | text | separate-incompatible-garment | learner-text-candidate | repeated-text |
| src/test/renderApp.tsx:187:86 | text | follow-label-limit | learner-text-candidate | repeated-text |
| src/test/renderApp.tsx:193:11 | text | 혼합 미션의 분리 근거 표시가 canonical 평가에 없어요. | learner-text-candidate | — |
| src/test/report-flow.test.tsx:12:11 | text | Task 12 구조 보고서와 업데이트 내역 | learner-text-candidate | — |
| src/test/report-flow.test.tsx:17:30 | text | heading | heading | repeated-text |
| src/test/report-flow.test.tsx:17:49 | text | 구조 보고서 | heading | repeated-text |
| src/test/report-flow.test.tsx:18:48 | text | 최초 계획 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:19:48 | text | 수정 계획 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:20:48 | text | 안전한 관리와 도움 요청 | hint | repeated-text |
| src/test/report-flow.test.tsx:26:7 | text | opens update history and returns focus to its small button | button-or-action | long-or-dense |
| src/test/report-flow.test.tsx:29:38 | text | button | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:29:56 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:30:37 | text | aria-expanded | button-or-action | missing-term-explanation, technical-or-internal |
| src/test/report-flow.test.tsx:30:54 | text | false | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:32:48 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:33:30 | text | button | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:33:48 | text | 닫기 | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:35:50 | text | 업데이트 내역 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:41:38 | text | button | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:41:56 | text | 업데이트 내역 | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:42:37 | text | data-placement | button-or-action | — |
| src/test/report-flow.test.tsx:42:55 | text | bottom-right | button-or-action | — |
| src/test/report-flow.test.tsx:43:33 | text | update-history-button | button-or-action | — |
| src/test/report-flow.test.tsx:44:28 | text | footer | button-or-action | — |
| src/test/report-flow.test.tsx:44:51 | text | app-footer | button-or-action | — |
| src/test/report-flow.test.tsx:50:30 | text | heading | heading | repeated-text |
| src/test/report-flow.test.tsx:50:49 | text | 구조 미션을 끝냈어요! | heading | repeated-text |
| src/test/report-flow.test.tsx:52:30 | text | 출처와 검수일 보기 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:53:40 | text | button | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:53:58 | text | 다른 미션 해보기 | button-or-action | repeated-text |
| src/test/report-flow.test.tsx:54:30 | text | heading | heading | repeated-text |
| src/test/report-flow.test.tsx:54:49 | text | 구조할 가상 옷을 골라 보세요 | heading | repeated-text |
| src/test/report-flow.test.tsx:55:30 | text | heading | heading | repeated-text |
| src/test/report-flow.test.tsx:55:49 | text | 구조할 가상 옷을 골라 보세요 | heading | repeated-text |
| src/test/report-flow.test.tsx:57:7 | text | 보고서 상단에서 배운 점과 다음 행동을 먼저 보여 준다 | learner-text-candidate | — |
| src/test/report-flow.test.tsx:59:60 | text | 다음 행동 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:60:43 | text | 배운 점 | learner-text-candidate | — |
| src/test/report-flow.test.tsx:61:43 | text | 다른 미션 해보기 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:71:52 | text | riskId !== 'heat-damage'), })), }; const reasonSymbolId = state.prediction!.reasonSymbolIds[0]!; const selection = { riskIds: ['heat-damage'] as const, reasonSymbolIds: [reasonSymbolId] as const }; const feedback = evaluatePrediction({ evaluation: evaluationWithoutHeat, selection }); const result = render( | feedback-or-error | long-or-dense, technical-or-internal |
| src/test/report-flow.test.tsx:82:60 | text | 예측한 손상 가능성과 관련 표시 | learner-text-candidate | repeated-text |
| src/test/report-flow.test.tsx:84:109 | text | 예측한 가능성(평가가 연결된 위험) | learner-text-candidate | repeated-text |
| src/test/revision-flow.test.tsx:6:11 | text | 수정 계획의 단계별 카드 흐름 | learner-text-candidate | — |
| src/test/revision-flow.test.tsx:9:7 | text | 세탁 카드를 놓으면 건조, 건조 카드를 놓으면 다림질로 이동한다 | learner-text-candidate | — |
| src/test/revision-flow.test.tsx:13:40 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:14:40 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:14:58 | text | 선택한 카드 세탁 단계에 놓기 | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:15:30 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:15:48 | text | 건조 단계 보기 | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:15:79 | text | aria-current | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/revision-flow.test.tsx:15:95 | text | step | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:16:30 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:17:32 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:19:40 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:20:40 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:20:58 | text | 선택한 카드 건조 단계에 놓기 | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:21:30 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:21:48 | text | 다림질 단계 보기 | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:21:80 | text | aria-current | button-or-action | missing-term-explanation, repeated-text, technical-or-internal |
| src/test/revision-flow.test.tsx:21:96 | text | step | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:22:30 | text | button | button-or-action | repeated-text |
| src/test/revision-flow.test.tsx:23:32 | text | button | button-or-action | repeated-text |
| src/test/simulation-flow.test.tsx:7:11 | text | Task 11 단계별 가상 가능성 | learner-text-candidate | — |
| src/test/simulation-flow.test.tsx:8:7 | text | 가상 결과 상단에서 세 단계의 상태를 한눈에 요약한다 | learner-text-candidate | — |
| src/test/simulation-flow.test.tsx:10:48 | text | 결과 한눈에 보기 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:10:82 | text | 세탁 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:11:48 | text | 결과 한눈에 보기 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:26:37 | text | 줄어듦 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:27:41 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:28:36 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:29:40 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:30:37 | text | 장식 손상 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:31:41 | text | 색 변화 | learner-text-candidate | repeated-text |
| src/test/simulation-flow.test.tsx:35:7 | text | labels allowed and caution comparisons without claiming real damage | learner-text-candidate | long-or-dense |
| src/test/simulation-flow.test.tsx:37:31 | text | button | button-or-action | repeated-text |
| src/test/simulation-flow.test.tsx:37:49 | text | 계획 수정하기 | button-or-action | repeated-text |
| src/test/simulation-flow.test.tsx:37:75 | text | required-action | button-or-action | repeated-text |
| src/test/simulation-flow.test.tsx:39:54 | text | 눈에 띄는 변화가 두드러지지 않아요 | learner-text-candidate | — |
| src/test/simulation-flow.test.tsx:44:54 | text | 크기·모양·열을 더 살펴볼 가능성이 있어요 | learner-text-candidate | — |

## Limitations

- Candidates are triage signals, not an automatic grade-level or readability certification.
- Static scanning can miss runtime-composed text, fetched content, canvas/image text, and some template syntax.
- Every candidate requires rendered-state, target-grade, learning-intent, and curriculum-accuracy review.
- This command reads source files and writes only the optional report path; it never rewrites source files.

## Configuration

- Extensions: `.astro, .cjs, .htm, .html, .js, .jsx, .mjs, .svelte, .ts, .tsx, .vue`
- Excluded directories: `.agents, .codex, .git, .next, .nuxt, .parcel-cache, .playwright-mcp, .superpowers, .turbo, .vite, build, coverage, dist, node_modules, out, playwright-report, target, test-results, vendor, work`
