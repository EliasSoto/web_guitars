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

  const handleEditSuccess = async () => {
    await fetchAddresses();
  };

  const handleRegisterSuccess = async () => {
    await fetchAddresses(); // <- Debe venir del hook useUserAddress
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
        <p></p>
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
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <UpdateUserAddressForm addressId={editingAddressId} onSuccess={handleEditSuccess} />
      </Modal>

      {/* Modal para registrar dirección */}
      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)}>
        <RegisterUserAddressForm userId={userId} onSuccess={handleRegisterSuccess} totalAddresses={addresses.length} />
      </Modal>
    </div>
  );
}
