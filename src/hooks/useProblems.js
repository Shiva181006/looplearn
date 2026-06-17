import { useContext, useMemo } from "react";
import { ProblemContext } from "../context/ProblemContext.jsx";

export function useProblems() {
  const ctx = useContext(ProblemContext);
  if (!ctx) throw new Error("useProblems must be used within ProblemProvider");
  return ctx;
}

export function useProblemFilters(filters) {
  const { problems } = useProblems();
  return useMemo(() => {
    const {
      search = "",
      difficulty = "",
      topic = "",
      pattern = "",
      confidence = "",
    } = filters || {};
    const q = search.trim().toLowerCase();
    return problems.filter((p) => {
      if (
        q &&
        !(
          p.title.toLowerCase().includes(q) ||
          p.topic.toLowerCase().includes(q) ||
          p.pattern.toLowerCase().includes(q)
        )
      )
        return false;
      if (difficulty && p.difficulty !== difficulty) return false;
      if (topic && p.topic !== topic) return false;
      if (pattern && p.pattern !== pattern) return false;
      if (confidence && p.confidence !== confidence) return false;
      return true;
    });
  }, [problems, filters]);
}
