import { Icon } from "@iconify/react";

export default function ShipmentRow({ shipment }) {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.shipment_date ?? "Por definir"}</td>
      <td>{shipment.delivery_date ?? "Por definir"}</td>
      <td>{shipment.tracking_status ?? "Por definir"}</td>
      <td>{shipment.price != null ? `$${shipment.price}` : "Por definir"}</td>
      <td>{shipment.shipping_provider ?? "Por definir"}</td>
      <td>{shipment.is_immediate_delivery === true ? "Sí" : shipment.is_immediate_delivery === false ? "No" : "Por definir"}</td>
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