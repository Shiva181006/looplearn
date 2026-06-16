import { useRevision } from '../hooks/useRevision.js';
import RevisionCard from '../components/RevisionCard.jsx';
import { nextDueRevision, daysUntil } from '../utils/revision.js';

export default function Revision() {
  const { dueToday, upcoming } = useRevision();

  return (
    <div className="page">
      <div className="page-head">
        <div>
          <h1>Revision Queue 🔥</h1>
          <p className="muted">{dueToday.length} due today</p>
        </div>
      </div>

      {dueToday.length === 0 ? (
        <div className="panel empty">
          <h3>You're all caught up 🎉</h3>
          <p className="muted">No revisions are due right now. Come back tomorrow.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {dueToday.map((p) => <RevisionCard key={p.id} problem={p} />)}
        </div>
      )}

      <section className="panel">
        <h2>Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="muted">Nothing scheduled.</p>
        ) : (
          <ul className="upcoming-list">
            {upcoming
              .sort((a, b) => new Date(nextDueRevision(a).date) - new Date(nextDueRevision(b).date))
              .slice(0, 10)
              .map((p) => {
                const r = nextDueRevision(p);
                const d = daysUntil(r.date);
                return (
                  <li key={p.id}>
                    <span>{p.title}</span>
                    <span className="muted">{r.name} · in {d} day{d === 1 ? '' : 's'}</span>
                  </li>
                );
              })}
          </ul>
        )}
      </section>
    </div>
  );
}
