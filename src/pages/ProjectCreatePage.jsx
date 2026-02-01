import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import Button from '../components/atoms/Button';
import ProjectForm from '../components/organisms/ProjectForm';
import ProjectCard from '../components/molecules/ProjectCard';
import Swal from 'sweetalert2';

const ProjectCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { projects, loading, addProject, updateProject } = useProjects();
  const [preview, setPreview] = useState({
    titulo: '',
    categoria: 'Inteligencia Artificial',
    resumen: '',
    estado: 'En Desarrollo',
    imagen: 'https://via.placeholder.com/400x300/0b2f5f/ffffff?text=Vista+Previa',
    docentes: [],
    alumnos: [],
  });
  const [initialData, setInitialData] = useState(null);

  // Cuando los proyectos carguen y hay un id, busca el proyecto a editar
  useEffect(() => {
    if (id && projects.length > 0) {
      const project = projects.find(p => p.id === parseInt(id));
      if (project) {
        setInitialData(project);
        setPreview(project);
      }
    }
  }, [id, projects]);

  const handleFormChange = (formData) => {
    setPreview({
      titulo: formData.titulo || 'Título del proyecto',
      categoria: formData.categoria,
      resumen: formData.resumen || 'Sin descripción',
      estado: formData.estado,
      imagen: formData.imagen || 'https://via.placeholder.com/400x300/0b2f5f/ffffff?text=Vista+Previa',
      docentes: formData.docentes || [],
      alumnos: formData.alumnos || [],
    });
  };

  const handleFormSubmit = (formData) => {
    if (id) {
      updateProject(parseInt(id), formData);
      Swal.fire('Actualizado', 'El proyecto ha sido actualizado', 'success').then(() => {
        navigate('/projects');
      });
    } else {
      addProject(formData);
      Swal.fire('Creado', 'El proyecto ha sido creado', 'success').then(() => {
        navigate('/projects');
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Button
          variant="ghost"
          icon="fas fa-arrow-left"
          onClick={() => navigate('/projects')}
          className="mb-6"
        >
          Volver al Catálogo
        </Button>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        )}

        {/* Error state si se intenta editar pero no se encuentra el proyecto */}
        {id && projects.length > 0 && !initialData && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">No se encontró el proyecto a editar</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/projects')}
              className="mt-4"
            >
              Volver a Proyectos
            </Button>
          </div>
        )}

        {!loading && (!id || (id && initialData)) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulario */}
            <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0b2f5f] to-[#0a3a7a] rounded-lg flex items-center justify-center">
                  <i className="fas fa-plus-circle text-white text-lg"></i>
                </div>
                {id ? 'Editar Proyecto' : 'Crear Proyecto'}
              </h1>
              <p className="text-gray-600 mb-8">
                {id ? 'Actualiza los detalles del proyecto' : 'Completa los detalles de tu nuevo proyecto'}
              </p>

              <ProjectForm
                onSubmit={handleFormSubmit}
                initialData={initialData}
                onChange={handleFormChange}
                existingProjects={projects}
                onCancel={() => navigate('/projects')}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="sticky top-20 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <i className="fas fa-eye text-blue-600"></i>
                Vista Previa
              </h2>
              
              <div className="mb-6">
                <ProjectCard
                  image={preview.imagen}
                  title={preview.titulo}
                  category={preview.categoria}
                  description={preview.resumen}
                  status={preview.estado}
                  isAdmin={false}
                  onClick={() => {}}
                />
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2"><i className="fas fa-folder text-blue-600 mr-2"></i>Línea</p>
                  <p className="text-blue-700">{preview.categoria || 'No especificada'}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2"><i className="fas fa-check text-green-600 mr-2"></i>Estado</p>
                  <p className="text-green-700">{preview.estado || 'No especificado'}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="font-semibold text-purple-900 mb-2"><i className="fas fa-users text-purple-600 mr-2"></i>Investigadores</p>
                  <p className="text-purple-700">{preview.docentes?.length || 0} agregados</p>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="font-semibold text-orange-900 mb-2"><i className="fas fa-graduation-cap text-orange-600 mr-2"></i>Alumnos</p>
                  <p className="text-orange-700">{preview.alumnos?.length || 0} agregados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCreatePage;
