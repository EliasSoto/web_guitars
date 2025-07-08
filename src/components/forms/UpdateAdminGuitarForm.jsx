import { useNavigate } from "react-router-dom";
import { useEditAdminGuitar } from "../../hooks/useEditAdminGuitar";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import ImageUploader from "../ImageUploader";

export default function UpdateAdminGuitarForm({ guitarId, onSuccess, onClose }) {

  const navigate = useNavigate();
  const {
    form,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus

  } = useEditAdminGuitar(guitarId, navigate);

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

      if (onClose) {
        const timeout = setTimeout(() => {
          onClose();
          resetStatus();
        }, 1000);

        return () => clearTimeout(timeout);
      } else {
        resetStatus();
      }
    }

  }, [error, successMessage]);



  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Actualizar guitarra</h1>
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
              value={form.model}
              onChange={handleChange}
              minLength={2}
              placeholder="Stratocaster"
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Marca</label>
            <input
              className="input-normal"
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              minLength={2}
              placeholder="Fender"
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Descripción</label>
            <input
              className="input-normal"
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
              minLength={10}
              placeholder="Descripción breve de la guitarra"
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Precio de Compra</label>
            <input
              className="input-normal"
              type="number"
              name="purchase_price"
              value={form.purchase_price}
              onChange={handleChange}
              min={1}
              placeholder="100000"
              style={{ outline: "none" }}
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
              value={form.sale_price}
              onChange={handleChange}
              min={1}
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Fecha de Compra</label>
            <input
              className="input-normal"
              type="date"
              name="purchase_date"
              value={form.purchase_date}
              onChange={handleChange}
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Tipo de madera</label>
            <input
              className="input-normal"
              type="text"
              name="wood_type"
              value={form.wood_type}
              onChange={handleChange}
              minLength={2}
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Color</label>
            <input
              className="input-normal"
              type="text"
              name="color"
              value={form.color}
              onChange={handleChange}
              minLength={2}
              style={{ outline: "none" }}
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
              value={form.stock}
              onChange={handleChange}
              min={0}
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Cantidad de trastes</label>
            <input
              className="input-normal"
              type="number"
              name="fret_count"
              value={form.fret_count}
              onChange={handleChange}
              min={21}
              max={24}
              style={{ outline: "none" }}
              required
            />

            <label className="label-register">Imagen</label>
            <ImageUploader
              onUploadSuccess={(url) =>
                handleChange({ target: { name: "image_link", value: url } })
              }
              initialImageUrl={form.image_link}
            />
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
