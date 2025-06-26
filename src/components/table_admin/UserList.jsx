import UserRow from './RowTableAdmin.jsx';
import UserTableHead from './UserTableHead.jsx'; 
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import Modal from '../Modal.jsx';
import RegisterAdminUserForm from '../forms/RegisterAdminUserForm.jsx';
import UpdateAdminUserForm from '../forms/UpdateAdminUserForm.jsx';
import { useState } from 'react';
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
  setSearch,
  search,
  searchBy,       
  setSearchBy,    
}) => {
  const [showAddresses, setShowAddresses] = useState(false);
  const [addressUserId, setAddressUserId] = useState(null);
  const [addressUserName, setAddressUserName] = useState('');

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

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Usuarios</h1>

        <div className="search-add-container">
          
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />
            <input
              className="search-bar-input"
              type="text"
              placeholder="Buscar usuarios por"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(0);
              }}
            />
            <select
              className="search-bar-select"
              value={searchBy}
              onChange={e => {
                setSearchBy(e.target.value);
                setPage(0);
              }}
            >
              <option value="first_name">Nombre</option>
              <option value="rut">RUT</option>
              <option value="email">Email</option>
            </select>
          </div>


          <Icon
            onClick={() => setShowForm(true)} 
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
      ) : users.length === 0 ? (
        <p>{search ? 'No se encontraron usuarios que coincidan con la búsqueda.' : 'No se encontraron usuarios.'}</p>
      ) : (
        <>
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
                  onViewAddresses={handleViewAddresses}
                />
              ))}
            </tbody>
          </table>

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

export default UserList; //OCUPAR ESTE
