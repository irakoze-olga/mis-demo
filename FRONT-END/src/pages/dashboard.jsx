import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, BarChart2, UserPlus, FolderOpen, DollarSign, Clock, Users, Eye, Edit, Trash2, Bell } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useProjects } from '../context/ProjectContext';
import { useUsers } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';
import StatCard from '../components/dashboard/StatCard';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import ChartCard from '../components/dashboard/ChartCard';
import DataTable from '../components/data/datatable.jsx';
import '../styles/components.css';
import '../styles/dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProjectStats, deleteProject } = useProjects();
  const { users } = useUsers();
  const { notifications } = useNotifications();
  const projectStats = getProjectStats();

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleRefreshData = () => {
    window.location.reload();
  };

  const handleNewProject = () => {
    navigate('/projects');
  };

  const handleGenerateReport = () => {
    navigate('/reports');
  };

  const handleAddUser = () => {
    navigate('/users');
  };

  const handleViewProject = (projectId) => {
    navigate(`/projects`);
  };

  const handleEditProject = (projectId) => {
    navigate(`/projects/${projectId}/edit`);
  };

  const handleDeleteProject = (projectId) => {
    const project = projectStats.projects.find(p => p.id === projectId);
    if (window.confirm(`Are you sure you want to delete "${project.name}"?`)) {
      deleteProject(projectId);

      // Show success message
      const toast = document.createElement('div');
      toast.textContent = `Project "${project.name}" deleted!`;
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--danger);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleTableAction = (action, projectId) => {
    switch (action) {
      case 'view':
        handleViewProject(projectId);
        break;
      case 'edit':
        handleEditProject(projectId);
        break;
      case 'delete':
        handleDeleteProject(projectId);
        break;
      default:
        break;
    }
  };

  const stats = [
    { title: "Total Users", value: users.length.toString(), change: "+12%", icon: Users, color: "blue" },
    { title: "Active Projects", value: projectStats.activeProjects.toString(), change: "+5%", icon: FolderOpen, color: "green" },
    { title: "Notifications", value: notifications.length.toString(), change: "+23%", icon: Bell, color: "purple" },
    { title: "Avg Progress", value: `${projectStats.avgProgress}%`, change: "-3%", icon: Clock, color: "orange" },
  ];

  const tableData = projectStats.projects.map(project => ({
    id: project.id,
    name: project.name,
    status: project.status,
    progress: `${project.progress}%`,
    team: project.team,
    deadline: project.deadline,
    actions: project.id,
  }));

  const columns = [
    { header: "ID", accessor: "id", sortable: true },
    { header: "Project Name", accessor: "name", sortable: true },
    { header: "Status", accessor: "status", sortable: true },
    { header: "Progress", accessor: "progress", sortable: true },
    { header: "Team Size", accessor: "team", sortable: true },
    { header: "Deadline", accessor: "deadline", sortable: true },
    { header: "Actions", accessor: "actions", sortable: false },
  ];

  return (
    <div className="dashboard-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">MIS Dash <span className="text-muted" style={{ fontWeight: 400 }}>Overview</span></h1>
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
          <ChartCard title="User Growth" type="line" />
          <DataTable title="Recent Projects Overview" data={tableData} columns={columns} onAction={handleTableAction} />
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
        
        /* Enhanced Quick Actions Button Styling */
        .quick-actions-card {
          background: linear-gradient(135deg, var(--bg-card) 0%, rgba(99, 102, 241, 0.02) 100%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        
        .quick-actions-card .card-title {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 1.2rem;
          font-weight: 800;
          text-align: center;
          padding: 0.5rem;
          margin: -1rem -1rem 1rem -1rem !important;
          border-bottom: 2px solid var(--primary-light);
        }
        
        .quick-actions-card .btn {
          border-radius: var(--radius-md);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 0.875rem 1rem;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .quick-actions-card .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }
        
        .quick-actions-card .btn:hover::before {
          left: 100%;
        }
        
        .quick-actions-card .btn-primary {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border: none;
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }
        
        .quick-actions-card .btn-primary:hover {
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 20px rgba(99, 102, 241, 0.4);
        }
        
        .quick-actions-card .btn-secondary {
          background: linear-gradient(135deg, var(--bg-main) 0%, var(--bg-card) 100%);
          border: 2px solid var(--primary-light);
          color: var(--primary);
          box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
        }
        
        .quick-actions-card .btn-secondary:hover {
          background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
          border-color: var(--primary);
          color: white;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(99, 102, 241, 0.3);
        }
        
        .quick-actions-card .btn-outline {
          background: transparent;
          border: 2px solid var(--primary);
          color: var(--primary);
          position: relative;
          z-index: 1;
        }
        
        .quick-actions-card .btn-outline::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          transition: width 0.3s ease;
          z-index: -1;
        }
        
        .quick-actions-card .btn-outline:hover::after {
          width: 100%;
        }
        
        .quick-actions-card .btn-outline:hover {
          color: white;
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 6px 18px rgba(99, 102, 241, 0.3);
        }
        
        .quick-actions-card .btn svg {
          transition: transform 0.3s ease;
        }
        
        .quick-actions-card .btn:hover svg {
          transform: scale(1.1) rotate(5deg);
        }
        
        @media (max-width: 1200px) {
          .dashboard-main-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
