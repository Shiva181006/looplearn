import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { loadProblems, saveProblems, uid } from '../utils/storage.js';
import { buildRevisions, resetRevisions } from '../utils/revision.js';

export const ProblemContext = createContext(null);

export function ProblemProvider({ children }) {
  const [problems, setProblems] = useState(() => loadProblems());

  useEffect(() => {
    saveProblems(problems);
  }, [problems]);

  const addProblem = useCallback((data) => {
    const solvedDate = data.solvedDate || new Date().toISOString();
    const problem = {
      id: uid(),
      title: data.title?.trim() || 'Untitled',
      url: data.url?.trim() || '',
      platform: data.platform || '',
      difficulty: data.difficulty || 'Medium',
      topic: data.topic || '',
      pattern: data.pattern || '',
      confidence: data.confidence || 'Medium',
      notes: data.notes || '',
      solvedDate,
      revisions: buildRevisions(solvedDate),
    };
    setProblems((prev) => [problem, ...prev]);
    return problem;
  }, []);

  const updateProblem = useCallback((id, patch) => {
    setProblems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteProblem = useCallback((id) => {
    setProblems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const completeRevision = useCallback((id) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const revisions = [...p.revisions];
        const idx = revisions.findIndex((r) => !r.completed);
        if (idx === -1) return p;
        revisions[idx] = { ...revisions[idx], completed: true, completedAt: new Date().toISOString() };
        return { ...p, revisions };
      })
    );
  }, []);

  const forgotAgain = useCallback((id) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, confidence: 'Weak', revisions: resetRevisions() };
      })
    );
  }, []);

  const value = useMemo(
    () => ({ problems, addProblem, updateProblem, deleteProblem, completeRevision, forgotAgain }),
    [problems, addProblem, updateProblem, deleteProblem, completeRevision, forgotAgain]
  );

  return <ProblemContext.Provider value={value}>{children}</ProblemContext.Provider>;
}
