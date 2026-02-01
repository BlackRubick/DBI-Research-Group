import { useNavigate } from 'react-router-dom';
import Hero from '../components/organisms/Hero';
import StatsBar from '../components/organisms/StatsBar';
import TeamGrid from '../components/organisms/TeamGrid';
import ProjectGrid from '../components/organisms/ProjectGrid';
import LGACCard from '../components/molecules/LGACCard';
import { useProjects } from '../hooks/useProjects';
import { useTeam } from '../hooks/useTeam';

const HomePage = () => {
  const navigate = useNavigate();
  const { projects, loading: loadingProjects } = useProjects();
  const { getPrincipal, loading: loadingTeam } = useTeam();

  const handleSearch = (searchTerm) => {
    navigate(`/projects?search=${searchTerm}`);
  };

  const handleLGACClick = (category) => {
    navigate(`/projects?category=${category}`);
  };

  const handleProjectClick = (project) => {
    navigate(`/projects/${project.id}`);
  };

  const recentProjects = projects.slice(0, 3);
  const principals = getPrincipal();

  const stats = {
    proyectos: projects.length,
    lineas: 2,
    documentos: projects.reduce((acc, p) => acc + (p.documentos?.length || 0), 0),
  };

  return (
    <div>
      <Hero onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Investigadores Principales */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Investigadores Principales
            </h2>
            <p className="text-lg text-gray-600">
              Líderes académicos del grupo de investigación.
            </p>
          </div>
          {loadingTeam ? (
            <p className="text-center text-gray-500">Cargando investigadores...</p>
          ) : (
            <div className="max-w-6xl mx-auto">
              <TeamGrid
                members={principals}
                isAdmin={false}
                size="large"
              />
            </div>
          )}
        </section>

        {/* Líneas de Investigación */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Líneas de Investigación
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <LGACCard
              icon="fas fa-microchip"
              title="IA en Biomédica"
              description="Diagnóstico y análisis de imágenes médicas con IA."
              onClick={() => handleLGACClick('Inteligencia Artificial')}
            />
            <LGACCard
              icon="fas fa-wifi"
              title="Sistemas Embebidos"
              description="Hardware, monitoreo de pacientes y IoT."
              onClick={() => handleLGACClick('Sistemas Embebidos')}
            />
          </div>
        </section>

        {/* Producción Reciente */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800">
              Producción Reciente
            </h2>
          </div>
          {loadingProjects ? (
            <p className="text-center text-gray-500">Cargando proyectos...</p>
          ) : (
            <ProjectGrid
              projects={recentProjects}
              onProjectClick={handleProjectClick}
              isAdmin={false}
            />
          )}
        </section>
      </div>

      <StatsBar stats={stats} />
    </div>
  );
};

export default HomePage;
