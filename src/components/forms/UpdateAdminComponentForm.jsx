import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEditAdminComponent } from "../../hooks/useUpdateAdminComponent";
import ImageUploader from "../ImageUploader";

export default function UpdateAdminComponentForm({ componentId, onSuccess, onClose }) {
  const navigate = useNavigate();
  const {
    form,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus,
  } = useEditAdminComponent(componentId, navigate);

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
  }, [error, successMessage, onSuccess, resetStatus]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Actualizar componente</h1>
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
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
            <label className="label-register">Nombre</label>
            <input
              className="input-normal"
              type="text"
              name="name"
              value={form.name || ""}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Tipo</label>
            <input
              className="input-normal"
              type="text"
              name="type"
              value={form.type || ""}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Subtipo</label>
            <input
              className="input-normal"
              type="text"
              name="subtype"
              value={form.subtype || ""}
              onChange={handleChange}
              minLength={2}
            />

            <label className="label-register">Descripción</label>
            <input
              className="input-normal"
              type="text"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              minLength={10}
            />
          </div>

          {/* Columna del medio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
            <label className="label-register">Precio de Compra</label>
            <input
              className="input-normal"
              type="number"
              name="purchase_price"
              value={form.purchase_price || ""}
              onChange={handleChange}
              min={1}
              required
            />

            <label className="label-register">Precio de Venta</label>
            <input
              className="input-normal"
              type="number"
              name="sale_price"
              value={form.sale_price || ""}
              onChange={handleChange}
              min={1}
              required
            />
            <label className="label-register">Stock</label>
            <input
              className="input-normal"
              type="number"
              name="stock"
              value={form.stock || ""}
              onChange={handleChange}
              min={0}
              required
            />

            <label className="label-register">Fecha de Compra</label>
            <input
              className="input-normal"
              type="date"
              name="purchase_date"
              value={form.purchase_date || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Columna derecha */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
            <label className="label-register">Marca</label>
            <input
              className="input-normal"
              type="text"
              name="brand"
              value={form.brand || ""}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Material</label>
            <input
              className="input-normal"
              type="text"
              name="material"
              value={form.material || ""}
              onChange={handleChange}
              minLength={2}
            />

            <label className="label-register">Posición</label>
            <input
              className="input-normal"
              type="text"
              name="position"
              value={form.position || ""}
              onChange={handleChange}
            />

            <label className="label-register">Imagen</label>
            <ImageUploader
              onUploadSuccess={(url) => {
                handleChange({
                  target: {
                    name: "image_link",
                    value: url,
                  },
                });
              }}
              initialImageUrl={form.image_link}
            />

            <label className="label-register">
              <input
                type="checkbox"
                name="is_active"
                checked={!!form.is_active}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              Componente Activo
            </label>
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Actualizar
          </button>
          {onClose && (
            <button
              type="button"
              className="button-register"
              onClick={() => {
                onClose();
              }}
              style={{ marginLeft: "10px" }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
