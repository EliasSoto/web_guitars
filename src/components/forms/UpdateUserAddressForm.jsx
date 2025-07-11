import { useEffect } from "react";
import { useEditUserAddress } from "../../hooks/useEditUserAddress";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/RegisterAdminUserForm.css";
import { useNavigate } from "react-router-dom";


export default function UpdateUserAddressForm({ addressId, onSuccess }) {
  const navigate = useNavigate();

  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus,
    regiones,
    tiposDireccion
  } = useEditUserAddress(addressId, navigate);

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

      }    }, [error, successMessage, onSuccess]);

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
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Región</label>
            <select
              className="input-normal"
              name="region"
              value={formData.region}
              onChange={handleChange}
              style={{ outline: "none" }}
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
              style={{ outline: "none" }}
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
            <select
              className="input-normal"
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              style={{ outline: "none" }}
              required
            >
              <option value="">Selecciona un tipo</option>
              {tiposDireccion.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>

            <label className="label-register">¿Dirección activa?</label>
            <div className="checkbox-container">
              <input
                type="checkbox"
                className="checkbox_input"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="checkbox-label">
                {formData.is_active ? "Sí" : "No"}
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
