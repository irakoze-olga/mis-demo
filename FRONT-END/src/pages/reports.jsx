import React, { useEffect, useState } from 'react';
import { BarChart3, Users, DollarSign, TrendingUp, Calendar, Download, RefreshCw, FileText, Activity, Award, Clock, CheckCircle } from 'lucide-react';
import '../styles/components.css';

const Reports = () => {
  const [reports, setReports] = useState({
    students: 520,
    teachers: 42,
    attendanceRate: 92,
    feesCollected: 185000,
    graduationRate: 88,
    averageGrade: 85,
    coursesOffered: 24,
    libraryBooks: 15420,
  });

  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('current');

  // Simulated API call
  useEffect(() => {
    // Replace this with real API call later
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Show success message
      const toast = document.createElement('div');
      toast.textContent = 'Reports refreshed successfully!';
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }, 500);
  };

  const handleExport = (format) => {
    // Show success message
    const toast = document.createElement('div');
    toast.textContent = `Report exported as ${format.toUpperCase()}!`;
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--primary);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const StatCard = ({ title, value, icon: Icon, color, change, changeType, trend }) => (
    <div className="stat-card card">
      <div className="stat-header flex justify-between items-center">
        <div className="stat-info flex items-center gap-md">
          <div className="stat-icon" style={{ background: color }}>
            <Icon size={24} />
          </div>
          <div>
            <h3 className="stat-title">{title}</h3>
            <div className="stat-change flex items-center gap-xs">
              {change && (
                <>
                  {trend && <TrendingUp size={16} className={changeType === 'positive' ? 'text-success' : 'text-danger'} />}
                  <span className={`text-sm ${changeType === 'positive' ? 'text-success' : 'text-danger'}`}>
                    {change}
                  </span>
                </>
              )}
            </div>
            </div>
          </div>
        </div>
      <div className="stat-value">
        <span className="value">{value}</span>
        {trend && <div className="trend-indicator" />}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="reports-page flex-col gap-xl">
        <div className="loading-state card flex-col items-center gap-lg">
          <RefreshCw size={48} className="animate-spin text-muted" />
          <h2 className="text-xl font-bold text-muted">Loading Reports...</h2>
          <p className="text-muted">Please wait while we gather your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="reports-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">School Reports</h1>
          <p className="text-muted">Comprehensive overview of school performance and statistics</p>
        </div>
        <div className="flex gap-sm">
          <select 
            className="form-input"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="current">Current Year</option>
            <option value="last">Last Year</option>
            <option value="all">All Time</option>
          </select>
          <button className="btn btn-outline" onClick={handleRefresh}>
            <RefreshCw size={18} /> Refresh
          </button>
        </div>
      </header>

      {/* Main Statistics Grid */}
      <div className="stats-grid">
        <StatCard
          title="Total Students"
          value={reports.students.toLocaleString()}
          icon={Users}
          color="var(--success)"
          change="+12%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Total Teachers"
          value={reports.teachers}
          icon={Award}
          color="var(--primary)"
          change="+5%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Attendance Rate"
          value={`${reports.attendanceRate}%`}
          icon={Activity}
          color="var(--warning)"
          change="+2%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Fees Collected"
          value={`$${reports.feesCollected.toLocaleString()}`}
          icon={DollarSign}
          color="var(--primary)"
          change="+18%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Graduation Rate"
          value={`${reports.graduationRate}%`}
          icon={CheckCircle}
          color="var(--success)"
          change="+3%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Average Grade"
          value={`${reports.averageGrade}%`}
          icon={Award}
          color="var(--warning)"
          change="-1%"
          changeType="negative"
          trend
        />
        <StatCard
          title="Courses Offered"
          value={reports.coursesOffered}
          icon={FileText}
          color="var(--primary)"
          change="+8%"
          changeType="positive"
          trend
        />
        <StatCard
          title="Library Books"
          value={reports.libraryBooks.toLocaleString()}
          icon={BarChart3}
          color="var(--primary-light)"
          change="+15%"
          changeType="positive"
          trend
        />
      </div>

      {/* Export Actions */}
      <div className="export-section card">
        <div className="section-header flex items-center gap-md">
          <Download size={20} className="text-primary" />
          <h2 className="text-xl font-bold">Export Reports</h2>
        </div>
        
        <div className="export-options grid">
          <button 
            className="export-option flex items-center gap-md"
            onClick={() => handleExport('pdf')}
          >
            <FileText size={20} />
            <div className="flex-col">
              <span className="font-medium">PDF Report</span>
              <span className="text-sm text-muted">Complete annual report</span>
            </div>
          </button>
          
          <button 
            className="export-option flex items-center gap-md"
            onClick={() => handleExport('excel')}
          >
            <BarChart3 size={20} />
            <div className="flex-col">
              <span className="font-medium">Excel Spreadsheet</span>
              <span className="text-sm text-muted">Data for analysis</span>
            </div>
          </button>
          
          <button 
            className="export-option flex items-center gap-md"
            onClick={() => handleExport('csv')}
          >
            <FileText size={20} />
            <div className="flex-col">
              <span className="font-medium">CSV Data</span>
              <span className="text-sm text-muted">Raw data export</span>
            </div>
          </button>
        </div>
      </div>

      {/* Quick Insights */}
      <div className="insights-section card">
        <div className="section-header flex items-center gap-md">
          <TrendingUp size={20} className="text-success" />
          <h2 className="text-xl font-bold">Quick Insights</h2>
        </div>
        
        <div className="insights-grid">
          <div className="insight-item">
            <div className="insight-icon text-success">
              <Users size={24} />
            </div>
            <div className="insight-content">
              <h4>Student Growth</h4>
              <p className="text-muted">12% increase from last year</p>
            </div>
          </div>
          
          <div className="insight-item">
            <div className="insight-icon text-primary">
              <Activity size={24} />
            </div>
            <div className="insight-content">
              <h4>Attendance Improvement</h4>
              <p className="text-muted">Best attendance rate in 5 years</p>
            </div>
          </div>
          
          <div className="insight-item">
            <div className="insight-icon text-warning">
              <DollarSign size={24} />
            </div>
            <div className="insight-content">
              <h4>Revenue Growth</h4>
              <p className="text-muted">18% increase in fee collection</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .reports-page {
          padding: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        .loading-state {
          padding: 4rem 2rem;
          text-align: center;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .stat-card {
          padding: 1.5rem;
          border-radius: 12px;
          transition: var(--transition);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .stat-header {
          margin-bottom: 1rem;
        }
        .stat-info {
          align-items: flex-start;
        }
        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .stat-title {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin: 0;
        }
        .stat-change {
          margin-top: 0.25rem;
        }
        .stat-value {
          text-align: right;
        }
        .stat-value .value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-main);
          display: block;
        }
        .trend-indicator {
          width: 8px;
          height: 8px;
          background: var(--success);
          border-radius: 50%;
          margin-top: 0.5rem;
        }
        .export-section {
          padding: 2rem;
        }
        .section-header {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }
        .export-options {
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }
        .export-option {
          padding: 1.5rem;
          border: 2px solid var(--border-color);
          border-radius: 12px;
          background: var(--bg-main);
          cursor: pointer;
          transition: var(--transition);
        }
        .export-option:hover {
          border-color: var(--primary);
          background: rgba(99, 102, 241, 0.05);
        }
        .insights-section {
          padding: 2rem;
        }
        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        .insight-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 12px;
          background: var(--bg-main);
          border: 1px solid var(--border-color);
        }
        .insight-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(99, 102, 241, 0.1);
          color: var(--primary);
        }
        .insight-content h4 {
          margin: 0 0 0.5rem 0;
          font-size: 1rem;
          color: var(--text-main);
        }
        .insight-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        
        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
          .export-options {
            grid-template-columns: 1fr;
          }
          .insights-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Reports;
