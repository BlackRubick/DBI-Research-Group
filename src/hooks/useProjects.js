import { useState, useEffect } from 'react';

// Simulated API - in production, replace with actual API calls
const mockProjects = [
  {
    id: 1,
    titulo: 'Plataforma de Gestión de Investigación DBI',
    categoria: 'Sistemas de Información',
    resumen: 'Sistema web para la gestión integral de proyectos de investigación del grupo DBI, con control de documentos, equipo y galería multimedia.',
    estado: 'En Desarrollo',
    imagen: '/images/yo.jpeg',
    docentes: ['César Gómez Aguilera'],
    alumnos: [],
    documentos: [],
  },
];

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadProjects = () => {
      // Limpiar datos antiguos y cargar nuevos (vacío)
      localStorage.removeItem('projects');
      setProjects(mockProjects);
      localStorage.setItem('projects', JSON.stringify(mockProjects));
      setLoading(false);
    };

    setTimeout(loadProjects, 500);
  }, []);

  const saveProjects = (newProjects) => {
    setProjects(newProjects);
    localStorage.setItem('projects', JSON.stringify(newProjects));
  };

  const addProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
    };
    const updated = [...projects, newProject];
    saveProjects(updated);
    return newProject;
  };

  const updateProject = (id, updatedProject) => {
    const updated = projects.map(p => p.id === id ? { ...p, ...updatedProject } : p);
    saveProjects(updated);
  };

  const deleteProject = (id) => {
    const updated = projects.filter(p => p.id !== id);
    saveProjects(updated);
  };

  return {
    projects,
    loading,
    addProject,
    updateProject,
    deleteProject,
  };
};
