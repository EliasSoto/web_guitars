import { useEffect } from "react";
import { useEditUserAddress } from "../../hooks/useEditUserAddress";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/RegisterAdminUserForm.css";
import { useNavigate } from "react-router-dom";


export default function UpdateUserAddressForm({ addressId, onSuccess }) {
  const regiones = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena"
  ];
  const navigate = useNavigate();

  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus
  } = useEditUserAddress(addressId, navigate);

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
      if (onSuccess) onSuccess();
      resetStatus();
    }
  }, [error, successMessage, onSuccess]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Editar dirección</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
          {/* Columna izquierda */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label className="label-register">Calle</label>
            <input
              className="input-normal"
              type="text"
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
              placeholder="Nombre de la calle"
              required
            />

            <label className="label-register">Región</label>
            <select
              className="input-normal"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una región</option>
              {regiones.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>

            <label className="label-register">Comuna</label>
            <input
              className="input-normal"
              type="text"
              name="commune"
              value={formData.commune}
              onChange={handleChange}
              placeholder="Comuna"
              required
            />
          </div>

          {/* Columna derecha */}
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            <label className="label-register">Indicaciones</label>
            <input
              className="input-normal"
              type="text"
              name="directions"
              value={formData.directions}
              onChange={handleChange}
              placeholder="Indicaciones adicionales"
            />

            <label className="label-register">Tipo de dirección</label>
            <input
              className="input-normal"
              type="text"
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              placeholder="Ej: Casa, Trabajo, etc."
              required
            />

            <label className="label-register">¿Dirección activa?</label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox_input"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                disabled={formData.is_active}
              />
              <label className="checkbox-label">
                {formData.is_active ? "Sí (no editable)" : "No"}
              </label>
            </div>
          </div>
        </div>

        <div className="button-container">
          <button className="button-register">Actualizar dirección</button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
