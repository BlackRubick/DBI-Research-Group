import PropTypes from 'prop-types';
import AuthorCard from '../molecules/AuthorCard';

const TeamGrid = ({ members, onEdit, onDelete, isAdmin, size = 'large' }) => {
  if (!members || members.length === 0) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-users text-6xl text-gray-300 mb-4"></i>
        <p className="text-gray-500 text-lg">No hay miembros en esta sección</p>
      </div>
    );
  }

  const gridClass = size === 'large' 
    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch'
    : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 items-stretch';

  return (
    <div className={gridClass}>
      {members.map((member) => (
        <AuthorCard
          key={member.id}
          name={member.nombre}
          title={member.titulo}
          university={member.universidad}
          photo={member.foto}
          email={member.correo}
          onEdit={() => onEdit(member)}
          onDelete={() => onDelete(member.id)}
          isAdmin={isAdmin}
          size={size}
        />
      ))}
    </div>
  );
};

TeamGrid.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  isAdmin: PropTypes.bool,
  size: PropTypes.oneOf(['large', 'small']),
};

export default TeamGrid;
