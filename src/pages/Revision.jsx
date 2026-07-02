import { useRevision } from '../hooks/useRevision.js';
import RevisionCard from '../components/RevisionCard.jsx';
import { nextDueRevision, daysUntil } from '../utils/revision.js';
import { Sparkles, Calendar, CheckCircle, Clock } from 'lucide-react';

export default function Revision() {
  const { dueToday, upcoming } = useRevision();

  return (
    <div className="page revision">
      <div className="page-head">
        <div>
          <h1>Revision Queue <Sparkles className="focus-flame text-primary" size={32} /></h1>
          <p className="muted">{dueToday.length} due today</p>
        </div>
      </div>

      {dueToday.length === 0 ? (
        <div className="panel empty">
          <CheckCircle size={48} className="empty-check-icon" />
          <h3>You're all caught up!</h3>
          <p className="muted">No revisions are due right now. Come back tomorrow.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {dueToday.map((p) => <RevisionCard key={p.id} problem={p} />)}
        </div>
      )}

      <section className="panel">
        <div className="panel-head-icon">
          <Calendar size={20} className="panel-icon" />
          <h2>Upcoming Revisions</h2>
        </div>
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
                    <div className="upcoming-item-left">
                      <Clock size={14} className="upcoming-clock" />
                      <span className="upcoming-title">{p.title}</span>
                    </div>
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
