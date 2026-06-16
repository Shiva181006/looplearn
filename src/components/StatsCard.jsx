export default function StatsCard({ label, value, hint, tone = 'default' }) {
  return (
    <div className={`stats-card tone-${tone}`}>
      <div className="stats-label">{label}</div>
      <div className="stats-value">{value}</div>
      {hint && <div className="stats-hint">{hint}</div>}
    </div>
  );
}
