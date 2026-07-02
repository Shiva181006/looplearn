import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useProblemFilters, useProblems } from '../hooks/useProblems.js';
import ProblemCard from '../components/ProblemCard.jsx';
import { Search, Plus, Inbox, SlidersHorizontal } from 'lucide-react';

export default function Library() {
  const { problems } = useProblems();
  const [filters, setFilters] = useState({ search: '', difficulty: '', topic: '', pattern: '', confidence: '' });
  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));
  const list = useProblemFilters(filters);

  const topics = useMemo(() => [...new Set(problems.map((p) => p.topic).filter(Boolean))].sort(), [problems]);
  const patterns = useMemo(() => [...new Set(problems.map((p) => p.pattern).filter(Boolean))].sort(), [problems]);

  return (
    <div className="page library">
      <div className="page-head">
        <div>
          <h1>Problem Library</h1>
          <p className="muted">{list.length} of {problems.length} problems</p>
        </div>
        <Link className="btn btn-primary" to="/add"><Plus size={16} /> Add Problem</Link>
      </div>

      <div className="filters panel">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input className="search" placeholder="Search title, topic, pattern..." value={filters.search} onChange={(e) => set('search', e.target.value)} />
        </div>
        
        <div className="select-wrapper">
          <select value={filters.difficulty} onChange={(e) => set('difficulty', e.target.value)}>
            <option value="">All difficulties</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>

        <div className="select-wrapper">
          <select value={filters.topic} onChange={(e) => set('topic', e.target.value)}>
            <option value="">All topics</option>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="select-wrapper">
          <select value={filters.pattern} onChange={(e) => set('pattern', e.target.value)}>
            <option value="">All patterns</option>
            {patterns.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>

        <div className="select-wrapper">
          <select value={filters.confidence} onChange={(e) => set('confidence', e.target.value)}>
            <option value="">All confidence</option>
            <option>Weak</option>
            <option>Medium</option>
            <option>Strong</option>
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="panel empty">
          <Inbox size={48} className="empty-inbox-icon" />
          <h3>No problems found</h3>
          <p className="muted">Try clearing filters or add your first problem.</p>
        </div>
      ) : (
        <div className="grid grid-2">
          {list.map((p) => <ProblemCard key={p.id} problem={p} />)}
        </div>
      )}
    </div>
  );
}
