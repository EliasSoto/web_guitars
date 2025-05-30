import { Icon } from "@iconify/react";

export default function OrderRow({ order }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.order_date}</td>
      <td>{order.total_price}</td>
      <td>{order.status}</td>
      <td>{order.payment_method}</td>
      <td className="action-icons">
        <Icon
          icon="lucide:edit"
          width={20}
          height={20}
          color="#FFC10C"
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
      </td>
    </tr>
  );
}
