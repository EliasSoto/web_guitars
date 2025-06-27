import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useRegisterAdminComponent from "../../hooks/useRegisterAdminComponent";
import "../../styles/RegisterAdminUserForm.css";
import ImageUploader from "../ImageUploader";

export default function RegisterAdminComponentForm({ isOpen, onSuccess, onClose }) {
  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
    clearSuccessMessage,
  } = useRegisterAdminComponent();

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
      if (onSuccess) onSuccess();
      clearSuccessMessage();
    }
  }, [error, successMessage, onSuccess, clearSuccessMessage, resetForm]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Registrar nuevo componente</h1>
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
              value={formData.name}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Tipo</label>
            <input
              className="input-normal"
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Subtipo</label>
            <input
              className="input-normal"
              type="text"
              name="subtype"
              value={formData.subtype}
              onChange={handleChange}
              minLength={2}
            />

            <label className="label-register">Descripción</label>
            <input
              className="input-normal"
              type="text"
              name="description"
              value={formData.description}
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
              value={formData.purchase_price}
              onChange={handleChange}
              min={1}
              required
            />

            <label className="label-register">Precio de Venta</label>
            <input
              className="input-normal"
              type="number"
              name="sale_price"
              value={formData.sale_price}
              onChange={handleChange}
              min={1}
              required
            />
            <label className="label-register">Stock</label>
            <input
              className="input-normal"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min={0}
              required
            />
            <label className="label-register">Fecha de Compra</label>
            <input
              className="input-normal"
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
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
              value={formData.brand}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Material</label>
            <input
              className="input-normal"
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              minLength={2}
            />

            <label className="label-register">Posición</label>
            <input
              className="input-normal"
              type="text"
              name="position"
              value={formData.position}
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
              initialImageUrl={formData.image_link}
            />

            <label className="label-register">
              <input
                type="checkbox"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              Componente Activo
            </label>
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Registrar
          </button>
          {onClose && (
            <button
              type="button"
              className="button-register"
              onClick={() => {
                resetForm();
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
