import PropTypes from 'prop-types';

const Textarea = ({ 
  placeholder, 
  value, 
  onChange, 
  name,
  rows = 4,
  required = false,
  disabled = false,
  className = '',
  id
}) => {
  const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical disabled:bg-gray-100 disabled:cursor-not-allowed';

  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required={required}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    />
  );
};

Textarea.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  rows: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Textarea;
