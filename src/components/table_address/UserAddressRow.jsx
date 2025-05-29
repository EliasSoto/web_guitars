import { Icon } from "@iconify/react";

export default function UserAddressRow({ address, handleDelete, handleUpdate }) {
  return (
    <tr>
      <td>{address.id}</td>
      <td>{address.street_name}</td>
      <td>{address.commune}</td>
      <td>{address.region}</td>
      <td>{address.address_type}</td>
      <td>{address.directions || '—'}</td>
      <td>{address.is_active ? 'Activa' : 'Inactiva'}</td>
      <td className="action-icons">
        <Icon
          icon="lucide:edit"
          width={20}
          height={20}
          color="#FFC10C"
          onClick={() => handleUpdate(address.id)}
          style={{ cursor: "pointer", marginRight: "8px" }}
        />
        <Icon
          icon="material-symbols:delete-outline-rounded"
          width={22}
          height={22}
          color="#ED3F3F"
          onClick={() => handleDelete(address.id)}
          style={{ cursor: "pointer" }}
        />
      </td>
    </tr>
  );
}
