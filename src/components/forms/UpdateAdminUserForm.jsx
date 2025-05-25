import { useNavigate } from "react-router-dom";
import { useEditAdminUser } from "../../hooks/useEditAdminUser";
import { useEffect } from "react"; // Asegúrate que este componente existe y está correcto
import "../../styles/RegisterAdminUserForm.css";
import { toast, ToastContainer } from 'react-toastify';

export default function UpdateAdminUserForm({ userId, onSuccess, onClose }) {

  const navigate = useNavigate();
  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus

  } = useEditAdminUser(userId, navigate);

    useEffect(() => {
        if (error) {
        if (Array.isArray(error)) {
            error.forEach((err) => toast.error(err.msg));
        } else {
            toast.error(error);
        }

        // Sirve para resetear el error después de mostrarlo
        resetStatus();

      }

        if (successMessage) {
        toast.success(successMessage);

        if (onSuccess) {
            onSuccess();
        }

        // Sirve para resetear el mensaje de éxito después de mostrarlo
        resetStatus();

        }
    }, [error, successMessage, onSuccess]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Editar usuario</h1>
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
              <label className="checkbox-label">
                {formData.is_admin ? "Sí" : "No"}
              </label>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button-register">Actualizar</button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
