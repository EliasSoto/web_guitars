import { Icon } from "@iconify/react";
import { formatDate, formatPrice, capitalize } from "../../utils/common";

export default function ShipmentRow({ shipment }) {
  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{shipment.shipment_date ? formatDate(shipment.shipment_date) : "Por definir"}</td>
      <td>{shipment.delivery_date ? formatDate(shipment.delivery_date) : "Por definir"}</td>
      <td>{capitalize(shipment.tracking_status) ?? "Por definir"}</td>
      <td>{shipment.price === 0 ? "Gratis" : shipment.price != null ? `${formatPrice(shipment.price)}` : "Por definir"}</td>
      <td>{shipment.shipping_provider ?? "Por definir"}</td>
      <td>{shipment.is_immediate_delivery === true ? "Sí" : shipment.is_immediate_delivery === false ? "No" : "Por definir"}</td>
    </tr>
  );
}