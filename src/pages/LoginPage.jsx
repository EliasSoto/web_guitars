import React, { useState } from "react"; // Importamos useState
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import HeaderLogin from "../components/HeaderLogin";
import  "../styles/LoginPage.css"; // Asegúrate de que la ruta sea correcta}
import { PasswordInput } from "../components/PasswordInput";

export default function LoginPage () {
  // Importamos el hook useNavigate para redirigir al usuario al querer registrarse
  const navigate = useNavigate();

  // Importamos el hook useLogin
  const {
    formData,
    error,
    mensajeExito,
    handleChange,
    handleSubmit,
  } = useLogin();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado de visibilidad de la contraseña
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const [data, err] = await handleSubmit();

    if (err) {
      console.error("Error al iniciar sesión:", err);
      return;
    }
  };

  // Función para manejar el clic en el enlace de registro
  const handleRegisterClick = () => {
    e.preventDefault();
    navigate("/register");
  };
  
  return (
    <div>
      <HeaderLogin /> 

      <main className="login-main">
        
        <section>
          <div className="text-inicia">Inicia sesión</div>
          <div className="text-registrate">¿No tienes una cuenta?, <a className= "a" href="/register" onClick={handleRegisterClick}>Regístrate</a></div>
          
          <form onSubmit={handleLogin}>
    
              <label className="label-usuario-contraseña" htmlFor="Usuario">Correo</label>
                <input
                  className="input-usuario"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="usuario@ejemplo.cl"
                  style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
                />
         
                <PasswordInput
                  value={formData.password}
                  onChange={(value) => handleChange({ target: { name: 'password', value } })}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                />
              
              <button className="button-login" type="submit">Iniciar sesión</button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>

      </main>
    </div>
  );
};

