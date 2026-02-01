import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';

const StatCard = ({ icon, number, label }) => {
  return (
    <div className="flex items-center gap-4 p-4">
      <Icon name={icon} size="3xl" className="text-white" />
      <div>
        <p className="text-3xl font-bold text-white">{number}</p>
        <p className="text-sm text-white">{label}</p>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
};

export default StatCard;
