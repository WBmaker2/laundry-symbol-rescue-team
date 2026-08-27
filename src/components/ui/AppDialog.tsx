import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

export interface AppDialogProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  triggerRef?: RefObject<HTMLButtonElement | null>;
  id?: string;
}

export function AppDialog({ open, title, onClose, children, triggerRef, id }: AppDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return undefined;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const triggerElement = triggerRef?.current;
    closeRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )].filter((element) => !element.hasAttribute('disabled'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const returnTarget = triggerElement ?? previousFocusRef.current;
      if (returnTarget && document.contains(returnTarget)) returnTarget.focus();
    };
  }, [onClose, open, triggerRef]);

  if (!open) return null;
  const titleId = 'app-dialog-title';
  return (
    <div className="app-dialog-backdrop" role="presentation">
      <div
        ref={dialogRef}
        id={id}
        className="app-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="app-dialog-header">
          <h2 id={titleId}>{title}</h2>
          <button ref={closeRef} type="button" className="dialog-close-button" onClick={onClose}>
            닫기
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
