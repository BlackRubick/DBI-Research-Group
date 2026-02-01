import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamGrid from '../components/organisms/TeamGrid';
import Button from '../components/atoms/Button';
import { useTeam } from '../hooks/useTeam';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const TeamPage = () => {
  const navigate = useNavigate();
  const { getPrincipal, getCollaborators, addMember, updateMember, deleteMember, loading } = useTeam();
  const { isAuthenticated } = useAuth();

  const principals = getPrincipal();
  const collaborators = getCollaborators();

  const handleEdit = (member) => {
    navigate(`/team/${member.id}/edit`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember(id);
        Swal.fire('Eliminado', 'El integrante ha sido eliminado', 'success');
      }
    });
  };

  const handleFormSubmit = (formData) => {
    if (editingMember) {
      updateMember(editingMember.id, formData);
      Swal.fire('Actualizado', 'El integrante ha sido actualizado', 'success');
    } else {
      addMember(formData);
      Swal.fire('Creado', 'El integrante ha sido agregado', 'success');
    }
    setEditingMember(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Nuestro Equipo</h2>
          {isAuthenticated && (
            <Button
              variant="primary"
              icon="fas fa-plus"
              onClick={() => navigate('/team/create')}
            >
              Agregar Integrante
            </Button>
          )}
        </div>
        <p className="text-lg text-gray-600">
          Investigadores y estudiantes que impulsan el desarrollo.
        </p>
      </div>

      {/* Investigadores Principales */}
      <section className="mb-12">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Investigadores Principales
        </h3>
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          <TeamGrid
            members={principals}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAuthenticated}
            size="large"
          />
        )}
      </section>

      {/* Colaboradores */}
      <section>
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Colaboradores y Estudiantes
        </h3>
        {loading ? (
          <p className="text-center text-gray-500">Cargando...</p>
        ) : (
          <TeamGrid
            members={collaborators}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAuthenticated}
            size="small"
          />
        )}
      </section>
    </div>
  );
};

export default TeamPage;
