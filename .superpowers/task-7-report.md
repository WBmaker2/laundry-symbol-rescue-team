# Task 7 구현 보고서

## 결과

- 커밋: `4e992c0 feat: add mission selection and rescue request`
- 기준 커밋: `5f8791c`
- 작업 범위: 앱 셸, 7단계 진행 표시, 미션 선택, 구조 요청, 안전 안내, 고대비 토글, 미래 단계 placeholder, 테스트 렌더 헬퍼

## TDD 증거

- RED: `npm test -- src/test/app-flow.test.tsx` 실행 시 `./renderApp` 모듈 부재로 실패
- GREEN: `npm test -- src/test/app-flow.test.tsx` → 7 tests passed
- 최종: `npm run check` → lint, typecheck, 135 tests/12 files, production build 모두 통과

## 파일 크기

Task 7 소스·테스트·스타일 파일은 모두 450줄 미만입니다. 가장 긴 파일은 `src/styles/layout.css` 259줄, `src/test/renderApp.tsx` 175줄입니다.

## 접근성·개인정보·안전 선택

- 미션은 native button으로 제목과 학습 초점을 함께 읽고 키보드로 선택합니다.
- 진행 표시는 7개 순서 목록이며 현재 단계만 `aria-current="step"`을 가집니다. 미완료 단계는 링크가 아닙니다.
- 고대비는 AppShell wrapper의 `data-contrast`와 `aria-pressed`만 바꾸며 저장소·document 전역을 변경하지 않습니다.
- 구조 요청의 옷 그림은 장식용 inline SVG(`aria-hidden`)이고 재료 모형·가상 오염·측정 불가 경계를 별도 텍스트로 표시합니다.
- SafetyNotice는 실제 제품 라벨·제조사 안내·보호자·교사 안내 우선과 학생 단독 조작 금지를 함께 알립니다.
- 미래 단계는 완료를 주장하지 않는 semantic placeholder이며, `renderAppAtStep()`은 reducer와 순수 판정 함수로 canonical 선행 상태를 만듭니다.

## 남은 우려

- 표시 해석, 계획, 예측, 수정, 보고서의 실제 학습 UI는 후속 Task에서 교체해야 합니다.
- 현재 Task 7의 `표시 확대`는 다음 단계 placeholder로 이동하며, 표시 콘텐츠와 결과 판정은 아직 노출하지 않습니다.

