# Education Webapp Redesign Asset Audit

## Decision

이번 리디자인에서는 새 이미지 생성이나 기존 이미지 교체를 하지 않습니다. 현재 화면의 시각 문제는 이미지 해상도보다 정보 계층·카드 밀도·CTA 위치에서 발생했습니다. 따라서 factual 자산은 보존하고 CSS 패널·배지·정적 비교 표현만 개선합니다.

`imagegen`은 이 감사에서 호출하지 않았습니다. 일반 장식 일러스트가 학습 목표를 가리거나 실제 표준 기호와 혼동될 가능성이 있고, 현재 앱에 안전하게 추가할 필요가 없기 때문입니다.

## Asset inventory

| 원본 | 사용 화면 | 역할 | 판정 | 새 파일 | 이유 | 접근성 | 상태 | 롤백 |
|---|---|---|---|---|---|---|---|---|
| `public/symbols/care-wash-30-gentle.svg` | 표시 확대경·보고서 | 세탁 표준 의미를 전달하는 사실 자산 | 자동 교체 금지 | 없음 | 표시 모양과 의미가 공식 출처 검수에 연결됨 | 정보성 `alt`에 표시 이름 사용 | 유지 | JSX 참조를 기존 경로로 유지 |
| `public/symbols/care-tumble-low.svg` | 표시 확대경·보고서 | 건조 조건 사실 자산 | 자동 교체 금지 | 없음 | 점·선·도형이 판정 모델과 연결됨 | 정보성 `alt`에 표시 이름 사용 | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-flat-dry.svg` | 표시 확대경·보고서 | 자연 건조 조건 사실 자산 | 자동 교체 금지 | 없음 | 실제 라벨 해석을 대체하지 않도록 출처 필요 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-iron-low.svg` | 표시 확대경·보고서 | 다림질 열 범주 사실 자산 | 자동 교체 금지 | 없음 | 열 점 개수는 의미 데이터 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-no-iron.svg` | 표시 확대경·보고서 | 다림질 금지 범주 사실 자산 | 자동 교체 금지 | 없음 | 금지 사선은 사실 표기 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-no-bleach.svg` | 표시 확대경·보고서 | 표백 제한 사실 자산 | 자동 교체 금지 | 없음 | 공식 출처와 검수일을 가진 기호 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-no-tumble.svg` | 표시 확대경·보고서 | 기계 건조 제한 사실 자산 | 자동 교체 금지 | 없음 | 도형의 사선이 의미를 전달 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/symbols/care-professional.svg` | 표시 확대경·보고서 | 전문 관리 범주 사실 자산 | 자동 교체 금지 | 없음 | 전문가 확인 문장과 연결됨 | 정보성 `alt` | 유지 | 기존 SVG 경로 복원 |
| `public/app-icon.svg` | favicon·브라우저 탭 | 브랜드 아이콘 | 유지 | 없음 | 기존 앱 식별 자산이며 새 로고가 필요하지 않음 | `link` favicon은 alt 없음 | 유지 | `index.html` 기존 상대 경로 유지 |
| `src/features/simulation/BeforeAfterComparison.tsx`의 CSS 의류 패널 | 가상 결과 | 손상 사실을 주장하지 않는 추상 개념 표현 | 유지·스타일 개선 | 없음 | 실제 사진·측정값이 아니며 가상 상태를 설명하는 보조 UI | 상태 문장으로 의미 전달 | CSS만 개선 | 기존 `.comparison-illustration` 스타일로 복원 |
| `education-redesign-first-impression.png` 및 `.playwright-mcp/page-*.yml` | 감사 임시 산출물 | 기준 화면 기록 | 검토용 임시 파일 | 앱 참조 없음 | 코드 자산이 아니며 기존 앱 배포물에 포함하지 않음 | 해당 없음 | 구현 종료 전 정리 대상 | 파일별로 삭제하고 소스 참조 없음 확인 |

## Generation guardrails

향후 일반 장식 이미지를 추가할 필요가 생기면 다음 조건을 먼저 만족해야 합니다.

1. 이미지가 전달하는 주장을 한 문장으로 적고 사실·수치·정체성 의존 여부를 확인합니다.
2. 어린이용 화면에서 장식 역할과 대비·비율·alt 결정을 정합니다.
3. `/Users/kimhongnyeon/.codex/skills/education-webapp-redesign/references/asset-safety.md`의 생성 규칙을 다시 읽습니다.
4. 원본을 보존하고 `-v2` 버전 파일로 추가하며 JSX/CSS/HTML 참조와 테스트 fixture를 함께 검색합니다.
5. 생성 이미지는 읽을 수 있는 글자·수치·로고·실제 인물·실제 기관을 포함하지 않습니다.

## Rollback

- 사실 SVG를 건드린 변경은 해당 파일을 수정하지 않고, 참조 변경이 발생한 경우 `rg -n "care-(wash|tumble|flat|iron|no|professional)" src public`로 모든 참조를 확인한 뒤 기존 `/symbols/*.svg` 경로로 되돌립니다.
- CSS 의류 패널 변경은 `src/features/simulation/BeforeAfterComparison.tsx`와 `src/app/app-shell.css`의 해당 hunk만 역적용합니다.
- 감사용 PNG·YAML은 앱 코드에서 참조하지 않음을 확인한 후 파일별로 정리합니다.

