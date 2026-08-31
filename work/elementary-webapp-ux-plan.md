# Elementary Web App UX Improvement Plan

## Scope and goal

- 실행 모드: `full`
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/laundry-symbol-rescue-team`
- 대상 학습자: 초등학교 5~6학년 서윤(주 페르소나), 초등 3~4학년 준호(가드레일)
- 목표: 세탁 표시를 읽고 관리 순서를 세우는 핵심 학습 규칙은 보존하면서, 오답 회복 단서를 정확하게 만들고 375px 이하에서 계획 카드 벽을 단계별 작업으로 줄입니다.
- 보존 경계: 5개 미션, 검수된 8개 factual SVG, `evaluate*` 판정 함수와 reducer 전이, 실제 라벨 우선·학생 혼자 기기 조작 금지·메모리 전용 개인정보 경계를 변경하지 않습니다.
- 이번 실행에서 커밋·푸시·GitHub Pages 배포·HVC 등록·새 패키지 설치·VoiceOver 검증은 하지 않습니다.

## Baseline evidence

2026-08-31 로컬 `http://127.0.0.1:5178/` Playwright MCP에서 375×812와 320×800을 확인했습니다.

1. 첫 미션 선택과 `표시 확대`는 첫 viewport에서 찾고 실행할 수 있습니다.
2. 잘못된 `40°C의 보통 과정으로 세탁하기`를 제출하면 30°C 표시에서 `기호 옆 설명에서 온도와 줄 표시를 다시 찾아보세요.`가 나옵니다. 다음 `표백 금지` 표시에서도 같은 문장이 나와 삼각형 안 엑스라는 현재 단서와 맞지 않습니다. 오답임을 직접 말하지 않아 회복 행동도 약합니다.
3. 375px에서 관리 순서판은 약 4,484px, 계획 수정 화면은 약 5,873px 높이이며 세탁·건조·다림질 카드가 한꺼번에 렌더링됩니다. 필수 CTA가 카드 벽과 안전 안내 뒤에 있어 현재 단계 단서를 반복해서 찾아야 합니다.
4. 빈 뜻 제출은 `뜻 후보를 하나 골라 주세요.`를 상태 영역에 표시하고 버튼 초점을 유지합니다. 위험 예보 빈 제출도 `손상 가능성을 하나 이상 골라 주세요.`를 표시합니다.
5. 단계 전환 제목은 focus/scroll 되고, 320px에서 progress strip만 의도적으로 가로 이동합니다. 고대비·reduced-motion·업데이트 내역·안전 문장은 기존 리디자인에서 유지되고 있습니다.
6. `npm run test:e2e`는 이전 두 번의 macOS Chromium 권한 오류로 중단되어 이 실행에서 같은 실패를 반복하지 않습니다. 자동 E2E는 CI 또는 권한이 정상인 Chromium에서 후속 확인합니다.

## Prioritized findings

### EDU-UX-001 — P1: 오답 단서가 현재 표시와 맞지 않고 오답 상태가 모호함

- 상태/경로: `/` → 첫 미션 → `표시 확대` → 임의 오답 → `뜻 확인`
- 근거: 실제 상태에서 `care-no-bleach` 카드가 `온도와 줄 표시`를 다시 보라고 안내합니다. 이 표시의 학습 단서는 삼각형 안 엑스입니다.
- 학습 영향: 학습자가 다음에 볼 모양을 잘못 찾고, 왜 다시 선택해야 하는지 모를 수 있습니다. 기호 해석이라는 핵심 목표와 오답 회복이 흔들립니다.
- 변경: `src/content/learnerCopy.ts`에 8개 표시 ID별 모양 단서와 공통 재시도 문장을 둡니다. `src/domain/evaluateInterpretation.ts`는 `CareSymbolId`로 해당 단서를 선택하고 `아직 맞지 않아요.`와 `다른 뜻을 골라 보세요.`를 포함한 `returnPrompt`를 반환합니다.
- 안전/정확성: 단서는 SVG와 `accessibleDescription`의 모양만 요약하고 정답 선택지나 실제 제품 안전을 확정하지 않습니다.
- 수용 기준: 8개 표시 각각의 오답 피드백이 현재 표시의 숫자·선·점·모양 단서를 포함하고, `온도와 줄` 같은 다른 표시 전용 표현을 잘못 포함하지 않으며, 상태 영역이 회복 행동을 말합니다.

### EDU-UX-002 — P2: 계획 카드 벽이 초등 학습자의 현재 작업을 가림

- 상태/경로: `/` → 첫 미션 → 표시 3개 해석 → 관리 순서판 또는 계획 수정
- 근거: 375px snapshot에서 12개 카드가 모두 노출되고 계획 수정 CTA가 5,966px 부근에 있습니다.
- 학습 영향: 단계별 선택을 기억하기 어렵고, 선택한 카드와 놓을 단계를 연결하려면 긴 스크롤을 반복합니다. 학습을 막지는 않지만 포기·교사 도움을 늘릴 가능성이 큽니다.
- 변경: `src/features/plan/ManagementBoardScreen.tsx`가 `activeStage`에 맞는 카드만 `CareOptionCard`로 렌더링합니다. `PlanStageNavigator` 위에 `지금은 {stage} 카드만 보여요. 다른 단계는 위 버튼으로 바꿔요.`를 표시하고, 초기 모드는 다음 비어 있는 단계로 자동 이동하며 수정 모드는 세탁→건조→다림질 순서로 이동합니다.
- 보존: 선택한 단계 값·추가 제한·혼합 의류 그룹·판정 함수는 그대로 유지하며, 단계 버튼으로 모든 카드에 접근할 수 있게 합니다.
- 수용 기준: 한 시점의 `.care-option-grid`에는 현재 단계 카드만 보이고, 세 단계 navigator를 눌러 각 단계의 카드와 선택 버튼을 사용할 수 있으며, 계획 제출과 수정 제출이 같은 판정 결과를 냅니다.

### EDU-UX-003 — P2: 단계별 작업 문장이 카드 필터 상태를 설명해야 함

- 상태/경로: 관리 순서판·계획 수정의 카드 영역
- 근거: 기존 `관리 방법 카드 고르기`만으로는 navigator를 누른 뒤 왜 카드 수가 바뀌었는지 설명하지 않습니다.
- 변경: `src/features/plan/ManagementBoardScreen.tsx`에 현재 단계 안내 문장과 표시 카드 수를 포함한 `stage-option-hint`를 추가합니다.
- 수용 기준: 안내 문장이 현재 단계와 일치하고 내부 ID를 노출하지 않으며, 320px·375px에서 잘리지 않습니다.

## Architecture and interfaces

```text
learnerCopy.interpretationRetryHints
          ↓
evaluateInterpretation({ symbol, selectedMeaningOptionId })
          ↓
CareSymbolCard role=status feedback + focus recovery

ManagementBoardScreen.activeStage
          ↓
careOptions.filter(option.stage === activeStage)
          ↓
PlanStageNavigator → CareOptionCard → placeOption → CurrentPlanSummary
```

- `interpretationRetryHints: Readonly<Record<CareSymbolId, string>>`: 표시별 관찰 단서만 저장합니다.
- `evaluateInterpretation(...): InterpretationFeedback`: 기존 반환 타입과 정답 판정은 유지하고 오답 `returnPrompt`만 표시별로 정확하게 만듭니다.
- `ManagementBoardScreen`: `activeStage: PlanningStage`와 `visibleCareOptions: readonly CareOption[]`를 사용합니다. `mode === 'initial'`은 다음 빈 단계를, `mode === 'revision'`은 다음 순서 단계를 활성화합니다.
- `CareOptionCardProps`와 `PlanStageNavigatorProps`는 변경하지 않습니다. `data-care-option-id`는 실제 선택 버튼에만 남깁니다.

## Work sequence (TDD)

### Step 1 — 오답 피드백 회귀 테스트를 먼저 추가

**Files**

- `src/domain/evaluateInterpretation.test.ts`
- `src/content/learnerCopy.test.ts` (새 파일)

**Red tests**

- `care-no-bleach` 오답 결과가 `아직 맞지 않아요`, `삼각형`, `엑스`, `다른 뜻`을 포함하고 `온도와 줄`을 포함하지 않는지 검증합니다.
- 모든 `CareSymbolId`가 비어 있지 않은 모양 단서를 갖는지 검증합니다.

**Minimum implementation**

- `src/content/learnerCopy.ts`에 표시 ID별 단서를 추가하고 `src/domain/evaluateInterpretation.ts`에서 사용합니다.

**Green tests**

- `npm test -- src/domain/evaluateInterpretation.test.ts src/content/learnerCopy.test.ts`
- 기존 `src/test/app-flow.test.tsx`, `src/test/redesign-flow.test.tsx`의 magnifier 회귀도 통과합니다.

### Step 2 — 단계별 카드 필터의 실패 테스트 추가

**Files**

- `src/test/plan-flow.test.tsx`
- `src/test/revision-flow.test.tsx` (새 파일, 수정 모드 전용)

**Red tests**

- 초기 관리 순서판에서 기본 활성 단계가 세탁이고 세탁 옵션만 표시되는지 검증합니다.
- `건조 단계 보기`, `다림질 단계 보기`를 누르면 해당 단계 옵션만 표시되고 `stage-option-hint`가 현재 단계와 일치하는지 검증합니다.
- 수정 모드에서 세탁 카드 배치 후 건조, 건조 카드 배치 후 다림질로 이동하는지 검증합니다.

**Minimum implementation**

- `ManagementBoardScreen.tsx`에서 `visibleCareOptions`를 계산하고 안내 문장을 렌더링합니다.
- `placeOption`의 `activeStage` 전이 규칙을 초기·수정 모드로 나눕니다.

**Green tests**

- `npm test -- src/test/plan-flow.test.tsx src/test/revision-flow.test.tsx`
- `src/domain/evaluatePlan.test.ts`, `src/domain/sessionReducer.test.ts`를 함께 통과시킵니다.

### Step 3 — 브라우저 계약과 안전 경계 테스트 갱신

**Files**

- `e2e/learner-flow.spec.ts`
- `e2e/accessibility.spec.ts`
- `e2e/safety-boundaries.spec.ts`
- `e2e/responsive.spec.ts`

**Changes**

- 각 계획 option을 고르기 전에 해당 `세탁/건조/다림질 단계 보기`를 눌러 현재 카드 영역을 엽니다.
- 첫 오답에서 `[role="status"]`가 표시별 단서와 회복 동사를 포함하는지 계약을 추가합니다.
- 320px·375px에서 현재 카드 영역의 가시성과 필수 CTA 경계를 확인하고, progress strip 외 horizontal overflow는 허용하지 않습니다.

### Step 4 — 업데이트 기록과 문서 정리

**Files**

- `src/content/updateHistory.ts`
- `src/content/updateHistory.test.ts`
- `work/elementary-webapp-ux-language-audit.md`
- `work/elementary-webapp-ux-simulation-decision.md`

- 실제 코드 변경 날짜 `2026-08-31`과 `표시별 오답 단서·단계별 카드 보기` 요약을 업데이트 내역에 추가합니다.
- 학생용 문구 장부에 before/after, 학년, 의미 보존, 브라우저 검증 상태를 기록합니다.
- 시뮬레이션은 `not-needed`로 기록합니다. 현재 가상 결과는 결정적 DOM/CSS 전후 비교이며 새로운 변수 조작이 정적 표시 해석보다 학습을 더 명확하게 만들지 않습니다. `pause`·`step`은 시간 변화 모델이 아니므로 N/A입니다.

### Step 5 — 통합 검증

- `npm run check`: lint, typecheck, Vitest, build, Pages asset smoke가 모두 0 exit code여야 합니다.
- `git diff --check`: 공백 오류가 없어야 합니다.
- `find src -type f ... | xargs wc -l`: 모든 소스 파일이 500줄 미만이어야 합니다.
- Impeccable detector는 최종 UI 변경 후 한 번만 실행하고, 결과를 보고서에 기록합니다.
- Playwright MCP로 320×800, 375×812, 1280×900에서 같은 첫 미션을 재생합니다. 320/375에서는 카드 단계 전환·오답 회복·보고서까지, 1280에서는 업데이트 dialog·고대비를 확인합니다.
- 로컬 CLI Chromium E2E는 기존 macOS 권한 오류를 반복하지 않고 `blocked`로 남깁니다. CI Ubuntu 또는 권한이 정상인 Chromium의 `npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts e2e/learner-flow.spec.ts e2e/safety-boundaries.spec.ts`가 후속 게이트입니다.

## Rollback

- 오답 문구 문제만 남으면 `src/content/learnerCopy.ts`, `src/content/learnerCopy.test.ts`, `src/domain/evaluateInterpretation.ts`, `src/domain/evaluateInterpretation.test.ts`의 변경만 되돌립니다.
- 카드 필터가 계획 판정을 바꾸면 `ManagementBoardScreen.tsx`와 관련 테스트 변경만 되돌리고 기존 전체 카드 렌더링을 복원합니다.
- factual SVG와 reducer/evaluator 파일은 롤백 대상에 포함하지 않습니다.

## Completion gate

- P0 0개, 해결되지 않은 P1 0개입니다.
- 계획·수정 화면에서 모든 단계 카드가 navigator로 접근 가능하고 핵심 CTA가 동작합니다.
- 표시별 오답 단서는 현재 SVG 모양과 일치하며 학생이 다시 볼 대상과 다음 행동을 알 수 있습니다.
- 320px·375px에서 가로 잘림 없이 카드 단계·오답 회복·보고서 다음 행동이 확인됩니다.
- `gi-pulse`는 필수 CTA에만 남고 `prefers-reduced-motion`에서 애니메이션 없이 배지·테두리·문장 상태가 남습니다.
- 업데이트 내역에 2026-08-31 기록이 보입니다.
- 이미지 생성은 `verified-asset-preserve`로 결정하고 새 이미지를 추가하지 않습니다.
- VoiceOver는 범위에서 제외하며 키보드·ARIA·axe 증거만 보고합니다.

## Execution status (2026-08-31)

- [x] EDU-UX-001 표시별 오답 단서와 회복 행동 구현 및 회귀 테스트
- [x] EDU-UX-002·003 현재 단계 카드 필터·안내 문장 구현 및 초기/수정 모드 테스트
- [x] 계획·수정 E2E locator를 stage navigator 계약에 맞게 갱신
- [x] 업데이트 내역·문구 장부·시뮬레이션 결정 문서 작성
- [x] `npm run check`, `git diff --check`, 500줄 제한, Impeccable detector 확인
- [ ] CI Ubuntu 또는 권한이 정상인 Chromium에서 전체 Playwright E2E 실행
- [ ] 실제 학생·교사·Safari 수동 확인
