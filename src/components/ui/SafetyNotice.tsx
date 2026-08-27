export const REAL_LABEL_PRIORITY_NOTICE =
  '실제 옷에서는 제품 라벨과 제조사 안내, 보호자·교사의 안내를 먼저 확인하세요.';
export const STUDENT_SAFETY_NOTICE =
  '실제 다리미, 뜨거운 물, 표백제, 세탁기는 학생 혼자 조작하지 않아요.';
export const STANDARD_VARIATION_NOTICE =
  '표시는 국가·시기·제품에 따라 다를 수 있어요. 모르는 표시는 보호자·교사 또는 제품 공식 안내에 확인하세요.';
export const SERVICE_LIMIT_NOTICE =
  '이 앱은 가상 의류를 위한 학습 도구이며 실제 손상이나 안전을 보증하는 전문 서비스가 아니에요.';

export function SafetyNotice() {
  return (
    <aside className="safety-notice" aria-label="안전 안내">
      <h2>안전하게 살펴보기</h2>
      <p>{REAL_LABEL_PRIORITY_NOTICE}</p>
      <p>{STUDENT_SAFETY_NOTICE}</p>
      <p>{STANDARD_VARIATION_NOTICE}</p>
      <p>{SERVICE_LIMIT_NOTICE}</p>
      <p><strong>전문 도움:</strong> 보호자·교사 또는 제품 공식 안내에 확인하기</p>
    </aside>
  );
}
