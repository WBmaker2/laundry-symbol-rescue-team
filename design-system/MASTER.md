# Laundry Symbol Rescue Team Design System

## Purpose

이 문서는 초등 학습자가 세탁 표시를 읽고 관리 순서를 결정하는 `세탁표시 구조대`의 공유 시각·상호작용 규칙입니다. 기존 factual symbol SVG와 판정 모델을 보존하면서, 화면마다 같은 읽기 순서와 안전 신호를 제공합니다.

## Visual thesis

따뜻한 종이 위의 구조대 작업대입니다. 학습자는 단서를 하나씩 확대해 보고, 관리 순서를 정하고, 결과를 비교합니다. 화면은 장식보다 `현재 단계 → 할 일 → 필수 행동 → 근거`를 우선하며, 카드가 많아질수록 테두리와 배지의 대비를 낮춰 핵심 CTA가 가장 먼저 보이게 합니다.

## Color tokens

라이트 모드만 사용합니다. `prefers-color-scheme: dark`로 값을 바꾸지 않습니다.

| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#f5f1e8` | 페이지 배경 |
| `--color-card` | `#fffdf8` | 학습 패널·카드 |
| `--color-ink` | `#24313a` | 본문·제목 |
| `--color-muted` | `#5d6a70` | 보조 설명 |
| `--color-accent` | `#e77855` | 필수 CTA·진행 강조 |
| `--color-accent-dark` | `#a6422b` | 테두리·강조 텍스트 |
| `--color-focus` | `#e77855` | 키보드 focus ring |
| `--color-safe-tint` | `rgb(231 120 85 / 10%)` | 안전·피드백 배경 |
| high-contrast paper | `#fff` | 고대비 배경 |
| high-contrast ink | `#000` | 고대비 본문 |
| high-contrast accent | `#004b8d` | 고대비 CTA·포커스 |

색만으로 선택·오류·완료를 전달하지 않습니다. 선택 상태에는 테두리와 문자 상태를 함께 둡니다.

## Typography

- 기본 글꼴: `'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif`
- 서비스 이름: `1.25rem`, `font-weight: 800`
- 단계 제목: `clamp(1.35rem, 3vw, 1.75rem)`, `font-weight: 800`
- 섹션 제목: `1rem~1.2rem`, `font-weight: 800`
- 본문: `1rem`, `line-height: 1.6`
- 보조 문장: `0.88rem~0.95rem`, `line-height: 1.5`
- 한글 본문은 `word-break: keep-all`; URL·코드·출처 링크만 `overflow-wrap: anywhere`.

## Spacing and shape

- 기본 단위: `0.25rem` (4px)
- 간격 단계: 4, 8, 12, 16, 24, 32px
- 카드 radius: `1.25rem` 외곽, `0.75~1rem` 내부 카드
- 경계: 기본 1px `rgb(36 49 58 / 22%)`, 선택 3px accent-dark
- 그림자: `0 0.5rem 1.5rem rgb(36 49 58 / 10%)`
- 버튼·라디오·체크박스·summary의 최소 높이: 44px

## Layout rules

1. 앱 shell은 `width: min(100% - 2rem, 72rem)`이며 45rem 이하에서 1rem 여백으로 줄입니다.
2. 헤더는 서비스 이름·현재 미션·고대비 버튼·진행 목록을 포함합니다.
3. 각 화면 패널은 `StepIntro` 뒤에 핵심 CTA를 두고, 상세 정보와 안전 안내는 그 다음에 둡니다.
4. 45rem 이하에서는 미션·계획·위험·비교 grid를 한 열로 바꿉니다.
5. 진행 목록만 의도적으로 가로 스크롤할 수 있으며, 현재 단계는 summary와 `scrollIntoView`로 보정합니다.
6. footer는 safe-area bottom/right를 존중하며 업데이트 버튼을 44px 이상으로 유지합니다.

## Components

### StepIntro

`StepIntroProps`는 `eyebrow`, `title`, `description: ReactNode`, `nextActionLabel?`, `titleId?`입니다. 제목은 `data-step-heading="true"`, `tabIndex={-1}`를 갖고, 다음 행동이 있으면 description 아래에 짧은 `이번에 할 일` 문장이 붙습니다.

### ActionButton

`ActionButtonProps`의 `emphasis?: 'normal' | 'required'`를 사용합니다. `required`만 `.primary-action.required-action.gi-pulse`를 가지며, 버튼 텍스트와 `필수` badge를 함께 렌더링합니다. 선택·출처·details 버튼에는 pulse를 사용하지 않습니다.

### SafetyNotice

`SafetyNoticeProps`의 `variant?: 'full' | 'compact'`를 사용합니다. 두 variant 모두 다음 두 문장을 항상 보여 줍니다.

- 실제 옷에서는 제품 라벨·제조사 안내·보호자·교사의 안내를 먼저 확인합니다.
- 실제 다리미·뜨거운 물·표백제·세탁기는 학생 혼자 조작하지 않습니다.

제품별 차이, 가상 도구 한계, 전문 도움 문장은 compact의 `<details>` 또는 full 본문에 둡니다.

### ProgressIndicator

`ProgressIndicatorProps`는 `currentStep: SessionStep`입니다. navigation label은 `학습 진행 7단계`, list label은 `7단계 학습 진행, 가로로 이동할 수 있어요`입니다. 현재 단계에는 `aria-current="step"`와 모바일 summary를 제공합니다.

### PlanStageNavigator

`PlanStageId = 'wash' | 'dry' | 'iron'`과 `PlanStageNavigatorProps`(`activeStage`, `completedStages`, `onStageChange`)를 사용합니다. 선택 상태는 `aria-pressed`, 문자 label, accent border로 중복 표시합니다.

### Feedback regions

학생이 선택·제출한 결과는 `role="status" aria-live="polite"` 영역으로 표시합니다. 수치 상세는 `<details>`로 보조하며, 색·아이콘만으로 결과를 표시하지 않습니다.

### Before/after comparison

`comparisonState: 'allowed' | 'caution'`을 사용합니다. `allowed`는 `현재 가상 조건에서 눈에 띄는 변화가 두드러지지 않아요`, `caution`은 `크기·모양·열을 더 살펴볼 가능성이 있어요` 같은 문장을 함께 제공합니다. reduced motion에서도 동일한 정적 패널이 보입니다.

## Motion

- `gi-pulse`는 학생이 반드시 눌러야 하는 CTA에만 사용합니다.
- garment 변형 애니메이션은 설명을 보조할 뿐이며 정보는 정적 문장과 패널로도 전달합니다.
- `@media (prefers-reduced-motion: reduce)`에서 모든 애니메이션과 부드러운 scroll을 끄고, `.static-before-after`를 표시합니다.
- 포커스 이동은 `behavior: 'auto'`로 즉시 수행해 학습자가 현재 위치를 잃지 않게 합니다.

## Accessibility

- 모든 interactive element는 accessible name을 갖습니다.
- 헤더와 7단계 진행 목록 앞에 `본문으로 건너뛰기` 링크를 두고, `#main-content` main은 `tabIndex={-1}`로 키보드 사용자의 빠른 이동을 지원합니다.
- radio/checkbox label은 기호·위험·의류·단계 맥락을 포함합니다.
- `data-symbol-id`는 외곽 기호 카드 하나에만, `data-care-option-id`는 실제 선택 버튼에만 둡니다.
- grouping reason 식별자는 checkbox input 또는 그 input으로 명확히 scope할 수 있는 요소에 둡니다.
- 반복 grouping action에는 의류 제목을 `aria-label`에 포함합니다.
- 200% 확대에서 텍스트가 겹치지 않고 출처 링크만 anywhere wrap을 허용합니다.
- VoiceOver는 이 프로젝트 검증 범위에서 제외합니다. 키보드·ARIA·axe 검증은 유지합니다.

상태·피드백 패널은 색상만으로 구분하지 않고 한국어 상태 문장·얇은 경계·배경 대비를 함께 사용합니다. 장식적인 두꺼운 측면 스트라이프는 사용하지 않습니다.

## Content and safety

- factual care symbol SVG, 공식 출처, 검수일을 보존합니다.
- 실제 제품 라벨이 앱보다 우선하며, 손상은 확정이 아닌 가능성으로 설명합니다.
- 실제 기기 조작, 화학제품 사용법, 계정·업로드·외부 분석을 추가하지 않습니다.
- 학생용 문장에는 `care-*`, `shrinkage` 같은 내부 ID를 노출하지 않습니다.

## Review checklist

- [x] 현재 단계·할 일·필수 CTA가 첫 viewport에서 구분됩니다.
- [x] required CTA 하나만 pulse를 갖고 reduced motion에서 정적 강조가 남습니다.
- [x] 카드 선택·피드백·보고서에 문자 상태가 있습니다.
- [ ] 320px·375px·200%·고대비에서 CTA·업데이트 버튼·보고서 다음 행동이 가려지지 않는지 자동 E2E 재검증이 필요합니다. macOS Chromium launch 권한 오류로 이번 실행에서는 보류했습니다.
- [x] factual asset와 안전·개인정보 문장이 변경되지 않았습니다.
