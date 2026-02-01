import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const AuthorCard = ({ 
  name, 
  title, 
  university, 
  photo, 
  email,
  onEdit,
  onDelete,
  isAdmin = false,
  size = 'large'
}) => {
  const sizeClasses = size === 'large' 
    ? 'p-6 min-h-[360px]' 
    : 'p-4 min-h-[280px]';

  const imgSizeClasses = size === 'large'
    ? 'w-32 h-32'
    : 'w-20 h-20';

  return (
    <div className={`group bg-white rounded-xl shadow-lg ${sizeClasses} text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 relative h-full flex flex-col overflow-hidden`}>
      {isAdmin && (
        <div className="absolute top-3 right-3 flex gap-2">
          <button
            onClick={onEdit}
            className="text-gray-600 hover:text-blue-600"
          >
            <Icon name="fas fa-edit" size="sm" />
          </button>
          <button
            onClick={onDelete}
            className="text-gray-600 hover:text-red-600"
          >
            <Icon name="fas fa-trash" size="sm" />
          </button>
        </div>
      )}
      
      <div className={`${imgSizeClasses} mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100`}>
        <img 
          src={photo || 'https://i.pravatar.cc/150?img=68'} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://i.pravatar.cc/150?img=1'; }}
        />
      </div>
      
      <div className="flex-1 w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2 break-words">{name}</h3>
        {title && <p className="text-sm text-blue-600 font-medium mb-1 line-clamp-1 break-words">{title}</p>}
        {university && <p className="text-sm text-gray-600 mb-2 line-clamp-1 break-words">{university}</p>}
      </div>
      {email && (
        <a 
          href={`mailto:${email}`}
          className="mt-auto text-xs text-gray-500 hover:text-blue-600 flex items-center justify-center gap-1 break-all text-center"
        >
          <Icon name="fas fa-envelope" size="sm" />
          {email}
        </a>
      )}
    </div>
  );
};

AuthorCard.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  university: PropTypes.string,
  photo: PropTypes.string,
  email: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small']),
};

export default AuthorCard;
