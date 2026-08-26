import type { SourceRecord } from '../domain/careTypes';

export const sources = [
  {
    id: 'iso-3758-2023',
    publisher: 'International Organization for Standardization (ISO)',
    title: 'ISO 3758:2023 — Textiles — Care labelling code using symbols',
    officialUrl: 'https://www.iso.org/standard/74401.html',
    standardOrDocumentId: 'ISO 3758:2023',
    editionOrPublishedAt: 'Edition 4; published 2023-12-06 (publication page: 2023-12)',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '세탁·표백·건조·다림질·전문 섬유 관리의 그래픽 기호와 적용 범위. 산업 세탁과 전문 카펫 세탁은 제외.',
    status: 'approved',
  },
  {
    id: 'ginetex-care-symbols',
    publisher: 'GINETEX — International Association for Textile Care Labelling',
    title: 'Care symbols under ISO 3758:2023',
    officialUrl: 'https://www.ginetex.net/GB/labelling/care-symbols.asp',
    standardOrDocumentId: 'GINETEX ISO 3758:2023 care-symbol overview',
    editionOrPublishedAt: '현재 웹 개요; 게시일은 페이지에 명시되지 않음',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '기호의 기본 도형·선·점·사선과 세탁, 표백, 건조, 다림질, 전문 관리의 의미. 페이지에서 ISO 3758:2023을 명시.',
    status: 'approved',
  },
  {
    id: 'ginetex-care-symbols-guide',
    publisher: 'GINETEX — International Association for Textile Care Labelling',
    title: 'Textile Care Symbols: Care Instructions and Symbols',
    officialUrl: 'https://www.ginetex.net/userfiles/files/Textile_care_symbols_en.pdf',
    standardOrDocumentId: 'GINETEX Textile Care Symbols guide',
    editionOrPublishedAt: 'PDF 발행일은 문서에 명시되지 않음; 15쪽 안내서',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '기호 도형의 범주별 의미, 선·점의 강도 의미, 전문 관리의 가정용 처리 한계와 상표 이용 제한.',
    status: 'approved',
  },
  {
    id: 'ks-k-0021-2024',
    publisher: '국가기술표준원·e나라 표준인증',
    title: 'KS K 0021 섬유 제품의 취급에 관한 표시 기호 및 그 표시 방법',
    officialUrl: 'https://standard.go.kr/KSCI/standardIntro/getStandardSearchView.do?ksNo=KSK0021&menuId=503&tmprKsNo=KSK0021',
    standardOrDocumentId: 'KS K 0021',
    editionOrPublishedAt: '최종개정확인일 2024-12-31',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '국내 섬유 제품에 세탁 등의 취급 방법을 알리기 위해 표시하는 기호의 표준 식별자·적용 범위.',
    status: 'approved',
  },
  {
    id: 'katri-care-label-cardnews',
    publisher: 'KATRI시험연구원',
    title: '[카드뉴스 5호] 케어라벨(세탁기호) 어떻게 읽나요?',
    officialUrl: 'https://katri.re.kr/kr/notice/communityid/76/view.do?idx=16068',
    standardOrDocumentId: 'KATRI 카드뉴스 5호',
    editionOrPublishedAt: '게시일 2021-02-19; 첨부 이미지 1~8',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '국내 섬유시험연구원의 소비자용 케어라벨 설명 이미지 8장. 표준 기호를 실제 제품 라벨로 오인하지 않도록 의미 대조용으로만 사용.',
    status: 'approved',
  },
  {
    id: 'katri-iso-3758-press',
    publisher: 'KATRI시험연구원',
    title: 'KATRI시험연구원, 국내 최초로 GINETEX ISO 3758 지원 시험실 지정',
    officialUrl: 'https://katri.re.kr/kr/promotion/communityid/50/view.do?idx=25820',
    standardOrDocumentId: 'KATRI 보도자료 2025-03-12; ISO 3758 지원 시험실 지정',
    editionOrPublishedAt: '게시일 2025-03-12',
    accessedAt: '2026-08-26',
    reviewedAt: '2026-08-26',
    coverage:
      '국내 시험인증기관의 ISO 3758 기호·표시방법 설명, KS K 0021과 ISO 3758의 부합화 관계, GINETEX 상표권·올바른 사용 경계.',
    status: 'approved',
  },
] as const satisfies readonly SourceRecord[];
