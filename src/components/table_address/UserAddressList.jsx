import { useState } from "react";
import UserAddressRow from "./UserAddressRow";
import AddressTableHead from "./AddressTableHead";
import "../../styles/admin_table/TableUsers.css";
import Modal from "../Modal";
import UpdateUserAddressForm from "../forms/UpdateUserAddressForm";
import RegisterUserAddressForm from "../forms/RegisterUserAddressForm"; // <- Asegúrate de tenerlo
import { toast, ToastContainer } from "react-toastify";
import { Icon } from '@iconify/react';
import { useUserAddress } from "../../hooks/useUserAddress";

export default function UserAddressList({ userId }) {
  const {
    addresses,
    loading,
    fetchAddresses,
    handleDelete,
    handleCreate,
    handleUpdate,
  } = useUserAddress();

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAddressId(null);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleEditSuccess = async () => {
    await fetchAddresses();
    handleCloseEditModal();
  };

  const handleRegisterSuccess = async () => {
    await fetchAddresses();
    handleCloseRegisterModal();
  };


  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Tus Direcciones</h2>
        <Icon
          onClick={() => setShowRegisterModal(true)}
          style={{ cursor: 'pointer' }}
          color="#3563E9"
          icon="qlementine-icons:address-book-add-16"
          width="26"
          height="26"
        />
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon"/>
          <p>Cargando direcciones...</p>
        </div>
      ) : addresses.length === 0 ? (
        <p>No se encontraron direcciones.</p>
      ) : (
        <table>
          <AddressTableHead />
          <tbody>
            {addresses.map((address) => (
              <UserAddressRow
                key={address.id}
                address={address}
                handleDelete={() => handleDeleteClick(address.id)}
                handleUpdate={() => handleEditClick(address.id)}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* Modal para editar dirección */}
      <Modal isOpen={showEditModal} onClose={handleCloseEditModal}>
        <UpdateUserAddressForm addressId={editingAddressId} onSuccess={handleEditSuccess} />
      </Modal>

      {/* Modal para registrar dirección */}
      <Modal isOpen={showRegisterModal} onClose={handleCloseRegisterModal}>
        <RegisterUserAddressForm userId={userId} onSuccess={handleRegisterSuccess} totalAddresses={addresses.length} />
      </Modal>
    </div>
  );
}
