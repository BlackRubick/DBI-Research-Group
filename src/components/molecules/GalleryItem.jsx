import PropTypes from 'prop-types';

const GalleryItem = ({ image, title, description, onClick, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl">
      <img 
        src={image} 
        alt={title}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
        onClick={onClick}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
        {description && <p className="text-white/90 text-sm">{description}</p>}
      </div>
      
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-edit text-sm"></i>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
          >
            <i className="fas fa-trash text-sm"></i>
          </button>
        </div>
      )}
    </div>
  );
};

GalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default GalleryItem;
