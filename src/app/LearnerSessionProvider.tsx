import { createContext, useMemo, useReducer } from 'react';
import type { Dispatch, ReactNode } from 'react';
import {
  initialLearnerSession,
  sessionReducer,
  type LearnerSession,
  type SessionAction,
} from '../domain/sessionReducer';

export interface LearnerSessionContextValue {
  state: LearnerSession;
  dispatch: Dispatch<SessionAction>;
}

// The hook imports this context from the same small module to keep the public session API compact.
// eslint-disable-next-line react-refresh/only-export-components
export const LearnerSessionContext = createContext<LearnerSessionContextValue | null>(null);

export interface LearnerSessionProviderProps {
  children: ReactNode;
  initialState?: LearnerSession;
}

export function LearnerSessionProvider({ children, initialState }: LearnerSessionProviderProps) {
  const [state, dispatch] = useReducer(sessionReducer, initialState ?? initialLearnerSession);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <LearnerSessionContext.Provider value={value}>
      {children}
    </LearnerSessionContext.Provider>
  );
}
