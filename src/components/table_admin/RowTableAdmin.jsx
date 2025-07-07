import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/common';

export default function UserRow({ user, handleDelete, handleUpdate, onViewAddresses }) {
  const navigate = useNavigate();

    return (
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.rut}</td>
        <td>{formatDate(user.birth_date)}</td>
        <td>{user.is_admin ? 'Admin' : 'Usuario'}</td>
        {/* Cambiar colores despues */}
        <td>
          {/* Cambiar colores despues */}
          <Icon color='#FFC10C' onClick={() => handleUpdate(user.id)} icon="lucide:edit" width="20" height="20" style={{ cursor: 'pointer' }} />
          <Icon color='#ED3F3F' onClick={() => handleDelete(user.id)} icon="material-symbols:delete-outline-rounded" width="22" height="22" style={{ cursor: 'pointer' }} />
          <Icon onClick={() => onViewAddresses(user.id, `${user.first_name} ${user.last_name}`)}  color='#3b82f6' icon="flowbite:address-book-outline" width="20" height="20" style={{ cursor: 'pointer' }} />
        </td>
      </tr>
    );
  }