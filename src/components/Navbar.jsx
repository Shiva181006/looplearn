import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/revision', label: 'Revision' },
  { to: '/library', label: 'Library' },
  { to: '/analytics', label: 'Analytics' },
  { to: '/add', label: '+ Add' },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="brand">
          <span className="brand-mark">⚡</span>
          <span>PrepFlow<span className="brand-x">-X</span></span>
        </NavLink>
        <nav className="nav-links">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
