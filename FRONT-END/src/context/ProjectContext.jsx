import React, { createContext, useContext, useState } from 'react';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", status: "Active", progress: 75, team: 5, deadline: "2024-03-15", description: "Mobile app development project", priority: "High" },
    { id: 2, name: "Project Beta", status: "Completed", progress: 100, team: 8, deadline: "2024-02-28", description: "Website redesign project", priority: "Medium" },
    { id: 3, name: "Project Gamma", status: "Pending", progress: 30, team: 3, deadline: "2024-04-10", description: "Data migration project", priority: "Low" },
  ]);

  const addProject = (project) => {
    setProjects(prev => [...prev, project]);
  };

  const deleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
  };

  const updateProject = (projectId, updates) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const getProjectStats = () => {
    const activeProjects = projects.filter(p => p.status === 'Active').length;
    const completedProjects = projects.filter(p => p.status === 'Completed').length;
    const totalProjects = projects.length;
    const avgProgress = Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects);
    
    return {
      totalProjects,
      activeProjects,
      completedProjects,
      avgProgress,
      projects
    };
  };

  const value = {
    projects,
    addProject,
    deleteProject,
    updateProject,
    getProjectStats
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
