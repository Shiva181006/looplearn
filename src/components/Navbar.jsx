import { NavLink } from 'react-router-dom';
import { LayoutDashboard, History, BookOpen, BarChart3, Plus, Zap } from 'lucide-react';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/revision', label: 'Revision', icon: History },
  { to: '/library', label: 'Library', icon: BookOpen },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/add', label: 'Add Problem', icon: Plus },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="logo">
          <span className="brand-mark">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="brand-text">PrepFlow<span className="brand-x">-X</span></span>
        </NavLink>
        <nav className="nav-links">
          {links.map((l) => {
            const Icon = l.icon;
            return (
              <NavLink 
                key={l.to} 
                to={l.to} 
                end={l.end} 
                className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              >
                <Icon size={15} className="nav-icon" />
                <span className="nav-text">{l.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
