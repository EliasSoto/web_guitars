import { Icon } from "@iconify/react";

export default function OrderRow({ order, onViewDetails }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.order_date}</td>
      <td>{order.total_price}</td>
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
