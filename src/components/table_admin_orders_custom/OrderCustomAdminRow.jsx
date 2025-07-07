import { Icon } from "@iconify/react";
import { formatPrice, formatDate } from "../../utils/common";

export default function OrderCustomRow({ order, onViewDetails, shipmentStatus, userName }) {
  const totalQuantity = order.order_details.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <tr>
      <td>{order.id}</td>
      <td>{userName || "Cargando..."}</td>
      <td>{formatDate(order.order_date)}</td>
      <td>{order.payment_method}</td>
      <td>{order.status}</td>
      <td>{shipmentStatus || "Cargando..."}</td>
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
