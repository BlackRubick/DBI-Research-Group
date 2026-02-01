import PropTypes from 'prop-types';

const FileInput = ({ 
  accept, 
  multiple = false, 
  onChange, 
  name,
  required = false,
  disabled = false,
  className = '',
  id
}) => {
  const baseStyles = 'w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50';

  return (
    <input
      id={id}
      type="file"
      name={name}
      accept={accept}
      multiple={multiple}
      onChange={onChange}
      required={required}
      disabled={disabled}
      className={`${baseStyles} ${className}`}
    />
  );
};

FileInput.propTypes = {
  accept: PropTypes.string,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default FileInput;
