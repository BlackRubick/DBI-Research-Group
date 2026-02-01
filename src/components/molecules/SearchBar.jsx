import PropTypes from 'prop-types';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const SearchBar = ({ 
  placeholder = 'Buscar...', 
  value, 
  onChange, 
  onSearch,
  showButton = true 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="flex-grow"
      />
      {showButton && (
        <Button type="submit" variant="primary">
          Buscar
        </Button>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  showButton: PropTypes.bool,
};

export default SearchBar;
