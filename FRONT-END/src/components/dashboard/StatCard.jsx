import React from 'react';
import '../../styles/components.css';

const StatCard = ({ title, value, change, icon: Icon, color }) => {
  const isPositive = change.startsWith('+');

  return (
    <div className={`card stat-card color-${color}`}>
      <div className="flex justify-between items-start">
        <div className="stat-info">
          <p className="stat-label text-muted text-sm font-bold uppercase">{title}</p>
          <h2 className="stat-value">{value}</h2>
          <div className={`stat-change badge ${isPositive ? 'badge-success' : 'badge-danger'}`}>
            {change} <span style={{ marginLeft: '4px' }}>{isPositive ? '↗' : '↘'}</span>
          </div>
        </div>
        <div className="stat-icon-wrapper">
          {Icon && <Icon size={24} strokeWidth={2} className="stat-icon" />}
        </div>
      </div>

      <style>{`
        .stat-card {
          padding: var(--space-md);
          border-left: 3px solid var(--primary);
        }
        
        .stat-value {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 8px 0;
          letter-spacing: -0.02em;
        }
        .stat-label { letter-spacing: 0.05em; font-size: 0.65rem; }
        .stat-icon-wrapper {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.3rem;
        }
        .stat-icon { color: var(--primary); filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1)); }
        .stat-change { margin-top: 4px; }
      `}</style>
    </div>
  );
};

export default StatCard;