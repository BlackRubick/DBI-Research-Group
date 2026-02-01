import PropTypes from 'prop-types';

const InputWithSuggestions = ({ 
  placeholder, 
  value, 
  onChange, 
  name,
  suggestions = [],
  required = false,
  disabled = false,
  className = '',
  id,
  label
}) => {
  const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed';
  
  const dataListId = `${id || name}-list`;

  return (
    <div>
      {label && (
        <label htmlFor={id || name} className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <i className="fas fa-tag text-blue-600 text-xs"></i>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id || name}
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        list={dataListId}
        className={`${baseStyles} ${className}`}
      />
      <datalist id={dataListId}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </div>
  );
};

InputWithSuggestions.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  suggestions: PropTypes.arrayOf(PropTypes.string),
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

export default InputWithSuggestions;
