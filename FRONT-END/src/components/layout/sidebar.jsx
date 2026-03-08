import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Folder, BarChart2, Settings as SettingsIcon, LogOut } from 'lucide-react';
import '../../styles/components.css';

const navItems = [
  { path: '/dashboard', icon: Home, label: 'Dashboard' },
  { path: '/users', icon: Users, label: 'Users', badge: '5' },
  { path: '/projects', icon: Folder, label: 'Projects' },
  { path: '/reports', icon: BarChart2, label: 'Reports', badge: 'New' },
  { path: '/settings', icon: SettingsIcon, label: 'Settings' },
];

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar-header">
        <span className="nav-group-label">Nav</span>
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="nav-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  title={item.label}
                >
                  <span className="nav-icon">
                    <Icon size={22} strokeWidth={2} />
                  </span>
                  <span className="nav-label">{item.label}</span>
                  {item.badge && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <div className="upgrade-card">
          <p className="text-sm font-bold">Pro</p>
          <div className="status-dot success"></div>
        </div>
        <button
          className="sidebar-logout-btn nav-link"
          onClick={() => onLogout?.()}
          title="Log out"
        >
          <span className="nav-icon">
            <LogOut size={22} strokeWidth={2} />
          </span>
          <span className="nav-label">Log out</span>
        </button>
      </div>

      <style>{`
        .sidebar {
          width: var(--sidebar-collapsed);
          background: var(--bg-sidebar);
          border-right: 1px solid var(--border-color);
          color: var(--text-main);
          padding: var(--space-sm);
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
          transition: width 0.2s ease, padding 0.2s ease;
          position: fixed;
          left: 0;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
          overflow-x: hidden;
          overflow-y: auto;
          z-index: 90;
          flex-shrink: 0;
        }
        .sidebar:hover {
          width: var(--sidebar-width);
          padding: var(--space-md);
        }
        
        .sidebar::-webkit-scrollbar { display: none; }
        .sidebar { -ms-overflow-style: none; scrollbar-width: none; }

        .sidebar-header { 
          min-height: 24px; 
          color: var(--text-muted);
          padding: 0 4px;
        }
        .nav-group-label { 
          font-size: 0.65rem; 
          text-transform: uppercase; 
          letter-spacing: 0.1em; 
          font-weight: 700; 
          opacity: 0.7;
        }
        
        .nav-menu { list-style: none; display: flex; flex-direction: column; gap: 4px; padding: 0; margin: 0; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--space-sm);
          padding: 10px 12px;
          border-radius: 8px;
          color: var(--text-muted);
          text-decoration: none;
          transition: var(--transition);
          white-space: nowrap;
        }
        .nav-link .nav-icon {
          color: inherit;
          flex-shrink: 0;
          min-width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-link:hover {
          color: var(--text-main);
          background: rgba(99, 102, 241, 0.08);
        }
        .nav-link.active {
          color: var(--primary);
          background: rgba(99, 102, 241, 0.12);
          font-weight: 600;
        }
        .nav-link.active .nav-icon {
          color: var(--primary);
        }
        .nav-label { 
          font-size: 0.9rem; 
          white-space: nowrap;
          opacity: 0;
          overflow: hidden;
          max-width: 0;
          transition: opacity 0.2s ease, max-width 0.2s ease;
        }
        .sidebar:hover .nav-label {
          opacity: 1;
          max-width: 140px;
        }
        .nav-badge {
          margin-left: auto;
          background: var(--primary);
          color: white;
          padding: 2px 8px;
          border-radius: 20px;
          font-size: 0.65rem;
          font-weight: 700;
          opacity: 0;
          overflow: hidden;
          max-width: 0;
          transition: opacity 0.2s ease, max-width 0.2s ease;
        }
        .sidebar:hover .nav-badge {
          opacity: 1;
          max-width: 50px;
        }
        .sidebar-footer { margin-top: auto; }
        .upgrade-card {
          background: var(--bg-main);
          border: 1px solid var(--border-color);
          padding: var(--space-sm);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .upgrade-card .text-sm { white-space: nowrap; }
        .status-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .status-dot.success { background: var(--success); box-shadow: 0 0 8px var(--success); }
        .sidebar .upgrade-card .text-sm,
        .sidebar .upgrade-card p {
          opacity: 0;
          overflow: hidden;
          max-width: 0;
          transition: opacity 0.2s ease, max-width 0.2s ease;
        }
        .sidebar:hover .upgrade-card .text-sm,
        .sidebar:hover .upgrade-card p {
          opacity: 1;
          max-width: 100px;
        }
        .sidebar-logout-btn {
          width: 100%;
          margin-top: 8px;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          color: var(--text-muted);
        }
        .sidebar-logout-btn:hover { color: var(--danger); background: rgba(239, 68, 68, 0.08); }
      `}</style>
    </aside>
  );
};

export default Sidebar;
