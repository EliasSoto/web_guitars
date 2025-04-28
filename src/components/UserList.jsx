import { useEffect, useState } from 'react';
import { getAdminAllUsers, deleteAdminUserById } from '../services/userAdminService';
import UserForm from './UserForm';
import UserDetail from './UserDetail';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const [data, err] = await getAdminAllUsers();
    if (err) {
      setError(err);
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const [, err] = await deleteAdminUserById(userId);
      if (err) {
        setError(err);
      } else {
        fetchUsers();
      }
    }
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <button onClick={() => setShowForm(true)}>Crear Nuevo Usuario</button>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>RUT</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.rut}</td>
              <td>
                <button onClick={() => { setSelectedUser(user); setShowDetail(true); }}>
                  Ver
                </button>
                <button onClick={() => { setSelectedUser(user); setShowForm(true); }}>
                  Editar
                </button>
                <button onClick={() => handleDelete(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <UserForm 
          user={selectedUser} 
          onClose={() => { setShowForm(false); setSelectedUser(null); fetchUsers(); }} 
        />
      )}

      {showDetail && (
        <UserDetail 
          user={selectedUser} 
          onClose={() => { setShowDetail(false); setSelectedUser(null); }} 
        />
      )}
    </div>
  );
};

export default UserList;