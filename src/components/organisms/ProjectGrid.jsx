import PropTypes from 'prop-types';
import ProjectCard from '../molecules/ProjectCard';

const ProjectGrid = ({ projects, onProjectClick, onEdit, onDelete, isAdmin }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-folder-open text-6xl text-gray-300 mb-4"></i>
        <p className="text-gray-500 text-lg">No hay proyectos disponibles</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          image={project.imagen}
          title={project.titulo}
          category={project.categoria}
          description={project.resumen}
          status={project.estado}
          onClick={() => onProjectClick(project)}
          onEdit={() => onEdit(project)}
          onDelete={() => onDelete(project.id)}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

ProjectGrid.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  onProjectClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default ProjectGrid;
