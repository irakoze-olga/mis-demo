import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/components.css';

const ChartCard = ({ title, type = 'line' }) => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('7days');

  const handleFullReport = () => {
    navigate('/reports');
  };

  const getTimeRangeLabel = (range) => {
    switch (range) {
      case '7days': return 'Last 7 Days';
      case '30days': return 'Last 30 Days';
      case '3months': return 'Last 3 Months';
      default: return 'User Growth';
    }
  };

  const generateData = (range) => {
    switch (range) {
      case '7days':
        return [
          { day: 'Mon', target: 45, actual: 38 },
          { day: 'Tue', target: 52, actual: 61 },
          { day: 'Wed', target: 48, actual: 45 },
          { day: 'Thu', target: 58, actual: 72 },
          { day: 'Fri', target: 65, actual: 58 },
          { day: 'Sat', target: 35, actual: 42 },
          { day: 'Sun', target: 30, actual: 28 },
        ];
      case '30days':
        return [
          { day: 'Week 1', target: 320, actual: 344 },
          { day: 'Week 2', target: 380, actual: 365 },
          { day: 'Week 3', target: 410, actual: 428 },
          { day: 'Week 4', target: 390, actual: 402 },
        ];
      case '3months':
        return [
          { day: 'Jan', target: 1200, actual: 1350 },
          { day: 'Feb', target: 1100, actual: 1180 },
          { day: 'Mar', target: 1300, actual: 1420 },
        ];
      default:
        return [];
    }
  };

  const chartData = generateData(timeRange);
  const maxValue = Math.max(...chartData.map(d => Math.max(d.target, d.actual)));

  return (
    <div className="chart-card card">
      <div className="chart-header flex justify-between items-center">
        <h3 className="card-title">{getTimeRangeLabel(timeRange)}</h3>
        <select
          className="form-input"
          style={{ width: 'auto', padding: '4px 12px' }}
          aria-label="Select period"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="3months">Last 3 months</option>
        </select>
      </div>

      <div className="chart-content">
        <div className="chart-visual" style={{ height: '100%', display: 'flex', alignItems: 'flex-end', gap: '12px', padding: '10px 0' }}>
          {chartData.map((data, index) => (
            <div key={index} className="chart-bar-group" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <div className="chart-bars" style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '160px' }}>
                <div
                  className="chart-bar target-bar"
                  style={{
                    height: `${(data.target / maxValue) * 100}%`,
                    width: '20px',
                    background: 'var(--border-color)',
                    borderRadius: '2px 2px 0 0',
                    opacity: 0.7,
                    transition: 'all 0.2s ease'
                  }}
                  title={`Target: ${data.target}`}
                ></div>
                <div
                  className="chart-bar actual-bar"
                  style={{
                    height: `${(data.actual / maxValue) * 100}%`,
                    width: '20px',
                    background: 'var(--primary)',
                    borderRadius: '2px 2px 0 0',
                    transition: 'all 0.2s ease'
                  }}
                  title={`Actual: ${data.actual}`}
                ></div>
              </div>
              <span className="chart-label text-muted" style={{ fontSize: '0.7rem', marginTop: '4px' }}>{data.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-footer flex justify-between items-center mt-lg">
        <div className="flex gap-md">
          <div className="flex items-center gap-xs">
            <span className="legend-dot" style={{ background: 'var(--primary)' }}></span>
            <span className="text-muted text-sm">Actual</span>
          </div>
          <div className="flex items-center gap-xs">
            <span className="legend-dot" style={{ background: 'var(--border-color)' }}></span>
            <span className="text-muted text-sm">Target</span>
          </div>
        </div>
        <div className="flex items-center gap-sm">
          <span className="text-sm text-muted">Total: {chartData.reduce((sum, d) => sum + d.actual, 0)} users</span>
          <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={handleFullReport}>Full Report</button>
        </div>
      </div>

      <style>{`
        .chart-content {
          height: 220px;
          margin-top: var(--space-lg);
          position: relative;
        }
        .chart-bar:hover {
          opacity: 1 !important;
          filter: brightness(1.1);
          transform: scaleY(1.02);
        }
        .legend-dot { 
          width: 8px; 
          height: 8px; 
          border-radius: 50%; 
        }
        .chart-bar-group {
          min-height: 200px;
        }
      `}</style>
    </div>
  );
};

export default ChartCard;