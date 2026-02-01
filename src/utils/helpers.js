// Utility functions for the app

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const generateCitation = (project) => {
  const year = new Date().getFullYear();
  const authors = project.docentes.join(', ');
  return `${authors} (${year}). ${project.titulo}. Universidad Politécnica de Aguascalientes.`;
};

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

export const handleImageError = (e) => {
  e.target.src = 'https://picsum.photos/seed/error/400/300';
};

export const handleAvatarError = (e) => {
  e.target.src = 'https://via.placeholder.com/150/764ba2/ffffff?text=Usuario';
};

export const getCroppedImg = (imageSrc, pixelCrop) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = 'anonymous';

    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };

    image.onerror = (error) => reject(error);
  });
};
