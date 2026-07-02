import { useRevision } from '../hooks/useRevision.js';
import { nextDueRevision } from '../utils/revision.js';
import { ExternalLink, Check, RefreshCw } from 'lucide-react';

export default function RevisionCard({ problem }) {
  const { completeRevision, forgotAgain } = useRevision();
  const r = nextDueRevision(problem);
  if (!r) return null;
  return (
    <div className="revision-card">
      <div className="revision-card-head">
        <h3 className="problem-title">{problem.title}</h3>
        <span className={`badge diff-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
      </div>
      
      <div className="problem-meta">
        <span className="meta-pill">{problem.platform}</span>
        {problem.pattern && <span className="meta-pill alt">{problem.pattern}</span>}
        <span className={`meta-pill conf-${problem.confidence.toLowerCase()}`}>{problem.confidence} Confidence</span>
      </div>

      <div className="revision-stage">
        <span className="stage-day">Day {r.day}</span>
        <span className="stage-divider">·</span>
        <span className="stage-name">{r.name}</span>
      </div>

      {problem.notes && <p className="problem-notes">{problem.notes}</p>}

      <div className="problem-actions">
        {problem.url && (
          <a className="btn btn-ghost" href={problem.url} target="_blank" rel="noreferrer">
            <ExternalLink size={14} /> Open URL
          </a>
        )}
        <button className="btn btn-success" onClick={() => completeRevision(problem.id)}>
          <Check size={14} /> Completed
        </button>
        <button className="btn btn-warning" onClick={() => forgotAgain(problem.id)}>
          <RefreshCw size={14} /> Forgot
        </button>
      </div>
    </div>
  );
}
