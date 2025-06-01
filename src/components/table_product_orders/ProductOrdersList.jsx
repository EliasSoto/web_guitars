import TableProductHead from "./TableProductHead";
import ProductOrdersRow from "./ProductOrdersRow";
import { useEffect, useState } from "react";
import { getOrderByIdAdmin } from "../../services/orderAdminService";
import { getUserOrderById } from "../../services/userOrderService";
import { getShipmentStatusByOrderIdAdmin } from "../../services/shipmentAdminService";
import "../../styles/admin_table/TableUsers.css";
import { Icon } from "@iconify/react";

export default function ProductOrdersList({ orderId, onSendOrder, isAdmin = false }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState(null);

  const fetchShipmentStatus = async () => {
    const [data, err] = await getShipmentStatusByOrderIdAdmin(orderId);
    if (!err && data?.tracking_status) {
      setShipmentStatus(data.tracking_status);
      console.log("Estado de envío:", data.tracking_status);
    } else {
      setShipmentStatus(null);
      console.log("Error al obtener estado de envío");
    }
  };

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
      fetchShipmentStatus();
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="loading-container">
        <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
        <p>Cargando detalles del pedido...</p>
      </div>
    );
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
        {isAdmin && shipmentStatus !== null && shipmentStatus !== "enviado" && (
          <button className="confirm-button" onClick={() => onSendOrder(order.id)}>
            Enviar pedido
          </button>
        )}
      </div>
    </div>
  );
}
