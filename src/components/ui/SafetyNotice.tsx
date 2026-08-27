import {
  PROFESSIONAL_HELP_NOTICE,
  SAFETY_NOTICES,
} from '../../content/safetyNotices';

export {
  PROFESSIONAL_HELP_NOTICE,
  REAL_LABEL_PRIORITY_NOTICE,
  SAFETY_NOTICES,
  SERVICE_LIMIT_NOTICE,
  STANDARD_VARIATION_NOTICE,
  STUDENT_SAFETY_NOTICE,
} from '../../content/safetyNotices';

export function SafetyNotice() {
  return (
    <aside className="safety-notice" aria-label="안전 안내">
      <h2>안전하게 살펴보기</h2>
      {SAFETY_NOTICES.map((notice) => <p key={notice}>{notice}</p>)}
      <p><strong>전문 도움:</strong> <span>{PROFESSIONAL_HELP_NOTICE}</span></p>
    </aside>
  );
}
