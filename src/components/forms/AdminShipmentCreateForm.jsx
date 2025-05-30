import { useState } from "react";

export default function AdminShipmentCreateForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    shipment_date: "",
    tracking_status: "procesando",
    delivery_date: "",
    price: "",
    shipping_provider: "",
    is_immediate_delivery: false,
    order_ids: [""], // puedes usar un campo de texto para múltiples IDs separados por comas
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
    <form onSubmit={handleSubmit} className="shipping-form">
      <h2>Formulario de Envío</h2>

      <label>Fecha de Envío</label>
      <input
        type="date"
        name="shipment_date"
        value={formData.shipment_date}
        onChange={handleChange}
        required
      />

      <label>Estado del seguimiento</label>
      <select
        name="tracking_status"
        value={formData.tracking_status}
        onChange={handleChange}
      >
        <option value="procesando">Procesando</option>
        <option value="enviado">Enviado</option>
        <option value="entregado">Entregado</option>
        <option value="cancelado">Cancelado</option>
      </select>

      <label>Fecha de entrega</label>
      <input
        type="date"
        name="delivery_date"
        value={formData.delivery_date}
        onChange={handleChange}
        required
      />

      <label>Precio del envío</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        min={0}
        step="0.01"
        required
      />

      <label>Proveedor</label>
      <input
        type="text"
        name="shipping_provider"
        value={formData.shipping_provider}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="is_immediate_delivery"
          checked={formData.is_immediate_delivery}
          onChange={handleChange}
        />
        Entrega inmediata
      </label>

      <label>ID(s) del Pedido (separados por coma)</label>
      <input
        type="text"
        name="order_ids"
        value={formData.order_ids.join(", ")}
        onChange={handleChange}
        placeholder="Ej: 1, 2, 3"
        required
      />

      <button type="submit">Guardar Envío</button>

      <style>{`
        .shipping-form {
          max-width: 400px;
          margin: 1rem auto;
          padding: 1.5rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          background-color: #fafafa;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .shipping-form h2 {
          margin-bottom: 1rem;
          text-align: center;
        }

        .shipping-form input,
        .shipping-form select {
          padding: 0.5rem;
          font-size: 1rem;
        }

        .shipping-form button {
          background-color: #4caf50;
          color: white;
          padding: 0.5rem;
          font-weight: bold;
          border: none;
          cursor: pointer;
        }

        .shipping-form button:hover {
          background-color: #45a049;
        }
      `}</style>
    </form>
  );
}
