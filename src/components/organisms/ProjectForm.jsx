import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Cropper from 'react-easy-crop';
import FormField from '../molecules/FormField';
import Select from '../atoms/Select';
import InputWithSuggestions from '../atoms/InputWithSuggestions';
import Textarea from '../atoms/Textarea';
import FileInput from '../atoms/FileInput';
import Button from '../atoms/Button';
import { getCroppedImg } from '../../utils/helpers';

const ProjectForm = ({ onSubmit, initialData, onCancel, onChange, existingProjects = [] }) => {
  const [formData, setFormData] = useState(initialData || {
    titulo: '',
    categoria: 'Inteligencia Artificial',
    resumen: '',
    estado: 'En Desarrollo',
    docentes: [''],
    alumnos: [''],
    imagen: '',
  });

  const [imageSrc, setImageSrc] = useState('');
  const [isCropping, setIsCropping] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const statusOptions = [
    { value: 'En Desarrollo', label: 'En Desarrollo' },
    { value: 'Publicado', label: 'Publicado' },
  ];

  // Extract unique categories from existing projects
  const categoryOptions = useMemo(() => {
    const unique = new Set(existingProjects.map(p => p.categoria).filter(Boolean));
    const categories = Array.from(unique).sort().map(cat => ({ value: cat, label: cat }));
    return [...categories, { value: '__NEW__', label: '+ Nueva línea' }];
  }, [existingProjects]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'categoria' && value === '__NEW__') {
      setIsNewCategory(true);
      return;
    }
    
    if (name === 'categoria') {
      setIsNewCategory(false);
    }
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const handleDynamicFieldChange = (index, field, value) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: prev[field].map((item, i) => i === index ? value : item)
      };
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const addDynamicField = (field) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: [...prev[field], '']
      };
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const removeDynamicField = (field, index) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      };
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);
    setImageSrc(imageUrl);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
    setIsCropping(true);
  };

  const handleCropComplete = (_, croppedArea) => {
    setCroppedAreaPixels(croppedArea);
  };

  const handleCropApply = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    setFormData(prev => {
      const updated = { ...prev, imagen: croppedImage };
      if (onChange) onChange(updated);
      return updated;
    });
    setIsCropping(false);
    setImageSrc('');
  };

  const handleCropCancel = () => {
    setIsCropping(false);
    setImageSrc('');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 sticky top-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-image text-blue-600 text-xs"></i>
            Portada
          </label>
          <FileInput
            name="imagenPortada"
            accept="image/*"
            onChange={handleImageChange}
          />
          {isCropping && imageSrc && (
            <div className="mt-4 space-y-4">
              <div className="relative w-full h-56 bg-gray-100 rounded-lg overflow-hidden">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 3}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={handleCropComplete}
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full"
                />
                <span className="text-sm text-gray-600 w-12 text-right">{zoom.toFixed(1)}x</span>
              </div>
              <div className="flex gap-3">
                <Button type="button" variant="primary" onClick={handleCropApply} className="flex-1">
                  Aplicar recorte
                </Button>
                <Button type="button" variant="ghost" onClick={handleCropCancel} className="flex-1">
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>

        <hr className="my-4" />

        <FormField
          label="Título"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej: Sistema de diagnóstico con IA"
          required
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-tag text-blue-600 text-xs"></i>
            Línea <span className="text-red-500">*</span>
          </label>
          <Select
            name="categoria"
            options={categoryOptions}
            value={isNewCategory ? '__NEW__' : formData.categoria}
            onChange={handleChange}
            required={!isNewCategory}
          />
          {isNewCategory && (
            <div className="mt-3 space-y-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Escribe el nombre de la nueva línea"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="primary" 
                  onClick={() => {
                    if (newCategoryName.trim()) {
                      setFormData(prev => {
                        const updated = { ...prev, categoria: newCategoryName.trim() };
                        if (onChange) onChange(updated);
                        return updated;
                      });
                      setIsNewCategory(false);
                      setNewCategoryName('');
                    }
                  }}
                  className="flex-1"
                  disabled={!newCategoryName.trim()}
                >
                  Guardar línea
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={() => {
                    setIsNewCategory(false);
                    setNewCategoryName('');
                  }}
                  className="flex-1"
                >
                  Cancelar
                </Button>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-align-left text-blue-600 text-xs"></i>
            Resumen
          </label>
          <Textarea
            name="resumen"
            value={formData.resumen}
            onChange={handleChange}
            placeholder="Describe brevemente el proyecto..."
            rows={4}
          />
        </div>

        <hr className="my-4" />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <i className="fas fa-user-tie text-blue-600 text-xs"></i>
            Investigadores
          </label>
          {formData.docentes.map((docente, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={docente}
                onChange={(e) => handleDynamicFieldChange(index, 'docentes', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={`Investigador ${index + 1}`}
              />
              {formData.docentes.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeDynamicField('docentes', index)}
                  className="!px-3"
                >
                  <i className="fas fa-minus"></i>
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addDynamicField('docentes')}
            className="mt-2 w-full justify-center text-sm"
            icon="fas fa-plus"
          >
            Agregar Investigador
          </Button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <i className="fas fa-graduation-cap text-blue-600 text-xs"></i>
            Alumnos
          </label>
          {formData.alumnos.map((alumno, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={alumno}
                onChange={(e) => handleDynamicFieldChange(index, 'alumnos', e.target.value)}
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder={`Alumno ${index + 1}`}
              />
              {formData.alumnos.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  onClick={() => removeDynamicField('alumnos', index)}
                  className="!px-3"
                >
                  <i className="fas fa-minus"></i>
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => addDynamicField('alumnos')}
            className="mt-2 w-full justify-center text-sm"
            icon="fas fa-plus"
          >
            Agregar Alumno
          </Button>
        </div>

        <hr className="my-4" />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-check text-blue-600 text-xs"></i>
            Estatus
          </label>
          <Select
            name="estado"
            options={statusOptions}
            value={formData.estado}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-file-pdf text-blue-600 text-xs"></i>
            PDFs
          </label>
          <FileInput
            name="documentos"
            accept=".pdf"
            multiple
          />
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button type="submit" variant="primary" className="flex-grow">
            <i className="fas fa-save"></i>
            Guardar
          </Button>
          {onCancel && (
            <Button type="button" variant="ghost" onClick={onCancel} className="flex-grow">
              <i className="fas fa-times"></i>
              Cancelar
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

ProjectForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
  existingProjects: PropTypes.array,
};

export default ProjectForm;
