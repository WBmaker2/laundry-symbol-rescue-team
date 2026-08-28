import { describe, expect, it } from 'vitest';
import { updateHistory } from './updateHistory';

describe('업데이트 내역', () => {
  it('첫 기록과 다섯 가지 변경 범위를 날짜순으로 보존한다', () => {
    expect(updateHistory[0]).toEqual({
      date: '2026-08-26',
      category: '설계',
      summary: '최초 설계 문서 작성',
    });
    expect(new Set(updateHistory.map(({ category }) => category))).toEqual(
      new Set(['설계', '개발', '콘텐츠', '안전', '접근성']),
    );
    expect(updateHistory.every(({ date }) => /^\d{4}-\d{2}-\d{2}$/.test(date))).toBe(true);
    expect(updateHistory.map(({ date }) => date)).toEqual(
      [...updateHistory].map(({ date }) => date).sort(),
    );
    expect(updateHistory.find(({ category }) => category === '콘텐츠')?.date).toBe('2026-08-26');
    expect(updateHistory.find(({ category }) => category === '개발')?.date).toBe('2026-08-27');
    expect(updateHistory.find(({ category }) => category === '안전')?.date).toBe('2026-08-27');
    expect(updateHistory.find(({ category }) => category === '접근성')).toEqual({
      date: '2026-08-27',
      category: '접근성',
      summary: '5개 미션 전체 흐름과 Pages 릴리스 자동 게이트 추가',
    });
    expect(updateHistory).toContainEqual({
      date: '2026-08-28',
      category: '접근성',
      summary: '학습 흐름 포커스·학생용 보고서·반응형 CTA 개선',
    });
    const keys = updateHistory.map(({ date, category }) => `${date}:${category}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
