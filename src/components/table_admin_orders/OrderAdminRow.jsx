import { Icon } from "@iconify/react";
import { formatPrice, formatDate, capitalize } from "../../utils/common";

export default function OrderRow({ order, onViewDetails, shipmentStatus, userName }) {
  const totalQuantity = order.order_details.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <tr>
      <td>{order.id}</td>
      <td>{userName || "Cargando..."}</td>
      <td>{formatDate(order.order_date)}</td>
      <td>{capitalize(order.payment_method)}</td>
      <td>{capitalize(order.status)}</td>
      <td>{capitalize(shipmentStatus) || "Cargando..."}</td>
      <td>{formatPrice(order.total_price)}</td>
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
