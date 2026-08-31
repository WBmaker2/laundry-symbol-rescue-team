# Laundry Symbol Rescue Team Education Redesign Report

## Report scope

- 작업일: 2026-08-29 (Asia/Seoul)
- 대상: `세탁표시 구조대` React/Vite 교육 앱의 안전한 학생용 리디자인
- 기준 문서: `work/education-webapp-redesign-plan.md`, `work/education-webapp-redesign-audit.md`, `work/education-webapp-redesign-assets.md`, `design-system/MASTER.md`
- 제품 경계: 가상 재료·가상 손상 가능성만 다루며 실제 세탁기·다리미·표백제 조작, 업로드·로그인·분석·외부 런타임 요청을 추가하지 않음
- VoiceOver: 사용자 지침에 따라 구현·검증 범위에서 제외
- 커밋·푸시·Pages 배포·HVC 등록: 실행하지 않음

## Skill preflight for this request

- 확인 시각: 2026-08-29 12:24 KST
- `$impeccable`: available; `/Users/kimhongnyeon/.codex/skills/impeccable/SKILL.md`를 읽고 context·detector 규칙을 적용함
- `$ui-ux-pro-max`: available; `/Users/kimhongnyeon/.codex/skills/ui-ux-pro-max/SKILL.md`를 읽고 교육용 앱 디자인 시스템·접근성·반응형 검색을 실행함
- `$redesign-existing-projects`: available; `/Users/kimhongnyeon/.codex/skills/redesign-existing-projects/SKILL.md`를 읽고 기존 React/Vite 구조 보존 원칙을 적용함
- `$imagegen`: available; `/Users/kimhongnyeon/.codex/skills/imagegen/SKILL.md`와 자산 안전 규칙을 읽음. 이번 앱의 8개 factual symbol SVG는 교체 대상이 아니므로 생성하지 않음
- 이 요청에서 확인한 필수 문서: `AGENTS.md` 없음, `EDUCATION_DESIGN.md` 없음, `design-system/MASTER.md`·기존 구현 계획·감사·자산·보고서 존재

## Implemented changes

### 학습 단계 계층

- `src/components/ui/StepIntro.tsx`의 `StepIntroProps`(`eyebrow`, `title`, `description: ReactNode`, `nextActionLabel?`, `titleId?`)를 추가하고 미션 선택, 구조 요청, 표시 확대경, 관리 순서판, 손상 예보, 가상 결과, 계획 수정, 구조 보고서에 단계 목적과 `이번에 할 일`을 일관되게 배치함.
- `src/app/AppShell.tsx`의 단계·미션 전환 effect가 문서 상단으로 즉시 이동하고 새 단계 제목(`[data-step-heading="true"]`)에 포커스를 보냄.
- `src/features/magnifier/SymbolMagnifierScreen.tsx`가 정답 확인 뒤 다음 `CareSymbolCard` 제목을 `scrollIntoView({ block: 'start', behavior: 'auto' })`하고 포커스함. 오답에서는 기존 설명 포커스를 유지함.

### 행동 우선순위와 모바일 읽기

- 구조 요청 화면에서 `표시 확대` 필수 CTA를 안전 안내보다 먼저 배치하고 안전 안내는 핵심 두 문장 + 상세 `<details>`의 compact variant로 축소함.
- `src/features/plan/PlanStageNavigator.tsx`와 `PlanStageNavigatorProps`를 추가해 세탁·건조·다림질 현재 단계, 완료 표시, `aria-current="step"`를 상단에서 확인할 수 있게 함.
- 반복 grouping action은 `함께 관리 — {garment.name}`, `분리 관리 — {garment.name}` accessible name을 사용함.
- `data-symbol-id`는 외곽 `.care-symbol-card`에만, `data-care-option-id`는 실제 선택 버튼에만, `data-grouping-reason-symbol-id`는 checkbox input에만 유지함.

### 결과 이해와 다음 행동

- `src/features/simulation/VirtualCareScreen.tsx`에 `결과 한눈에 보기` 요약을 추가해 세 단계의 허용·주의 상태를 문자로 먼저 보여 줌.
- `src/features/report/NextActionPanel.tsx`의 `NextActionPanelProps`(`description: ReactNode`, `actionLabel`, `actionId`)로 성취 요약·배운 점·`다른 미션 해보기` anchor를 보고서 상단에 배치함. 실제 상태 변경 버튼은 보고서 하단에 하나만 유지함.
- `src/content/learnerCopy.ts`에 재료 경계, 가상 상황, 부드러운 관리, 회전식 건조, 전문 도움, 표시 범위, 오답 힌트를 단일 출처로 정리함.
- `src/content/updateHistory.ts`에 `2026-08-29 / 개발 / 학습 단계별 화면 계층·기호 전환 포커스·결과 요약 개선`을 추가함.

### 스타일·운영 안전

- `src/app/app-shell.css`에 단계 소개, navigator, 결과 요약, 다음 행동 패널의 시각 계층을 추가함. 기존 라이트 모드 팔레트와 factual SVG는 변경하지 않음.
- 필수 교육 CTA에는 기존 `ActionButton`의 `.gi-pulse.required-action`만 사용하며 `src/styles/motion.css`의 `prefers-reduced-motion: reduce`에서 pulse와 의류 애니메이션을 끄고 정적 상태 문장을 남김.
- `eslint.config.js`가 `playwright-report/`, `test-results/`, `.playwright-mcp/` 생성 산출물을 lint 대상에서 제외함. 제품 소스와 테스트는 500줄 미만으로 유지함.
- 키보드 반복 탐색을 줄이는 `본문으로 건너뛰기` 링크를 `#main-content`에 연결하고, 학생 화면에 노출되는 안전·보고서 지역 라벨을 한국어로 정리함.
- Impeccable detector가 경고한 두꺼운 `border-left` 상태 탭을 얇은 경계와 상태 문자·배경으로 바꿔 장식성 스트라이프를 제거함. detector는 HTML parser 모듈 부재로 regex fallback 상태였으며, 최종 `rg` 확인에서 대상 CSS의 `border-left`·inset stripe가 남지 않았습니다.

## TDD evidence

각 보완은 실패 검증 후 최소 구현, 통과 검증 순서로 진행했습니다.

1. `src/test/app-flow.test.tsx`의 단계 소개·기호 전환 요구가 구현 전 실패한 뒤 통과했습니다. 새 `src/test/redesign-flow.test.tsx`로 두 리디자인 테스트를 분리해 파일 길이를 500줄 미만으로 유지했습니다.
2. `src/test/plan-flow.test.tsx`의 관리 단계 navigator 요구가 구현 전 실패한 뒤 11개 테스트 통과로 전환했습니다.
3. `src/content/updateHistory.test.ts`의 2026-08-29 항목 요구가 구현 전 실패한 뒤 통과했습니다.
4. `src/test/simulation-flow.test.tsx`, `src/test/report-flow.test.tsx`에 결과 요약·다음 행동 요구를 추가하고 통과시켰습니다.

## Automated verification

### Passed

최종 `npm run check` 결과:

- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm test`: PASS — 20개 테스트 파일, 232개 테스트
- `npm run build`: PASS — Vite 69 modules transformed
- `npm run test:pages-assets`: PASS — favicon 포함 상대 HTML 참조 3개, symbol SVG 8개
- `git diff --check`: 구현 변경 기준 공백 오류 없음
- `find src -type f ... | xargs wc -l`: 변경·기존 소스의 최대 파일은 `src/styles/layout.css` 477줄이며 500줄 미만
- 추가 보완 검증 시각: 2026-08-29 12:33 KST. `npm run check`가 lint, typecheck, 232개 Vitest, Vite build, Pages 자산 smoke 모두 PASS.

### Playwright MCP manual evidence

- 로컬 앱 `http://127.0.0.1:5178/`에서 320px 초기 화면을 확인했습니다. 앱 shell은 320px 안에 있고 progress strip만 의도된 가로 이동 영역으로 남으며 업데이트 내역 버튼은 44px 높이로 보였습니다.
- 360px에서 첫 미션을 실제 클릭으로 진행했습니다. 구조 요청 CTA가 첫 viewport 안에 있었고, 표시 확대경에서 세 기호를 확인할 때 다음 기호 제목이 viewport 상단으로 이동하고 focus 되었습니다.
- 같은 세션에서 관리 순서판 → 손상 예보 → 가상 결과 → 계획 수정 → 구조 보고서까지 도착했습니다. 보고서 상단에 `구조 미션을 끝냈어요!`, 다섯 성취 항목, `배운 점`, `다음 행동`이 먼저 보였습니다.
- 1280px 보고서에서 상세 근거·출처와 검수일·안전 문장은 요약 아래에 남아 있고, 마지막 `다른 미션 해보기` 버튼은 하나만 실제 전이를 담당했습니다.
- 업데이트 내역을 열었을 때 `2026-08-29` 기록이 표시되고 닫기 버튼에 초기 포커스가 갔습니다.
- `본문으로 건너뛰기` 링크를 키보드 포커스한 뒤 Enter로 실행하면 `#main-content`로 이동하고 main이 포커스를 받는 것을 확인했습니다.
- Playwright MCP 콘솔 확인: 오류 0건, 경고 0건. 네트워크 목록에는 `127.0.0.1:5178`의 앱 모듈·SVG만 있었고 동적 외부 요청은 없었습니다.

### Blocked or pending

- 기본 `npm run test:e2e`는 `reuseExistingServer` 때문에 이미 5173에서 실행 중인 다른 교육 앱(페이지 제목 `도시 기능 입지 심의실`)을 재사용해 셀렉터가 다른 앱에 연결되었습니다.
- 이를 피하려고 `BASE_URL=http://127.0.0.1:5178 npm run test:e2e`를 한 번 실행했으나 macOS Chromium headless가 `mach_port_rendezvous ... Permission denied (1100)`로 시작 직후 종료되었습니다. 20개 테스트가 브라우저 launch 단계에서 실패했으며, 같은 환경 재시도는 중단했습니다.
- 따라서 리디자인 후 Playwright 20개 E2E의 clean-port 통과 증거, 실제 Chrome 200% 확대 자동 검증, 고대비·reduced-motion 자동 검증은 아직 확보하지 못했습니다. CI Ubuntu 또는 권한이 정상인 별도 Chromium 환경에서 한 번 실행해야 합니다.
- Safari·실물 모바일·물리 키보드 확인은 별도 수동 게이트이며 VoiceOver는 계속 범위에서 제외합니다.

## Asset and safety review

- 새 이미지 생성은 호출하지 않았습니다. `public/symbols/*.svg` 8개는 표시 의미·출처·검수일에 연결된 factual asset이므로 보존했습니다.
- 실제 옷·실제 손상 사진, 화학제품 사용법, 브랜드·인물 이미지를 추가하지 않았습니다.
- 브라우저 메모리 상태만 사용하며 학생 식별자·저장소·쿠키·업로드·로그인·분석 SDK를 추가하지 않았습니다.
- 모든 결과 문장은 실제 손상을 확정하지 않고 가상 조건의 가능성으로 표현합니다. 제품 라벨과 제조사 안내, 보호자·교사 확인이 항상 우선입니다.

## Remaining release steps

1. 깨끗한 포트의 Ubuntu CI 또는 권한이 정상인 Chromium에서 계획에 적은 `npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts e2e/learner-flow.spec.ts e2e/safety-boundaries.spec.ts`를 실행하고 20개 테스트와 콘솔·네트워크 결과를 기록합니다.
2. 375px·320px·1280px, 200% 글자 확대, 고대비, reduced-motion에서 주요 CTA·보고서 다음 행동·업데이트 버튼의 bounding box와 겹침을 사람이 확인합니다.
3. 사용자가 별도로 승인하면 의도한 변경만 커밋하고 GitHub push와 Pages 재배포를 수행합니다. 현재 공개 주소는 기존 릴리스이며 이번 미커밋 리디자인은 아직 반영되지 않았습니다.

현재 공개 learner path: [세탁표시 구조대 Pages](https://wbmaker2.github.io/laundry-symbol-rescue-team/)
