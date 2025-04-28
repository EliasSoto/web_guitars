import { useState } from 'react';
import { registerAdminUser } from '../services/userAdminService';

const UserForm = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birth_date: user?.birth_date || '',
    rut: user?.rut || '',
    password: '',
    is_admin: user?.is_admin || false
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Función para formatear la fecha en DD/MM/YYYY
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Formatear la fecha de nacimiento
    const formattedBirthDate = formatDate(formData.birth_date);

    const [data, err] = await registerAdminUser(
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.phone,
      formattedBirthDate, // Pasar la fecha formateada
      formData.rut,
      formData.password,
      formData.is_admin
    );

    if (err) {
      setError(err);
    } else {
      setSuccess(user ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
      setTimeout(onClose, 1500);
    }
  };

  return (
    <div>
      <h2>{user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Apellido:</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>RUT:</label>
          <input
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!user}
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="is_admin"
              checked={formData.is_admin}
              onChange={handleChange}
            />
            ¿Es administrador?
          </label>
        </div>
        <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
        <button type="button" onClick={onClose}>Cancelar</button>
      </form>
      {error && <div>Error: {error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};

export default UserForm;
