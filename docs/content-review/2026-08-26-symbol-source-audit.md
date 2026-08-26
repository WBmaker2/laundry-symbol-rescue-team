# 세탁표시 구조대 — 8개 표시 공식 출처 검수 기록

- 검수 상태: `APPROVED` (2026-08-26)
- 검수 범위: Task 2에서 공개할 8개 학습용 표시의 의미, 적용 범위, 국내 교차 확인, 표시 이용 경계
- 검수자 기준일: 2026-08-26 (Asia/Seoul)
- 공개 원칙: 실제 표준 기호의 이용권을 확인하지 못했으므로 공개 SVG는 모두 `learning-icon`이다. 실제 의류 라벨을 복제하거나 대체하지 않는다.

## 출처 원장

모든 출처는 HTTPS이고 `src/content/sources.ts`에서 `status: 'approved'`로 등록했다. 날짜가 원문에 없을 때는 추정하지 않고 “명시되지 않음”으로 기록했다.

2026-08-26에 각 URL을 HTTPS로 요청해 확인했다. GINETEX HTML·PDF, e나라 표준인증, 국가법령정보센터, KATRI 카드뉴스·보도자료는 HTTP 200을 반환했다. ISO 표준 페이지는 공식 브라우저 검수에서 현재 문서 내용이 확인되었지만, 자동 `curl` 요청에는 사이트의 403 봇 차단이 응답했다. 이는 문서 식별·내용 검수 실패가 아니라 ISO 웹 서버의 자동 요청 제한으로 기록하며, 출처는 공식 HTTPS URL을 유지한다.

| ID | 발행자·문서 | 공식 URL | 표준/문서 식별자 | 판·게시일 | 접근·검수일 | 적용 범위와 확인 위치 |
|---|---|---|---|---|---|---|
| `iso-3758-2023` | ISO, *Textiles — Care labelling code using symbols* | <https://www.iso.org/standard/74401.html> | `ISO 3758:2023` | Edition 4, 2023-12-06 (페이지의 publication month `2023-12`) | 2026-08-26 / 2026-08-26 | ISO 표준 페이지의 Abstract, General information, `Published`, 적용 제외 범위 및 세탁·표백·건조·다림질·전문 관리 범위 |
| `ginetex-care-symbols` | GINETEX, *Care symbols under ISO 3758:2023* | <https://www.ginetex.net/GB/labelling/care-symbols.asp> | `GINETEX ISO 3758:2023 care-symbol overview` | 현재 웹 개요; 게시일은 페이지에 명시되지 않음 | 2026-08-26 / 2026-08-26 | `EXISTING CARE SYMBOLS UNDER ISO 3758:2023`, Washing·Bleaching·Drying·Ironing·Professional Care 절. 세탁통의 숫자·선, 삼각형 X, 자연/회전식 건조, 다리미 점, 전문 관리와 이용권 제한 확인 |
| `ginetex-care-symbols-guide` | GINETEX, *Textile Care Symbols: Care Instructions and Symbols* | <https://www.ginetex.net/userfiles/files/Textile_care_symbols_en.pdf> | `GINETEX Textile Care Symbols guide` | PDF 발행일은 문서에 명시되지 않음 (15쪽) | 2026-08-26 / 2026-08-26 | PDF p.2 Basic principles(상표·이용 제한), p.3 Washing, p.6 Drying, p.7 Ironing, p.8–9 Professional textile care, p.14 표 도해 |
| `ks-k-0021-2024` | 국가기술표준원·e나라 표준인증, *섬유 제품의 취급에 관한 표시 기호 및 그 표시 방법* | <https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSK0021&menuId=503&tmprKsNo=KSK0021> | `KS K 0021` | 최종개정확인일 2024-12-31 | 2026-08-26 / 2026-08-26 | 기본정보·일반정보의 표준 번호, 담당 부처, 적용범위(세탁 등의 취급 방법을 알리기 위한 섬유 제품 표시 기호) 확인 |
| `kats-home-textile-annex-1` | 국가기술표준원·국가법령정보센터, *안전기준 가정용 섬유제품 부속서 1* | <https://www.law.go.kr/LSW/flDownload.do?bylClsCd=200209&flNm=%5B%EB%B6%80%EC%86%8D%EC%84%9C+1%5D+%EA%B0%80%EC%A0%95%EC%9A%A9+%EC%84%AC%EC%9C%A0%EC%A0%9C%ED%92%88&flSeq=154756305> | `안전기준 가정용 섬유제품 부속서 1` | PDF 개정 이력 2024-03-07 (고시번호 표기 `국가기술표준원고시 제2024-XXXX호`) | 2026-08-26 / 2026-08-26 | p.1 적용범위·인용표준에서 `KS K 0021` 확인. 만 14세 이상 가정용 제품 기준이므로 어린이제품 법정 적용으로 확대하지 않음 |
| `katri-care-label-cardnews` | KATRI시험연구원, *[카드뉴스 5호] 케어라벨(세탁기호) 어떻게 읽나요?* | <https://katri.re.kr/kr/notice/communityid/76/view.do?idx=16068> | `KATRI 카드뉴스 5호` | 2021-02-19, 첨부 이미지 1–8 | 2026-08-26 / 2026-08-26 | 국내 공인 섬유시험연구원의 소비자용 카드뉴스. 첨부 3 세탁, 4 표백, 5 다림질, 6 드라이클리닝, 7 건조의 기호와 설명을 의미 교차 확인에 사용 |
| `katri-iso-3758-press` | KATRI시험연구원, *국내 최초 GINETEX ISO 3758 지원 시험실 지정* | <https://katri.re.kr/kr/promotion/communityid/50/view.do?idx=25820> | `KATRI 보도자료 2025-03-12; ISO 3758 지원 시험실 지정` | 2025-03-12 | 2026-08-26 / 2026-08-26 | 본문에서 ISO 3758의 세탁·드라이클리닝·건조 기호 범위, KS K 0021과 ISO 3758 부합화 검토, GINETEX 상표권을 확인. 본문 도해 이미지도 확인 |

## 출처 교차 검수 결론

ISO의 최신 공개 표준 페이지는 기호 체계의 목적을 “섬유 제품의 관리 과정에서 돌이킬 수 없는 손상을 일으키지 않는 가장 강한 처리”를 알리는 것으로 설명하고, 가정용 세탁·표백·건조·다림질과 전문 섬유 관리를 범위에 둔다. 국내 e나라 표준인증은 현재 `KS K 0021`의 최종개정확인일을 2024-12-31로 제시하고 같은 취급 표시 기호의 적용범위를 확인한다. KATRI는 2025-03-12 보도자료에서 ISO 3758 지원 시험실 지정, KS K 0021과 ISO 3758의 부합화 검토, GINETEX 상표권을 함께 확인한다.

의미가 두 출처에서 일치하는지 다음처럼 확인했다.

- **세탁**: GINETEX HTML의 Washing 절은 세탁통 숫자를 최대 온도, 한 줄을 더 약한 기계 작용으로 설명한다. KATRI 카드뉴스 첨부 3은 `약 30°C`, `중성`, `약하게`를 함께 설명한다.
- **표백**: GINETEX HTML의 Bleaching 절은 삼각형과 대각선 X를 표백 금지로 설명한다. KATRI 카드뉴스 첨부 4는 염소·산소 표백제 사용 불가의 X 도해를 보여 준다.
- **평평하게 자연 건조**: GINETEX HTML/PDF는 네모 안 가로선을 flat drying으로 설명한다. KATRI 카드뉴스 첨부 7의 `뉘어서 건조`는 같은 자연 건조 범위를 국내 용어로 확인한다.
- **낮은 열 회전식 건조**: GINETEX HTML/PDF는 네모 안 원을 회전식 건조로, 점을 열 수준으로, mild process를 낮은 열로 설명한다. KATRI의 2025 ISO 3758 도해와 카드뉴스 첨부 7의 기계건조 범주가 국내 안내의 기계건조 체계와 일치하는지 교차 확인했다.
- **회전식 건조 금지**: GINETEX HTML/PDF의 네모 안 원 X는 회전식 건조 금지다. KATRI 카드뉴스 첨부 7도 `기계건조 금지` X를 제시한다.
- **낮은 온도 다림질**: GINETEX HTML은 다리미 점 하나를 최대 120°C 범위로 설명한다. KATRI 카드뉴스 첨부 5는 점 하나를 80~120°C로 설명한다. 앱에서는 실제 기구 조작을 지시하지 않고 보호자 확인을 요구한다.
- **다림질 금지**: GINETEX HTML의 다리미 X는 금지이며 KATRI 카드뉴스 첨부 5도 `다림질 금지` X를 제시한다.
- **전문 관리**: GINETEX HTML/PDF는 원 안 기호가 전문가가 수행하는 드라이·웨트클리닝의 범위를 알려 주고 가정용 세탁기로 달성할 수 없는 전문 웨트클리닝 조건을 설명한다. KATRI 카드뉴스 첨부 6은 국내 `드라이클리닝` 범주를, KATRI 2025 보도자료는 국내 시험기관의 ISO 3758 전문성을 확인한다. 앱은 특정 용제나 제품 절차를 제시하지 않고 보호자·전문가 확인으로 제한한다.

따라서 위 8개 내부 후보는 의미·범주·안전한 학습 범위가 모두 검수되었고, 미검증 후보를 완화하여 넣지 않았다. `BLOCKED` 후보는 없다.

## 8개 공개 레코드 검수표

모든 행의 검수일은 `2026-08-26`이며 `sourceIds`에는 최소 ISO, GINETEX, 최신 국내 KS 식별자, KATRI 자료를 넣었다. 공식 도형과 앱 도형의 이용 근거가 분리되어 있으므로 모든 `displayKind`는 `learning-icon`이다.

| 내부 ID | 범주·공식 명칭 및 의미 범위 | 공식 URL·표준 번호/문서 식별자 | 판·게시일 / 접근·검수일 | 페이지·절·도표 위치와 교차 결과 | 표시 이미지 이용 근거·구분 |
|---|---|---|---|---|---|
| `care-wash-30-gentle` | 세탁 / `30°C mild fine wash`; 숫자 30과 한 줄을 30°C의 약한 과정으로만 사용 | ISO <https://www.iso.org/standard/74401.html>, `ISO 3758:2023`; GINETEX <https://www.ginetex.net/GB/labelling/care-symbols.asp>; 국내 `KS K 0021`, KATRI 카드뉴스 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | ISO Abstract/범위, GINETEX Washing의 한 줄·30°C 설명, KATRI 첨부 3의 `약 30°C·약하게`가 일치 | GINETEX 상표 이용권 미확인 → 직접 복제하지 않은 세탁통·숫자·한 줄 학습용 redraw |
| `care-no-bleach` | 표백 / `Do not bleach`; 삼각형 X를 표백 금지로 사용 | ISO `ISO 3758:2023`; GINETEX Bleaching; 국내 `KS K 0021`, KATRI 카드뉴스 첨부 4 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | GINETEX Bleaching 절의 St. Andrew’s Cross, KATRI 첨부 4의 염소·산소 표백 불가 도해가 일치 | 삼각형·X를 단순 도형으로 새로 그린 `learning-icon`; 공식 라벨을 대신하지 않음 |
| `care-flat-dry` | 건조 / `Flat drying`; 네모 안 가로선 하나를 평평하게 펴서 자연 건조하는 범위로 사용 | ISO `ISO 3758:2023`; GINETEX Drying; 국내 `KS K 0021`, KATRI 첨부 7 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | GINETEX Natural drying의 flat drying 설명과 KATRI 첨부 7 `뉘어서 건조`가 의미상 일치 | 네모·가로선만 사용한 새 local redraw; 그늘 등 추가 조건은 실제 라벨 확인으로 남김 |
| `care-tumble-low` | 건조 / `Mild tumble drying`; 네모 안 원과 점 하나를 낮은 열 회전식 건조 범위로 사용 | ISO `ISO 3758:2023`; GINETEX Drying; 국내 `KS K 0021`, KATRI ISO 3758 도해 | ISO 2023-12-06; KS 2024-12-31; KATRI 2025-03-12 / 2026-08-26 / 2026-08-26 | GINETEX Tumble drying의 원·점·mild(60°C) 설명과 KATRI ISO 도해의 국내 지원 범위를 교차 확인 | 네모·원·점만으로 새 local redraw; 실제 기기 설정 지시가 아님 |
| `care-no-tumble` | 건조 / `Do not tumble dry`; 네모 안 원 X를 회전식 건조 금지로 사용 | ISO `ISO 3758:2023`; GINETEX Drying; 국내 `KS K 0021`, KATRI 첨부 7 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | GINETEX `Do not tumble dry`와 KATRI `기계건조 금지` 도해가 일치 | 네모·원·X를 새로 구성한 `learning-icon`; 건조기 제품 조작은 안내하지 않음 |
| `care-iron-low` | 다림질 / `Iron at low temperature`; 다리미 점 하나를 낮은 열 범위로 사용 | ISO `ISO 3758:2023`; GINETEX Ironing; 국내 `KS K 0021`, KATRI 첨부 5 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | GINETEX 점 하나·최대 120°C와 KATRI 첨부 5 80~120°C가 일치 | 단순화한 다리미·점 redraw; `보호자와 확인`을 accessible text에 넣고 뜨거운 도구 지시를 제외 |
| `care-no-iron` | 다림질 / `Do not iron`; 다리미 X를 다림질 금지로 사용 | ISO `ISO 3758:2023`; GINETEX Ironing; 국내 `KS K 0021`, KATRI 첨부 5 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19 / 2026-08-26 / 2026-08-26 | GINETEX `Do not iron`과 KATRI 첨부 5의 다림질 금지 X가 일치 | 단순화한 다리미·X redraw; 공식 도형 재사용권을 주장하지 않음 |
| `care-professional` | 전문 관리 / 전문 드라이·웨트클리닝 범위를 보호자·전문가와 먼저 확인 | ISO `ISO 3758:2023`; GINETEX Professional Care; 국내 `KS K 0021`, KATRI 첨부 6 및 2025 보도자료 | ISO 2023-12-06; KS 2024-12-31; KATRI 2021-02-19·2025-03-12 / 2026-08-26 / 2026-08-26 | GINETEX Professional Care p.8–9와 KATRI 드라이클리닝 카드가 전문 처리 범주를 확인. 앱은 용제·가정용 절차를 제시하지 않음 | 원 안 `P`를 새로 그린 교육용 표시. 보호자·전문가 확인 문구와 실제 라벨 우선 경계를 함께 표시 |

## 표시 이용·안전 결정

GINETEX HTML은 보호 기호를 특별 라이선스 없이 제작·사용할 수 없다고 알리고, GINETEX PDF p.2도 상표의 무단 재현·사용 제한을 명시한다. KATRI 2025 보도자료도 GINETEX가 케어라벨 기호 상표권을 보유한다고 확인한다. 이 저장소에는 공식 이미지 파일이나 캡처를 복사하지 않았다. `public/symbols/*.svg`는 기본 도형만으로 만든 새 로컬 redraw이며 파일 주석에도 이 사실을 남겼다.

모든 기호의 `accessibleDescription`·`shortDescription`에 다음 경계를 함께 넣었다.

> 학습용 아이콘이며 실제 의류 라벨 표시를 대신하지 않아요.

또한 표백제 혼합량·세탁기 조작 순서·뜨거운 다리미 사용·특정 용제 사용법을 제공하지 않는다. `care-iron-low`는 보호자 확인을 요구하고 `care-professional`은 보호자·전문가에게 관리 범위를 묻도록 한다. 앱의 이후 결과 화면도 실제 제품 라벨과 제조사 안내, 보호자·교사의 안내를 우선해야 한다.

## 구현 계약

- `src/domain/careTypes.ts`: `CareStage`, `CareSymbolId`, `CareOptionId`, `DamageRiskId`, `SourceRecord`, `MeaningOption`, `CareSymbol`, `ContentValidationIssue` 및 검증 코드 타입
- `src/content/sources.ts`: 위 7개 HTTPS 출처의 승인 원장
- `src/content/symbols.ts`: 고정 순서의 정확히 8개 레코드와 `careSymbolById` 인덱스
- `src/content/validateContent.ts`: 심볼 수, 중복 ID, 출처 존재·승인·HTTPS, 검수일 일치, 접근성 텍스트, 표시 구분, 정답 선택지, 제약 집합 게이트
- `src/content/validateContent.test.ts`: 공개 통과와 각 실패 게이트의 RED/GREEN 회귀 테스트
- `src/content/symbols.test.ts`: 고정 순서, 인덱스, 3개 선택지, 학습용 아이콘 경계 테스트
- `public/symbols/*.svg`: 외부 공식 자산을 복사하지 않은 8개 로컬 학습용 SVG

## TDD 실행 증거

### RED

구현 파일을 만들기 전, Task 2 전용 테스트를 실행했다.

```text
$ npm test -- src/content/validateContent.test.ts src/content/symbols.test.ts

❯ src/content/symbols.test.ts (0 tests)
  Failed to resolve import "./symbols" from "src/content/symbols.test.ts"
❯ src/content/validateContent.test.ts (0 tests)
  Failed to resolve import "./validateContent" from "src/content/validateContent.test.ts"

Test Files  2 failed (2)
Tests       0
```

두 테스트가 아직 존재하지 않는 구현 모듈을 가리키므로 의도한 RED 상태임을 확인한 뒤 타입, 출처 원장, 심볼 레코드, 검증기와 로컬 SVG를 구현했다.

### GREEN

```text
$ npm test -- src/content/validateContent.test.ts src/content/symbols.test.ts

✓ src/content/validateContent.test.ts (4 tests)
✓ src/content/symbols.test.ts (3 tests)

Test Files  2 passed (2)
Tests       7 passed (7)
```

Task 2 구현 후 추가 게이트도 통과했다.

```text
$ npm run typecheck   # passed
$ npm run lint        # passed
$ npm run build       # passed; Vite production build completed
$ git diff --check    # passed; whitespace errors 없음
```

라인 수를 점검했으며 소스·테스트·검수 보고서 파일은 모두 500줄 미만이다(가장 긴 구현 파일 `src/content/symbols.ts`: 248줄).

## 자체 검토와 남은 우려

- 검증기는 고정된 `ContentValidationCode` 계약에 따라 공개 심볼 수, 중복 ID, 승인된 HTTPS 출처 연결, 검수일, 접근성 문구, `learning-icon`, 정답 선택지, 안전 제약을 차단한다. 심볼별 선택지 수·자산 경로의 구조 검사는 전용 `symbols.test.ts`에 두었다.
- 공식 기호의 재사용 라이선스는 확인하지 못했으므로 8개 모두 의도적으로 `learning-icon`이다. 실제 제품 라벨을 대체하지 않는다는 문구와 SVG 주석을 유지해야 한다.
- ISO 공식 페이지는 브라우저에서 현재 표준 내용을 확인했지만 자동 `curl`에는 403이 반환되었다. URL·문서 식별자·공식 페이지 검수는 유지하되, 배포 전 재검수 시에도 자동 수집 403이 계속될 수 있다.
- 국내 법령 부속서의 적용 범위는 만 14세 이상 가정용 섬유제품이므로 어린이제품 법정 적용으로 확대하지 않았다. 이후 교육 UI가 아동을 대상으로 하더라도 이 법적 범위를 사실처럼 일반화하면 안 된다.
- `care-iron-low`와 `care-professional`은 뜨거운 도구·용제 절차를 지시하지 않고 보호자 또는 전문가 확인만 요구한다. 이후 미션/UI에서 이 경계를 넓히면 콘텐츠 게이트 취지가 훼손된다.

## 검수 결론

8개 후보 모두 최신 국제 표준 식별자와 국내 KS/KATRI 근거를 연결했고, 의미 범위를 실제 안전 지시보다 좁게 기록했다. 이용권이 확인되지 않은 공식 도형을 `official-standard-symbol`로 표시하지 않았으며, 모든 공개 레코드는 `learning-icon`으로만 통과한다. 콘텐츠 게이트 결과는 빈 목록(`[]`)이어야 하며, 이 게이트를 통과하기 전에는 미션·UI 작업으로 진행하지 않는다.
