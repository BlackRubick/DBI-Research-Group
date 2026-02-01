import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../atoms/Logo';

const Navbar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Investigación', path: '/' },
    { id: 'projects', label: 'Catálogo', path: '/projects' },
    { id: 'team', label: 'Equipo', path: '/team' },
    { id: 'gallery', label: 'Galería', path: '/gallery' },
  ];

  const handleNavigate = (item) => {
    setActiveLink(item.id);
    navigate(item.path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center h-16">
          <div className="flex items-center flex-shrink-0">
            <Logo size="md" />
          </div>
          
          <ul className="hidden lg:flex flex-1 justify-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigate(item)}
                  className={`font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                    activeLink === item.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
              aria-label="Abrir menú"
              aria-expanded={isMenuOpen}
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigate(item)}
                    className={`w-full text-left px-3 py-2 rounded-md font-medium transition-colors duration-200 ${
                      activeLink === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
