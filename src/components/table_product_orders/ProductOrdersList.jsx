import TableProductHead from "./TableProductHead";
import ProductOrdersRow from "./ProductOrdersRow";
import { useEffect, useState } from "react";
import { getOrderByIdAdmin } from "../../services/orderAdminService";
import { getUserOrderById } from "../../services/userOrderService";
import "../../styles/admin_table/TableUsers.css";
import { Icon } from "@iconify/react";

export default function ProductOrdersList ({ orderId, onSendOrder, isAdmin= false }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

const fetchOrder = async () => {
    setLoading(true);
    let data, err;
    if (isAdmin) {
      [data, err] = await getOrderByIdAdmin(orderId);
    } else {
      [data, err] = await getUserOrderById(orderId);
    }

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

  if (loading) return <div className="loading-container">
                        <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon"/>
                        <p>Cargando detalles del pedido...</p>
                      </div>;
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
        
        { isAdmin === true && (
          <button className="confirm-button" onClick={() => onSendOrder(order.id)}>
            Enviar pedido
          </button>
        )}

        
      </div>
    </div>
  );
}
