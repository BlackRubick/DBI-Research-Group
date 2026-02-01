import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTeam } from '../hooks/useTeam';
import Button from '../components/atoms/Button';
import TeamForm from '../components/organisms/TeamForm';
import AuthorCard from '../components/molecules/AuthorCard';
import Swal from 'sweetalert2';

const TeamCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { team, loading, addMember, updateMember } = useTeam();
  const [preview, setPreview] = useState({
    nombre: '',
    titulo: '',
    universidad: '',
    rol: 'Principal',
    correo: '',
    descripcion: '',
    foto: 'https://i.pravatar.cc/150?img=1',
  });
  const [initialData, setInitialData] = useState(null);

  // Cuando el equipo cargue y hay un id, busca el miembro a editar
  useEffect(() => {
    if (id && team.length > 0) {
      const member = team.find(m => m.id === parseInt(id));
      if (member) {
        setInitialData(member);
        setPreview(member);
      }
    }
  }, [id, team]);

  const handleFormChange = (formData) => {
    setPreview({
      nombre: formData.nombre || 'Nombre del integrante',
      titulo: formData.titulo || 'Título académico',
      universidad: formData.universidad || 'Universidad',
      rol: formData.rol,
      correo: formData.correo || 'correo@ejemplo.com',
      descripcion: formData.descripcion,
      foto: formData.foto || 'https://via.placeholder.com/150/0b2f5f/ffffff?text=Foto',
    });
  };

  const handleFormSubmit = (formData) => {
    if (id) {
      updateMember(parseInt(id), formData);
      Swal.fire('Actualizado', 'El integrante ha sido actualizado', 'success').then(() => {
        navigate('/team');
      });
    } else {
      addMember(formData);
      Swal.fire('Creado', 'El integrante ha sido agregado', 'success').then(() => {
        navigate('/team');
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Button
          variant="ghost"
          icon="fas fa-arrow-left"
          onClick={() => navigate('/team')}
          className="mb-6"
        >
          Volver al Equipo
        </Button>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <i className="fas fa-spinner fa-spin text-4xl text-blue-600 mb-4"></i>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        )}

        {/* Error state si se intenta editar pero no se encuentra el miembro */}
        {id && team.length > 0 && !initialData && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">No se encontró el integrante a editar</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/team')}
              className="mt-4"
            >
              Volver al Equipo
            </Button>
          </div>
        )}

        {!loading && (!id || (id && initialData)) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <TeamForm
              onSubmit={handleFormSubmit}
              initialData={initialData}
              onChange={handleFormChange}
              onCancel={() => navigate('/team')}
            />
          </div>

          {/* Preview */}
          <div className="sticky top-20 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <i className="fas fa-eye text-blue-600"></i>
                Vista Previa
              </h2>

              <div className="mb-6 flex justify-center">
                <div className="max-w-xs w-full">
                  <AuthorCard
                    name={preview.nombre}
                    title={preview.titulo}
                    university={preview.universidad}
                    photo={preview.foto}
                    email={preview.correo}
                    isAdmin={false}
                    size="large"
                  />
                </div>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-900 mb-2"><i className="fas fa-briefcase text-blue-600 mr-2"></i>Rol</p>
                  <p className="text-blue-700">
                    {preview.rol === 'Principal' ? 'Investigador Principal' : 'Colaborador / Alumno'}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="font-semibold text-green-900 mb-2"><i className="fas fa-envelope text-green-600 mr-2"></i>Contacto</p>
                  <p className="text-green-700 break-all">{preview.correo}</p>
                </div>

                {preview.descripcion && (
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <p className="font-semibold text-purple-900 mb-2"><i className="fas fa-pen-fancy text-purple-600 mr-2"></i>Biografía</p>
                    <p className="text-purple-700 text-xs line-clamp-3">{preview.descripcion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default TeamCreatePage;
