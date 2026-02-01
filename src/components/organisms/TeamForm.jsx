import { useState } from 'react';
import PropTypes from 'prop-types';
import FormField from '../molecules/FormField';
import Select from '../atoms/Select';
import Textarea from '../atoms/Textarea';
import FileInput from '../atoms/FileInput';
import Button from '../atoms/Button';

const TeamForm = ({ onSubmit, initialData, onCancel, onChange }) => {
  const [formData, setFormData] = useState(initialData || {
    nombre: '',
    titulo: '',
    universidad: '',
    rol: 'Principal',
    correo: '',
    descripcion: '',
  });

  const roleOptions = [
    { value: 'Principal', label: 'Investigador Principal' },
    { value: 'Colaborador', label: 'Colaborador / Alumno' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (onChange) onChange(updated);
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 sticky top-20">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#0b2f5f] to-[#0a3a7a] rounded-lg flex items-center justify-center">
            <i className="fas fa-user-plus text-white text-lg"></i>
          </div>
          {initialData ? 'Editar Integrante' : 'Nuevo Integrante'}
        </h3>
        <p className="text-sm text-gray-600 ml-13">
          {initialData ? 'Actualiza los datos del integrante' : 'Completa los datos del nuevo integrante'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          label="Nombre Completo"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Ej: Juan Pérez García"
          required
        />

        <FormField
          label="Título Académico"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          placeholder="Ej: Doctor en Ciencias Computacionales"
        />

        <FormField
          label="Universidad"
          name="universidad"
          value={formData.universidad}
          onChange={handleChange}
          placeholder="Ej: Universidad Politécnica de Aguascalientes"
        />

        <hr className="my-4" />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-briefcase text-blue-600 text-xs"></i>
            Rol <span className="text-red-500">*</span>
          </label>
          <Select
            name="rol"
            options={roleOptions}
            value={formData.rol}
            onChange={handleChange}
            required
          />
        </div>

        <FormField
          label="Correo Electrónico"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          placeholder="correo@example.com"
        />

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-pen-fancy text-blue-600 text-xs"></i>
            Biografía
          </label>
          <Textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Escribe una breve biografía..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
            <i className="fas fa-image text-blue-600 text-xs"></i>
            Foto
          </label>
          <FileInput
            name="foto"
            accept="image/*"
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

TeamForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onCancel: PropTypes.func,
  onChange: PropTypes.func,
};

export default TeamForm;
