import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGallery } from '../hooks/useGallery';
import Button from '../components/atoms/Button';
import FormField from '../components/molecules/FormField';
import FileInput from '../components/atoms/FileInput';
import Swal from 'sweetalert2';

const GalleryCreatePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { gallery, loading, addImage, updateImage } = useGallery();
  
  const [preview, setPreview] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    proyecto: '',
    detalles: '',
    fecha: '',
    participantes: [],
    foto: 'https://picsum.photos/seed/default/600/400',
  });
  
  const [initialData, setInitialData] = useState(null);
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: '',
    proyecto: '',
    detalles: '',
    fecha: '',
    participantes: '',
  });

  // Cuando la galería cargue y hay un id, busca la imagen a editar
  useEffect(() => {
    if (id && gallery.length > 0) {
      const image = gallery.find(img => img.id === parseInt(id));
      if (image) {
        setInitialData(image);
        setFormData({
          titulo: image.titulo || '',
          descripcion: image.descripcion || '',
          categoria: image.categoria || '',
          proyecto: image.proyecto || '',
          detalles: image.detalles || '',
          fecha: image.fecha || '',
          participantes: image.participantes?.join(', ') || '',
        });
        setPreview(image);
      }
    }
  }, [id, gallery]);

  const handleFormChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    
    // Actualizar preview
    const participantesArray = updated.participantes
      .split(',')
      .map(p => p.trim())
      .filter(p => p);
    
    setPreview({
      titulo: updated.titulo || 'Título de la imagen',
      descripcion: updated.descripcion || 'Descripción breve',
      categoria: updated.categoria || 'Categoría',
      proyecto: updated.proyecto || 'Proyecto',
      detalles: updated.detalles || 'Detalles',
      fecha: updated.fecha || new Date().toLocaleDateString('es-ES'),
      participantes: participantesArray,
      foto: preview.foto,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result;
        setFormData(prev => ({ ...prev, foto: base64 }));
        setPreview(prev => ({ ...prev, foto: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const participantesArray = formData.participantes
      .split(',')
      .map(p => p.trim())
      .filter(p => p);

    let imageData = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      categoria: formData.categoria,
      proyecto: formData.proyecto,
      detalles: formData.detalles,
      fecha: formData.fecha,
      participantes: participantesArray,
    };

    // Si hay foto en formData, incluirla
    if (formData.foto) {
      imageData.foto = formData.foto;
    }

    if (id) {
      // Al editar, si no hay foto nueva, mantener la actual
      if (!formData.foto && initialData?.foto) {
        imageData.foto = initialData.foto;
      }
      updateImage(parseInt(id), imageData);
      Swal.fire('Actualizada', 'La imagen ha sido actualizada', 'success').then(() => {
        navigate('/gallery');
      });
    } else {
      // Al crear, foto es requerida (ya está validado por required)
      addImage(imageData);
      Swal.fire('Subida', 'La imagen ha sido agregada', 'success').then(() => {
        navigate('/gallery');
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Button
          variant="ghost"
          icon="fas fa-arrow-left"
          onClick={() => navigate('/gallery')}
          className="mb-6"
        >
          Volver a la Galería
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

        {/* Error state si se intenta editar pero no se encuentra */}
        {id && gallery.length > 0 && !initialData && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700">No se encontró la imagen a editar</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/gallery')}
              className="mt-4"
            >
              Volver a la Galería
            </Button>
          </div>
        )}

        {!loading && (!id || (id && initialData)) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0b2f5f] to-[#0a3a7a] rounded-lg flex items-center justify-center">
                  <i className="fas fa-images text-white text-lg"></i>
                </div>
                {id ? 'Editar Imagen' : 'Agregar Foto'}
              </h1>
              <p className="text-gray-600 mb-8">
                {id ? 'Actualiza los detalles de la imagen' : 'Completa los detalles de la nueva foto'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormField
                  label="Título"
                  name="titulo"
                  value={formData.titulo}
                  onChange={(e) => handleFormChange('titulo', e.target.value)}
                  placeholder="Ej: Laboratorio de IA"
                  required
                />

                <FormField
                  label="Descripción Breve"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={(e) => handleFormChange('descripcion', e.target.value)}
                  placeholder="Ej: Espacio de trabajo del equipo"
                  as="textarea"
                  rows={2}
                />

                <FormField
                  label="Categoría"
                  name="categoria"
                  value={formData.categoria}
                  onChange={(e) => handleFormChange('categoria', e.target.value)}
                  placeholder="Infraestructura, Desarrollo, Eventos..."
                />

                <FormField
                  label="Proyecto Asociado"
                  name="proyecto"
                  value={formData.proyecto}
                  onChange={(e) => handleFormChange('proyecto', e.target.value)}
                  placeholder="Ej: Sistema de Diagnóstico con IA"
                />

                <FormField
                  label="Fecha"
                  name="fecha"
                  value={formData.fecha}
                  onChange={(e) => handleFormChange('fecha', e.target.value)}
                  placeholder="15 de Enero, 2026"
                />

                <FormField
                  label="Detalles"
                  name="detalles"
                  value={formData.detalles}
                  onChange={(e) => handleFormChange('detalles', e.target.value)}
                  placeholder="Descripción completa de la imagen..."
                  as="textarea"
                  rows={4}
                />

                <FormField
                  label="Participantes (separados por coma)"
                  name="participantes"
                  value={formData.participantes}
                  onChange={(e) => handleFormChange('participantes', e.target.value)}
                  placeholder="Dr. Juan Pérez, Ana López, Carlos López"
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Foto {!id && <span className="text-red-500">*</span>}
                  </label>
                  <FileInput
                    name="foto"
                    accept="image/*"
                    required={!id}
                    onChange={handleFileChange}
                  />
                  {id && (
                    <p className="text-xs text-gray-500 mt-1">Deja en blanco para mantener la imagen actual</p>
                  )}
                </div>

                <div className="flex gap-3 pt-6 border-t">
                  <Button type="submit" variant="primary" className="flex-grow">
                    <i className="fas fa-save"></i>
                    {id ? 'Actualizar' : 'Subir'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => navigate('/gallery')}
                    className="flex-grow"
                  >
                    <i className="fas fa-times"></i>
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Preview */}
          <div className="sticky top-20 h-fit">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <i className="fas fa-eye text-blue-600"></i>
                Vista Previa
              </h2>
              
              <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={preview.foto} 
                  alt={preview.titulo}
                  className="w-full h-64 object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Título</p>
                  <p className="text-xl font-bold text-gray-800">{preview.titulo || 'Título de la imagen'}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Descripción</p>
                  <p className="text-gray-700">{preview.descripcion || 'Descripción breve'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 font-semibold">Categoría</p>
                    <p className="text-sm text-blue-800">{preview.categoria || 'No especificada'}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 font-semibold">Proyecto</p>
                    <p className="text-sm text-green-800">{preview.proyecto || 'No especificado'}</p>
                  </div>
                </div>

                {preview.fecha && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 font-semibold">Fecha</p>
                    <p className="text-sm text-purple-800">{preview.fecha}</p>
                  </div>
                )}

                {preview.detalles && (
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 font-semibold">Detalles</p>
                    <p className="text-sm text-orange-800 line-clamp-3">{preview.detalles}</p>
                  </div>
                )}

                {preview.participantes && preview.participantes.length > 0 && (
                  <div className="p-3 bg-pink-50 rounded-lg">
                    <p className="text-xs text-pink-600 font-semibold mb-2">Participantes</p>
                    <div className="flex flex-wrap gap-2">
                      {preview.participantes.map((p, idx) => (
                        <span key={idx} className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded-full">
                          {p}
                        </span>
                      ))}
                    </div>
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

export default GalleryCreatePage;
