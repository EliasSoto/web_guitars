import { useNavigate } from "react-router-dom";
import { useEditAdminGuitar } from "../../hooks/useEditAdminGuitar";
import { useEffect } from "react"; // Asegúrate que este componente existe y está correcto
import "../../styles/RegisterAdminGuitarForm.css";
import { toast, ToastContainer } from 'react-toastify';


export default function UpdateAdminGuitarForm({ guitarId, onSuccess }) {
  const navigate = useNavigate();
  const {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus
  } = useEditAdminGuitar(guitarId, navigate);

  useEffect(() => {
    if (error) {
      if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error);
      }

      // Sirve para resetear el error después de mostrarlo
      resetStatus();
    }

    if (successMessage) {
      toast.success(successMessage);

      if (onSuccess) {
        onSuccess();
      }

      // Sirve para resetear el mensaje de éxito después de mostrarlo
      resetStatus();
    }
  }, [error, successMessage, onSuccess]);

  return (
        <div></div>

  );
}