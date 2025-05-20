import { useEffect, useState, useCallback } from 'react';
import { getAdminAllUsers, deleteAdminUserById } from '../../services/userAdminService.jsx';
import UserRow from './RowTableAdmin.jsx';
import UserTableHead from './UserTableHead.jsx'; 
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

import Modal from '../Modal.jsx';
import RegisterAdminUserForm from '../forms/RegisterAdminUserForm.jsx';
import UpdateAdminUserForm from '../forms/UpdateAdminUserForm.jsx';



const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


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

   const handleCloseForm = () => {
    setShowForm(false);
    fetchUsers();
  };

   const handleFormSuccess = useCallback(async () => {
    await fetchUsers();
}, []);

  const handleUpdate = (userId) => {
    setSelectedUser(userId);
    setShowForm(true);
    setIsEditing(true);
  }

  return (
    <div className="table-container">

      <div className="table-header">
        <h1>Lista de Usuarios</h1>
        <Icon onClick={() => {
          setShowForm(true);
          setIsEditing(false);
          setSelectedUser(null);
         }} 
         style={{ cursor: 'pointer' }} color="#3563E9" icon="humbleicons:user-add" width="34" height="34" />
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
              handleUpdate={handleUpdate}
            />
          ))}
        </tbody>

      </table>

     <Modal isOpen={showForm} onClose={handleCloseForm}>
        {isEditing ? (
          <UpdateAdminUserForm userId={selectedUser} onSuccess={handleFormSuccess} />
        ) : (
          <RegisterAdminUserForm onSuccess={handleFormSuccess} />
        )}
      </Modal>


    </div>


  );
};

export default UserList;