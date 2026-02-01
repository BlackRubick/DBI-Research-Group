import { useParams, useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import Badge from '../components/atoms/Badge';
import Button from '../components/atoms/Button';
import Swal from 'sweetalert2';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useProjects();

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Proyecto no encontrado</h2>
        <Button onClick={() => navigate('/projects')}>Volver al catálogo</Button>
      </div>
    );
  }

  const handleCite = () => {
    const citation = `${project.docentes.join(', ')} (${new Date().getFullYear()}). ${project.titulo}. Universidad Politécnica de Aguascalientes.`;
    
    navigator.clipboard.writeText(citation);
    
    Swal.fire({
      title: 'Cita copiada',
      html: `<p class="text-sm">${citation}</p>`,
      icon: 'success',
      confirmButtonText: 'Cerrar',
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button
        variant="ghost"
        icon="fas fa-arrow-left"
        onClick={() => navigate('/projects')}
        className="mb-6"
      >
        Volver
      </Button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="relative">
          <img
            src={project.imagen || 'https://via.placeholder.com/800x400/0b2f5f/ffffff?text=Proyecto'}
            alt={project.titulo}
            className="w-full h-64 object-cover"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/800x400/0b2f5f/ffffff?text=No+Image'; }}
          />
          <div className="absolute top-4 right-4">
            <Badge variant="primary">{project.categoria}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-blue-600 font-bold mb-2">{project.categoria}</p>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{project.titulo}</h1>
            </div>
            <Button
              variant="outline"
              icon="fas fa-quote-right"
              onClick={handleCite}
            >
              Citar
            </Button>
          </div>

          {/* Resumen */}
          <section className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Resumen</h3>
            <p className="text-gray-700 leading-relaxed">{project.resumen}</p>
          </section>

          {/* Team */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Investigadores</h3>
              <ul className="space-y-2">
                {project.docentes.map((docente, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <i className="fas fa-user-tie text-blue-600"></i>
                    {docente}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Alumnos</h3>
              <ul className="space-y-2">
                {project.alumnos.map((alumno, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <i className="fas fa-user-graduate text-[#0b2f5f]"></i>
                    {alumno}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Files */}
          {project.documentos && project.documentos.length > 0 && (
            <section>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Archivos</h3>
              <div className="space-y-3">
                {project.documentos.map((doc, index) => (
                  <a
                    key={index}
                    href={doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-file-pdf text-red-600 text-2xl"></i>
                    <span className="text-gray-700 font-medium">Documento {index + 1}</span>
                    <i className="fas fa-download ml-auto text-gray-400"></i>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
