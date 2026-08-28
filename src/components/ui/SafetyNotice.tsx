import {
  PROFESSIONAL_HELP_NOTICE,
  REAL_LABEL_PRIORITY_NOTICE,
  SAFETY_NOTICES,
  STUDENT_SAFETY_NOTICE,
} from '../../content/safetyNotices';

export {
  PROFESSIONAL_HELP_NOTICE,
  REAL_LABEL_PRIORITY_NOTICE,
  SAFETY_NOTICES,
  SERVICE_LIMIT_NOTICE,
  STANDARD_VARIATION_NOTICE,
  STUDENT_SAFETY_NOTICE,
} from '../../content/safetyNotices';

export interface SafetyNoticeProps {
  variant?: 'full' | 'compact';
}

export function SafetyNotice({ variant = 'full' }: SafetyNoticeProps) {
  if (variant === 'compact') {
    return (
      <aside className="safety-notice" data-variant="compact" aria-label="안전 안내">
        <h2>안전하게 살펴보기</h2>
        <p>{REAL_LABEL_PRIORITY_NOTICE}</p>
        <p>{STUDENT_SAFETY_NOTICE}</p>
        <details>
          <summary>안전 안내 더 보기</summary>
          {SAFETY_NOTICES.filter((notice) => notice !== REAL_LABEL_PRIORITY_NOTICE && notice !== STUDENT_SAFETY_NOTICE)
            .map((notice) => <p key={notice}>{notice}</p>)}
          <p><strong>전문 도움:</strong> <span>{PROFESSIONAL_HELP_NOTICE}</span></p>
        </details>
      </aside>
    );
  }

  return (
    <aside className="safety-notice" data-variant="full" aria-label="안전 안내">
      <h2>안전하게 살펴보기</h2>
      {SAFETY_NOTICES.map((notice) => <p key={notice}>{notice}</p>)}
      <p><strong>전문 도움:</strong> <span>{PROFESSIONAL_HELP_NOTICE}</span></p>
    </aside>
  );
}
