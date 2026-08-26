# Task 8 구현 보고서

## 결과

- 커밋: `981a4b1769996e5c001c3650fd07b58b76a341b0`
- 제목: `feat: add accessible symbol interpretation`
- 범위: 표시 이미지·문자 해설·확대, 한 번에 하나의 활성 표시, 뜻 후보 해석, 오답 재시도, 미션별 해석 진행, 용어 도움, 안전 안내, fail-closed catalog 오류 화면

## TDD 증거

### RED

구현 전 `npm test -- src/test/app-flow.test.tsx -t "Task 8"` 실행 결과:

- 4개 실패, 1개 기존 통과, 19개 skip
- 실패 원인: magnifier가 `FutureStepPlaceholder`여서 이미지·뜻 확인 버튼·확대 버튼·native radio·진행 텍스트가 없음

### GREEN

구현 후 같은 집중 실행 결과:

- Task 8 테스트 7개 통과
- 테스트한 계약: 문자 설명/표시 구분, `img` alt, 확대 `aria-expanded`, native radio 그룹, 오답 status와 설명 포커스 복귀, 정답 진행, 모든 표시 전 계획 잠금, 중복 표시 1회 해석, 정답 누출 방지, catalog 누락 오류

### 전체 검사

`npm run check` 통과:

- ESLint 통과
- TypeScript typecheck 통과
- Vitest 12개 파일 / 154개 테스트 통과
- Vite production build 통과

## 구현·접근성 결정

- `SymbolFigure`는 `import.meta.env.BASE_URL`을 붙인 실제 `<img>`를 사용하고 `alt={accessibleDescription}`를 유지했습니다. 이름·범주·`공식 취급 표시`/`학습용 아이콘`·짧은 설명은 이미지 옆 문자로 항상 보입니다.
- `CareSymbolCard`는 심볼 ID별 고유 `name`을 가진 native radio 그룹과 native 확대 버튼을 사용합니다. 확대 버튼의 `aria-expanded`는 실제 확대 상태와 연결됩니다.
- 오답은 `evaluateInterpretation()`의 `returnPrompt`를 `role="status" aria-live="polite"`로 알리고, 같은 카드의 문자 설명(`tabIndex="-1"`)으로 포커스를 돌립니다. 카드가 유지되므로 선택을 바꾸고 다시 제출할 수 있으며 reducer에는 모든 시도가 누적됩니다.
- 성공 피드백은 화면 전환 직전에 부모 live region으로 유지해 첫 정답의 관리 행동 연결 문장이 사라지지 않게 했습니다.
- `SymbolMagnifierScreen`은 미션 의류의 심볼 ID를 첫 등장 순서로 고유화해 하나씩만 렌더링합니다. 누락·형식 오류 심볼은 건너뛰지 않고 한국어 오류 화면에서 멈춥니다.
- `용어 도움`은 native `<details>`로 제공하고 `완화 조건`, `회전식 건조`, `전문 관리`, `학습용 재료 모형`을 포함합니다. 실제 라벨 우선 및 보호자·교사 안전 문구도 유지합니다.
- radio `value`에는 정답 ID를 노출하지 않고 표시 문구를 사용하며 `data-correct` 속성을 만들지 않았습니다.

## 파일 크기

| 파일 | 줄 수 |
|---|---:|
| `src/components/ui/SymbolFigure.tsx` | 39 |
| `src/features/magnifier/CareSymbolCard.tsx` | 79 |
| `src/features/magnifier/SymbolMagnifierScreen.tsx` | 120 |
| `src/app/AppShell.tsx` | 88 |
| `src/styles/layout.css` | 429 |
| `src/test/app-flow.test.tsx` | 266 |

모든 변경 파일은 450줄 미만입니다.

## 남은 우려

- `layout.css`가 429줄로 목표 분리 기준(450줄)에 가까우므로 다음 UI 작업에서 추가 스타일을 책임별 CSS로 분리해야 합니다.
- 실제 표준 표시 이미지의 최신 출처·이용 근거는 Task 2 콘텐츠 검수 범위이며, 이 작업은 이미 제공된 catalog를 표시·접근 가능하게 연결하는 범위만 다룹니다.
