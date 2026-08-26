import { LearnerSessionProvider } from './app/LearnerSessionProvider';
import { AppShell } from './app/AppShell';

export function App() {
  return (
    <LearnerSessionProvider>
      <AppShell />
    </LearnerSessionProvider>
  );
}
