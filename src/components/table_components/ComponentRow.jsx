import { Icon } from "@iconify/react";

export default function ComponentRow({ component, handleDelete, handleUpdate }) {
  return (
    <tr key={component.id}>
      <td>{component.id}</td>
      <td>{component.name}</td>
      <td>{component.type}</td>
      <td>{component.subtype || "No Tiene"}</td>
      <td>{component.purchase_price}</td>
      <td>{component.sale_price}</td>
      <td>{component.net_price}</td>
      <td>{component.stock}</td>
      <td>{component.brand || "Indefinido"}</td>
      <td>{formatDate(component.purchase_date)}</td>
      <td>{component.is_active ? "Activo" : "Inactivo"}</td>

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

function formatDate(dateString) {
  if (!dateString) return "No registrada";
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}
