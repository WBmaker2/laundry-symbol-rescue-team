# Laundry Symbol Rescue Team Implementation Plan

## Goal

초등학교 5~6학년 학습자가 25~35분 안에 가상 의류의 재료와 취급 표시를 함께 읽고, 세탁·건조·다림질 계획을 세우고, 손상 가능성을 근거와 연결해 계획을 수정한 뒤 자신의 관리 카드를 완성하도록 화면을 안전하게 리디자인합니다. 현재 앱의 판정 규칙, 공식 출처, 개인정보·안전 경계를 보존하면서 다음을 달성합니다.

- 첫 화면에서 `어떤 미션을 고를지`와 `다음에 누를 버튼`을 5초 안에 찾을 수 있게 합니다.
- 긴 카드 묶음과 반복 안전 안내를 학습 순서에 맞는 요약·상세 구조로 정리합니다.
- 단계 전환과 기호 전환 뒤 제목, 현재 단계, 다음 행동이 키보드와 화면 폭에 맞게 드러나게 합니다.
- 학생용 문장은 기호·관리 행동·손상 가능성의 관계를 쉬운 말로 설명하고 내부 ID나 확정적 손상 표현을 노출하지 않습니다.
- 320px, 375px, 768px, 1280px, 200% 글자 확대, 고대비, `prefers-reduced-motion`에서 학습 흐름을 끝까지 완료할 수 있게 합니다.
- 앱 안의 `업데이트 내역`에 2026-08-29 리디자인 기록을 추가합니다.

이 문서의 명령은 구현·검증 단계에서 실행할 항목입니다. 계획 작성 중에는 명령을 실행하지 않습니다. 현재 요청은 구현 승인으로 해석하되, Git 커밋·푸시·GitHub Pages 배포·HVC 등록은 별도 지시 없이는 실행하지 않습니다.

## Current Context and Evidence

- 실제 프로젝트는 Next.js가 아닌 Vite + React 19 + TypeScript 정적 SPA입니다. `package.json`, `vite.config.ts`, `src/main.tsx`가 근거입니다.
- 프로젝트 내부에 `AGENTS.md`, `EDUCATION_DESIGN.md`, `design-system/MASTER.md`가 없습니다. 이 계획은 사용자 제공 규칙, 기존 설계 문서, 현재 구현을 근거로 합니다.
- 원 설계 문서 `2026-08-26-laundry-symbol-rescue-team-design.md`의 대상은 초등 5~6학년, 실과 `[6실02-07]`, `[6실02-09]`, 5개 가상 의류 미션, 7단계 흐름, 공식 표시 출처와 검수일, 실제 라벨 우선 안내입니다.
- 기존 개선 문서 `2026-08-28-laundry-symbol-rescue-team-improvement-plan.md`의 기능 개선은 구현되어 있으며, 이번 계획은 그 위에서 시각 계층·인지 부담·후속 접근성 검증을 보완합니다.
- 공개 Pages의 기준 URL은 `https://wbmaker2.github.io/laundry-symbol-rescue-team/`입니다. 320px에서 진행 목록은 가로 스크롤이 필요하고, 미션 선택 화면 높이가 약 1791px까지 늘어나며 안전 안내와 업데이트 버튼이 마지막에 밀립니다.
- 데스크톱 기준 공개 화면은 따뜻한 종이색 배경과 주황색 테두리 카드가 일관되지만, 미션·관리 카드·위험 카드가 같은 시각 무게를 가져 핵심 행동이 묻힙니다.
- 공개 첫 미션의 표시 확대경은 기호 전환 시 이전 스크롤 위치가 남아 새 기호 제목이 화면 밖으로 밀리는 현상이 관찰되었습니다. `SymbolMagnifierScreen`의 기호 변경 후 포커스·스크롤이 이번 리디자인의 P0입니다.
- 관리 순서판과 수정 화면은 여러 단계 카드, 설명, 안전 문장이 한 화면에 반복되어 초등 학습자의 작업 기억 부담이 큽니다. 정보 삭제가 아니라 단계별 요약과 상세 공개로 재배치합니다.
- 가상 결과와 보고서는 설명이 정확하지만 길이가 길고 다음 행동이 문서 하단에 있습니다. 결과 요약과 다음 행동을 상단에도 제공하되 전체 근거는 유지합니다.
- 이번 실행에서 확인한 보조 역할은 `$impeccable`(`/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`), `$ui-ux-pro-max`(`/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md`), `$redesign-existing-projects`(`/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`), `$imagegen`(`/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`)이며 모두 문서를 읽었습니다. `$ui-ux-pro-max`의 교육 앱·접근성·반응형 질의와 디자인 시스템 출력을 검토했고, `$imagegen`은 사실·표준 기호 자산만 있는 감사 결과에 따라 호출하지 않았습니다.
- 이미지 자산은 사실 정보를 담은 세탁 기호 SVG 8개와 앱 아이콘뿐입니다. 일반 장식 이미지가 없어 `imagegen`은 호출하지 않으며, 사실·표준 자산은 자동 교체하지 않습니다.

## Architecture

### Preserved boundaries

- `src/domain/*`의 미션·표시·판정·세션 타입과 reducer를 학습 규칙의 단일 출처로 유지합니다.
- `src/content/symbols.ts`, `src/content/missions.ts`, `src/content/careOptions.ts`, `src/content/sources.ts`의 공식 출처·검수일·표시 ID를 변경하지 않습니다. 문구 변경이 필요하면 학생용 표시 문자열만 `src/content/learnerCopy.ts`에 둡니다.
- `src/app/AppShell.tsx`는 `SessionStep`에 따른 화면 교체, 고대비 상태, 업데이트 내역 대화상자, 단계 전환 포커스·스크롤의 소유자로 유지합니다.
- `src/domain/sessionReducer.ts`의 `SELECT_MISSION → OPEN_MAGNIFIER → RECORD_INTERPRETATION → SUBMIT_INITIAL_PLAN → SUBMIT_PREDICTION → SHOW_SIMULATION → START_REVISION → SUBMIT_REVISION → RESTART_MISSION` 전이를 바꾸지 않습니다.
- 외부 서버, 로그인, 학생 이름·사진·브랜드 라벨 업로드, 카메라/OCR/AI 판정, 광고·구매 링크, 실제 기기 조작 지시는 추가하지 않습니다.

### Proposed presentation architecture

1. `AppShell`은 `AppHeader`, `ProgressIndicator`, 현재 화면, `AppFooter`를 하나의 `app-frame`으로 묶고, 화면마다 하나의 `data-step-heading="true"` 제목과 하나의 필수 CTA를 노출합니다.
2. `src/components/ui/StepIntro.tsx`는 `eyebrow`, `title`, `description`, `nextActionLabel`을 받아 단계 목적과 다음 행동을 같은 상단 블록에 표시합니다. 각 화면은 자신의 학습 문장을 유지하되 레이아웃은 공유합니다.
3. `src/components/ui/SafetyNotice.tsx`는 `variant: 'full' | 'compact'`를 유지하고, compact에서도 `실제 라벨 우선`과 `학생 혼자 조작 금지`를 항상 보여 줍니다. 긴 차이는 `<details>`로 열어 봅니다.
4. `src/components/ui/ActionButton.tsx`의 `emphasis="required"`만 `gi-pulse required-action`을 사용합니다. 선택·근거·출처 컨트롤에는 pulse를 사용하지 않습니다.
5. `src/features/magnifier/SymbolMagnifierScreen.tsx`는 활성 기호 카드의 제목 ref를 유지하고 `symbolIndex` 변경 시 `scrollIntoView({block: 'start'})`와 `focus({preventScroll: true})`를 수행합니다. 오답 뒤 설명 포커스는 기존 동작을 보존합니다.
6. `src/features/plan/ManagementBoardScreen.tsx`와 `src/features/revision/RevisionScreen.tsx`는 `PlanStageNavigator`와 접을 수 있는 `PlanDetailPanel`을 사용합니다. 모든 카드와 평가 데이터는 DOM과 상태에 남기며, 기본 화면에는 현재 작업 단계와 선택 결과를 우선 보여 줍니다.
7. `src/features/forecast/RiskCard.tsx`와 `src/features/simulation/BeforeAfterComparison.tsx`는 기호 glyph보다 문자 제목·상태 배지·근거 문장을 우선하여 색이나 아이콘에 의존하지 않는 비교 패널을 제공합니다.
8. `src/features/report/RescueReportScreen.tsx`는 상단 `AchievementChecklist`와 `NextActionPanel`, 상세 보고서, 출처 details 순서를 사용합니다. 기존 보고서 정보와 `다른 미션 해보기` 전이는 유지합니다.

### State and data flow

```text
LearnerSessionProvider
  └─ AppShell (step focus/scroll, contrast, update dialog)
      ├─ StepIntro + ProgressIndicator (orientation)
      ├─ MissionPicker / RescueRequestScreen
      ├─ SymbolMagnifierScreen (interpretations)
      ├─ ManagementBoardScreen (initial plan/evaluation)
      ├─ DamageForecastScreen (prediction/evidence)
      ├─ VirtualCareScreen (virtual comparison)
      ├─ RevisionScreen (revised plan/evidence)
      └─ RescueReportScreen (read-only summary + restart)
```

화면 컴포넌트는 판정 함수를 직접 재구현하지 않고 기존 `evaluatePlan`, `evaluatePrediction`, `evaluateGrouping`, `validate*` 결과를 표시합니다. 사용자 선택은 현재 탭의 React 상태에만 머물며 새로고침 시 복구하지 않습니다.

## Tech Stack

- React 19, TypeScript, Vite 8, 정적 SPA (`vite.config.ts`의 상대 경로 base 유지)
- 기존 CSS 파일 기반 스타일: `src/styles/tokens.css`, `base.css`, `layout.css`, `accessibility.css`, `motion.css`, `src/app/app-shell.css`
- Vitest + Testing Library + `@testing-library/user-event`로 컴포넌트·도메인 회귀 검증
- Playwright + axe로 키보드·접근성·반응형·고대비·reduced-motion learner path 검증
- 새 런타임 패키지 설치 없음. 기존 `package-lock.json`을 변경하지 않음.
- 이미지 생성·편집 없음. 사실 정보를 담은 SVG는 기존 파일을 그대로 사용.

## Spec

### Learner and curriculum contract

| 설계 요구 | 구현 연결 | 합격 조건 |
|---|---|---|
| 이해 | 재료와 표시가 관리 방법을 정한다는 문장을 `StepIntro`, `garment-facts`, 기호 설명에 배치 | 학습자가 표시를 행동 문장과 함께 읽을 수 있음 |
| 적용 | 세탁·건조·다림질 카드와 현재 계획 요약을 같은 작업 영역에 배치 | 카드 선택 후 해당 단계 배치가 한 번의 명확한 CTA로 가능 |
| 분석 | 여러 표시의 제한을 `CurrentPlanSummary`, 위험 근거, 그룹화 근거로 나눠 표시 | 한 표시만 보지 않고 제한을 함께 확인하는 문장이 보임 |
| 평가 | 위험 예측 → 가상 결과 → 수정 계획 → 보고서 | 첫 미션이 키보드·마우스 모두 7단계를 거쳐 보고서에 도착 |
| 차별성 | 날씨·구매·도구 개선 앱이 아니라 의류 표시를 관리 순서로 해석하는 rescue desk 시각 언어 | 첫 화면과 보고서에 의류 표시·관리 순서·자원 절약의 관계가 명확 |
| 자원·안전 | 상대 물·에너지 지표, 실제 라벨 우선, 보호자·교사 도움 문장 | 실제 손상 확정·정밀 절약량·위험 조작 지시가 없음 |

### Visual thesis

따뜻한 종이 위에서 구조대원이 단서를 정리하는 `rescue desk`를 시각 은유로 사용합니다. 기존 크림색·남색·테라코타 팔레트를 보존하고, 카드 수를 늘리는 대신 한 화면의 주목 순서를 `현재 단계 제목 → 이번에 할 일 → 필수 CTA → 근거/상세`로 고정합니다. 장식은 얇은 구분선과 배지로 제한하고, 표준 기호 자체는 정확성을 위해 기존 SVG를 유지합니다.

### Content plan

- 첫 화면: 미션 카드에는 번호, 쉬운 제목, 한 줄 목표, `이 미션 선택`을 노출하고 긴 설명은 accessible description으로 유지합니다.
- 요청 화면: `이번에 할 일` 1문장 → `표시 확대` CTA → 짧은 안전 두 문장 → 재료·상황 facts → 상세 안전 details 순서입니다.
- 표시 화면: 현재 기호 이름·학습용/공식 구분·짧은 뜻·후보 선택·뜻 확인을 한 묶음으로 보여 주고, 기호가 바뀌면 새 제목으로 이동합니다.
- 계획 화면: 세탁·건조·다림질 단계 navigator, 선택 카드, 현재 계획 요약, 함께 관리 판단의 순서로 배치합니다. 모든 선택 가능한 카드의 텍스트는 단계와 방법을 명시합니다.
- 예보·가상 결과: 위험 이름과 관찰 단서, 선택한 표시 근거, 가상 상태를 각각 문자로 설명하고, `가능성이 커질 수 있음` 언어를 유지합니다.
- 수정·보고서: 최초 계획과 발견을 요약한 뒤 수정 근거와 최종 관리 카드를 보여 주며, 출처·검수일은 details에 남깁니다.

### Interaction thesis

각 단계는 하나의 필수 행동을 갖습니다. 학생은 색이나 애니메이션이 없어도 배지·문장·테두리로 현재 선택과 다음 행동을 알 수 있어야 합니다.

| 화면 | 필수 CTA | `gi-pulse` | 완료 후 초점 |
|---|---|---|---|
| 구조 요청 | `표시 확대` | 사용 | `표시 확대경` 제목 |
| 표시 확대경 | `뜻 확인` | 사용 | 다음 기호 제목 또는 관리 순서판 제목 |
| 관리 순서판 | `관리 계획 확인` | 사용 | `손상 예보` 제목 |
| 손상 예보 | `손상 예보 확인` | 사용 | `가상 결과` 제목 |
| 가상 관리 | `가상 결과 보기` | 사용 | `계획 수정` 제목 |
| 계획 수정 | `수정 계획 확인` | 사용 | `구조 보고서` 제목 |
| 구조 보고서 | `다른 미션 해보기` | 사용 | 미션 선택 제목 |

### Safety and privacy spec

- `SafetyNotice`의 실제 라벨·제조사 안내·보호자/교사 우선 문장을 모든 관련 화면에 유지합니다.
- 실제 다리미, 뜨거운 물, 표백제, 세탁기를 학생 혼자 조작하라고 안내하지 않습니다.
- 실제 제품의 손상·안전을 보증하지 않으며, 위험 결과는 `가능성이 커질 수 있음`으로 표현합니다.
- 국가·시기·제품에 따른 표시 차이와 공식 출처·검수일을 공개합니다.
- 네트워크 요청, 분석 추적, 계정, 학생 식별 정보, 업로드 기능을 추가하지 않습니다.

## Global Constraints

- 한 소스 파일은 500줄 미만으로 유지합니다. 420줄을 넘는 파일은 기능 단위로 분리 계획을 세우고 구현 중 `wc -l`로 확인합니다.
- 기존 미션 5개, 검수된 표시 8개, 판정 함수, 학습 단계, 안전·개인정보 경계를 삭제하거나 의미를 바꾸지 않습니다.
- 라이트 모드만 지원하며 `prefers-color-scheme: dark`로 색을 바꾸지 않습니다.
- `gi-pulse`는 필수 CTA에만 적용하고, `@media (prefers-reduced-motion: reduce)`에서 animation을 끄며 배지·테두리·상태 텍스트를 유지합니다.
- 모든 버튼·체크박스·라디오·summary는 44px 이상 터치 영역과 명시적 accessible name을 갖습니다.
- VoiceOver 검증은 수행하지 않습니다. 키보드, 명시적 ARIA 이름·상태, axe, 모바일 viewport, 200% 확대만 검증합니다.
- 학생에게 TTS, 음성 녹음, 오디오 재생 기능을 추가하지 않습니다.
- 사실·표준 자산을 imagegen으로 교체하지 않습니다. 일반 장식 자산이 추가로 필요하다고 판단될 때만 별도 승인과 asset-safety 절차를 적용합니다.
- 계획에 적힌 명령은 구현 시점에 실행하며, 이번 문서 작성 단계에서는 실행하지 않습니다.
- 사용자 변경과 무관한 파일을 삭제하거나 reset하지 않습니다. 실패 시 새 변경만 되돌릴 수 있는 작은 패치로 유지합니다.

## Expected File Structure and Responsibilities

```text
work/
  education-webapp-redesign-plan.md       # 이 실행 계획
  education-webapp-redesign-audit.md      # 기준 감사·증거·지원 스킬 상태
  education-webapp-redesign-assets.md     # 자산 분류·보존·롤백 기록
  education-webapp-redesign-report.md     # 구현 후 자동/수동 검증 보고서
design-system/
  MASTER.md                               # 공유 토큰·컴포넌트·반응형 규칙
src/app/
  AppShell.tsx                            # 단계 라우팅·전환 포커스·전역 상태
  app-shell.css                           # 계획·예보·가상·보고서 영역 스타일
eslint.config.js                          # 생성된 Playwright 산출물 lint 제외
src/components/ui/
  StepIntro.tsx                            # 단계 목적·다음 행동 공통 헤더
  ProgressIndicator.tsx                    # 7단계 진행·현재 단계 모바일 요약
  SafetyNotice.tsx                         # compact/full 안전 안내
  ActionButton.tsx                         # required CTA·gi-pulse 계약
src/features/magnifier/
  SymbolMagnifierScreen.tsx                # 기호 학습·기호 변경 포커스
  CareSymbolCard.tsx                       # 기호·뜻·라디오 후보 카드
src/features/plan/
  PlanStageNavigator.tsx                   # 세탁·건조·다림질 작업 단계
  ManagementBoardScreen.tsx                # 초기 계획·그룹화 판정
  CareOptionCard.tsx                       # 단계별 방법 선택 카드
  CurrentPlanSummary.tsx                   # 선택 상태·물/에너지 상대 요약
src/features/forecast/
  DamageForecastScreen.tsx                 # 위험·근거 선택·학생 피드백
  RiskCard.tsx                             # 문자 중심 위험 카드
src/features/simulation/
  VirtualCareScreen.tsx                    # 가상 결과 요약·비교
  BeforeAfterComparison.tsx                # allowed/caution 정적 비교 상태
src/features/revision/
  RevisionScreen.tsx                        # 최초 발견·수정 계획·근거
src/features/report/
  RescueReportScreen.tsx                    # 완료 요약·상세 보고서·재시작
  AchievementChecklist.tsx                  # 성취 증거 5개
  NextActionPanel.tsx                       # 다음 미션 행동
src/content/
  learnerCopy.ts                            # 학생용 용어·문장 단일 출처
  updateHistory.ts                          # 날짜·구분·개선 내역
src/styles/
  tokens.css, base.css, layout.css          # 토큰·기본·공통 레이아웃
  app-shell.css                             # 기능 영역 레이아웃
  accessibility.css, motion.css             # 접근성·모션 대체
src/test/
  app-flow.test.tsx                         # 단계 헤더·전환·공통 접근성
  redesign-flow.test.tsx                    # 단계 소개·기호 전환 포커스
  plan-flow.test.tsx                        # 계획 navigator·선택 배치
  forecast-flow.test.tsx                    # 위험 근거·학생 피드백
  simulation-flow.test.tsx                  # 비교 상태·정적 대체
  report-flow.test.tsx                      # 완료 요약·재시작·출처
e2e/
  learner-flow.spec.ts                      # 5개 미션 끝까지의 회귀
  accessibility.spec.ts                    # 키보드·ARIA·axe·reduced-motion
  responsive.spec.ts                       # 320/375/768/1280/200% 레이아웃
```

`StepIntro.tsx`, `PlanStageNavigator.tsx`, `NextActionPanel.tsx`는 새 파일입니다. 기존 파일은 책임이 커질 경우 위 경로로 기능을 분리하되, 각 파일을 500줄 미만으로 유지합니다.

## Work Items and TDD Sequence

각 작업은 반드시 `실패 테스트 추가 → 최소 구현 → 대상 테스트와 인접 회귀 테스트 통과` 순서로 수행합니다. 실패 단계의 로그와 통과 단계의 명령·결과를 `work/education-webapp-redesign-report.md`에 기록합니다.

### Step 0 — Documentation, baseline, and design tokens

**Files**

- `work/education-webapp-redesign-plan.md`
- `work/education-webapp-redesign-audit.md`
- `work/education-webapp-redesign-assets.md`
- `design-system/MASTER.md`
- `src/styles/tokens.css`
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/app/app-shell.css`
- `src/content/updateHistory.ts`
- `src/content/updateHistory.test.ts`

**Interfaces**

- `UpdateEntry` (`date: string`, `category: UpdateCategory`, `summary: string`)에 2026-08-29 `개발` 항목을 추가합니다.
- `StepIntroProps`는 `eyebrow: string`, `title: string`, `description: ReactNode`, `nextActionLabel?: string`, `titleId?: string`을 갖습니다. 설명은 JSX 문장을 허용하되 학생용 텍스트만 전달합니다.
- 디자인 토큰은 `--color-paper`, `--color-card`, `--color-ink`, `--color-muted`, `--color-accent`, `--color-accent-dark`, `--color-focus`, `--space-*`, `--radius-*`, `--shadow-*`를 유지·확장합니다.

**TDD**

1. `src/content/updateHistory.test.ts`에 ISO 날짜 정렬과 `2026-08-29` 리디자인 요약을 검증하는 실패 테스트를 추가합니다.
2. `src/content/updateHistory.ts`에 한 항목만 추가하고 테스트를 통과시킵니다.
3. `StepIntro` 렌더링과 기호 전환 포커스 테스트를 `src/test/redesign-flow.test.tsx`에 추가해 제목·설명·다음 행동·다음 카드 포커스가 노출되는지 검증합니다.
4. `src/components/ui/StepIntro.tsx`와 토큰·레이아웃 최소 스타일을 구현하고 대상 테스트를 통과시킵니다.

**Acceptance**

- 계획·감사·자산·디자인 시스템 문서가 생성되고, 프로젝트 지침 부재와 지원 스킬 부재가 기록됩니다.
- 업데이트 버튼을 열면 2026-08-29 날짜와 리디자인 요약이 보입니다.
- 모든 새 소스 파일이 500줄 미만입니다.

### Step 1 — Mission cockpit and request CTA hierarchy

**Files**

- `src/app/AppShell.tsx`
- `src/components/ui/ProgressIndicator.tsx`
- `src/components/ui/StepIntro.tsx`
- `src/features/mission/MissionPicker.tsx`
- `src/features/mission/RescueRequestScreen.tsx`
- `src/components/ui/SafetyNotice.tsx`
- `src/styles/layout.css`
- `src/styles/accessibility.css`
- `src/test/app-flow.test.tsx`
- `e2e/accessibility.spec.ts`
- `e2e/responsive.spec.ts`

**Interfaces and behavior**

- `ProgressIndicatorProps`는 기존 `currentStep: SessionStep`을 유지하고, 현재 단계 요약과 현재 `li`의 `aria-current="step"`를 제공합니다.
- 각 단계 제목에 `data-step-heading="true"`, `tabIndex={-1}`를 유지합니다. `AppShell`은 `state.step` 또는 `missionId` 변경 때 `window.scrollTo({top: 0, behavior: 'auto'})` 후 제목에 포커스합니다.
- 미션 picker는 상단 `StepIntro` 뒤에 `mission-grid`를 배치하고, 안전 안내는 핵심 CTA 뒤의 compact 요약으로 시작합니다.
- 요청 화면은 `표시 확대` 버튼을 첫 viewport 우선 영역에 배치하고 실제 라벨·학생 단독 조작 금지 문장을 버튼 가까이에 둡니다.
- 진행 목록은 320px에서 가로 스크롤이 의도임을 `aria-label="7단계 학습 진행, 가로로 이동할 수 있어요"`로 설명하고 현재 단계가 가운데 오도록 보정합니다.

**TDD**

1. `src/test/app-flow.test.tsx`에 첫 화면의 StepIntro, mission card accessible name, 요청 CTA 순서를 검증하는 실패 테스트를 추가합니다.
2. `e2e/accessibility.spec.ts`에 첫 미션 선택 후 제목 포커스와 `scrollY <= 2`를 검증하는 실패 테스트를 추가합니다.
3. `e2e/responsive.spec.ts`에 320px·375px에서 현재 단계 요약과 요청 CTA 경계 검증을 추가합니다.
4. 위 파일을 최소 변경하고 단위·대상 E2E를 통과시킵니다.

**Acceptance**

- 320px과 375px에서 미션 선택 버튼과 업데이트 내역 버튼이 가로 잘림 없이 접근됩니다.
- 요청 화면의 `표시 확대` CTA가 375×812 첫 화면에 보이며 `required-action`과 `gi-pulse`를 가집니다.
- 단계 전환 직후 제목이 포커스되고 스크롤이 문서 상단으로 이동합니다.

### Step 2 — Magnifier focus, symbol clarity, and child copy

**Files**

- `src/content/learnerCopy.ts`
- `src/features/magnifier/SymbolMagnifierScreen.tsx`
- `src/features/magnifier/CareSymbolCard.tsx`
- `src/components/ui/SymbolFigure.tsx`
- `src/styles/layout.css`
- `src/styles/motion.css`
- `src/test/app-flow.test.tsx`
- `src/content/symbols.test.ts`
- `e2e/accessibility.spec.ts`

**Interfaces and behavior**

- `LearnerCopy`는 `materialBoundary`, `scenario`, `gentleCare`, `tumbleDrying`, `professionalCare`, `allowedRange`, `wrongAnswerHint` 문자열을 export합니다.
- `SymbolMagnifierScreen`은 `activeSymbolHeadingRef: RefObject<HTMLHeadingElement | null>`와 `previousSymbolIdRef`를 사용해 올바른 해석 후 다음 기호 제목을 포커스합니다.
- `CareSymbolCard`는 기호 옆에 이름, 공식 표준/학습용 구분, 짧은 의미를 항상 보여 주고 라디오 label에 기호 이름과 후보 의미를 포함합니다.
- `SymbolFigure`는 기존 factual SVG 경로와 alt 텍스트를 유지하며 장식 이미지를 추가하지 않습니다.
- 오답은 `기호 옆 설명에서 온도와 줄 표시를 다시 찾아보세요.`처럼 다시 볼 위치를 알려 주고 내부 `care-*` ID는 렌더링하지 않습니다.

**TDD**

1. `src/test/app-flow.test.tsx`에 기호 전환 후 새 제목 `document.activeElement`와 쉬운 용어 노출을 검증하는 실패 테스트를 추가합니다.
2. `e2e/accessibility.spec.ts`에 radio accessible name, `aria-live="polite"` 피드백, 새 기호 heading 포커스를 검증하는 실패 테스트를 추가합니다.
3. `SymbolMagnifierScreen`에 제목 ref·scroll/focus effect와 `learnerCopy` 연결을 최소 구현합니다.
4. 대상 테스트와 전체 `src/test`를 통과시킵니다.

**Acceptance**

- 기호가 바뀌었을 때 새 기호 제목이 뷰포트 안에 있고 포커스가 이동합니다.
- 기호만 보지 않아도 문자 설명으로 의미를 이해할 수 있습니다.
- 공식 표준 표시와 학습용 아이콘이 구분되고 실제 라벨 대체처럼 보이지 않습니다.

### Step 3 — Plan board and revision cognitive load

**Files**

- `src/features/plan/PlanStageNavigator.tsx`
- `src/features/plan/ManagementBoardScreen.tsx`
- `src/features/plan/CareOptionCard.tsx`
- `src/features/plan/CurrentPlanSummary.tsx`
- `src/features/revision/RevisionScreen.tsx`
- `src/components/ui/SafetyNotice.tsx`
- `src/app/app-shell.css`
- `src/styles/layout.css`
- `src/styles/accessibility.css`
- `src/test/plan-flow.test.tsx`
- `src/test/app-flow.test.tsx`
- `e2e/learner-flow.spec.ts`
- `e2e/accessibility.spec.ts`

**Interfaces and behavior**

- `PlanStageId = 'wash' | 'dry' | 'iron'`을 `src/features/plan/PlanStageNavigator.tsx`에서 export하고 `PlanStageNavigatorProps`는 `activeStage`, `completedStages`, `onStageChange`를 받습니다.
- `CareOptionCardProps`는 기존 `option`, `stageLabel`, `selected`, `onSelect`를 유지하며 버튼 accessible name은 `${option.title} — ${stageLabel} 단계 카드 고르기`입니다.
- `ManagementBoardScreen`은 선택 카드가 없을 때 `먼저 관리 방법 카드 하나를 골라 주세요`를, 선택 후에는 해당 단계만 활성인 `선택한 카드 ${stageLabel} 단계에 놓기`를 제공합니다. 평가 입력과 grouping checkbox는 기존 타입과 `data-*` 계약을 유지합니다.
- `RevisionScreen`은 최초 계획과 발견을 `details` 또는 요약 패널로 접을 수 있게 하고, 수정 편집기는 현재 단계 navigator와 선택 결과를 먼저 보여 줍니다. 기존 12개 옵션과 근거 checkbox는 접근 가능한 DOM에 남깁니다.
- 반복되는 full 안전 안내는 화면당 한 곳으로 줄이고, compact 안내에는 핵심 두 문장과 상세 details를 둡니다.

**TDD**

1. `src/test/plan-flow.test.tsx`에 navigator 현재 단계, 선택 전 안내, 단계 일치 배치 버튼, 수정 화면 요약을 검증하는 실패 테스트를 추가합니다.
2. `e2e/learner-flow.spec.ts`에 카드 선택부터 plan 제출까지 위로 되돌아가지 않고 완료하는 흐름을 검증하는 실패 테스트를 추가합니다.
3. `ManagementBoardScreen`, `PlanStageNavigator`, `RevisionScreen`을 최소 구현하고 기존 plan evaluation 호출은 그대로 둡니다.
4. 대상 단위·E2E와 `src/domain` 전체 테스트를 통과시킵니다.

**Acceptance**

- 관리 카드의 시각 무게가 현재 단계·선택 요약보다 낮고, 학생은 한 번에 한 작업을 따라갈 수 있습니다.
- 수정 화면에서 최초 계획·발견·수정 이유·근거·최종 계획이 모두 남아 있고, 같은 안내 문장이 불필요하게 네 번 반복되지 않습니다.
- checkbox의 `data-grouping-reason-symbol-id`는 input에 있거나 `locator('input')`으로 접근 가능하고, 버튼·label accessible name이 실제 행동과 일치합니다.

### Step 4 — Forecast, virtual result, and report hierarchy

**Files**

- `src/features/forecast/RiskCard.tsx`
- `src/features/forecast/DamageForecastScreen.tsx`
- `src/features/simulation/BeforeAfterComparison.tsx`
- `src/features/simulation/VirtualCareScreen.tsx`
- `src/features/report/RescueReportScreen.tsx`
- `src/features/report/AchievementChecklist.tsx`
- `src/features/report/NextActionPanel.tsx`
- `src/features/report/ManagementCard.tsx`
- `src/app/app-shell.css`
- `src/styles/layout.css`
- `src/styles/motion.css`
- `src/test/forecast-flow.test.tsx`
- `src/test/simulation-flow.test.tsx`
- `src/test/report-flow.test.tsx`
- `e2e/learner-flow.spec.ts`
- `e2e/responsive.spec.ts`

**Interfaces and behavior**

- `RiskCardProps`는 `risk`, `selected`, `onToggle`를 유지하고 문자 제목·관찰 단서·선택 상태 텍스트를 렌더링합니다. glyph만으로 의미를 전달하지 않습니다.
- `BeforeAfterComparisonProps`의 `comparisonState: 'allowed' | 'caution'` 계약을 유지하고, `allowed`와 `caution` 각각에 상태 marker, 상태 제목, 근거 문장을 제공합니다.
- `AchievementChecklistProps`는 `summary: AchievementSummary`를 받아 다섯 성취 증거를 표시합니다.
- `NextActionPanelProps`는 `description: ReactNode`, `actionLabel: string`, `actionId: string`을 받아 보고서 제목 아래의 다음 행동 안내와 실제 마지막 버튼으로 이동하는 anchor를 연결합니다. 중복 버튼은 하나만 실제 submit 역할을 가지며, 패널은 요약·anchor로만 동작합니다.
- 보고서 상단에는 `구조 미션을 끝냈어요!`, 배운 점 2~3개, `다른 미션 해보기`의 다음 행동을 두고, 최초·수정 계획·출처·검수일·안전 문장은 상세 순서로 유지합니다.
- 가상 결과의 모든 일러스트는 CSS 추상 의류와 문자 설명이며 실제 손상 사진이나 제품 이미지를 추가하지 않습니다.

**TDD**

1. `src/test/forecast-flow.test.tsx`에 위험 제목·관찰 단서·학생용 피드백과 `aria-live`를 검증하는 실패 테스트를 추가합니다.
2. `src/test/simulation-flow.test.tsx`에 `allowed/caution` marker와 reduced-motion에서도 남는 정적 텍스트를 검증하는 실패 테스트를 추가합니다.
3. `src/test/report-flow.test.tsx`에 상단 성취 요약, 다음 행동, 출처 details, 재시작 전이를 검증하는 실패 테스트를 추가합니다.
4. 화면·CSS를 최소 구현하고 대상 테스트와 5개 미션 learner-flow 회귀를 통과시킵니다.

**Acceptance**

- 0/1 같은 수치보다 `선택한 위험이 어떤 표시와 연결되는지`를 먼저 읽을 수 있습니다.
- 가상 결과는 실제 손상을 단정하지 않고 현재 가상 조건의 가능성만 설명합니다.
- 보고서 첫 viewport에 완료 사실과 다음 행동이 보이며, 긴 근거는 계속 확인할 수 있습니다.

### Step 5 — Accessibility, responsive, motion, and update verification

**Files**

- `src/styles/accessibility.css`
- `src/styles/motion.css`
- `src/styles/layout.css`
- `src/app/app-shell.css`
- `e2e/accessibility.spec.ts`
- `e2e/responsive.spec.ts`
- `e2e/safety-boundaries.spec.ts`
- `src/test/safety-boundaries.test.tsx`
- `scripts/pages-assets-smoke.mjs`
- `work/education-webapp-redesign-report.md`

**Verification contracts**

- 키보드: Tab/Shift+Tab/Space/Enter/Arrow keys로 첫 미션을 보고서까지 진행하고 각 단계 제목 focus를 확인합니다.
- ARIA: 진행 navigation, 현재 단계, radio/checkbox accessible name, `role="status"`, `aria-live="polite"`, update dialog label을 확인합니다.
- 키보드 빠른 이동: 헤더·진행 목록을 반복해서 지나가지 않도록 `본문으로 건너뛰기` 링크가 `#main-content`로 이동하고 main은 `tabIndex={-1}`을 갖습니다.
- 반응형: 320px·375px·768px·1280px에서 주요 CTA, 현재 단계, report next action의 bounding box가 viewport 안에 있고 `scrollWidth <= clientWidth` 또는 의도된 progress strip 외 overflow가 없습니다.
- 200%: 글자 확대 후 카드·버튼·details가 겹치지 않고 텍스트가 `overflow-wrap: anywhere` 규칙으로 읽힙니다.
- 고대비: 선택 상태는 색 외에 `✓ 선택됨`, 테두리, 상태 텍스트를 가집니다.
- reduced motion: `.gi-pulse`와 garment animation이 `animation: none`이며 `.static-before-after`가 보이고, 필수 배지와 선택 상태가 유지됩니다.
- 안전: 학생 단독 실제 기기 조작 금지, 제품 라벨 우선, 가상 학습 한계 문장이 모든 해당 화면에 남습니다.
- 페이지 자산: 상대 favicon·JS·CSS 경로가 실제 빌드에 존재하고 Pages subpath에서 200으로 로드됩니다.

**TDD / verification order**

1. `e2e/accessibility.spec.ts`에 전체 7단계 키보드 흐름, 각 radio/checkbox 이름, status live region 검증을 추가해 실패를 확인합니다.
2. `e2e/responsive.spec.ts`에 모든 주요 화면을 대표하는 320/375/768/1280/200% 측정과 reduced-motion/high-contrast DOM 검증을 추가해 실패를 확인합니다.
3. CSS와 필요한 aria/label만 최소 수정하고 targeted E2E를 통과시킵니다.
4. `npm run check`, `npm run test:e2e`, `git diff --check`, 파일 줄 수 검사를 통과시킵니다.
5. 실제 VoiceOver는 실행하지 않고, 보고서에 `제외`로 명시합니다.

**Acceptance**

- 자동화된 키보드·ARIA·axe·반응형·고대비·reduced-motion 검증이 통과합니다.
- 320px과 375px에서 미션 선택부터 보고서의 다음 행동까지 완료할 수 있습니다.
- 200% 확대와 모바일 safe-area에서 업데이트 버튼과 마지막 CTA가 가려지지 않습니다.

## Planned Commands and Expected Results

다음 명령은 구현이 끝난 뒤 순서대로 실행합니다. 계획 단계에서는 실행하지 않습니다.

```bash
npm run lint
npm run typecheck
npm test -- --run src/test/app-flow.test.tsx src/test/plan-flow.test.tsx src/test/forecast-flow.test.tsx src/test/simulation-flow.test.tsx src/test/report-flow.test.tsx src/test/safety-boundaries.test.tsx
npm run build
npm run test:pages-assets
npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts e2e/learner-flow.spec.ts e2e/safety-boundaries.spec.ts
npm run check
git diff --check
git status --short --untracked-files=all
find src -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.css' \) -print0 | xargs -0 wc -l | sort -nr | head -n 20
```

Expected results:

- lint, typecheck, targeted Vitest, build, Pages asset smoke, E2E, and `npm run check` exit code 0.
- 5개 미션 learner-flow가 각각 보고서에 도착하고, 보고서에서 새 미션을 선택하면 미션 picker로 돌아갑니다.
- 320/375/768/1280px와 200%에서 주요 CTA의 오른쪽 경계가 viewport 안이며, 오류 콘솔과 외부 runtime network 요청이 없습니다.
- reduced-motion에서는 pulse/garment animation이 없고 정적 상태 텍스트가 있습니다.
- `git diff --check`가 출력 없이 끝나고, status에는 의도한 문서·소스·테스트만 남습니다.

## Rollback and Safety Procedure

1. 각 작업 전 `git status --short --untracked-files=all`과 `git diff --stat`를 기록합니다.
2. 실패한 작업은 해당 작업에서 새로 만든 파일과 변경한 파일만 `git diff -- path/to/file`로 확인합니다.
3. 코드 변경을 되돌릴 때는 해당 파일의 새 hunks를 `apply_patch`로 역적용하고 사용자 변경을 보존합니다. `git reset --hard`, 광범위한 `git clean`, 전체 폴더 삭제는 사용하지 않습니다.
4. UI가 판정 결과를 바꾸면 즉시 작업을 중단하고 `src/domain/*` 호출과 기존 테스트를 먼저 복원합니다.
5. 자산 문제가 발견되면 기존 factual SVG 경로를 복원하고 새 장식 자산은 참조하지 않습니다.
6. 3회 연속 같은 환경 실패가 반복되면 재시도하지 않고 실패 로그·영향·대안을 사용자에게 보고합니다.

## Planned Commit Stages (not executed in this request)

구현 중에는 커밋하지 않습니다. 사용자가 커밋을 별도로 승인하면 다음 단위로 커밋합니다.

1. `docs: record education redesign audit and design system`
2. `feat: clarify mission cockpit and request actions`
3. `feat: focus symbol transitions and streamline planning`
4. `feat: improve forecast simulation and report hierarchy`
5. `test: cover responsive accessibility and safety contracts`

각 커밋 전 대상 테스트·`npm run check`·`git diff --check`를 통과시키며, push·Pages 배포는 별도 사용자 지시 뒤에만 실행합니다.

## Design Requirement Traceability

| 원 설계 요구 | 계획 반영 위치 | 검증 증거 |
|---|---|---|
| 학습 목표·실과 연계 | `Spec > Learner and curriculum contract`, Step 1~4 | 학생용 목표 문장, 7단계 report flow |
| 기존 앱과 차별성 | `Visual thesis`, `Content plan` | 의류 표시·관리 순서 중심 첫 화면/보고서 |
| 핵심 학습 흐름 | `Architecture > State and data flow` | reducer 전이 보존, learner-flow |
| 콘텐츠·판정 모델 | `Preserved boundaries`, Step 2~4 | domain 회귀 테스트, 출처·검수일 보존 |
| 접근성 | `Global Constraints`, Step 5 | keyboard, ARIA, axe, mobile, zoom, contrast, motion |
| 개인정보·안전 | `Safety and privacy spec`, `safety-boundaries` | no upload/network/runtime data tests |
| MVP 5개 미션·6~8개 표시 | `Global Constraints`, Step 2~4 | all-mission E2E와 symbol catalog tests |
| 완료 기준 | 각 Step acceptance와 Step 5 | 375px, keyboard, 200%, high contrast, reduced motion |
| 업데이트 내역 날짜 기록 | Step 0, `updateHistory.ts` | 2026-08-29 history test와 dialog E2E |
| 파일 500줄 미만 | `Global Constraints`, file structure, every step | final line-count command |
| gi-pulse·reduced motion | `Interaction thesis`, Step 5 | required-action selector와 animation computed style |
| 이미지 안전 | `Current Context`, `Global Constraints`, asset doc | factual SVG 유지, imagegen 미호출 기록 |
| VoiceOver 범위 제외 | `Global Constraints`, Step 5 | report에 제외 상태 기록 |

## Completion Definition

구현 완료는 다음을 모두 만족할 때입니다.

- 계획에 적은 안전·교육·콘텐츠·판정 요구가 실제 화면과 테스트에 연결됩니다.
- 5개 미션이 마우스와 키보드로 보고서까지 완료되고, 보고서의 다음 행동이 미션 선택으로 돌아갑니다.
- 학생 화면에 내부 ID, 확정적 손상 보장, 실제 위험 조작 지시가 없습니다.
- 공식 출처·검수일과 실제 라벨 우선 문장이 유지됩니다.
- 320/375/768/1280px, 200%, 고대비, reduced-motion 자동 검증이 통과합니다.
- 변경된 파일은 모두 500줄 미만이며, 업데이트 내역에 2026-08-29 리디자인 기록이 있습니다.
- `work/education-webapp-redesign-audit.md`, `work/education-webapp-redesign-assets.md`, `work/education-webapp-redesign-report.md`가 실제 증거와 보류 항목을 정직하게 기록합니다.
- 커밋·푸시·배포·HVC 등록은 별도 승인 전에는 실행하지 않습니다.

## Self-review Checklist

- [x] 원 설계 문서의 학습 목표, 차별성, 흐름, 콘텐츠·판정, 접근성, 개인정보·안전, MVP, 완료 기준을 각각 작업과 테스트에 연결했습니다.
- [x] 각 작업에 정확한 파일 경로, 타입·인터페이스, 실패 테스트, 최소 구현, 통과 조건을 적었습니다.
- [x] 구현 단계에서 비어 있는 지시나 모호한 자리표시자를 사용하지 않고, 모든 경로·타입·합격 조건을 구체적으로 적었습니다.
- [x] `data-symbol-id`는 outer card에만 두고, `data-care-option-id`는 실제 선택 버튼에 두며, grouping reason 계약은 checkbox input에서 찾을 수 있게 구현했습니다.
- [x] 반복 grouping 버튼은 각 의류 제목을 accessible name에 포함하도록 구현했습니다.
- [x] 본문 스킵 링크와 한국어 region label을 추가해 키보드 반복 탐색과 내부 영어 라벨을 제거했습니다.
- [x] 실제 파일 줄 수·명령 결과·브라우저 수동 관찰을 `work/education-webapp-redesign-report.md`에 실제 값으로 기록했습니다.
