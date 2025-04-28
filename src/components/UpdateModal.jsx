import { useState } from 'react';
import { registerAdminUser } from '../services/userAdminService';
import '../styles/admin_table/UserFormModal.css';
import { PasswordInput } from './PasswordInput'; // Asegúrate de que la ruta sea correcta

const UpdateModal = ({ user, onClose }) => {
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado de visibilidad de la contraseña
  };

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
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const formattedBirthDate = formatDate(formData.birth_date);

    const [data, err] = await registerAdminUser(
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.phone,
      formattedBirthDate,
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
    <form className="overlay">
      <modal>

        <div className='modal-header'>
          <h2>{user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h2>
          <button type="button" onClick={onClose} className="cancel-button">
                Cancelar
              </button>
        </div>


        <div onSubmit={handleSubmit}>

            <label className='label-input'>Nombre</label>
            <input
              className='input-normal'
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />

            <label className='label-input'>Apellido</label>
            <input
              className='input-normal'
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />

            <label className='label-input'>Email</label>
            <input
              className='input-normal'
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />    

            <label className='label-input'>Teléfono</label>
            <input
              className='input-normal'
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <label className='label-input'>Fecha de nacimiento</label>
            <input
              className='input-normal'
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco
            />
            
            <label className='label-input'>RUT</label>
            <input
              className='input-normal'
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              required
            />

            <div>{user ? '' :  
              <PasswordInput
                        value={formData.password}
                        onChange={(value) => handleChange({ target: { name: 'password', value } })}
                        showPassword={showPassword}
                        togglePasswordVisibility={togglePasswordVisibility}
                      /> }
            </div>
                  

            <label className='label-input'>
              <input
                type="checkbox"
                name="is_admin"
                checked={formData.is_admin}
                onChange={handleChange}
              />
              ¿Es administrador?
            </label>
          
          <div className="button-group">

            <button type="submit">{user ? 'Actualizar' : 'Crear'}</button>
           
          </div>
          

        </div>
   
        {error && <div className="error">Error: {error}</div>}
        {success && <div className="success">{success}</div>}

      </modal>
    </form>
  );
};

export default UpdateModal;
