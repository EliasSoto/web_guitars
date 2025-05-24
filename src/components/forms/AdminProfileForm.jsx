
import { useNavigate } from "react-router-dom";
import { useEditAdminUser } from "../../hooks/useEditAdminUser";
import { useEffect } from "react";
import "../../styles/RegisterAdminUserForm.css";
import { toast, ToastContainer } from 'react-toastify';

export default function AdminProfileForm({ onClose }) {
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user_info"));
  const userId = storedUser?._id;

  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus
  } = useEditAdminUser(userId, navigate);

  useEffect(() => {
    if (error) {
      Array.isArray(error) ? error.forEach((err) => toast.error(err.msg)) : toast.error(error);
      resetStatus();
    }
    if (successMessage) {
      toast.success(successMessage);
      resetStatus();
      onClose?.(); // Cierra el modal si se edita correctamente
    }
  }, [error, successMessage, onClose]);

  return (
    <div className="register-container">
      <header>
        <h1 className="text-inicia">Editar Perfil</h1>
      </header>
      <form onSubmit={handleSubmit}>
        {/* ... inputs como antes (nombre, apellido, etc) ... */}
        <div className="button-container">
          <button className="button-register">Actualizar</button>
        </div>
      </form>
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
