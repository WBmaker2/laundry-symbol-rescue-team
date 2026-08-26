interface HighContrastToggleProps {
  enabled: boolean;
  onToggle: () => void;
}
export function HighContrastToggle({ enabled, onToggle }: HighContrastToggleProps) {
  return (
    <button
      type="button"
      className="contrast-toggle"
      aria-label="고대비 모드"
      aria-pressed={enabled}
      onClick={onToggle}
    >
      {enabled ? '일반 대비' : '고대비 모드'}
    </button>
  );
}
