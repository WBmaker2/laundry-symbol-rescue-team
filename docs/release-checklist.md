# 접근성·반응형 릴리스 체크리스트

## 자동 검증

| 날짜 | 명령 | 결과 |
| --- | --- | --- |
| 2026-08-27 | `npm install -D @playwright/test@latest @axe-core/playwright@latest` | PASS · Playwright 1.62.1과 Axe 4.13.0 설치, 취약점 0건 |
| 2026-08-27 | `npx playwright install chromium` | PASS · Chromium 런타임 설치 완료 |
| 2026-08-27 | `npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts` (구현 전 기준) | FAIL 기록 완료 · 375/320px 1열, 고대비 경계 굵기, 기호 카드 문맥, 필수 배지 계약이 구현 전 깨짐 |
| 2026-08-27 | `npm run test:e2e -- e2e/accessibility.spec.ts e2e/responsive.spec.ts` (리뷰 보완 후) | PASS · 13 tests, Chromium 1 worker; 실제 Tab/Shift+Tab/Enter/Space/Arrow 키보드 전체 경로·계산 accessible name·status/live·정확한 8개 심볼·375/320/200% bounding-box·고대비·reduced-motion 포함 |
| 2026-08-27 | `npm run check` | PASS · lint, typecheck, Vitest 19 files/218 tests, production build (`dist/index.html` 510 bytes), Pages asset smoke(2 HTML references·8 SVG) |
| 2026-08-27 | `npm run test:e2e -- e2e/learner-flow.spec.ts` | PASS · 5 tests; basic-t-shirt, soft-scarf, sportswear, decorated-top, mixed-load가 표시 해석 전체·범위 밖 최초 계획·예측·within-limits 수정·구조 보고서까지 완주 |
| 2026-08-27 | `npm run test:e2e` | PASS · Chromium 1 worker, 19 tests (접근성 7·learner-flow 5·반응형 6·안전 1), 19.2초 |
| 2026-08-27 | `find src e2e ... \| xargs -0 wc -l` | PASS · 소스·테스트·E2E·CSS 모두 450줄 미만; 최대 `src/test/app-flow.test.tsx` 449줄 |
| 2026-08-27 | `git diff --check` 및 workflow YAML parse | PASS · 공백 오류 없음, `.github/workflows/deploy-pages.yml` Ruby YAML parse 성공 |
| 2026-08-27 | `dist/index.html`·`dist/symbols/*.svg`·`dist/app-icon.svg` | PASS · index 510 bytes, 공개 심볼 SVG 8개 및 local app icon 생성·확인 |
| 2026-08-27 | `npm run test -- --run src/domain/evaluatePlan.test.ts src/test/app-flow.test.tsx src/test/plan-flow.test.tsx` | PASS · sportswear `care-iron-low` fixture와 status 다중 노드 회귀 포함 115 tests |
| 2026-08-27 | `rg -n 'overflow-x:\s*hidden|!important' src -g '*.css'` | PASS · 일치 0건; overflow masking 없이 scrollWidth와 실제 bounds로 검사 |

## 환경별 확인

| 항목 | 환경·조건 | 2026-08-27 상태 |
| --- | --- | --- |
| 키보드 | Chromium, Tab/Shift+Tab/Enter/Space로 미션 선택·표시 확대·뜻 확인 | 자동 검사 PASS · 첫 미션 키보드 진행과 focus-visible 확인 |
| 스크린 리더 | macOS VoiceOver, `npm run dev -- --host 127.0.0.1`, 미션 선택부터 구조 보고서 | 미실행 · 이 작업 환경에서는 VoiceOver 음성 탐색을 직접 수행한 증거가 없어 수동 승인 불가 |
| Chrome 확대 | Chrome 200%, 1280×800, 미션 선택부터 구조 보고서 | 미실행 · 브라우저 UI Zoom을 정확히 조작한 수동 증거가 없어 자동 200% root 재현으로 대체하지 않음 |
| 모바일 reflow | Chromium CSS viewport 375×812 및 320×812 | E2E로 가로 스크롤·1열·업데이트 버튼을 검증 |
| 고대비 | 앱 고대비 토글, 선택 상태 | E2E로 색·경계 굵기·문자/아이콘 차이를 검증 |
| 모션 감소 | `prefers-reduced-motion: reduce` | E2E로 필수 배지 유지와 장식 모션 제거를 검증 |

## 출시 전 체크와 blockers

- [PASS] 자동 E2E 13개(접근성·반응형)와 `npm run check` 19개 파일/218개 단위·통합 테스트를 2026-08-27에 통과했습니다. native control 이름, 8개 심볼 완전 집합, 단계별 겹침·clipping 검사를 포함합니다.
- [PASS] Task 15 learner-flow 자동 E2E가 5개 미션 모두에서 표시 해석 → 범위 밖 최초 계획 → 가능성 예측 → 허용 범위 수정 → 구조 보고서·실제 라벨 안전 문구까지 통과했습니다.
- [PASS] Task 15 자동 게이트: `npm run check`, `npm run test:e2e`, `git diff --check`, 파일 크기, `dist/index.html` 및 8개 로컬 SVG 자산을 2026-08-27에 확인했습니다. 배포 workflow는 파일만 준비했으며 실행하지 않았습니다.
- [PASS] 안전 경계 자동 검사에서 외부 origin 요청 0건, 파일·이름·학급·브랜드 입력 0개와 금지 API 부재를 확인했습니다. 실제 라벨 우선·가상 결과 한계 문구는 계획·결과·보고서에 표시됩니다.
- [BLOCKER] VoiceOver 수동 읽기 순서·기호 이름·허용 여부·현재 계획 문맥은 사람이 확인해야 합니다.
- [BLOCKER] Chrome 200% 수동 화면에서 텍스트 잘림·조작 겹침·가로 스크롤·focus 가림이 없음을 사람이 확인해야 합니다.
- [BLOCKER] 위 두 수동 검증이 완료되기 전에는 교육용 접근성 릴리스 승인으로 표시하지 않습니다.
