# Task 2 보고서 — 공식 출처 검수 게이트와 8개 표시 레지스트리

- 상태: `APPROVED`
- 대상: `laundry-symbol-rescue-team` Task 2 및 리뷰 수정 라운드 1/5
- 검수일: 2026-08-26 (Asia/Seoul)
- 결과: 정확히 8개 후보를 공개 레지스트리에 연결했으며, 모든 후보가 국제 ISO 근거와 국내 공신력 근거를 함께 갖는다.

## 이번 리뷰에서 수정한 차단 이슈

- `높은 온도로 다림질하기`를 `높은 온도도 괜찮다는 오해`로 바꾸고, 위험한 고온 다림질 명령형이 공개 선택지에 다시 들어오지 않도록 회귀 테스트를 추가했다.
- 검증기를 fail-closed로 확장했다. 연결되지 않은 출처도 필수 문자열·날짜·placeholder·승인 상태·파싱 가능한 HTTPS URL을 검사한다.
- 심볼 ID가 요구된 정확한 8개 집합인지, 모든 심볼이 승인된 ISO 출처와 국내 출처를 함께 갖는지 검사한다.
- 의미 선택지 3개 수, ID·문구의 비어 있지 않음과 중복, 정답 ID, `CareOptionId` 제약 ID, `requiresAcknowledgement`의 실제 boolean을 검사한다.
- 라이선스 증거가 없는 `official-standard-symbol`을 공개 검증에서 거부한다. 현재 8개 SVG는 모두 `learning-icon`이다.
- 정확한 고시번호를 확인할 수 없었던 출처와 그에 딸린 적용범위 주장을 제거했다. 국내 근거는 현재 `KS K 0021`과 KATRI 자료로 유지했다.
- 심볼 테스트에서 ID 순서를 내장된 리터럴 8개 배열로 고정하고, 각 `assetPath`가 실제 `public/symbols/*.svg`로 해석되는지 검사한다.

## 공식 출처 확인

모든 등록 출처는 `src/content/sources.ts`에 `status: 'approved'`, HTTPS URL, 접근일과 검수일 `2026-08-26`으로 기록했다. 의미는 최신 국제 1차 출처와 국내 공신력 자료를 대조했다.

| 출처 ID | 발행자·문서 | 공식 HTTPS URL | 표준/문서 ID 및 판·게시일 | 범위·교차 확인 |
|---|---|---|---|---|
| `iso-3758-2023` | ISO, *Textiles — Care labelling code using symbols* | <https://www.iso.org/standard/74401.html> | `ISO 3758:2023`, Edition 4, published 2023-12-06 (페이지 publication month `2023-12`) | Abstract와 적용 범위에서 섬유 관리의 세탁·표백·건조·다림질·전문 관리 그래픽 기호를 확인 |
| `ginetex-care-symbols` | GINETEX, *Care symbols under ISO 3758:2023* | <https://www.ginetex.net/GB/labelling/care-symbols.asp> | `GINETEX ISO 3758:2023 care-symbol overview`, 게시일 명시 없음 | Washing·Bleaching·Drying·Ironing·Professional Care 절에서 숫자·선·점·삼각형 X·원 X·다리미 점·전문 관리 의미와 상표 이용 제한 확인 |
| `ginetex-care-symbols-guide` | GINETEX, *Textile Care Symbols: Care Instructions and Symbols* | <https://www.ginetex.net/userfiles/files/Textile_care_symbols_en.pdf> | `GINETEX Textile Care Symbols guide`, 발행일 명시 없음, 15쪽 | p.2 상표·이용 경계, p.3 세탁, p.6 건조, p.7 다림질, p.8–9 전문 관리, p.14 도해를 교차 확인 |
| `ks-k-0021-2024` | 국가기술표준원·e나라 표준인증, *섬유 제품의 취급에 관한 표시 기호 및 그 표시 방법* | <https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSK0021&menuId=503&tmprKsNo=KSK0021> | `KS K 0021`, 최종개정확인일 2024-12-31 | 국내 섬유 제품 취급 표시 기호의 표준 식별자와 적용범위를 확인 |
| `katri-care-label-cardnews` | KATRI시험연구원, *[카드뉴스 5호] 케어라벨(세탁기호) 어떻게 읽나요?* | <https://katri.re.kr/kr/notice/communityid/76/view.do?idx=16068> | `KATRI 카드뉴스 5호`, 게시 2021-02-19, 첨부 1–8 | 첨부 3 세탁, 4 표백, 5 다림질, 6 드라이클리닝, 7 건조 기호와 국내 설명을 교차 확인 |
| `katri-iso-3758-press` | KATRI시험연구원, *국내 최초 GINETEX ISO 3758 지원 시험실 지정* | <https://katri.re.kr/kr/promotion/communityid/50/view.do?idx=25820> | `KATRI 보도자료`, 게시 2025-03-12 | ISO 3758 지원 시험실 지정, KS K 0021·ISO 3758 부합화 검토 및 GINETEX 상표권을 확인 |

ISO 공식 페이지는 브라우저에서 현재 표준 내용을 확인했으나 자동 `curl` 요청에는 403 봇 차단이 반환되었다. 나머지 다섯 출처는 2026-08-26 HTTPS 요청에서 HTTP 200이었다. ISO의 문서 식별·내용 검수는 공식 브라우저 페이지로 완료했으며 자동 수집 403은 우려 사항으로 남겼다.

`care-wash-30-gentle`, `care-no-bleach`, `care-flat-dry`, `care-tumble-low`, `care-no-tumble`, `care-iron-low`, `care-no-iron`, `care-professional`의 8개 의미는 위 ISO/GINETEX 근거와 `KS K 0021`·KATRI 국내 자료가 일치한다. 공식 SVG 이용권은 확인하지 못했으므로 공식 자산을 복사하지 않고 새 기본 도형 SVG를 만들었다.

## 구현 및 테스트 파일

- `src/domain/careTypes.ts`: 도메인 ID, `SourceRecord`, `MeaningOption`, `CareSymbol`, 검증 오류 코드
- `src/content/sources.ts`: 6개 승인 HTTPS 출처 원장
- `src/content/symbols.ts`: 고정 순서의 정확히 8개 레코드, ISO+국내 source IDs, 3개 선택지, 안전 제약, `learning-icon`
- `src/content/validateContent.ts`: 모든 출처와 심볼을 공개 전에 fail-closed로 검사하는 게이트
- `src/content/validateContent.test.ts`: 출처 필드/URL/상태/placeholder, ID 집합, provenance, 선택지, 정답, 제약, acknowledgement, 라이선스 실패 회귀 테스트
- `src/content/symbols.test.ts`: 리터럴 ID 순서, map 인덱스, 3개 선택지, 안전 문구, 실제 SVG 경로 회귀 테스트
- `public/symbols/*.svg`: 공식 캡처를 복사하지 않은 8개 로컬 교육용 SVG
- `docs/content-review/2026-08-26-symbol-source-audit.md`: 8개 행별 출처·의미·교차 검수와 라이선스 경계
- 이 보고서: 원래 TDD와 리뷰 수정 라운드의 실행 증거

모든 코드·테스트·문서 파일은 500줄 미만이다. 최장 파일은 `src/content/validateContent.ts` 324줄이다.

## TDD 및 명령 실행 증거

### 원래 RED

구현 전 Task 2 테스트를 실행했다.

```text
$ npm test -- src/content/validateContent.test.ts src/content/symbols.test.ts

src/content/symbols.test.ts (0 tests)
Failed to resolve import "./symbols" from "src/content/symbols.test.ts"
src/content/validateContent.test.ts (0 tests)
Failed to resolve import "./validateContent" from "src/content/validateContent.test.ts"

Test Files  2 failed (2)
Tests       0
```

### 원래 GREEN

초기 레지스트리 구현 후 같은 명령이 다음 결과가 되었다.

```text
$ npm test -- src/content/validateContent.test.ts src/content/symbols.test.ts

Test Files  2 passed (2)
Tests       7 passed (7)
```

### 리뷰 수정 라운드 GREEN

리뷰에서 요구한 focused regression을 추가한 뒤 최종 Task 2 테스트를 실행했다.

```text
$ npm test -- src/content/validateContent.test.ts src/content/symbols.test.ts

Test Files  2 passed (2)
Tests       10 passed (10)
Start at 16:29:26
Duration 1.13s
```

최종 품질 게이트도 같은 checkout에서 실행했다.

```text
$ npm run typecheck
> laundry-symbol-rescue-team@1.0.0 typecheck
> tsc -b --pretty false

$ npm run lint
> laundry-symbol-rescue-team@1.0.0 lint
> eslint .

$ npm run build
> laundry-symbol-rescue-team@1.0.0 build
> tsc -b && vite build
✓ built in 130ms

$ git diff --check
# 출력 없음; whitespace 오류 없음

$ wc -l src/domain/careTypes.ts src/content/sources.ts src/content/symbols.ts src/content/validateContent.ts src/content/validateContent.test.ts src/content/symbols.test.ts docs/content-review/2026-08-26-symbol-source-audit.md public/symbols/*.svg
# 모든 파일 500줄 미만; validateContent.ts 324줄, 구현·테스트·검수 문서 합계 1146줄
```

콘텐츠 필드 연결도 확인했다.

```text
$ rg -n "officialUrl|reviewedAt|displayKind|sourceIds|missing-required-provenance|unlicensed-display-kind" src/content docs/content-review
# 6개 source record와 8개 symbol record, 모든 reviewedAt/displayKind/sourceIds 및 두 새 게이트가 검색됨
```

## 자체 검토와 우려

- 공개 validator는 연결되지 않은 출처까지 검사하므로 승인되지 않은 부가 출처를 배열 뒤에 숨길 수 없다. URL은 `URL` 파서로 HTTPS와 hostname을 확인하고, 날짜는 유효한 `YYYY-MM-DD`로 제한한다.
- 공개 심볼은 정확한 ID 집합, 승인된 ISO 출처, 승인된 국내 출처를 모두 충족해야 한다. 의미 선택지와 제약 ID가 스키마 밖으로 나가거나 acknowledgement가 문자열로 바뀌면 차단된다.
- 라이선스 증거가 없는 `official-standard-symbol`은 validator가 `unlicensed-display-kind`로 거부한다. 현재 SVG 8개는 모두 `learning-icon`이며 실제 의류 라벨을 대체하지 않는 문구를 포함한다.
- `care-iron-low`의 선택지는 보호자 확인과 낮은 온도 범위 학습으로 제한했고, 고온 다림질은 명령형이 아닌 오해 설명으로만 남겼다. 실제 도구 사용·뜨거운 다리미·표백제 혼합량·용제 절차는 제공하지 않는다.
- 확인되지 않은 국내 고시번호 출처는 제거했으므로 해당 법정 적용범위를 주장하지 않는다. 국내 근거의 범위는 `KS K 0021`과 KATRI 자료다.
- ISO 자동 요청 403은 재검수 시 반복될 수 있다. 공식 브라우저 페이지의 표준 식별·내용 확인과 원장 기록을 유지한다.
- Task 2는 콘텐츠·검증 게이트만 다루며, 미션/UI와 실제 학습자 흐름은 후속 Task에서 이 게이트를 통과한 데이터만 사용해야 한다.

## 결론

리뷰 라운드의 모든 차단 이슈를 수정했다. 현재 콘텐츠 검증 결과는 `validatePublishedContent({ sources, symbols: careSymbols })`에서 `[]`이고, Task 2 전용 테스트·타입 검사·lint·production build가 모두 통과한다.
