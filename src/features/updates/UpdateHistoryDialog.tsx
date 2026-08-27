import type { RefObject } from 'react';
import { updateHistory } from '../../content/updateHistory';
import { AppDialog } from '../../components/ui/AppDialog';

export interface UpdateHistoryDialogProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

export function UpdateHistoryDialog({ open, onClose, triggerRef }: UpdateHistoryDialogProps) {
  return (
    <AppDialog id="update-history-dialog" open={open} title="업데이트 내역" onClose={onClose} triggerRef={triggerRef}>
      <ol className="update-history-list">
        {updateHistory.map((entry) => (
          <li key={`${entry.date}-${entry.category}`}>
            <time dateTime={entry.date}>{entry.date}</time>
            <span className="update-history-category">{entry.category}</span>
            <span>{entry.summary}</span>
          </li>
        ))}
      </ol>
    </AppDialog>
  );
}
