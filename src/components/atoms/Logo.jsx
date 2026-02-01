import PropTypes from 'prop-types';

const Logo = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="flex items-center gap-2">
      <i className={`fas fa-brain text-blue-600 ${sizes[size]}`}></i>
      {showText && (
        <span className={`font-bold text-gray-800 ${sizes[size]}`}>
          DBI Research Group
        </span>
      )}
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  showText: PropTypes.bool,
};

export default Logo;
