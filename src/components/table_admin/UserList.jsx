
import { useEffect, useState, useCallback } from 'react';
import { getAdminPaginatedUsers, deleteAdminUserById } from '../../services/userAdminService.jsx';
import UserRow from './RowTableAdmin.jsx';
import UserTableHead from './UserTableHead.jsx'; 
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import { useNavigate } from "react-router-dom";

import Modal from '../Modal.jsx';
import RegisterAdminUserForm from '../forms/RegisterAdminUserForm.jsx';
import UpdateAdminUserForm from '../forms/UpdateAdminUserForm.jsx';

const usersPerPage = 10;

const handleLoginSuccess = () => {
  //Carga user list al iniciar sesion
  navigate('/admin'); 
};

const UserList = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [page, setPage] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);


  //Necesario para la paginación y guardar en caché
  const fetchUsers = async (page = 0, limit = usersPerPage) => {
    setLoading(true);

    const [data, err] = await getAdminPaginatedUsers(page + 1, limit);

    if (err) {
      setError(err);
    } else {
      setUsers(data.users);
      setTotalUsers(data.total);

      // Guardar en caché
      sessionStorage.setItem("cachedUsers", JSON.stringify(data));
      sessionStorage.setItem("cachedPage", page);
    }

    setLoading(false);
  };

//Necesario para la paginación y guardar en caché
  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedUsers");
    const cachedPage = sessionStorage.getItem("cachedPage");

    if (cachedData && Number(cachedPage) === page) {
      const parsed = JSON.parse(cachedData);
      setUsers(parsed.users);
      setTotalUsers(parsed.total);
      setLoading(false);
    } else {
      fetchUsers(page, usersPerPage);
    }
  }, [page]);





  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const [, err] = await deleteAdminUserById(userId);
      if (err) {
        setError(err);
      } else {
        sessionStorage.removeItem("cachedUsers");
        sessionStorage.removeItem("cachedPage");
        fetchUsers(page, usersPerPage);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    sessionStorage.removeItem("cachedUsers");
    sessionStorage.removeItem("cachedPage");
    fetchUsers(page, usersPerPage);
  };

  const handleFormSuccess = useCallback(async () => {
    sessionStorage.removeItem("cachedUsers");
    sessionStorage.removeItem("cachedPage");
    await fetchUsers(page, usersPerPage);
  }, [page]);

  const handleUpdate = (userId) => {
    console.log("ID seleccionado para editar:", userId);
    setSelectedUser(userId);
    setShowForm(true);
    setIsEditing(true);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Usuarios</h1>
        <Icon
          onClick={() => {
            setShowForm(true);
            setIsEditing(false);
            setSelectedUser(null);
          }}
          style={{ cursor: 'pointer' }}
          color="#3563E9"
          icon="humbleicons:user-add"
          width="34"
          height="34"
        />
      </div>

      <table>
        <UserTableHead />
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

      {/* Boton de paginación */}
        <div className="pagination-controls">
          <button className="pagination-button" disabled={page === 0} onClick={() => setPage(page - 1)}>
            Anterior
          </button>

          {[...Array(Math.ceil(totalUsers / usersPerPage)).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`pagination-button ${page === num ? 'active' : ''}`}
            >
              {num + 1}
            </button>
          ))}

          <button
            className="pagination-button"
            disabled={(page + 1) * usersPerPage >= totalUsers}
            onClick={() => setPage(page + 1)}
          >
            Siguiente
          </button>
        </div>


      {/* Modals de edicion y registro */}
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
