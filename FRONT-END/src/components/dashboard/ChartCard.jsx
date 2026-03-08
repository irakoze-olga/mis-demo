import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css';

const ChartCard = ({ title, type = 'line' }) => {
  const navigate = useNavigate();

  const handleFullReport = () => {
    navigate('/reports');
  };

  return (
    <div className="chart-card card">
      <div className="chart-header flex justify-between items-center">
        <h3 className="card-title">{title}</h3>
        <select className="form-input" style={{ width: 'auto', padding: '4px 12px' }} aria-label="Select period">
          <option>Last 30 days</option>
          <option>Last 7 days</option>
        </select>
      </div>

      <div className="chart-content">
        <div className="chart-visual flex items-end gap-sm">
          {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
            <div key={i} className="chart-bar-glow" style={{ height: `${h}%`, flex: 1 }}></div>
          ))}
        </div>
      </div>

      <div className="chart-footer flex justify-between items-center mt-lg">
        <div className="flex gap-md">
          <div className="flex items-center gap-xs">
            <span className="legend-dot" style={{ background: 'var(--primary)' }}></span>
            <span className="text-muted text-sm">Target</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="legend-dot" style={{ background: 'var(--border-color)' }}></span>
            <span className="text-muted text-sm">Actual</span>
          </div>
        </div>
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handleFullReport}>Full Report</button>
      </div>

      <style>{`
        .chart-content {
          height: 200px;
          margin-top: var(--space-lg);
          border-bottom: 2px solid var(--border-color);
          position: relative;
        }
        .chart-visual { height: 100%; padding-bottom: 10px; }
        .chart-bar-glow {
          background: var(--grad-primary);
          border-radius: 4px 4px 0 0;
          opacity: 0.8;
          transition: var(--transition);
        }
        .chart-bar-glow:hover {
          opacity: 1;
          filter: brightness(1.2);
          transform: scaleY(1.05);
        }
        .legend-dot { width: 8px; height: 8px; border-radius: 50%; }
      `}</style>
    </div>
  );
};

export default ChartCard;