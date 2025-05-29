import { useState } from "react";
import UserAddressRow from "./UserAddressRow";
import AddressTableHead from "./AddressTableHead";
import "../../styles/admin_table/TableUsers.css";
import Modal from "../Modal";
import UpdateUserAddressForm from "../forms/UpdateUserAddressForm";
import { toast, ToastContainer } from "react-toastify";
import { deleteAddress } from "../../services/userNormalService";

export default function UserAddressList({ userId, userName, addresses, loading, handleDelete, handleUpdate, handleFormSuccess }) {
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEditClick = (addressId) => {
    setEditingAddressId(addressId);
    setShowEditModal(true);
  };

  const handleDeleteClick = async (addressId) => {
  const [data, error] = await deleteAddress(addressId);

    if (error) {
    toast.error(error);

    } else {
      toast.success("Dirección eliminada correctamente.");
    }
  };

  const handleEditSuccess = () => {
    setShowEditModal(false);
    handleFormSuccess();
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Direcciones de {userName}</h2>
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
      <ToastContainer position="top-center" autoClose={900} hideProgressBar/>
      {/* Modal para editar dirección */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <UpdateUserAddressForm addressId={editingAddressId} onSuccess={handleEditSuccess} />
      </Modal>
    </div>
  );
}
