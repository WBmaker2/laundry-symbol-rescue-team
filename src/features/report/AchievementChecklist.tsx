import type { AchievementSummary } from './RescueReportScreen';

export interface AchievementChecklistProps {
  summary: AchievementSummary;
}

const achievementLabels: ReadonlyArray<readonly [keyof AchievementSummary, string]> = [
  ['interpretedAllSymbols', '표시를 모두 해석했어요'],
  ['combinedRestrictions', '관리 제한을 확인했어요'],
  ['connectedRiskEvidence', '위험과 표시를 연결해 봤어요'],
  ['revisedPlan', '관리 계획을 완성했어요'],
  ['responsibleCare', '어른과 확인할 근거를 남겼어요'],
];

export function AchievementChecklist({ summary }: AchievementChecklistProps) {
  return (
    <section className="achievement-checklist" aria-labelledby="achievement-title">
      <h3 id="achievement-title">구조 미션을 끝냈어요!</h3>
      <p>이번 활동에서 확인한 내용을 다시 볼 수 있어요.</p>
      <ul className="achievement-list">
        {achievementLabels.map(([key, label]) => {
          const complete = summary[key];
          return (
            <li key={key} className="achievement-item" data-complete={complete}>
              <span className="achievement-mark" aria-hidden="true">{complete ? '✓' : '○'}</span>
              <span className="achievement-label">{label}</span>
              <span className="achievement-state">{complete ? '완료' : '다시 보기'}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
