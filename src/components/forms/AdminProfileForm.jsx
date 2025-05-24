
import { useNavigate } from "react-router-dom";
import { useEditAdminUser } from "../../hooks/useEditAdminUser";
import { useEffect } from "react";
import "../../styles/RegisterAdminUserForm.css";
import { toast, ToastContainer } from 'react-toastify';
import { PasswordInput } from "../PasswordInput";



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
         <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                  
                      {/* Columna izquierda */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>

                    
                    <label className="label-register">Nombre</label>
                    <input
                      className="input-normal"
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      placeholder="Nombres"
                      style={{ outline: 'none' }}
                      minLength={2}
                      required
                    />
          
                
          
                    
                  </div>
          
                  {/* Columna derecha */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  
          
                    <label className="label-register">Fecha nacimiento</label>
                    <input
                      className="input-normal"
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleChange}
                      style={{ outline: 'none' }}
                    />
          
                
                
                  
                  </div>
                </div>
        


        
                <div className="button-container">
                    <button className="button-register">Registrar</button>
                </div>
        









      </form>
      <ToastContainer position="top-center" autoClose={8000} hideProgressBar />
    </div>
  );
}
