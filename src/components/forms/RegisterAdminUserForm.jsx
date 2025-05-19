import useRegisterAdminUser from "../../hooks/useRegisterAdminUser";
import "../../styles/RegisterAdminUserForm.css";
import { PasswordInput } from "../PasswordInput";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function RegisterAdminUserForm({ isOpen, onSuccess, onClose }) {

  const {
    formData,
    error,
    successMessage,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm
  } = useRegisterAdminUser();

useEffect(() => {

  if (error) {
    if (Array.isArray(error)) {
      error.forEach((err) => toast.error(err.msg));
    } else {
      toast.error(error);
    }
  }

  if (successMessage) {
    toast.success(successMessage);
    resetForm();

    if (onSuccess) {
      onSuccess();
    }

  }
}, [error, successMessage, onSuccess]);

    
  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Registrar nuevo usuario</h1>
      </header>

      <form onSubmit={handleSubmit}>
      
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
              {/* Columna izquierda */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <label className="label-register">Nombre</label>
          <input
            className="input-normal"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Nombres"
            style={{ outline: 'none' }}
            minLength={2}
            required
          />

          <label className="label-register">Apellido</label>
          <input
            className="input-normal"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Apellidos"
            style={{ outline: 'none' }}
            minLength={2}
            required
          />

          <label className="label-register">Rut</label>
          <input
            className="input-normal"
            type="text"
            name="rut"
            value={formData.rut}
            onChange={handleChange}
            placeholder="RUT"
            style={{ outline: 'none' }}
            required
          />

          <label className="label-register">Correo</label>
          <input
            className="input-normal"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            style={{ outline: 'none' }}
            required
          />
        </div>

        {/* Columna derecha */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
          <label className="label-register">Teléfono</label>
          <input
            className="input-normal"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Teléfono"
            style={{ outline: 'none' }}
            minLength={9}
            maxLength={9}
            required
          />

          <label className="label-register">Fecha nacimiento</label>
          <input
            className="input-normal"
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            style={{ outline: 'none' }}
          />

          <label className="label-register">Contraseña</label>
          <PasswordInput
            value={formData.password}
            onChange={(value) => handleChange({ target: { name: 'password', value } })}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
          />

          <label className="label-register">¿Es administrador?</label>
          <div className="checkbox-container">
              <input
            type="checkbox"
            className="checkbox_input"
            name="is_admin"
            checked={formData.is_admin}
            onChange={handleChange}
          />
          <label className="checkbox-label">{formData.is_admin ? "Sí" : "No"}</label>
          </div>
        
        </div>
        </div>

        <div className="button-container">
            <button className="button-register">Registrar</button>
        </div>

      </form>

        {/* Componente para mostrar mensajes de error y éxito */}
       <ToastContainer position="top-center" autoClose={8000} hideProgressBar />


    </div>
  );
}
