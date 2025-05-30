import { Icon } from "@iconify/react";

export default function ShipmentRow({ shipment }) {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.shipment_date}</td>
      <td>{shipment.delivery_date}</td>
      <td>{shipment.tracking_status}</td>
      <td>{shipment.price}</td>
      <td>{shipment.shipping_provider}</td>
      <td>{shipment.is_immediate_delivery ? "Sí" : "No"}</td>
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