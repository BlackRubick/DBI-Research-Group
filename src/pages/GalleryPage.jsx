import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GalleryGrid from '../components/organisms/GalleryGrid';
import Lightbox from '../components/templates/Lightbox';
import Button from '../components/atoms/Button';
import { useGallery } from '../hooks/useGallery';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const GalleryPage = () => {
  const navigate = useNavigate();
  const { gallery, loading, deleteImage } = useGallery();
  const { isAuthenticated } = useAuth();
  const [lightboxImage, setLightboxImage] = useState(null);

  const handleItemClick = (item) => {
    setLightboxImage(item);
  };

  const handleEdit = (item) => {
    navigate(`/gallery/${item.id}/edit`);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImage(id);
        Swal.fire('Eliminada', 'La imagen ha sido eliminada', 'success');
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-gray-800">Galería</h2>
          {isAuthenticated && (
            <Button
              variant="primary"
              icon="fas fa-plus"
              onClick={() => navigate('/gallery/create')}
            >
              Agregar Foto
            </Button>
          )}
        </div>
        <p className="text-lg text-gray-600">
          Momentos destacados de nuestro grupo de investigación.
        </p>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Cargando galería...</p>
      ) : (
        <GalleryGrid
          items={gallery}
          onItemClick={handleItemClick}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAuthenticated}
        />
      )}

      {/* Lightbox */}
      <Lightbox
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        image={lightboxImage?.foto}
        title={lightboxImage?.titulo}
        description={lightboxImage?.descripcion}
        categoria={lightboxImage?.categoria}
        fecha={lightboxImage?.fecha}
        proyecto={lightboxImage?.proyecto}
        detalles={lightboxImage?.detalles}
        participantes={lightboxImage?.participantes}
      />
    </div>
  );
};

export default GalleryPage;
