import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FolderOpen, DollarSign, Clock, Plus, BarChart2, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ChartCard from '../components/dashboard/ChartCard';
import DataTable from '../components/data/datatable.jsx';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleRefreshData = () => {
    window.location.reload();
  };

  const handleNewProject = () => {
    alert('New Project modal would open here.');
  };

  const handleGenerateReport = () => {
    navigate('/reports');
  };

  const handleAddUser = () => {
    navigate('/users');
  };

  const stats = [
    { title: "Total Users", value: "2,847", change: "+12%", icon: Users, color: "blue" },
    { title: "Active Projects", value: "143", change: "+5%", icon: FolderOpen, color: "green" },
    { title: "Revenue", value: "$48,560", change: "+23%", icon: DollarSign, color: "purple" },
    { title: "Pending Tasks", value: "89", change: "-3%", icon: Clock, color: "orange" },
  ];

  const tableData = [
    { id: 1, name: "Project Alpha", status: "Active", progress: "75%", team: 5, deadline: "2024-03-15" },
    { id: 2, name: "Project Beta", status: "Completed", progress: "100%", team: 8, deadline: "2024-02-28" },
    { id: 3, name: "Project Gamma", status: "Pending", progress: "30%", team: 3, deadline: "2024-04-10" },
    { id: 4, name: "Project Delta", status: "Active", progress: "60%", team: 6, deadline: "2024-03-30" },
    { id: 5, name: "Project Epsilon", status: "On Hold", progress: "10%", team: 4, deadline: "2024-05-15" },
  ];

  const columns = [
    { header: "ID", accessor: "id", sortable: true },
    { header: "Project Name", accessor: "name", sortable: true },
    { header: "Status", accessor: "status", sortable: true },
    { header: "Progress", accessor: "progress", sortable: true },
    { header: "Team Size", accessor: "team", sortable: true },
    { header: "Deadline", accessor: "deadline", sortable: true },
  ];

  return (
    <div className="dashboard-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard <span className="text-muted" style={{ fontWeight: 400 }}>Overview</span></h1>
          <p className="text-muted">Welcome back {user?.name || 'Guest'}! Monitoring your system performance.</p>
        </div>
        <div className="flex gap-sm">
          <button className="btn btn-secondary" onClick={handleDownloadPDF}>Download PDF</button>
          <button className="btn btn-primary" onClick={handleRefreshData}>Refresh Data</button>
        </div>
      </header>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>
      </section>

      <div className="dashboard-main-grid">
        <div className="main-content-area flex-col gap-lg">
          <ChartCard title="User Growth (Last 30 Days)" type="line" />
          <DataTable title="Recent Projects Overview" data={tableData} columns={columns} />
        </div>

        <aside className="dashboard-sidebar-area flex-col gap-lg">
          <ActivityFeed />
          <div className="card quick-actions-card">
            <h3 className="card-title" style={{ marginBottom: '1rem' }}>Quick Actions</h3>
            <div className="flex-col gap-sm">
              <button className="btn btn-primary btn-full" onClick={handleNewProject}><Plus size={18} /> New Project</button>
              <button className="btn btn-secondary btn-full" onClick={handleGenerateReport}><BarChart2 size={18} /> Generate Report</button>
              <button className="btn btn-outline btn-full" onClick={handleAddUser}><UserPlus size={18} /> Add User</button>
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--space-lg);
        }
        .dashboard-main-grid {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-xl);
        }
        .main-content-area { flex: 1; }
        .page-header h1 { font-size: 1.8rem; margin: 0; }
        
        @media (max-width: 1200px) {
          .dashboard-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
