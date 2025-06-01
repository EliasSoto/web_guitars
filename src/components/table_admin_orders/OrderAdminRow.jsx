import { Icon } from "@iconify/react";

export default function OrderRow({ order, onViewDetails, shipmentStatus, userName }) {
  const totalQuantity = order.order_details.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <tr>
      <td>{order.id}</td>
      <td>{userName || "Cargando..."}</td>
      <td>{order.order_date}</td>
      <td>{order.payment_method}</td>
      <td>{order.status}</td>
      <td>{shipmentStatus || "Cargando..."}</td>
      <td>{order.total_price}</td>
      <td>{totalQuantity}</td>
      <td className="action-icons">
        {order.status === "pagado" && (
          <Icon
            icon="icon-park-outline:preview-open"
            width={22}
            height={22}
            color="#3563E9"
            style={{ cursor: "pointer" }}
            onClick={() => onViewDetails(order.id)}
          />
        )}
      </td>
    </tr>
  );
}
