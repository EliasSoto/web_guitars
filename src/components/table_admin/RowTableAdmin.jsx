import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

export default function UserRow({ user, setSelectedUser, setShowDetail, setShowForm, handleDelete }) {
  const navigate = useNavigate();

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
          <Icon color='#FFC10C' onClick={() => navigate(`/admin/edit/${user.id}`)}  icon="lucide:edit" width="20" height="20" style={{ cursor: 'pointer' }} />
          <Icon color='#ED3F3F' onClick={() => handleDelete(user.id)} icon="material-symbols:delete-outline-rounded" width="22" height="22" style={{ cursor: 'pointer' }} />

        </td>
      </tr>
    );
  }
  