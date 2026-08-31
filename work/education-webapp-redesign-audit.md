# Education Webapp Redesign Audit

## Audit scope

- 감사일: 2026-08-29 (Asia/Seoul)
- 대상: `https://wbmaker2.github.io/laundry-symbol-rescue-team/` 공개 Pages와 현재 로컬 소스
- 사용자 모델: 초등학교 5~6학년, 25~35분 실과 학습
- 검증 경계: 마우스·키보드·ARIA·axe·반응형·고대비·reduced-motion 중심. VoiceOver는 요청된 범위에서 제외합니다.
- 브라우저: Playwright MCP Chromium snapshot, 320px·375px 및 기본 데스크톱 viewport

## Project instruction audit

| 확인 항목 | 결과 | 영향 |
|---|---|---|
| `AGENTS.md` | 프로젝트 경로에서 발견되지 않음 | 사용자 제공 AGENTS 규칙과 기존 설계 문서를 기준으로 삼음 |
| `EDUCATION_DESIGN.md` | 발견되지 않음 | 교육 설계는 `2026-08-26-laundry-symbol-rescue-team-design.md`를 기준으로 삼음 |
| `design-system/MASTER.md` | 감사 시작 시 없음 | 이번 작업의 토큰과 컴포넌트 규칙을 `design-system/MASTER.md`로 기록 |
| `impeccable` 지원 스킬 | 현재 사용 가능 목록에 없음 | 실행하지 않음; 내부 휴리스틱과 코드·브라우저 증거로 대체 |
| `ui-ux-pro-max` 지원 스킬 | 현재 사용 가능 목록에 없음 | 실행하지 않음; `frontend-skill` 원칙으로 시각 계층을 설계 |
| `redesign-existing-projects` 지원 스킬 | 현재 사용 가능 목록에 없음 | 실행하지 않음; 본 계획의 단계별 안전 경계를 적용 |
| `imagegen` | 호출 가능하지만 적합한 일반 장식 자산 없음 | factual 세탁 기호를 교체하지 않고 호출하지 않음 |

## First-impression review

### What the learner notices first

1. 상단의 `세탁표시 구조대` 이름과 7단계 진행 목록
2. `구조할 가상 옷을 골라 보세요` 제목과 다섯 미션 카드
3. 카드 아래의 긴 `안전하게 살펴보기` 안내와 footer `업데이트 내역`

### One-word verdict

`정확하지만 빽빽함`

현재 앱은 따뜻한 종이색·남색·테라코타 색상과 단계 번호 덕분에 교육 도구의 정체성이 분명합니다. 다만 미션 카드, 안전 문장, 계획 카드가 동일한 시각 무게로 쌓여 초등 학습자가 다음 행동을 고르는 데 시간이 걸립니다. 이번 리디자인은 색상 교체보다 학습 순서와 행동 우선순위를 앞세우는 방향으로 진행합니다.

## Evidence by viewport

### 375px baseline

- 페이지 제목은 `세탁표시 구조대`이고 초기 단계 요약은 `현재 단계: 1/7 · 구조 요청`입니다.
- 미션 picker는 약 1665px 높이이며, 다섯 미션 카드가 세로로 쌓이고 안전 안내가 footer 앞에 배치됩니다.
- 진행 목록의 1~4단계만 첫 표시 영역에 보이고 5~7단계는 가로 스크롤로 접근해야 합니다. 이는 의도된 overflow지만 현재 단계가 항상 중앙에 오도록 보정할 필요가 있습니다.
- 업데이트 버튼은 44px 높이지만 긴 안전 안내 뒤에 있어 첫 viewport에서는 보이지 않습니다.

### 320px baseline

- 페이지 폭은 320px, 콘텐츠 내부 폭은 약 304px입니다.
- 미션 picker는 약 1791px 높이이며 제목 `구조할 가상 옷을 골라 보세요`가 두 줄로 자연스럽게 감싸집니다.
- 카드 설명이 네 줄 이상으로 늘어나고 안전 안내는 400px 높이까지 커집니다. 핵심 CTA가 정보량에 묻힐 위험이 있습니다.
- 진행 목록은 내부 콘텐츠 폭이 약 614px인 가로 스크롤 strip입니다. 현재 단계 summary와 자동 중앙 정렬이 필요합니다.

### Desktop baseline

- 기준 공개 화면은 크림색 바탕, 흰 카드, 테라코타 테두리, 짙은 남색 텍스트로 구성되어 시각적 일관성이 있습니다.
- 제목은 약 20~24px, 본문은 시스템 한글 글꼴로 표시되며 대비는 읽을 수 있는 수준입니다.
- 카드 수와 긴 설명 때문에 첫 화면의 시선이 미션 카드 여러 개로 분산됩니다.

## Findings and priority

### P0 — 단계 학습을 막는 문제

1. **기호 전환 후 포커스·스크롤 잔류**
   - 위치: `src/features/magnifier/SymbolMagnifierScreen.tsx`
   - 증거: 첫 미션에서 첫 기호를 확인한 뒤 다음 기호가 렌더링되지만 이전 scroll offset이 유지되어 새 기호 제목이 viewport 위로 사라짐.
   - 영향: 키보드 사용자가 현재 읽어야 할 기호를 잃고, 오답 수정 흐름이 끊김.
   - 해결 방향: 활성 기호 heading ref를 effect로 포커스하고 `scrollIntoView({ block: 'start' })`를 호출. 오답 설명 포커스는 별도로 보존.

### P1 — 인지 부하·행동 우선순위

1. **요청 CTA가 긴 안전 안내 뒤로 밀림**
   - 위치: `src/features/mission/RescueRequestScreen.tsx`, `src/styles/layout.css`
   - 영향: 375px 첫 viewport에서 표시 확대 행동을 찾기 어렵습니다.
   - 해결 방향: StepIntro → CTA → 핵심 안전 두 문장 → facts → 상세 details 순서.

2. **관리 순서판과 수정 화면에 모든 카드가 동시에 노출됨**
   - 위치: `src/features/plan/ManagementBoardScreen.tsx`, `src/features/revision/RevisionScreen.tsx`
   - 영향: 단계별 작업 기억 부담과 반복 스크롤 증가.
   - 해결 방향: `PlanStageNavigator`와 선택 결과 요약을 상단에 두고 상세 카드를 접을 수 있게 함. 판정 데이터와 접근 가능한 입력은 삭제하지 않음.

3. **가상 결과·보고서의 다음 행동이 문서 하단에만 있음**
   - 위치: `src/features/simulation/VirtualCareScreen.tsx`, `src/features/report/RescueReportScreen.tsx`
   - 영향: 학습 완료 후 무엇을 할지 찾기 위해 긴 페이지를 끝까지 내려야 함.
   - 해결 방향: 결과 요약·성취 체크·다음 미션 패널을 상단에 배치하고 상세 근거를 뒤에 유지.

4. **위험 카드 glyph와 수치 피드백이 어린이에게 추상적임**
   - 위치: `src/features/forecast/RiskCard.tsx`, `src/features/forecast/DamageForecastScreen.tsx`
   - 영향: 기호 모양보다 `어떤 표시를 다시 확인할지`가 먼저 읽히지 않음.
   - 해결 방향: 문자 제목·관찰 단서·연결된 표시 문장을 우선하고 수치 상세는 details로 이동.

### P2 — 일관성·후속 검증

1. **반복 grouping action의 접근 가능한 이름이 의류 맥락을 충분히 설명하지 않음**
   - 위치: `src/features/plan/ManagementBoardScreen.tsx`
   - 해결 방향: 의류 제목을 `aria-label`에 포함해 `티셔츠를 따로 관리에 넣기`처럼 구분.

2. **모바일 진행 strip은 의도된 overflow이지만 현재 단계 가시성이 약함**
   - 위치: `src/components/ui/ProgressIndicator.tsx`, `src/styles/accessibility.css`
   - 해결 방향: 현재 단계 summary와 `scrollIntoView({inline:'center'})`를 유지·검증.

3. **안전 안내의 반복 길이가 화면마다 누적됨**
   - 위치: `src/components/ui/SafetyNotice.tsx`
   - 해결 방향: compact 핵심 문장 + details 상세 문장, 화면당 한 번의 full 안내.

4. **업데이트 내역에 리디자인 날짜가 아직 없음**
   - 위치: `src/content/updateHistory.ts`
   - 해결 방향: 2026-08-29 `개발` 항목 추가 및 dialog 회귀 테스트.

## Quick wins

- 현재 palette와 factual symbol SVG를 보존하고 `StepIntro`로 제목·설명·필수 행동의 간격을 통일합니다.
- 버튼의 시각적 계층을 `required-action` 하나로 제한하고, 보조 카드에는 pulse를 제거합니다.
- `word-break: keep-all`과 source link 전용 `overflow-wrap`을 유지해 320px 한글 중간 분리를 막습니다.
- 고대비에서 선택 상태를 테두리와 `✓ 선택됨` 텍스트로 중복 표시합니다.
- 보고서 상단에 다섯 성취 체크와 다음 미션 행동을 배치하되 출처·검수일·안전 문장은 삭제하지 않습니다.

## Design safety review

- 새 자산은 사실 정보를 전달하지 않는 CSS 배지·선·추상 패널만 사용합니다.
- 세탁 기호 SVG는 의미·출처·검수일을 가진 factual asset이므로 보존합니다.
- 실제 의류 사진, 실제 손상 사진, 화학제품 사용 도식, 브랜드 로고를 추가하지 않습니다.
- 외부 요청·분석·학생 식별 정보를 도입하지 않습니다.
- 앱은 가상 학습 도구이며 제품 라벨과 제조사 안내가 우선이라는 문장을 유지합니다.

## Verification status before implementation

| 검증 | 기준 결과 |
|---|---|
| 공개 title | `세탁표시 구조대` 확인 |
| 320/375 초기 DOM | 렌더링·가로 progress strip 확인 |
| 기존 unit/E2E gate | 이전 릴리스에서 통과한 상태로 인계받음; 리디자인 후 다시 실행 |
| VoiceOver | 범위 제외 |
| 실제 초등학생·교사 관찰 | 수행하지 않음; 휴리스틱 검토로 기록 |
| Git/Pages/HVC | 이번 리디자인 요청에서는 수행하지 않음 |

