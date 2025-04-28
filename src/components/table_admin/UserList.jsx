import { useEffect, useState } from 'react';
import { getAdminAllUsers, deleteAdminUserById } from '../../services/userAdminService.jsx';
import UserRow from './RowTableAdmin.jsx';
import UserTableHead from './UserTableHead.jsx'; 
import UserForm from '../UserForm.jsx';
import UserDetail from '../UserDetail.jsx'; // Asegúrate de que la ruta sea correcta  
import "../../styles/admin_table/TableUsers.css"; // Asegúrate de que la ruta sea corre

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

  return (
    <div className="table-container">

      <div className="table-header"> 
        <h1>Lista de Usuarios</h1>
        <button onClick={() => setShowForm(true)}>Crear Nuevo Usuario</button>
      </div>
     
      
      <table>
        <UserTableHead /> 
        {/* Cuerpo de la tabla con todos los usuarios */}
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              setSelectedUser={setSelectedUser}
              setShowDetail={setShowDetail}
              setShowForm={setShowForm}
              handleDelete={handleDelete}
            />
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