# Elementary Web App UX Improvement Report

## Result

초등 학습자 기준으로 확인한 핵심 P1 오답 단서 오류와 P2 카드 과밀을 수정했습니다. 기호별 관찰 단서·재시도 행동을 표시하고, 관리 순서판과 계획 수정 화면에서 현재 단계 카드만 보여 주도록 바꿨습니다. 기존 5개 미션, 8개 factual SVG, 판정 함수·reducer, 라이트 모드, 안전·개인정보 경계는 유지했습니다.

- 작업일: 2026-08-31 (Asia/Seoul)
- 대상: `/Volumes/ External Drive 256G/Dev2/codex/laundry-symbol-rescue-team`
- 실행 모드: `full`
- 주 페르소나: 초등 5~6학년 서윤
- 가드레일 페르소나: 초등 3~4학년 준호
- VoiceOver: 요청 범위에서 제외
- 커밋·푸시·GitHub Pages 배포·HVC 등록: 실행하지 않음

## Stage 0 and routing

- Stage 0 preflight: `ready`
- 브라우저 증거: `playwright`, `playwright-interactive` 사용 가능
- UX·시각 검토: `impeccable` 사용, 최종 detector 1회 실행 결과 `[]`
- 구현 검토: `frontend-skill`, `redesign-existing-projects`, `design-system` 지침 적용
- `ui-ux-pro-max`: 파일 시스템 사본은 확인했으나 현재 런타임 도구로 호출하지 않음
- 이미지 생성: 호출하지 않음. 8개 SVG가 의미·출처·검수일에 연결된 factual 자산이라 `verified-asset-preserve` 결정

## Findings and fixes

| ID | 등급 | 문제 | 수정 | 검증 |
| --- | --- | --- | --- | --- |
| EDU-UX-001 | P1 | `care-no-bleach` 오답에도 온도·줄을 보라고 안내 | `interpretationRetryHints`로 8개 기호의 숫자·선·점·모양 단서를 연결하고 `아직 맞지 않아요… 다른 뜻을 골라 보세요`를 표시 | `src/domain/evaluateInterpretation.test.ts`, `src/content/learnerCopy.test.ts`, Playwright MCP 오답 상태 |
| EDU-UX-002 | P2 | 계획·수정 화면에 12개 카드가 한꺼번에 노출 | `activeStage` 기준 `visibleCareOptions` 필터, 수정 모드는 세탁→건조→다림질 순서로 자동 이동 | `src/test/plan-stage-filter.test.tsx`, `src/test/revision-flow.test.tsx`, 320/375 브라우저 |
| EDU-UX-003 | P2 | 단계 버튼을 눌렀을 때 카드 범위 변화가 설명되지 않음 | `stage-option-hint` 상태 문장 추가, 현재 단계와 표시 카드 수가 일치 | Vitest, responsive E2E 계약 갱신, 320/375 브라우저 |

## Implemented files

이번 보완의 핵심 파일은 다음과 같습니다.

- 콘텐츠·판정: `src/content/learnerCopy.ts`, `src/domain/evaluateInterpretation.ts`
- 회귀 테스트: `src/content/learnerCopy.test.ts`, `src/domain/evaluateInterpretation.test.ts`, `src/test/plan-stage-filter.test.tsx`, `src/test/revision-flow.test.tsx`, `src/test/app-flow.test.tsx`
- 계획 UI: `src/features/plan/ManagementBoardScreen.tsx`, `src/app/app-shell.css`
- 브라우저 계약: `e2e/accessibility.spec.ts`, `e2e/learner-flow.spec.ts`, `e2e/responsive.spec.ts`, `e2e/safety-boundaries.spec.ts`
- 운영 기록: `src/content/updateHistory.ts`, `src/content/updateHistory.test.ts`
- 검토 문서: `work/elementary-webapp-ux-plan.md`, `work/elementary-webapp-ux-audit.md`, `work/elementary-webapp-ux-language-audit.md`, `work/elementary-webapp-ux-simulation-decision.md`

기존 리디자인에서 이미 변경된 다른 파일은 별도 작업으로 보존했으며, 이번 보완에서 되돌리지 않았습니다.

## TDD evidence

1. 오답 단서: 새 기대를 먼저 추가한 상태에서 3개 테스트가 실패했습니다. 단서 맵과 evaluator를 최소 구현한 뒤 2개 파일 6개 테스트가 통과했습니다.
2. 카드 필터: 구현 전 12개 카드가 보여 새 필터 테스트 2개가 실패했습니다. `visibleCareOptions`와 단계 안내를 적용한 뒤 2개 테스트가 통과했습니다.
3. 기존 앱 흐름의 오답 기대 문구를 새 학습 문구로 갱신하고 전체 Vitest로 회귀했습니다.

## Automated verification

`npm run check` PASS:

- ESLint PASS
- TypeScript typecheck PASS
- Vitest PASS — 23개 파일, 237개 테스트
- Vite build PASS — 69 modules transformed
- Pages asset smoke PASS — HTML 상대 참조 3개, symbol SVG 8개
- `git diff --check` PASS
- 소스 최대 파일 477줄(`src/styles/layout.css`), 500줄 제한 준수
- Impeccable detector PASS — 결과 `[]`

Vitest의 `Window's scrollTo() method` 메시지는 jsdom이 scrollTo를 구현하지 않았다는 비차단 경고이며 테스트 실패가 아닙니다.

## Playwright MCP evidence

로컬 `http://127.0.0.1:5178/`에서 새로 확인했습니다.

- 1280px: 제목 `세탁표시 구조대`, document scrollWidth 1265/clientWidth 1265, 업데이트 내역 버튼 높이 44px. 업데이트 dialog에 `2026-08-31 / 접근성 / 표시별 오답 단서와 단계별 관리 카드 보기 개선`이 보이고 열 때 `닫기`에 포커스가 갔습니다. 고대비 모드에서 `data-contrast="high"`, 버튼 경계 3px를 확인했습니다.
- 375px: 첫 미션 → 표시 확대 → 세 기호 정답 → 계획에서 초기 카드 3개와 `지금은 세탁 카드만 보여요…`를 확인했습니다. 세탁 배치 후 건조 카드 5개, 건조 배치 후 다림질 카드 4개로 전환하며 선택 상태를 지웠습니다. 계획 화면 높이는 기존 약 4,484px 관찰값보다 줄어든 약 2,989px입니다. 수정 화면은 카드 3개로 시작하고 약 4,375px입니다.
- 320px: 같은 첫 미션을 보고서까지 완료했습니다. 계획 초기 카드 3개, 수정 초기 카드 3개, 보고서 제목 `구조 보고서`, `다음 행동` 패널을 확인했습니다. 보고서 document scrollHeight는 약 4,734px이며 업데이트 버튼은 44px입니다.
- 오답 회복: `care-no-bleach`에서 `산소계 표백만 허용하기`를 고르면 상태 영역이 `아직 맞지 않아요. 이 표시에서 삼각형 안의 엑스를 다시 찾아보고 다른 뜻을 골라 보세요.`가 됩니다. 이전의 `온도와 줄` 문장은 사라졌습니다.
- 콘솔·네트워크: 320px 전체 경로에서 오류 0, 경고 0, 동적 외부 요청 0을 확인했습니다. 정적 요청은 로컬 앱 모듈·SVG뿐입니다.

## Acceptance gate

- 해결되지 않은 P0: 0개
- 해결되지 않은 P1: 0개(EDU-UX-001 해결)
- 학생용 문구 장부: [work/elementary-webapp-ux-language-audit.md](</Volumes/ External Drive 256G/Dev2/codex/laundry-symbol-rescue-team/work/elementary-webapp-ux-language-audit.md>)
- 시뮬레이션 결정 장부: [work/elementary-webapp-ux-simulation-decision.md](</Volumes/ External Drive 256G/Dev2/codex/laundry-symbol-rescue-team/work/elementary-webapp-ux-simulation-decision.md>) — `not-needed`
- 핵심 경로·모바일·키보드의 완전한 release score: 자동 E2E 환경과 실제 학생 probe가 남아 있어 정량 점수는 산정하지 않았습니다.
- 현재 게이트: `conditional` — P0/P1은 없고 로컬 코드·Vitest·MCP 대표 경로는 확인했지만, macOS Chromium 권한 오류로 CLI Playwright 전체 실행과 실제 학생·교사·Safari 수동 확인이 남았습니다.

## Not run / blocked

- `npm run test:e2e` 전체 실행: 이전 두 번의 macOS Chromium `mach_port_rendezvous … Permission denied (1100)` 이후 같은 실패를 반복하지 않고 `blocked`로 유지했습니다. CI Ubuntu 또는 권한이 정상인 Chromium에서 아래 명령을 실행해야 합니다.

```bash
npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts e2e/learner-flow.spec.ts e2e/safety-boundaries.spec.ts
```

- 실제 초등학생·교사 comprehension probe: `not run`. 자동 상태·문구 검증을 학생 승인으로 표현하지 않습니다.
- Safari·실물 모바일·물리 키보드: `not run`.
- VoiceOver: 범위 제외.

## Learner takeaway and next action

학습자는 오답 뒤 현재 그림에서 다시 볼 모양을 알고 다른 뜻을 고를 수 있고, 관리 계획에서는 지금 필요한 단계 카드만 보며 세탁→건조→다림질 순서를 따라갈 수 있습니다. 다음 권장 작업은 CI의 깨끗한 Chromium에서 갱신한 E2E 계약을 실행한 뒤, 교사가 320px·375px에서 한 명의 학생에게 문장을 자기 말로 다시 설명해 보게 하는 수동 확인입니다.

현재 공개 learner path(이번 미커밋 변경 전 공개본): [세탁표시 구조대 Pages](https://wbmaker2.github.io/laundry-symbol-rescue-team/)
