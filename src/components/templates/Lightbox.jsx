import PropTypes from 'prop-types';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';

const Lightbox = ({ isOpen, onClose, image, title, description, categoria, fecha, proyecto, detalles, participantes }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="fixed top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full"
      >
        &times;
      </button>
      
      <div 
        className="bg-white rounded-xl max-w-4xl w-full my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen Principal */}
        <div className="relative w-full h-96 bg-gray-900">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
          />
          {categoria && (
            <div className="absolute top-4 right-4">
              <Badge variant="primary">{categoria}</Badge>
            </div>
          )}
        </div>
        
        {/* Contenido */}
        <div className="p-8">
          {/* Título y Fecha */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            {fecha && (
              <div className="flex items-center text-gray-500 text-sm">
                <Icon name="fas fa-calendar" size="sm" className="mr-2" />
                <span>{fecha}</span>
              </div>
            )}
          </div>

          {/* Descripción Breve */}
          {description && (
            <p className="text-lg text-gray-600 mb-6 italic">{description}</p>
          )}

          {/* Proyecto Asociado */}
          {proyecto && (
            <div className="mb-6 bg-blue-50 rounded-lg p-4">
              <div className="flex items-center text-blue-800">
                <Icon name="fas fa-project-diagram" size="sm" className="mr-2" />
                <span className="font-semibold">Proyecto:</span>
                <span className="ml-2">{proyecto}</span>
              </div>
            </div>
          )}

          {/* Detalles */}
          {detalles && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="fas fa-info-circle" size="sm" className="mr-2 text-blue-600" />
                Detalles
              </h3>
              <p className="text-gray-700 leading-relaxed">{detalles}</p>
            </div>
          )}

          {/* Participantes */}
          {participantes && participantes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <Icon name="fas fa-users" size="sm" className="mr-2 text-blue-600" />
                Participantes
              </h3>
              <div className="flex flex-wrap gap-2">
                {participantes.map((participante, index) => (
                  <Badge key={index} variant="secondary">
                    {participante}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Botón Cerrar */}
          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Lightbox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  categoria: PropTypes.string,
  fecha: PropTypes.string,
  proyecto: PropTypes.string,
  detalles: PropTypes.string,
  participantes: PropTypes.arrayOf(PropTypes.string),
};

export default Lightbox;
