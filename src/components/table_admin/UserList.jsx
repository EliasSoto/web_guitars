import UserRow from './RowTableAdmin.jsx';
import UserTableHead from './UserTableHead.jsx'; 
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import Modal from '../Modal.jsx';
import RegisterAdminUserForm from '../forms/RegisterAdminUserForm.jsx';
import UpdateAdminUserForm from '../forms/UpdateAdminUserForm.jsx';
import { useState, useMemo } from 'react';
import AddressList from '../table_address/AddressList.jsx';
import { getAddressById } from '../../services/addressAdminService';
import { toast, ToastContainer } from "react-toastify";

const usersPerPage = 10;

const UserList = ({
  users,
  totalUsers,
  page,
  setPage,
  loading,
  error,
  selectedUser,
  setSelectedUser,
  showForm,
  isEditing,
  setShowForm,
  setShowDetail,
  setIsEditing,
  handleDelete,
  handleCloseForm,
  handleFormSuccess,
  handleUpdate,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddresses, setShowAddresses] = useState(false);
  const [addressUserId, setAddressUserId] = useState(null);
  const [addressUserName, setAddressUserName] = useState('');

  // Filtrar usuarios basado en el término de búsqueda
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    
    const term = searchTerm.toLowerCase();
    return users.filter(user => 
      user.id.toString().includes(term) ||
      user.first_name.toLowerCase().includes(term) ||
      user.last_name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.rut.toLowerCase().includes(term) ||
      formatDate(user.birth_date).includes(term) ||
      (user.is_admin ? 'admin' : 'usuario').includes(term)
    );
  }, [users, searchTerm]);

  const handleViewAddresses = async (userId, userName) => {
    const [data, err] = await getAddressById(userId);
    if (err || !data || data.length === 0) {
      toast.info('Este usuario no tiene direcciones.');
      return;
    }
    setAddressUserId(userId);
    setAddressUserName(userName);
    setShowAddresses(true);
  };

  function formatDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Usuarios</h1>
        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="24" height="24" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando usuarios...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : filteredUsers.length === 0 ? (
        <p>{searchTerm ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No se encontraron usuarios.'}</p>
      ) : (
        <>
          <table>
            <UserTableHead />
            <tbody>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  setSelectedUser={setSelectedUser}
                  setShowDetail={setShowDetail}
                  setShowForm={setShowForm}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                  onViewAddresses={handleViewAddresses}
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
        </>
      )}

      {/* Modals de edicion y registro */}
      <Modal isOpen={showForm} onClose={handleCloseForm}>
        {isEditing ? (
          <UpdateAdminUserForm userId={selectedUser} onSuccess={handleFormSuccess} />
        ) : (
          <RegisterAdminUserForm onSuccess={handleFormSuccess} />
        )}
      </Modal>

      <Modal isOpen={showAddresses} onClose={() => setShowAddresses(false)}>
        <AddressList userId={addressUserId} userName={addressUserName} />
      </Modal>

      <ToastContainer position="top-center" autoClose={900} hideProgressBar />
    </div>
  );
};

export default UserList;