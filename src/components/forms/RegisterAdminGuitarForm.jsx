import useRegisterAdminGuitar from "../../hooks/useRegisterAdminGuitar";
import "../../styles/RegisterAdminUserForm.css";
import { PasswordInput } from "../PasswordInput";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function RegisterAdminGuitarForm({ isOpen, onSuccess, onClose }) {
  const {
    formData,
    error,
    successMessage,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm
  } = useRegisterAdminGuitar();

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
        <div
          style={{
            display: "flex",
            gap: "40px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {/* Columna izquierda */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Nombre</label>
            <input
              className="input-normal"
              type="text"
              name="first_name"
              
              
              placeholder="Nombres"
              style={{ outline: "none" }}
              minLength={2}
              required
            />

            <label className="label-register">Apellido</label>
            <input
              className="input-normal"
              type="text"
              name="last_name"
              
              
              placeholder="Apellidos"
              style={{ outline: "none" }}
              minLength={2}
              required
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              type="email"
              name="email"
             
            
              placeholder="Correo electrónico"
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
             
            
              placeholder="Teléfono"
              style={{ outline: "none" }}
              minLength={9}
              maxLength={9}
              required
            />
          </div>

          {/* Columna del medio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="password"
              
             
              placeholder="Nueva contraseña"
            />

            <label className="label-register">Confirmar nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="confirmPassword"
              
           
              placeholder="Confirmar nueva contraseña"
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
             
              readOnly
              disabled
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              
              readOnly
              disabled
            />
          </div>

          {/* Tercera columna */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Rol</label>
            <input
              className="input-normal"
              type="text"
              name="role"
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Registar
          </button>
        </div>
      </form>




    </div>
  )
}