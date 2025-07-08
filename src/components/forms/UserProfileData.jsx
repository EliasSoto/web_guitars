import { useEffect, useState } from "react";
import useNormalUser from "../../hooks/useNormalUsers";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from '@iconify/react';
import UserProfileForm from "./UserProfileForm";
import Modal from "../Modal"; // Asegúrate de importar correctamente el Modal si no estaba antes

export default function UserProfileData() {
  const {
    user,
    error,
    loading,
    handleFormSuccess,
  } = useNormalUser();

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  
  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <p></p>;
  }

  if (!user) {
    return <p></p>;
  }

  return (
    <div className="register-container">
      <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1>Mi Perfil</h1>
        <Icon color='#FFC10C' onClick={openProfileModal} icon="lucide:edit" width="20" height="20" style={{ cursor: 'pointer' }} />
      </header>

        <form>
        <div style={{display: "flex", gap: "40px", flexWrap: "wrap", marginBottom: "20px"}}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Nombre</label>
            <input
              className="input-normal"
              type="text"
              name="first_name"
              value={user.first_name}
              readOnly
              disabled
            />

            <label className="label-register">Apellido</label>
            <input
              className="input-normal"
              type="text"
              name="last_name"
              value={user.last_name}
              readOnly
              disabled
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              name="email"
              value={user.email}
              readOnly
              disabled
            />

            
          </div>

          {/* Columna derecha */}
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", flex: 1 }}>
            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
              value={user.phone}
              minLength={9}
              maxLength={9}
              readOnly
              disabled
            />
            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={user.birth_date}
              readOnly
              disabled
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={user.rut}
              readOnly
              disabled
            />
          </div>
        </div>
        </form>
        <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
          <UserProfileForm onSuccess={handleFormSuccess} onClose={closeProfileModal} />
        </Modal>
        
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
