import PropTypes from 'prop-types';
import GalleryItem from '../molecules/GalleryItem';

const GalleryGrid = ({ items, onItemClick, onEdit, onDelete, isAdmin }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-images text-6xl text-gray-300 mb-4"></i>
        <p className="text-gray-500 text-lg">No hay imágenes en la galería</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <GalleryItem
          key={item.id}
          image={item.foto}
          title={item.titulo}
          description={item.descripcion}
          onClick={() => onItemClick(item)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

GalleryGrid.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemClick: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default GalleryGrid;
