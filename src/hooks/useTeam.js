import { useState, useEffect } from 'react';

const mockTeam = [
  {
    id: 1,
    nombre: 'César Gómez Aguilera',
    titulo: 'Ing. en Desarrollo de Software',
    universidad: 'Universidad Politécnica de Chiapas',
    rol: 'Principal',
    correo: 'blackrubick14@gmail.com',
    descripcion: 'Desarrollador y gestor de proyectos de investigación en el grupo DBI.',
    foto: '/images/yo.jpeg',
  },
  {
    id: 2,
    nombre: 'César Gómez Aguilera',
    titulo: 'Ing. en Desarrollo de Software',
    universidad: 'Universidad Politécnica de Chiapas',
    rol: 'Colaborador',
    correo: 'blackrubick14@gmail.com',
    descripcion: 'Colaborador en desarrollo de software y gestión de proyectos.',
    foto: '/images/yo.jpeg',
  },
];

export const useTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTeam = () => {
      // Limpiar datos antiguos y cargar nuevos
      localStorage.removeItem('team');
      setTeam(mockTeam);
      localStorage.setItem('team', JSON.stringify(mockTeam));
      setLoading(false);
    };

    setTimeout(loadTeam, 500);
  }, []);

  const saveTeam = (newTeam) => {
    setTeam(newTeam);
    localStorage.setItem('team', JSON.stringify(newTeam));
  };

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now(),
    };
    const updated = [...team, newMember];
    saveTeam(updated);
    return newMember;
  };

  const updateMember = (id, updatedMember) => {
    const updated = team.map(m => m.id === id ? { ...m, ...updatedMember } : m);
    saveTeam(updated);
  };

  const deleteMember = (id) => {
    const updated = team.filter(m => m.id !== id);
    saveTeam(updated);
  };

  const getPrincipal = () => team.filter(m => m.rol === 'Principal');
  const getCollaborators = () => team.filter(m => m.rol === 'Colaborador');

  return {
    team,
    loading,
    addMember,
    updateMember,
    deleteMember,
    getPrincipal,
    getCollaborators,
  };
};
