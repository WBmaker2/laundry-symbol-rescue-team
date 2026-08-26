import { useContext } from 'react';
import { LearnerSessionContext } from './LearnerSessionProvider';

export function useLearnerSession() {
  const value = useContext(LearnerSessionContext);
  if (!value) {
    throw new Error('useLearnerSession은 LearnerSessionProvider 안에서 사용해야 합니다.');
  }
  return value;
}
