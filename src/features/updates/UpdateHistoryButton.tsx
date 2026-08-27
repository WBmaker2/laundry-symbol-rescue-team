import type { RefObject } from 'react';

export interface UpdateHistoryButtonProps {
  expanded: boolean;
  onClick: () => void;
  buttonRef?: RefObject<HTMLButtonElement | null>;
}

export function UpdateHistoryButton({ expanded, onClick, buttonRef }: UpdateHistoryButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      className="update-history-button"
      aria-expanded={expanded}
      aria-controls="update-history-dialog"
      onClick={onClick}
    >
      업데이트 내역
    </button>
  );
}
