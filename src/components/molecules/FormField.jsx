import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Textarea from '../atoms/Textarea';

const FormField = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder,
  required = false,
  error,
  id,
  as = 'input',
  rows = 3
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id || name} className="block text-sm font-semibold text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {as === 'textarea' ? (
        <Textarea
          id={id || name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
        />
      ) : (
        <Input
          id={id || name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string,
  as: PropTypes.oneOf(['input', 'textarea']),
  rows: PropTypes.number,
};

export default FormField;
