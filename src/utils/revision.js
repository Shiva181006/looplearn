// Spaced repetition schedule: Day 1 Recall, Day 7 Resolve, Day 21 Master.
export const SCHEDULE = [
  { name: 'Recall', day: 1 },
  { name: 'Resolve', day: 7 },
  { name: 'Master', day: 21 },
];

export function buildRevisions(solvedDateISO) {
  const base = new Date(solvedDateISO);
  return SCHEDULE.map((s) => {
    const d = new Date(base);
    d.setDate(d.getDate() + s.day);
    return { name: s.name, day: s.day, date: d.toISOString(), completed: false };
  });
}

export function resetRevisions(fromDateISO = new Date().toISOString()) {
  return buildRevisions(fromDateISO);
}

export function nextDueRevision(problem) {
  return problem.revisions.find((r) => !r.completed);
}

export function isDueToday(problem, now = new Date()) {
  const r = nextDueRevision(problem);
  if (!r) return false;
  return new Date(r.date) <= now;
}

export function daysUntil(dateISO, now = new Date()) {
  const ms = new Date(dateISO) - now;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
