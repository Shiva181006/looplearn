import { Link } from "react-router-dom";
import { useProblems } from "../hooks/useProblems.js";
import { useRevision } from "../hooks/useRevision.js";
import StatsCard from "../components/StatsCard.jsx";
import { Flame, Plus, ArrowRight, Compass, AlertCircle } from "lucide-react";

export default function Dashboard() {
  const { problems } = useProblems();
  const { dueToday } = useRevision();

  const totalRevisionsDone = problems.reduce(
    (acc, p) => acc + p.revisions.filter((r) => r.completed).length,
    0,
  );
  const totalRevisions = problems.reduce(
    (acc, p) => acc + p.revisions.length,
    0,
  );
  const successPct = totalRevisions
    ? Math.round((totalRevisionsDone / totalRevisions) * 100)
    : 0;
  const weak = problems.filter((p) => p.confidence === "Weak");

  // Weak patterns
  const patternMap = {};
  problems.forEach((p) => {
    if (!p.pattern) return;
    patternMap[p.pattern] = patternMap[p.pattern] || {
      Weak: 0,
      Medium: 0,
      Strong: 0,
    };
    patternMap[p.pattern][p.confidence] += 1;
  });
  const weakPatterns = Object.entries(patternMap)
    .map(([name, c]) => ({
      name,
      weak: c.Weak,
      total: c.Weak + c.Medium + c.Strong,
    }))
    .filter((x) => x.weak > 0)
    .sort((a, b) => b.weak - a.weak)
    .slice(0, 3);

  const recommended = [...dueToday, ...weak].slice(0, 3);

  return (
    <div className="page dashboard">
      <div className="page-head">
        <div>
          <h1>
            Today's Focus <Flame className="focus-flame" size={32} />
          </h1>
          <p className="muted">What should I revise today?</p>
        </div>
        <Link className="btn btn-primary" to="/add">
          <Plus size={16} /> Add Problem
        </Link>
      </div>

      <div className="stats-grid">
        <StatsCard
          label="Revisions Due"
          value={dueToday.length}
          hint="Open Revision queue"
          tone="primary"
        />
        <StatsCard
          label="Weak Problems"
          value={weak.length}
          hint="Need more practice"
          tone="warning"
        />
        <StatsCard label="Total Solved" value={problems.length} />
        <StatsCard
          label="Revision Success"
          value={`${successPct}%`}
          hint={`${totalRevisionsDone}/${totalRevisions}`}
          tone="success"
        />
      </div>

      <section className="panel">
        <div className="panel-head">
          <h2>Recommended for you</h2>
          <Link className="btn btn-ghost" to="/revision">
            Go to Revision <ArrowRight size={14} />
          </Link>
        </div>
        {recommended.length === 0 ? (
          <div className="empty-state">
            <Compass size={36} className="empty-icon" />
            <p className="muted">
              Nothing recommended yet. Add a few problems to get started.
            </p>
          </div>
        ) : (
          <div className="recommend-grid">
            {recommended.map((p) => (
              <div className="recommend-card" key={p.id}>
                <div className="recommend-top">
                  <h3>{p.title}</h3>

                  <div className="recommend-tags">
                    <span className="meta-pill">{p.platform}</span>

                    {p.pattern && (
                      <span className="meta-pill alt">{p.pattern}</span>
                    )}
                  </div>
                </div>

                <div className="recommend-bottom">
                  <span className={`meta-pill conf-${p.confidence.toLowerCase()}`}>
                    {p.confidence} Confidence
                  </span>

                  <Link className="review-link" to="/revision">
                    Review <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel-head-icon">
          <AlertCircle size={20} className="panel-icon text-warning" />
          <h2>Weak Patterns</h2>
        </div>
        {weakPatterns.length === 0 ? (
          <div className="empty-state-simple">
            <p className="muted">No weak patterns yet. Nice work.</p>
          </div>
        ) : (
          <ul className="weak-list">
            {weakPatterns.map((w) => (
              <li key={w.name}>
                <span className="pattern-name">{w.name}</span>
                <div className="pattern-stat">
                  <span className="weak-count">{w.weak} weak </span>
                  <span className="total-count">of {w.total} problems</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
