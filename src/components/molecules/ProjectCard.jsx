import PropTypes from 'prop-types';
import Badge from '../atoms/Badge';

const ProjectCard = ({ 
  image, 
  title, 
  category, 
  description, 
  status,
  onClick,
  onEdit,
  onDelete,
  isAdmin = false
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4 / 3' }}>
        <img 
          src={image || 'https://picsum.photos/seed/default-project/400/300'} 
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://picsum.photos/seed/error-project/400/300'; }}
        />
        <div className="absolute top-3 right-3">
          <Badge variant="primary">{category}</Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>
        
        <div className="flex items-center justify-between">
          <Badge variant={status === 'Publicado' ? 'success' : 'warning'}>
            {status}
          </Badge>
          
          <div className="flex gap-2">
            <button
              onClick={onClick}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Ver más →
            </button>
            
            {isAdmin && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                  }}
                  className="text-gray-600 hover:text-blue-600"
                >
                  <i className="fas fa-edit"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="text-gray-600 hover:text-red-600"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string,
  status: PropTypes.string,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default ProjectCard;
