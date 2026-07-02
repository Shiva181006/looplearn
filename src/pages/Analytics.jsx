import { useMemo } from 'react';
import { useProblems } from '../hooks/useProblems.js';
import StatsCard from '../components/StatsCard.jsx';
import { BarChart3, PieChart, AlertCircle } from 'lucide-react';

function countBy(arr, key) {
  const m = {};
  arr.forEach((x) => { const k = x[key] || 'Unknown'; m[k] = (m[k] || 0) + 1; });
  return m;
}

function Bars({ data, tone = 'primary' }) {
  const max = Math.max(1, ...Object.values(data));
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);
  if (!entries.length) return <p className="muted">No data yet.</p>;
  return (
    <ul className="bar-list">
      {entries.map(([k, v]) => (
        <li key={k}>
          <div className="bar-row">
            <span className="bar-name">{k}</span>
            <span className="muted bar-value">{v}</span>
          </div>
          <div className="bar-track">
            <div className={`bar-fill tone-${tone}`} style={{ width: `${(v / max) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function Analytics() {
  const { problems } = useProblems();

  const topics = useMemo(() => countBy(problems, 'topic'), [problems]);
  const patterns = useMemo(() => countBy(problems, 'pattern'), [problems]);
  const conf = useMemo(() => countBy(problems, 'confidence'), [problems]);

  const weakAreas = useMemo(() => {
    const m = {};
    problems.forEach((p) => {
      if (!p.topic) return;
      m[p.topic] = m[p.topic] || { weak: 0, total: 0 };
      m[p.topic].total += 1;
      if (p.confidence === 'Weak') m[p.topic].weak += 1;
    });
    return Object.entries(m)
      .map(([k, v]) => ({ name: k, ratio: v.total ? v.weak / v.total : 0, ...v }))
      .filter((x) => x.weak > 0)
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3);
  }, [problems]);

  return (
    <div className="page analytics">
      <div className="page-head">
        <div>
          <h1>Analytics</h1>
          <p className="muted">Your DSA preparation, visualized.</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatsCard label="Total Problems" value={problems.length} tone="primary" />
        <StatsCard label="Strong" value={conf.Strong || 0} tone="success" />
        <StatsCard label="Medium" value={conf.Medium || 0} />
        <StatsCard label="Weak" value={conf.Weak || 0} tone="warning" />
      </div>

      <div className="grid grid-2">
        <section className="panel">
          <div className="panel-head-icon">
            <BarChart3 size={20} className="panel-icon text-primary" />
            <h2>Topic Distribution</h2>
          </div>
          <Bars data={topics} tone="primary" />
        </section>
        
        <section className="panel">
          <div className="panel-head-icon">
            <PieChart size={20} className="panel-icon text-accent" />
            <h2>Pattern Distribution</h2>
          </div>
          <Bars data={patterns} tone="accent" />
        </section>
      </div>

      <section className="panel">
        <div className="panel-head-icon">
          <AlertCircle size={20} className="panel-icon text-warning" />
          <h2>Weak Areas</h2>
        </div>
        {weakAreas.length === 0 ? (
          <p className="muted">No weak areas detected. Keep it up!</p>
        ) : (
          <ul className="weak-list">
            {weakAreas.map((w) => (
              <li key={w.name}>
                <span className="weak-area-text">You need more practice on <strong>{w.name}</strong></span>
                <span className="muted weak-area-ratio">{w.weak}/{w.total} marked weak</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
