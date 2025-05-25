import { useNavigate } from "react-router-dom";
import { useEditUserProfile } from "../../hooks/useEditUserProfile";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminProfileForm({ onClose, onSuccess }) {
  const navigate = useNavigate();

  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    loading,
    resetStatus, // asumo que el hook tiene esta función para limpiar errores/mensajes

  } = useEditUserProfile(navigate);

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error);
      }

      resetStatus();

    }

    if (successMessage) {
      toast.success(successMessage);
      
      if (onSuccess) {
        onSuccess(); // Llama a la función onClose si se proporciona
      }

      resetStatus(); // Resetea el estado después de mostrar el mensaje de éxito
     
    }
  }, [error, successMessage, onClose, resetStatus]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Editar Perfil</h1>
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
              value={formData.first_name}
              onChange={handleChange}
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
              value={formData.last_name}
              onChange={handleChange}
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
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
            />

            <label className="label-register">Confirmar nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar nueva contraseña"
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              readOnly
              disabled
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={formData.rut}
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
              value={
                formData.is_admin === true || formData.is_admin === "true"
                  ? "Administrador"
                  : "Usuario"
              }
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar perfil"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
