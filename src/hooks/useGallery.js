import { useState, useEffect } from 'react';

const mockGallery = [
  {
    id: 1,
    titulo: 'Desarrollo de Plataforma DBI',
    descripcion: 'Sesión de trabajo en el desarrollo de la plataforma de gestión de investigación',
    foto: '/images/yo.jpeg',
    categoria: 'Desarrollo',
    fecha: '1 de Febrero, 2026',
    proyecto: 'Plataforma de Gestión de Investigación DBI',
    detalles: 'Se realiza el desarrollo de la plataforma web para la gestión integral del grupo de investigación DBI. Esta aplicación permite administrar proyectos, equipo de trabajo, documentos y galería multimedia de manera centralizada y eficiente.',
    participantes: ['César Gómez Aguilera'],
  },
];

export const useGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGallery = () => {
      // Limpiar datos antiguos y cargar nuevos (vacío)
      localStorage.removeItem('gallery');
      setGallery(mockGallery);
      localStorage.setItem('gallery', JSON.stringify(mockGallery));
      setLoading(false);
    };

    setTimeout(loadGallery, 500);
  }, []);

  const saveGallery = (newGallery) => {
    setGallery(newGallery);
    localStorage.setItem('gallery', JSON.stringify(newGallery));
  };

  const addImage = (image) => {
    const newImage = {
      ...image,
      id: Date.now(),
    };
    const updated = [...gallery, newImage];
    saveGallery(updated);
    return newImage;
  };

  const updateImage = (id, updatedImage) => {
    const updated = gallery.map(i => i.id === id ? { ...i, ...updatedImage } : i);
    saveGallery(updated);
  };

  const deleteImage = (id) => {
    const updated = gallery.filter(i => i.id !== id);
    saveGallery(updated);
  };

  return {
    gallery,
    loading,
    addImage,
    updateImage,
    deleteImage,
  };
};
