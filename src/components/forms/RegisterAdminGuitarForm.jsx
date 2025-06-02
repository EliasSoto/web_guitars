import useRegisterAdminGuitar from "../../hooks/useRegisterAdminGuitar";
import "../../styles/RegisterAdminUserForm.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import ImageUploader from "../ImageUploader"; // Asegúrate de que la ruta sea correcta

export default function RegisterAdminGuitarForm({ isOpen, onSuccess, onClose }) {
  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
    clearSuccessMessage, 
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

      clearSuccessMessage();
    }
  }, [error, successMessage, onSuccess, clearSuccessMessage]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Registrar nueva guitarra</h1>
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
            <label className="label-register">Modelo</label>
            <input
              className="input-normal"
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              minLength={2}
              required
            />

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

            <label className="label-register">Descripción</label>
            <input
              className="input-normal"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              minLength={10}
              required
            />

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
          </div>

          {/* Columna del medio */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
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

            <label className="label-register">Fecha de Compra</label>
            <input
              className="input-normal"
              type="date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
              required
            />

            <label className="label-register">Tipo de madera</label>
            <input
              className="input-normal"
              type="text"
              name="wood_type"
              value={formData.wood_type}
              onChange={handleChange}
              minLength={2}
              required
            />

            <label className="label-register">Color</label>
            <input
              className="input-normal"
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              minLength={2}
              required
            />
          </div>

          {/* Tercera columna */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Cantidad</label>
            <input
              className="input-normal"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min={0}
              required
            />

            <label className="label-register">Cantidad de trastes</label>
            <input
              className="input-normal"
              type="number"
              name="fret_count"
              value={formData.fret_count}
              onChange={handleChange}
              min={21}
              max={24}
              required
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
            
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Registrar
          </button>
        </div>
      </form>

      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
