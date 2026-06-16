const KEY = 'prepflow-x:problems';

export function loadProblems() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProblems(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}
