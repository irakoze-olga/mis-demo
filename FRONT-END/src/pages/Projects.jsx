import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Search, Folder, Calendar, Users, BarChart3, AlertCircle, CheckCircle, Clock, PauseCircle, Check } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import '../styles/components.css';

const Projects = () => {
  const { projects, addProject, deleteProject, updateProject } = useProjects();

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    team: 1,
    deadline: "",
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newProject.name.trim()) {
      newErrors.name = "Project name is required";
    } else if (newProject.name.trim().length < 2) {
      newErrors.name = "Project name must be at least 2 characters";
    }

    if (!newProject.description.trim()) {
      newErrors.description = "Description is required";
    } else if (newProject.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!newProject.deadline) {
      newErrors.deadline = "Deadline is required";
    } else {
      const deadlineDate = new Date(newProject.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (deadlineDate < today) {
        newErrors.deadline = "Deadline cannot be in the past";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProject({ ...newProject, [name]: value });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleAddProject = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if project name already exists
    if (projects.some(project => project.name.toLowerCase() === newProject.name.toLowerCase())) {
      setErrors({ name: "Project name already exists" });
      return;
    }

    const projectToAdd = {
      id: Date.now(),
      name: newProject.name.trim(),
      description: newProject.description.trim(),
      status: newProject.status,
      priority: newProject.priority,
      team: parseInt(newProject.team),
      deadline: newProject.deadline,
      progress: newProject.status === "Completed" ? 100 : newProject.status === "Pending" ? 0 : Math.floor(Math.random() * 80) + 10,
    };

    addProject(projectToAdd);
    setNewProject({ name: "", description: "", status: "Pending", priority: "Medium", team: 1, deadline: "" });
    setShowAddForm(false);
    setErrors({});

    // Show success message
    const toast = document.createElement('div');
    toast.textContent = `Project "${projectToAdd.name}" created successfully!`;
    toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleDeleteProject = (projectId) => {
    const projectToDelete = projects.find(p => p.id === projectId);
    if (window.confirm(`Are you sure you want to delete "${projectToDelete.name}"?`)) {
      deleteProject(projectId);

      // Show success message
      const toast = document.createElement('div');
      toast.textContent = `Project "${projectToDelete.name}" deleted!`;
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--danger);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const handleMarkAsCompleted = (projectId) => {
    const projectToComplete = projects.find(p => p.id === projectId);
    if (window.confirm(`Mark "${projectToComplete.name}" as completed?`)) {
      updateProject(projectId, {
        status: 'Completed',
        progress: 100
      });

      // Show success message
      const toast = document.createElement('div');
      toast.textContent = `Project "${projectToComplete.name}" marked as completed!`;
      toast.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--success);color:white;padding:12px 20px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);font-size:0.9rem;z-index:9999;';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active': return <BarChart3 size={16} className="text-primary" />;
      case 'Completed': return <CheckCircle size={16} className="text-success" />;
      case 'Pending': return <Clock size={16} className="text-warning" />;
      case 'On Hold': return <PauseCircle size={16} className="text-danger" />;
      default: return <AlertCircle size={16} className="text-muted" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-danger';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted';
    }
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-page flex-col gap-xl">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted">Manage projects and track their progress</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={18} /> {showAddForm ? 'Cancel' : 'Add Project'}
        </button>
      </header>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-wrapper">
          <Search size={18} className="text-muted" />
          <input
            type="text"
            placeholder="Search projects by name, description, status, or priority..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="add-project-form card flex-col gap-lg">
          <h3 className="text-xl font-bold">Add New Project</h3>

          <form onSubmit={handleAddProject} className="flex-col gap-md">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <Folder size={16} /> Project Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter project name"
                  value={newProject.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={16} /> Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={newProject.deadline}
                  onChange={handleChange}
                  className={`form-input ${errors.deadline ? 'error' : ''}`}
                />
                {errors.deadline && <span className="error-message">{errors.deadline}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Users size={16} /> Team Size
                </label>
                <select
                  name="team"
                  value={newProject.team}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value={1}>1 member</option>
                  <option value={2}>2 members</option>
                  <option value={3}>3 members</option>
                  <option value={4}>4 members</option>
                  <option value={5}>5 members</option>
                  <option value={6}>6 members</option>
                  <option value={7}>7 members</option>
                  <option value={8}>8 members</option>
                  <option value={9}>9 members</option>
                  <option value={10}>10+ members</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={newProject.status}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={newProject.priority}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                placeholder="Enter project description (minimum 10 characters)"
                value={newProject.description}
                onChange={handleChange}
                className={`form-input ${errors.description ? 'error' : ''}`}
                rows={3}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-actions flex gap-sm">
              <button type="submit" className="btn btn-primary">
                <Plus size={18} /> Add Project
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setShowAddForm(false);
                  setNewProject({ name: "", description: "", status: "Pending", priority: "Medium", team: 1, deadline: "" });
                  setErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.length === 0 ? (
          <div className="empty-state card flex-col items-center gap-lg" style={{ padding: '3rem' }}>
            <Folder size={48} className="text-muted" />
            <h3 className="text-xl font-bold text-muted">
              {searchTerm ? 'No projects found matching your search' : 'No projects available'}
            </h3>
            <p className="text-muted text-center">
              {searchTerm ? 'Try adjusting your search terms' : 'Click "Add Project" to create your first project'}
            </p>
          </div>
        ) : (
          <div className="projects-list grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card card">
                <div className="project-header flex justify-between items-start">
                  <div className="project-info flex-col gap-xs">
                    <h4 className="project-title font-bold">{project.name}</h4>
                    <span className={`project-priority font-medium ${getPriorityColor(project.priority)}`}>
                      {project.priority} Priority
                    </span>
                  </div>
                  <div className="project-actions flex gap-xs">
                    {project.status !== 'Completed' && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleMarkAsCompleted(project.id)}
                        title="Mark as completed"
                      >
                        <Check size={14} />
                      </button>
                    )}
                    <button
                      className="btn btn-sm btn-outline"
                      onClick={() => handleDeleteProject(project.id)}
                      title="Delete project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <p className="project-description text-muted">{project.description}</p>

                <div className="project-status flex items-center gap-xs">
                  {getStatusIcon(project.status)}
                  <span className="font-medium">{project.status}</span>
                </div>

                <div className="project-progress flex-col gap-xs">
                  <div className="progress-header flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted">{project.progress}%</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="project-meta flex justify-between items-center">
                  <div className="project-team flex items-center gap-xs">
                    <Users size={16} className="text-muted" />
                    <span className="text-sm">{project.team} members</span>
                  </div>
                  <div className="project-deadline flex items-center gap-xs">
                    <Calendar size={16} className="text-muted" />
                    <span className="text-sm">{project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .projects-page {
          padding: var(--space-lg);
          max-width: 1200px;
          margin: 0 auto;
        }
        .search-section {
          margin-bottom: var(--space-lg);
        }
        .search-wrapper {
          position: relative;
          max-width: 500px;
        }
        .search-wrapper input {
          padding-left: 2.5rem;
        }
        .search-wrapper svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
        }
        .add-project-form {
          padding: var(--space-xl);
          margin-bottom: var(--space-lg);
        }
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--space-md);
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: var(--space-xs);
        }
        .form-label {
          display: flex;
          align-items: center;
          gap: var(--space-xs);
          font-weight: 600;
          color: var(--text-main);
          font-size: 0.875rem;
        }
        .form-input.error {
          border-color: var(--danger);
        }
        .error-message {
          color: var(--danger);
          font-size: 0.75rem;
        }
        .form-actions {
          margin-top: var(--space-md);
        }
        .projects-list {
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 4rem;
        }
        .project-card {
          padding: 2rem;
          transition: var(--transition);
          border-radius: 12px;
          border: 2px solid var(--border-color);
          background: var(--bg-card);
          box-shadow: var(--shadow-md);
        }
        .project-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }
        .project-header {
          margin-bottom: 1.5rem;
        }
        .project-title {
          font-size: 1.25rem;
          margin: 0;
        }
        .project-priority {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .project-description {
          margin: 0 0 1.5rem 0;
          line-height: 1.6;
          font-size: 0.9rem;
        }
        .project-status {
          margin-bottom: 1.5rem;
        }
        .project-progress {
          margin-bottom: 1.5rem;
        }
        .progress-bar {
          width: 100%;
          height: 8px;
          background: var(--border-color);
          border-radius: 4px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: var(--grad-primary);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
        .project-meta {
          font-size: 0.875rem;
        }
        .empty-state {
          text-align: center;
          border-style: dashed;
          border-color: var(--border-color);
        }
        .project-actions {
          display: flex;
          gap: 0.75rem;
        }
        .btn-sm {
          padding: 8px 12px;
          font-size: 0.85rem;
          border-radius: 8px;
          font-weight: 500;
          min-width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .btn-success {
          background: var(--success);
          color: white;
          border: 1px solid var(--success);
        }
        .btn-success:hover {
          background: var(--success);
          opacity: 0.9;
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(34, 197, 94, 0.3);
        }
        .btn-outline:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .projects-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Projects;
