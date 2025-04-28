import { Icon } from '@iconify/react';

export default function UserRow({ user, setSelectedUser, setShowDetail, setShowForm, handleDelete }) {
    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.rut}</td>
        <td>
          {/* Cambiar colores despues */}
          <Icon color='#FFC10C' onClick={() => { setSelectedUser(user); setShowForm(true); }} icon="lucide:edit" width="20" height="20" />
          <Icon color='#ED3F3F' onClick={() => handleDelete(user.id)} icon="material-symbols:delete-outline-rounded" width="22" height="22" />

        </td>
      </tr>
    );
  }
  