import TableProductHead from "./TableProductHead";
import ProductOrdersRow from "./ProductOrdersRow";
import { useEffect, useState } from "react";
import { getOrderByIdAdmin } from "../../services/orderAdminService";
import "../../styles/admin_table/TableUsers.css";

export default function ProductOrdersList ({ orderId, onSendOrder }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchOrder = async () => {
  setLoading(true);
  const [data, err] = await getOrderByIdAdmin(orderId);

  if (err) {
    setError(err);
  } else {
    setOrder(data);
    sessionStorage.setItem(`cachedOrder_${orderId}`, JSON.stringify(data));
  }

  setLoading(false);
};

  useEffect(() => {
    const cached = sessionStorage.getItem(`cachedOrder_${orderId}`);
    if (cached) {
      setOrder(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) return <p>Cargando detalles de la orden...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No se encontró la orden.</p>;

  return (
    <div>
      <div className="table-header">
        <h2>Detalles del Pedido ID {order.id}</h2>
      </div>

      <table>
        <TableProductHead />
        <tbody>
          {order.order_details.map((detail, index) => (
            <ProductOrdersRow key={index} detail={detail} orderId={order.id} />
          ))}
        </tbody>
      </table>
          <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
            <br />

        <button className="btn-enviar" onClick={() => onSendOrder(order.id)}>
          Enviar pedido
        </button>
        
      </div>

      <style>{`
        .btn-enviar {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          cursor: pointer;
          border-radius: 5px;
          font-weight: bold;
        }

        .btn-enviar:hover {
          background-color: #45a049;
        }

      `}</style>
    </div>
  );
}
