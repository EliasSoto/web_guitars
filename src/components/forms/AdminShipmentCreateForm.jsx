import { useState } from "react";

export default function AdminShipmentCreateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    shipment_date: "",
    tracking_status: "procesando",
    delivery_date: "",
    price: "",
    shipping_provider: "",
    is_immediate_delivery: false,
    order_ids: [""],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "order_ids") {
      const ids = value.split(",").map((id) => parseInt(id.trim()));
      setFormData({ ...formData, order_ids: ids });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Formulario de Envío</h1>
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
            <label className="label-register">Fecha de Envío</label>
            <input
              className="input-normal"
              type="date"
              name="shipment_date"
              value={formData.shipment_date}
              onChange={handleChange}
              required
            />

            <label className="label-register">Fecha de entrega</label>
            <input
              className="input-normal"
              type="date"
              name="delivery_date"
              value={formData.delivery_date}
              onChange={handleChange}
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
              step="0.01"
              required
            />
          </div>

          {/* Columna derecha */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Estado del seguimiento</label>
            <select
              className="input-normal"
              name="tracking_status"
              value={formData.tracking_status}
              onChange={handleChange}
            >
              <option value="procesando">Procesando</option>
              <option value="enviado">Enviado</option>
              <option value="entregado">Entregado</option>
              <option value="cancelado">Cancelado</option>
            </select>

            <label className="label-register">Proveedor</label>
            <input
              className="input-normal"
              type="text"
              name="shipping_provider"
              value={formData.shipping_provider}
              onChange={handleChange}
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

            <label className="label-register">ID(s) del Pedido (separados por coma)</label>
            <input
              className="input-normal"
              type="text"
              name="order_ids"
              value={formData.order_ids.join(", ")}
              onChange={handleChange}
              placeholder="Ej: 1, 2, 3"
              required
            />
          </div>
        </div>

        <div className="button-container">
          <button className="button-register" type="submit">
            Guardar Envío
          </button>
        </div>
      </form>
    </div>
  );
}
