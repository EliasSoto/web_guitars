import { Icon } from "@iconify/react";
import { formatDate, formatPrice } from "../../utils/common";

export default function ComponentRow({ component, handleDelete, handleUpdate }) {
  return (
    <tr key={component.id}>
      <td>{component.id}</td>
      <td>{component.name}</td>
      <td>{component.type}</td>
      <td>{component.subtype || "No Aplica"}</td>
      <td>{formatPrice(component.purchase_price)}</td>
      <td>{formatPrice(component.sale_price)}</td>
      <td>{formatPrice(component.net_price)}</td>
      <td>{component.stock}</td>
      <td>{component.brand || "Indefinido"}</td>
      <td>{formatDate(component.purchase_date)}</td>
      <td>{component.is_active ? "Activo" : "No aplica"}</td>

      <td>
        <Icon
          color="#FFC10C"
          onClick={() => handleUpdate(component.id)}
          icon="lucide:edit"
          width="20"
          height="20"
          style={{ cursor: "pointer", marginRight: "10px" }}
          title="Editar"
        />
        <Icon
          color="#ED3F3F"
          onClick={() => handleDelete(component.id)}
          icon="material-symbols:delete-outline-rounded"
          width="22"
          height="22"
          style={{ cursor: "pointer" }}
          title="Eliminar"
        />
      </td>
    </tr>
  );
}