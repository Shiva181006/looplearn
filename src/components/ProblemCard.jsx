import { Link } from 'react-router-dom';
import { useProblems } from '../hooks/useProblems.js';

export default function ProblemCard({ problem }) {
  const { deleteProblem } = useProblems();
  const onDelete = () => {
    if (confirm(`Delete "${problem.title}"?`)) deleteProblem(problem.id);
  };

  return (
    <div className="problem-card">
      <div className="problem-card-top">
        <h3 className="problem-title">{problem.title}</h3>
        <span className={`badge diff-${problem.difficulty.toLowerCase()}`}>{problem.difficulty}</span>
      </div>
      <div className="problem-meta">
        <span className="meta-pill">{problem.platform || 'Unknown'}</span>
        {problem.topic && <span className="meta-pill">{problem.topic}</span>}
        {problem.pattern && <span className="meta-pill alt">{problem.pattern}</span>}
        <span className={`meta-pill conf-${problem.confidence.toLowerCase()}`}>{problem.confidence}</span>
      </div>
      <div className="revision-row">
        {problem.revisions.map((r) => (
          <span key={r.name} className={`rev-step ${r.completed ? 'done' : ''}`}>
            {r.name} {r.completed ? '✔' : '○'}
          </span>
        ))}
      </div>
      {problem.notes && <p className="problem-notes">{problem.notes}</p>}
      <div className="problem-actions">
        {problem.url && (
          <a className="btn btn-ghost" href={problem.url} target="_blank" rel="noreferrer">
            Open
          </a>
        )}
        <Link className="btn btn-ghost" to={`/add/${problem.id}`}>
          Edit
        </Link>
        <button className="btn btn-danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
