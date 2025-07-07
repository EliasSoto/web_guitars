import { Icon } from "@iconify/react";
import { formatPrice, formatDate } from "../../utils/common";

export default function OrderRow({ order, onViewDetails }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{formatDate(order.order_date)}</td>
      <td>{formatPrice(order.total_price)}</td>
      <td>{order.status}</td>
      <td>{order.payment_method}</td>
      <td className="action-icons">
        <Icon
          icon="icon-park-outline:preview-open"
          width={22}
          height={22}
          color="#3563E9"
          style={{ cursor: "pointer" }}
          onClick={() => onViewDetails(order.id)}
        />
      </td>
    </tr>
  );
}
