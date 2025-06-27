import useEditAdminShipment from "../../hooks/useEditAdminShipment";

export default function UpdateAdminShipmentForm({ onSubmit, orderId }) {
  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  } = useEditAdminShipment(onSubmit, orderId);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Formulario de Envío {orderId}</h1>
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
            <label className="label-register">Fecha de entrega</label>
            <input
              className="input-normal"
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              disabled={formData.is_immediate_delivery}
              required
            />

            <label className="label-register">Precio del envío</label>
            <input
              className="input-normal"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min={0}
              disabled={formData.is_immediate_delivery}
              required
            />

            <label className="label-register">Proveedor</label>
            <input
              className="input-normal"
              type="text"
              name="shipping_provider"
              value={formData.shipping_provider}
              onChange={handleChange}
              placeholder="Correos, DHL, FedEx"
              minLength={2}
              maxLength={50}
              disabled={formData.is_immediate_delivery}
              required
            />

            <label className="label-register">
              <input
                type="checkbox"
                name="is_immediate_delivery"
                checked={formData.is_immediate_delivery}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
              />
              Entrega inmediata
            </label>
          </div>
          
        </div>

        <div className="button-container">
          <button className="button-register" type="submit" style={{ width: "100%" }}>
            Guardar Envío
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </form>
    </div>
  );
}
