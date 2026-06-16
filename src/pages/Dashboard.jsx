import { Link } from 'react-router-dom';
import { useProblems } from '../hooks/useProblems.js';
import { useRevision } from '../hooks/useRevision.js';
import StatsCard from '../components/StatsCard.jsx';

export default function Dashboard() {
  const { problems } = useProblems();
  const { dueToday } = useRevision();

  const totalRevisionsDone = problems.reduce((acc, p) => acc + p.revisions.filter((r) => r.completed).length, 0);
  const totalRevisions = problems.reduce((acc, p) => acc + p.revisions.length, 0);
  const successPct = totalRevisions ? Math.round((totalRevisionsDone / totalRevisions) * 100) : 0;
  const weak = problems.filter((p) => p.confidence === 'Weak');

  // Weak patterns
  const patternMap = {};
  problems.forEach((p) => {
    if (!p.pattern) return;
    patternMap[p.pattern] = patternMap[p.pattern] || { Weak: 0, Medium: 0, Strong: 0 };
    patternMap[p.pattern][p.confidence] += 1;
  });
  const weakPatterns = Object.entries(patternMap)
    .map(([name, c]) => ({ name, weak: c.Weak, total: c.Weak + c.Medium + c.Strong }))
    .filter((x) => x.weak > 0)
    .sort((a, b) => b.weak - a.weak)
    .slice(0, 3);

  const recommended = [...dueToday, ...weak].slice(0, 3);

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Today's Focus 🔥</h1>
          <p className="muted">What should I revise today?</p>
        </div>
        <Link className="btn btn-primary" to="/add">+ Add Problem</Link>
      </div>

      <div className="stats-grid">
        <StatsCard label="Revisions Due" value={dueToday.length} hint="Open Revision queue" tone="primary" />
        <StatsCard label="Weak Problems" value={weak.length} hint="Need more practice" tone="warning" />
        <StatsCard label="Total Solved" value={problems.length} />
        <StatsCard label="Revision Success" value={`${successPct}%`} hint={`${totalRevisionsDone}/${totalRevisions}`} tone="success" />
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Recommended for you</h2>
          <Link className="btn btn-ghost" to="/revision">Go to Revision →</Link>
        </div>
        {recommended.length === 0 ? (
          <p className="muted">Nothing recommended yet. Add a few problems to get started.</p>
        ) : (
          <ol className="recommend-list">
            {recommended.map((p) => (
              <li key={p.id}>
                <span className="recommend-title">{p.title}</span>
                <span className="meta-pill">{p.platform}</span>
                {p.pattern && <span className="meta-pill alt">{p.pattern}</span>}
              </li>
            ))}
          </ol>
        )}
      </section>

      <section className="panel">
        <h2>Weak Patterns</h2>
        {weakPatterns.length === 0 ? (
          <p className="muted">No weak patterns yet. Nice work.</p>
        ) : (
          <ul className="weak-list">
            {weakPatterns.map((w) => (
              <li key={w.name}>
                <span>{w.name}</span>
                <span className="muted">{w.weak} weak of {w.total}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
