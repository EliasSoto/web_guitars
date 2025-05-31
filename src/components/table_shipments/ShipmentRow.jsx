import { Icon } from "@iconify/react";

export default function ShipmentRow({ shipment }) {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.shipment_date ?? "Por definir"}</td>
      <td>{shipment.delivery_date ?? "Por definir"}</td>
      <td>{shipment.tracking_status ?? "Por definir"}</td>
      <td>{shipment.price === 0 ? "Gratis" : shipment.price != null ? `$${shipment.price}` : "Por definir"}</td>
      <td>{shipment.shipping_provider ?? "Por definir"}</td>
      <td>{shipment.is_immediate_delivery === true ? "Sí" : shipment.is_immediate_delivery === false ? "No" : "Por definir"}</td>
    </tr>
  );
}