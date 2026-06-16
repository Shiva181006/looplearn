import { useMemo } from 'react';
import { useProblems } from './useProblems.js';
import { isDueToday, nextDueRevision } from '../utils/revision.js';

export function useRevision() {
  const { problems, completeRevision, forgotAgain } = useProblems();

  const dueToday = useMemo(
    () => problems.filter((p) => isDueToday(p)).sort((a, b) => new Date(nextDueRevision(a)?.date) - new Date(nextDueRevision(b)?.date)),
    [problems]
  );

  const upcoming = useMemo(
    () => problems.filter((p) => nextDueRevision(p) && !isDueToday(p)),
    [problems]
  );

  return { dueToday, upcoming, completeRevision, forgotAgain };
}
