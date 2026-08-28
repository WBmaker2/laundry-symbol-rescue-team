# Laundry Symbol Rescue Team Improvement Plan

## Goal

초등학생이 첫 화면에서 다음 행동을 바로 찾고, 화면이 바뀌어도 길을 잃지 않으며, 세탁 표시와 관리 조건의 연결을 쉬운 말로 설명할 수 있도록 공개 앱의 학습 흐름을 개선한다. 기존의 가상 학습·안전·개인정보 경계를 유지하면서 다음 문제를 해결한다.

1. 단계 전환 뒤 포커스와 스크롤이 새 화면의 제목으로 이동한다.
2. 핵심 행동 버튼이 긴 안전 안내 아래로 밀리지 않는다.
3. 관리 순서판에서 선택 카드와 단계 배치 행동이 한 화면 흐름으로 연결된다.
4. 오답·예보·수정 피드백이 어린이가 다시 볼 위치와 이유를 알려 준다.
5. 모바일 진행 표시, 한국어 줄바꿈, `gi-pulse` 강조가 일관된다.
6. 보고서가 학습 완료를 보여 주고 새 미션으로 돌아갈 수 있다.

## Scope and constraints

- 대상은 현재 React/Vite 정적 앱과 5개 미션의 첫 학습 흐름이다.
- 학생 데이터 저장, 로그인, 분석 추적, 외부 API, 새로운 런타임 의존성은 추가하지 않는다.
- 실제 의류 관리 지시나 손상 보증으로 문구를 확장하지 않는다.
- 실제 다리미·뜨거운 물·표백제·세탁기 조작 금지와 제품 라벨 우선 안내를 모든 관련 화면에서 유지한다.
- 학생 화면에서는 기계용 ID와 enum 값을 노출하지 않는다.
- 단일 소스 파일은 500줄 미만으로 유지한다. 450줄에 가까워지는 테스트·콘텐츠 파일은 기능별 파일로 분리한다.
- VoiceOver 구현과 검증은 이 개선 범위에서 제외한다. 키보드, 명시적 ARIA 이름·상태, reduced-motion, 모바일 viewport 검증은 포함한다.
- 이 문서의 명령은 구현·검증 단계에서 실행할 명령이며, 계획 작성 단계에서는 실행하지 않는다.

## Current evidence to address

- 공개 Pages의 첫 미션은 Chromium에서 보고서까지 완료되지만, 현재 화면 전환 뒤 `document.activeElement`가 `BODY`에 남고 이전 스크롤 위치가 유지된다.
- 375×812에서 구조 요청의 `표시 확대` 버튼은 문서 좌표 약 1241px에 있어 첫 viewport에 보이지 않는다. 1280×800에서도 버튼이 약 804px에 있다.
- 320px에서 진행 목록의 실제 폭은 약 614px, 표시 영역은 약 304px이다.
- 320px 제목에서 `보세요`가 `보세`와 `요`로 끊긴다.
- 관리 순서판의 단계 버튼이 카드 목록 위에 있어 카드 선택 후 위로 되돌아가야 한다.
- 예보 피드백은 `0/1`, `0개` 중심이고, 보고서는 5000px 이상으로 길며 마지막에 다음 행동 버튼이 없다.
- 새로고침 시 `https://wbmaker2.github.io/laundry-symbol-rescue-team/favicon.ico`가 404로 요청된다.

## Architecture

### Existing boundaries to preserve

- `src/app/AppShell.tsx`: `SessionStep`에 따라 화면을 교체하는 셸과 전역 고대비·업데이트 내역 상태.
- `src/domain/sessionReducer.ts`: 세션 전이, `RESTART_MISSION`, canonical evaluation 검증.
- `src/components/ui/ActionButton.tsx`: `emphasis="required"`일 때 `gi-pulse required-action`을 제공하는 공통 버튼.
- `src/components/ui/SafetyNotice.tsx`: 실제 라벨 우선, 학생 단독 조작 금지, 제품별 차이, 서비스 한계 문구.
- `src/features/*`: 미션 선택 → 요청 → 표시 해석 → 관리 계획 → 예보 → 가상 결과 → 수정 → 보고서 화면.

### New UI contracts

1. 모든 단계 루트의 학습 제목은 `data-step-heading="true"`와 `tabIndex={-1}`을 가진다. `AppShell`은 `mainRef`와 `state.step` 변경 effect를 사용해 제목에 포커스를 주고 `window.scrollTo({ top: 0, behavior: 'auto' })`를 호출한다.
2. `ProgressIndicator`는 현재 단계 번호·이름을 모바일 요약으로 렌더링하고 현재 `li`를 `scrollIntoView({ inline: 'center', block: 'nearest' })`로 보정한다.
3. `SafetyNotice`는 `variant: 'full' | 'compact'`를 받는다. `compact`도 학생 단독 조작 금지와 실제 라벨 우선 문장을 항상 보여 주며, 나머지 상세 설명만 `details`에 넣는다.
4. `CareOptionCard`의 버튼 접근 가능한 이름은 `${title} — ${stageLabel} 단계 카드 고르기`이고, 선택 후 `ManagementBoardScreen`은 `selected-option-action` 영역을 렌더링한다.
5. `RescueReportScreen`은 `onRestartMission: () => void`를 받고 `AchievementChecklist`를 표시한다.
6. `BeforeAfterComparison`은 `comparisonState: 'allowed' | 'caution'`을 받아 실제 손상을 단정하지 않는 추상 상태 표식을 렌더링한다.

## Tech stack

- React 19 + TypeScript + Vite 8, `base: './'` 유지
- Vitest + Testing Library + `userEvent` for component/domain tests
- Playwright + axe for Chromium learner-flow, keyboard, viewport, reduced-motion, and high-contrast checks
- CSS modules are not used; shared CSS remains in `src/styles/layout.css`, `src/styles/accessibility.css`, `src/styles/motion.css`
- No package installation is required

## Implementation order and TDD protocol

각 단계는 다음 순서로 진행한다.

1. 실패하는 테스트를 먼저 추가한다.
2. 해당 실패만 통과시키는 최소 구현을 한다.
3. 대상 테스트와 인접 회귀 테스트를 통과시킨다.
4. `git diff --check`와 파일 줄 수를 확인한다.
5. 다음 단계로 넘어가기 전에 변경된 파일과 합격 조건을 기록한다.

## Implementation checklist

- [x] Step 1: 화면 전환 제목 포커스·상단 스크롤·모바일 진행 요약을 구현하고 접근성·반응형 검증을 통과시켰다.
- [x] Step 2: 요청 CTA 순서·간결 안전 안내·선택 카드 직접 배치를 구현하고 계획 흐름 회귀 검증을 통과시켰다.
- [x] Step 3: 어린이용 용어·예보 연결 문장·가상 결과 상태 표식을 구현하고 내부 ID 비노출 검증을 통과시켰다.
- [x] Step 4: 보고서 성취 체크리스트·출처 접기 영역·새 미션 재시작을 구현하고 5개 미션 E2E를 통과시켰다.
- [x] Step 5: 단계별 단일 필수 CTA·reduced-motion 대체·favicon·업데이트 기록을 구현하고 전체 검증을 통과시켰다.

### Step 1 — focus, scroll, and mobile progress

#### Files

- `src/app/AppShell.tsx`
- `src/components/ui/ProgressIndicator.tsx`
- `src/styles/layout.css`
- `src/styles/accessibility.css`
- `src/features/mission/MissionPicker.tsx`
- `src/features/mission/RescueRequestScreen.tsx`
- `src/features/magnifier/SymbolMagnifierScreen.tsx`
- `src/features/plan/ManagementBoardScreen.tsx`
- `src/features/forecast/DamageForecastScreen.tsx`
- `src/features/simulation/VirtualCareScreen.tsx`
- `src/features/revision/RevisionScreen.tsx`
- `src/features/report/RescueReportScreen.tsx`
- `e2e/accessibility.spec.ts`
- `e2e/responsive.spec.ts`

#### Interfaces and behavior

- `AppShell`에 `mainRef: RefObject<HTMLElement | null>`와 `previousStepRef`를 추가한다.
- 단계 루트 제목의 `id`는 기존 값을 유지하고 `data-step-heading="true" tabIndex={-1}`를 추가한다.
- 상태 전이가 발생할 때 제목 포커스와 상단 스크롤을 한 번만 수행한다. 오답 뒤 `SymbolFigure` 설명으로 이동하는 기존 포커스는 단계 전이가 아니므로 유지한다.
- `ProgressIndicator({ currentStep })`는 `steps` 상수와 `currentIndex` 계산을 사용해 `현재 단계: 2/7 · 표시 확대경`을 모바일에 제공한다.
- `progress-list`는 의도적인 가로 스크롤 영역임을 `aria-label="7단계 학습 진행, 가로로 이동할 수 있어요"`로 명시하고 현재 단계가 보이도록 보정한다.
- 한국어 제목·본문은 `word-break: keep-all`을 기본값으로 하고, `.source-links`, `code`, `pre`에만 `overflow-wrap: anywhere`를 남긴다.

#### Tests first

- `e2e/accessibility.spec.ts`: 첫 미션·요청·확대경·계획·예보·가상 결과·수정·보고서 전환 뒤 `[data-step-heading="true"]`가 포커스되고 `scrollY`가 0에 가깝다는 조건을 추가한다.
- `e2e/responsive.spec.ts`: 320px에서 현재 단계 요약이 보이고 현재 `li`의 오른쪽 경계가 viewport 안에 들어오는지 확인한다.
- `src/App.test.tsx`: 각 화면 제목이 `data-step-heading`을 가지는지 확인한다.

#### Acceptance

- 키보드로 다음 단계에 들어간 직후 제목을 읽거나 확인할 수 있다.
- 375px과 320px에서 현재 단계가 진행 목록 밖에 남지 않는다.
- 320px 제목에서 한국어 단어가 중간 분리되지 않는다.
- 모든 변경 파일이 500줄 미만이다.

### Step 2 — action hierarchy and plan-board flow

#### Files

- `src/components/ui/SafetyNotice.tsx`
- `src/features/mission/RescueRequestScreen.tsx`
- `src/features/magnifier/CareSymbolCard.tsx`
- `src/features/plan/ManagementBoardScreen.tsx`
- `src/features/plan/CareOptionCard.tsx`
- `src/features/plan/CurrentPlanSummary.tsx`
- `src/styles/layout.css`
- `src/app/app-shell.css`
- `src/test/plan-flow.test.tsx`
- `src/test/app-flow.test.tsx`
- `e2e/learner-flow.spec.ts`
- `e2e/responsive.spec.ts`

#### Interfaces and behavior

- `SafetyNoticeProps`에 `variant?: 'full' | 'compact'`를 추가한다. `RescueRequestScreen`은 짧은 안전 문장과 `표시 확대`를 같은 첫 viewport에 배치한다.
- 요청 화면의 순서는 `이번에 할 일` → `표시 확대` → 짧은 안전 안내 → 옷 정보 → 상세 안전 안내로 구성한다. 실제 라벨 우선과 학생 단독 조작 금지 문구는 CTA 주변에 남긴다.
- `CareOptionCardProps`에 `stageLabel: string`을 추가하고 버튼의 visible text를 `이 카드 고르기`로, accessible name을 카드 제목·단계까지 포함하도록 변경한다.
- `ManagementBoardScreen`에 `selected-option-action`을 추가한다. 선택된 카드의 단계와 일치하는 버튼 하나를 `선택한 카드 ${stageLabel} 단계에 놓기`로 제공하고, 선택 전에는 `먼저 관리 방법 카드 하나를 골라 주세요`를 표시한다.
- 기존 단계 버튼은 상태 요약으로 유지하되 선택 카드와 맞지 않는 버튼은 disabled 상태와 함께 설명 문구를 제공한다.
- 선택·배치 후 `CurrentPlanSummary`의 `role="status"`가 학생이 한 일을 짧게 설명한다.

#### Tests first

- `src/test/plan-flow.test.tsx`: 카드 선택 전에 안내 문구가 보이고, 카드 선택 뒤 같은 단계의 `선택한 카드 … 단계에 놓기`만 활성화되며, 클릭 후 1/3 상태가 되는지 확인한다.
- `e2e/learner-flow.spec.ts`: 카드 선택 후 별도 상단 스크롤 없이 selected-option action으로 세탁·건조·다림질을 배치한다.
- `e2e/responsive.spec.ts`: 375px에서 selected-option action의 모든 버튼이 viewport 폭 안에 있고, disabled 버튼에는 설명 문구가 연결되는지 확인한다.

#### Acceptance

- 요청 화면의 핵심 CTA가 375×812와 1280×800 첫 viewport에 보인다.
- 카드 하나를 고른 뒤 단계 배치까지 위로 되돌아가지 않고 완료할 수 있다.
- 반복 카드의 accessible name이 서로 다르고 “카드 카드 선택” 같은 중복 표현이 없다.
- 안전 문구를 줄여도 학생 단독 조작 금지와 실제 라벨 우선 문장은 항상 보인다.

### Step 3 — child-facing copy, forecast feedback, and simulation comparison

#### Files

- `src/content/learnerCopy.ts` (new)
- `src/features/magnifier/CareSymbolCard.tsx`
- `src/features/magnifier/SymbolMagnifierScreen.tsx`
- `src/features/forecast/RiskCard.tsx`
- `src/features/forecast/DamageForecastScreen.tsx`
- `src/features/simulation/BeforeAfterComparison.tsx`
- `src/features/simulation/VirtualCareScreen.tsx`
- `src/features/revision/RevisionScreen.tsx`
- `src/features/report/RescueReportScreen.tsx`
- `src/domain/evaluatePrediction.ts`
- `src/domain/evaluatePrediction.test.ts`
- `src/test/app-flow.test.tsx`
- `src/test/forecast-flow.test.tsx`
- `src/test/simulation-flow.test.tsx`

#### Copy rules

- `재료 경계` → `이 재료에 대해 꼭 기억할 점`
- `가상 오염 상황` → `이번에 가정한 상황`
- `완화 조건` → `옷을 덜 세게 다루는 방법`
- `회전식 건조` → `통이 빙글빙글 도는 건조`
- `전문 관리` → `어른이나 전문가에게 먼저 물어보기`
- `허용 범위` → `표시에 맞는 방법`
- 오답 문구 → `기호 옆 설명에서 온도와 줄 표시를 다시 찾아보세요.`
- 위험 카드의 동일한 `상대 가능성: 조건에 따라 커질 수 있음`을 위험별 관찰 단서로 바꾼다.
- 예보 피드백은 학생용 한 문장과 교사용 수치 상세를 분리한다. 학생용 문장은 선택한 위험·표시와 다시 볼 근거를 말한다.
- `RevisionScreen`과 `RescueReportScreen`에서 `care-*`, `confirm-current-plan`, `shrinkage` 같은 내부 ID를 화면 텍스트에서 제거한다.

#### Simulation contract

- `BeforeAfterComparison`은 `comparisonState`가 `caution`일 때 추상 표식과 `크기·모양·열을 더 살펴볼 가능성이 있어요`를 표시한다.
- `allowed` 상태는 `현재 가상 조건에서 눈에 띄는 변화가 두드러지지 않아요`처럼 표현한다.
- 실제 손상 사진·실제 상태 단정·학생의 기기 조작 지시는 추가하지 않는다.
- `prefers-reduced-motion: reduce`에서는 동일한 상태 텍스트와 정적 비교 패널을 유지한다.

#### Tests first

- `src/test/app-flow.test.tsx`: 학생 화면에 내부 ID가 나타나지 않고 새 문구가 노출되는지 확인한다.
- `src/test/forecast-flow.test.tsx`: 피드백에 학생용 안내와 연결된 표시명이 모두 포함되는지 확인한다.
- `src/test/simulation-flow.test.tsx`: 허용·주의 상태가 서로 다른 추상 상태 표식을 갖고 reduced-motion에서도 텍스트가 유지되는지 확인한다.
- `e2e/accessibility.spec.ts`: 결과 영역의 `role="status"`, `aria-live="polite"`, 위험·근거 입력의 접근 가능한 이름을 확인한다.

#### Acceptance

- 어린이가 오답 후 다시 어디를 볼지 한 문장으로 알 수 있다.
- 예보 결과에서 선택한 위험과 표시 근거의 연결 여부를 수치 해석 없이 이해할 수 있다.
- 시뮬레이션 전·후 그림이 같더라도 “왜 같은지” 또는 “무엇을 비교하는지”가 명시된다.
- 학생이 보는 콘텐츠에는 내부 ID가 없다.

### Step 4 — report completion, source hierarchy, and restart

#### Files

- `src/features/report/AchievementChecklist.tsx` (new)
- `src/features/report/RescueReportScreen.tsx`
- `src/features/report/ManagementCard.tsx`
- `src/app/AppShell.tsx`
- `src/domain/sessionReducer.ts` (reuse existing `RESTART_MISSION`, no reducer rule change)
- `src/styles/layout.css`
- `src/styles/accessibility.css`
- `src/test/report-flow.test.tsx`
- `src/test/app-flow.test.tsx`
- `e2e/learner-flow.spec.ts`
- `e2e/responsive.spec.ts`

#### Interfaces and behavior

- `AchievementChecklistProps`는 `summary: AchievementSummary`를 받는다.
- 보고서 제목 바로 아래에 `구조 미션을 끝냈어요!`와 다음 체크 항목을 렌더링한다: `표시를 모두 해석했어요`, `관리 제한을 확인했어요`, `위험과 표시를 연결해 봤어요`, `관리 계획을 완성했어요`, `어른과 확인할 근거를 남겼어요`.
- `RescueReportScreenProps`에 `onRestartMission`을 추가하고 `AppShell`에서 `dispatch({ type: 'RESTART_MISSION' })`를 전달한다.
- 보고서 마지막에 `다른 미션 해보기`를 `ActionButton emphasis="required"`로 표시한다. 클릭 시 미션 선택 화면으로 돌아가고 포커스·스크롤 규칙을 적용한다.
- 학생용 보고서는 요약·최초 계획·수정 계획을 먼저 보여 준다. 출처·검수일은 `출처와 검수일 보기` details 안으로 이동하되 공식 링크와 날짜는 유지한다.
- `ManagementCard`가 같은 출처 목록을 최초·수정 계획마다 중복 렌더링하지 않도록 `showSources?: boolean`을 추가하고 보고서에서는 한 번만 표시한다.

#### Tests first

- `src/test/report-flow.test.tsx`: 체크리스트 5개, 완료 제목, 새 미션 버튼, source details를 확인한다.
- `e2e/learner-flow.spec.ts`: 보고서에서 `다른 미션 해보기`를 누르면 첫 미션 선택 화면으로 돌아가고 제목에 포커스가 있는지 확인한다.
- `e2e/responsive.spec.ts`: 320px·375px 보고서에서 source details와 완료 버튼이 잘리지 않는지 확인한다.

#### Acceptance

- 보고서 상단에서 완료 사실과 배운 내용을 5초 안에 파악할 수 있다.
- 보고서 하단에 다음 행동이 있고, 새 미션을 다시 시작할 수 있다.
- 기술 출처는 사라지지 않지만 학생 본문을 압도하지 않는다.
- 보고서의 학생용 텍스트에 내부 ID가 없다.

### Step 5 — visual consistency, motion, favicon, and update history

#### Files

- `src/components/ui/ActionButton.tsx`
- `src/features/magnifier/CareSymbolCard.tsx`
- `src/features/forecast/DamageForecastScreen.tsx`
- `src/features/simulation/VirtualCareScreen.tsx`
- `src/features/plan/ManagementBoardScreen.tsx`
- `src/features/revision/RevisionScreen.tsx`
- `src/styles/layout.css`
- `src/styles/accessibility.css`
- `src/styles/motion.css`
- `index.html`
- `public/app-icon.svg`
- `src/content/updateHistory.ts`
- `src/content/updateHistory.test.ts`
- `e2e/responsive.spec.ts`

#### Interfaces and behavior

- 단계마다 학생이 반드시 눌러야 하는 다음 행동 하나만 `emphasis="required"`로 지정한다: `표시 확대`, `뜻 확인`, `관리 계획 확인`, `손상 예보 확인`, `가상 결과 보기`, `계획 수정하기`, `수정 계획 확인`, `다른 미션 해보기`.
- 카드 선택·근거 확인·출처 링크에는 불필요한 pulse를 적용하지 않는다.
- reduced-motion에서는 모든 pulse와 비교 애니메이션을 끄고 `필수` 배지·선택 테두리·상태 텍스트를 유지한다.
- `.symbol-expand-button`, `.evidence-review-button`, `.simulation-action`을 앱 공통 버튼 계층에 맞게 스타일링한다.
- 한국어 줄바꿈 규칙과 source link 줄바꿈 규칙을 분리한다.
- `index.html`에 `href="./app-icon.svg" type="image/svg+xml"` favicon 링크를 추가한다.
- `updateHistory`에 `2026-08-28` 접근성·학습 흐름 개선 항목을 한 줄 추가한다.

#### Tests first

- `src/test/plan-flow.test.tsx`, `src/test/forecast-flow.test.tsx`, `src/test/simulation-flow.test.tsx`: 각 화면의 요구 CTA에 `required-action`이 있고 보조 컨트롤에는 없는지 확인한다.
- `e2e/responsive.spec.ts`: reduced-motion에서 `animation-name: none`, 정적 비교 패널 표시, selected-state 텍스트·테두리를 확인한다.
- `src/content/updateHistory.test.ts`: 날짜가 ISO 형식이고 2026-08-28 개선 항목이 존재하는지 확인한다.
- 공개 HTML asset smoke: favicon 경로가 상대 경로이고 200 응답인지 확인한다.

#### Acceptance

- 주요 CTA의 시각적 계층이 모든 단계에서 일관된다.
- reduced-motion 사용자는 움직임 없이도 필수 행동과 선택 상태를 알 수 있다.
- 새로고침 시 favicon 404 콘솔 오류가 없다.
- 업데이트 내역에 이번 개선 날짜와 요약이 기록된다.

## Global test commands and expected results

구현 중에는 변경 범위에 맞는 명령을 실행하고, 마지막에는 다음 순서로 전체 검증한다.

```bash
npm run lint
npm run typecheck
npm test -- --run src/test/app-flow.test.tsx src/test/plan-flow.test.tsx src/test/forecast-flow.test.tsx src/test/simulation-flow.test.tsx src/test/report-flow.test.tsx
npm run build
npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts e2e/learner-flow.spec.ts
npm run check
git diff --check
git status --short --untracked-files=all
```

Expected final results:

- ESLint, TypeScript, Vitest, Vite build, Pages asset smoke, and Playwright all exit with code 0.
- Targeted and full unit tests report zero failures.
- First mission reaches `구조 보고서` by mouse and keyboard.
- 320px·375px·1280px key controls are inside their intended bounds.
- `prefers-reduced-motion` keeps static comparison and required-action evidence.
- No student data, external runtime request, or real-device instruction is introduced.
- `git diff --check` is empty and only intended source, test, content, style, and documentation files are changed.

## Manual learner review after implementation

실제 아동 참가자 연구가 아닌 구현 후 휴리스틱 확인으로 다음을 반복한다.

1. 첫 화면에서 5초 안에 미션 카드와 다음 행동을 찾는다.
2. 키보드만으로 첫 미션을 보고서까지 진행한다.
3. 표시 오답과 예보 근거 부족 상황에서 다시 볼 위치를 말할 수 있는지 확인한다.
4. 375px과 320px에서 핵심 CTA·완료 버튼·업데이트 내역이 잘리지 않는지 확인한다.
5. 고대비와 reduced-motion에서 선택 상태·필수 행동이 색과 움직임에만 의존하지 않는지 확인한다.

VoiceOver 검증과 실제 초등학생·교사 수업 관찰은 이 문서의 범위 밖이며 별도 승인 없이는 완료로 표시하지 않는다.

## Commit and release stages

구현 중에는 커밋하지 않는다. 사용자가 커밋을 요청할 경우 다음처럼 단계별로 분리한다.

1. `feat: restore learner focus and mobile progress`
2. `feat: surface primary actions and streamline plan board`
3. `feat: simplify learner copy and connect forecast feedback`
4. `feat: add report completion and restart flow`
5. `chore: polish motion, favicon, and update history`

각 커밋 전에는 해당 단계 테스트와 `git diff --check`를 통과시킨다. GitHub push·Pages 배포는 별도 사용자 지시가 있을 때만 실행하고, 배포 후에는 실제 learner path·HTML asset·제목·콘솔을 다시 확인한 공개 링크를 보고서에 포함한다.
