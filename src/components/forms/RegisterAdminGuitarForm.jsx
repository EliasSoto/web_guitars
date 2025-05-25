import useRegisterAdminGuitar from "../../hooks/useRegisterAdminGuitar";
import "../../styles/RegisterAdminUserForm.css";
import { PasswordInput } from "../PasswordInput";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export default function RegisterAdminGuitarForm({ isOpen, onSuccess, onClose }) {
  const {
    formData,
    error,
    successMessage,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
    resetForm
  } = useRegisterAdminGuitar();

  useEffect(() => {

    if (error) {
      if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err.msg));
      } else {
        toast.error(error);
      }
    }

    if (successMessage) {
      toast.success(successMessage);
      resetForm();

      if (onSuccess) {
        onSuccess();
      }

    }
  }, [error, successMessage, onSuccess]);

  return (
     <div className="register-container">
      <header>
        <h1 className="text-inicia">Registrar nuevo usuario</h1>
      </header>

      <form onSubmit={handleSubmit}>
      
        
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>

          
            {/* Columna izquierda */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>


                <label className="label-register">Nombre</label>
                <input
                    className="input-normal"
                />

        
            </div>

            {/* Columna derecha */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>

                <label className="label-register">Teléfono</label>
                <input
                    className="input-normal"
                />

            
            </div>
            

        </div>

        <div className="button-container">
            <button className="button-register">Registrar</button>
        </div>

      </form>

        {/* Componente para mostrar mensajes de error y éxito */}
       <ToastContainer position="top-center" autoClose={8000} hideProgressBar />


    </div>
  )
}