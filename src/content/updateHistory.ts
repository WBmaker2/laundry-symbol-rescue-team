export type UpdateCategory = '설계' | '개발' | '콘텐츠' | '안전' | '접근성';

export interface UpdateEntry {
  date: string;
  category: UpdateCategory;
  summary: string;
}

export const updateHistory: readonly UpdateEntry[] = [
  { date: '2026-08-26', category: '설계', summary: '최초 설계 문서 작성' },
  { date: '2026-08-26', category: '콘텐츠', summary: '핵심 표시 8개 출처와 의미 검수' },
  { date: '2026-08-27', category: '안전', summary: '실제 라벨 우선과 학생 단독 조작 금지 문구 반영' },
  { date: '2026-08-27', category: '개발', summary: '5개 미션의 MVP 학습 흐름 구현' },
  { date: '2026-08-27', category: '접근성', summary: '5개 미션 전체 흐름과 Pages 릴리스 자동 게이트 추가' },
  { date: '2026-08-28', category: '접근성', summary: '학습 흐름 포커스·학생용 보고서·반응형 CTA 개선' },
];
