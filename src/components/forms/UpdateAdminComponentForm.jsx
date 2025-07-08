import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useEditAdminComponent } from "../../hooks/useUpdateAdminComponent";
import ImageUploader from "../ImageUploader";

const subtypesByType = {
  Pastilla: ["S", "H"],
  "Potenciómetro": ["Tono", "Volumen"],
  Puente: ["Fijo", "Flotante", "Semiflotante"],
};

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

  const currentType = form.type;

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
      if (onClose) onClose();
      resetStatus();
    }
  }, [error, successMessage, onSuccess, resetStatus]);

  const getTodayDate = () => new Date().toISOString().split("T")[0];
  const getMinPurchaseDate = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 5);
    return date.toISOString().split("T")[0];
  };

  const shouldShowIsActive = currentType === "Pastilla";

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Actualizar componente</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "20px" }}>
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
              style={{ outline: "none" }}
              required
              placeholder="EMG 81 Bridge"
            />

            <label className="label-register">Tipo</label>
            <select
              className="input-normal"
              name="type"
              value={form.type || ""}
              onChange={handleChange}
              style={{ outline: "none" }}
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Pastilla">Pastilla</option>
              <option value="Potenciómetro">Potenciómetro</option>
              <option value="Puente">Puente</option>
            </select>

            <label className="label-register">Subtipo</label>
            <select
              className="input-normal"
              name="subtype"
              value={form.subtype || ""}
              onChange={handleChange}
              disabled={!currentType}
              style={{ outline: "none" }}
              required
            >
              <option value="">Seleccione un subtipo</option>
              {subtypesByType[currentType]?.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            <label className="label-register">Descripción</label>
            <input
              className="input-normal"
              type="text"
              name="description"
              value={form.description || ""}
              onChange={handleChange}
              minLength={10}
              style={{ outline: "none" }}
              required
              placeholder="Pastilla con agudos definidos"
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
              style={{ outline: "none" }}
              required
              placeholder="80000"
            />

            <label className="label-register">Precio de Venta</label>
            <input
              className="input-normal"
              type="number"
              name="sale_price"
              value={form.sale_price || ""}
              onChange={handleChange}
              min={1}
              style={{ outline: "none" }}
              required
              placeholder="120000"
            />

            <label className="label-register">Stock</label>
            <input
              className="input-normal"
              type="number"
              name="stock"
              value={form.stock || ""}
              onChange={handleChange}
              min={0}
              style={{ outline: "none" }}
              required
              placeholder="5"
            />

            <label className="label-register">Fecha de Compra</label>
            <input
              className="input-normal"
              type="date"
              name="purchase_date"
              value={form.purchase_date || ""}
              onChange={handleChange}
              min={getMinPurchaseDate()}
              max={getTodayDate()}
              style={{ outline: "none" }}
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
              style={{ outline: "none" }}
              required
              placeholder="Seymour Duncan"
            />

            <label className="label-register">Material</label>
            <input
              className="input-normal"
              type="text"
              name="material"
              value={form.material || ""}
              onChange={handleChange}
              minLength={2}
              style={{ outline: "none" }}
              required
              placeholder="Alnico V"
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

            {shouldShowIsActive && (
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
            )}
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Actualizar
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
