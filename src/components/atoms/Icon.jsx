import PropTypes from 'prop-types';

const Icon = ({ name, className = '', size = 'base' }) => {
  const sizes = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  return <i className={`${name} ${sizes[size]} ${className}`}></i>;
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'base', 'lg', 'xl', '2xl', '3xl']),
};

export default Icon;
