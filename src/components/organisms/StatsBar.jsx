import PropTypes from 'prop-types';
import StatCard from '../molecules/StatCard';

const StatsBar = ({ stats }) => {
  return (
    <section className="bg-gradient-to-r from-[#0b2f5f] to-[#0a3a7a] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <StatCard
            icon="fas fa-folder-open"
            number={stats?.proyectos || 0}
            label="Proyectos"
          />
          <StatCard
            icon="fas fa-network-wired"
            number={stats?.lineas || 2}
            label="Líneas"
          />
          <StatCard
            icon="fas fa-file-pdf"
            number={stats?.documentos || 0}
            label="Documentos"
          />
        </div>
      </div>
    </section>
  );
};

StatsBar.propTypes = {
  stats: PropTypes.shape({
    proyectos: PropTypes.number,
    lineas: PropTypes.number,
    documentos: PropTypes.number,
  }),
};

export default StatsBar;
