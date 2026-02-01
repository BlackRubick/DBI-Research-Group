import PropTypes from 'prop-types';
import Badge from '../atoms/Badge';
import SearchBar from '../molecules/SearchBar';
import { useState } from 'react';

const Hero = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchValue);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-[#0b2f5f] via-[#0a3a7a] to-[#0b2f5f] text-white py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="gray" className="mb-6 bg-white/20 text-white backdrop-blur-sm">
          Ingeniería y Tecnología
        </Badge>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight float-title">
          Dispositivos Biomédicos Inteligentes
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-blue-50 float-subtitle">
          Innovación en algoritmos de IA y sistemas embebidos aplicados a la salud humana y veterinaria.
        </p>
        
        <div className="max-w-2xl mx-auto">
          <SearchBar
            placeholder="Buscar tesis, artículos..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
            showButton={true}
          />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
    </div>
  );
};

Hero.propTypes = {
  onSearch: PropTypes.func,
};

export default Hero;
