import { useState } from "react";
import UserAddressRow from "./UserAddressRow";
import AddressTableHead from "./AddressTableHead";
import "../../styles/admin_table/TableUsers.css";
import Modal from "../Modal";
import UpdateUserAddressForm from "../forms/UpdateUserAddressForm";
import RegisterUserAddressForm from "../forms/RegisterUserAddressForm"; // <- Asegúrate de tenerlo
import { toast, ToastContainer } from "react-toastify";
import { Icon } from '@iconify/react';
import useUserAddress from "../../hooks/useUserAddress";

export default function UserAddressList({ userId, userName }) {
  const {
    addresses,
    loading,
    handleDelete,
    handleUpdate,
    handleCreate,
  } = useUserAddress();

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (addressId) => {
    const error = await handleDelete(addressId);
    if (error) {
      toast.error(error);
    } else {
      toast.success("Dirección eliminada correctamente.");
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
  };

  const handleRegisterSuccess = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Direcciones de {userName}</h2>
        <Icon
          onClick={() => setShowRegisterModal(true)}
          style={{ cursor: 'pointer' }}
          color="#3563E9"
          icon="humbleicons:user-add"
          width="34"
          height="34"
        />
      </div>

      {loading ? (
        <p>Cargando direcciones...</p>
      ) : addresses.length === 0 ? (
        <p>Este usuario no tiene direcciones registradas.</p>
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

      <ToastContainer position="top-center" autoClose={900} hideProgressBar />

      {/* Modal para editar dirección */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <UpdateUserAddressForm addressId={editingAddressId} onSuccess={handleEditSuccess} />
      </Modal>

      {/* Modal para registrar dirección */}
      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterUserAddressForm userId={userId} onSuccess={handleRegisterSuccess} />
      </Modal>
    </div>
  );
}
