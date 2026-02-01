import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ProjectGrid from '../components/organisms/ProjectGrid';
import Select from '../components/atoms/Select';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useProjects } from '../hooks/useProjects';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { projects, loading, addProject, updateProject, deleteProject } = useProjects();
  const { isAuthenticated } = useAuth();

  const [filteredProjects, setFilteredProjects] = useState([]);
  const [category, setCategory] = useState(searchParams.get('category') || 'Todas');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProject, setEditingProject] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (category !== 'Todas') {
      filtered = filtered.filter(p => p.categoria === category);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.resumen.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProjects(filtered);
  }, [projects, category, searchTerm]);

  const categoryOptions = [
    { value: 'Todas', label: 'Todas' },
    { value: 'Inteligencia Artificial', label: 'Inteligencia Artificial' },
    { value: 'Sistemas Embebidos', label: 'Sistemas Embebidos' },
  ];

  const paginatedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  const handleEdit = (project) => {
    navigate(`/projects/${project.id}/edit`);
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
        deleteProject(id);
        Swal.fire('Eliminado', 'El proyecto ha sido eliminado', 'success');
      }
    });
  };

  const handleFormSubmit = (formData) => {
    if (editingProject) {
      updateProject(editingProject.id, formData);
      Swal.fire('Actualizado', 'El proyecto ha sido actualizado', 'success');
    } else {
      addProject(formData);
      Swal.fire('Creado', 'El proyecto ha sido creado', 'success');
    }
    setEditingProject(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Admin Header */}
      {isAuthenticated && (
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Catálogo de Proyectos</h1>
          <Button
            variant="primary"
            icon="fas fa-plus"
            onClick={() => navigate('/projects/create')}
          >
            Crear Proyecto
          </Button>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-col md:flex-row gap-4">
        <Select
          options={categoryOptions}
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setCurrentPage(1);
          }}
          className="md:w-64"
        />
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-grow"
        />
      </div>

      {/* Projects Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Cargando proyectos...</p>
      ) : (
        <>
          <ProjectGrid
            projects={paginatedProjects}
            onProjectClick={handleProjectClick}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAuthenticated}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="text-gray-700 font-medium">
                Página {currentPage} de {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Siguiente
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
