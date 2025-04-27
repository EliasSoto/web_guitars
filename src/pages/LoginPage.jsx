import React, { useState } from "react"; // Importamos useState
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import HeaderLogin from "../components/HeaderLogin";
import  "../styles/LoginPage.css"; // Asegúrate de que la ruta sea correcta
import { Icon } from '@iconify/react';

export default function LoginPage () {
  const navigate = useNavigate();

  const {
    username,
    password,
    error,
    mensajeExito,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLogin();

  const [value, setValue] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleLogin = async (e) => {
    const [data, err] = await handleSubmit(e); // ✅ Aquí obtienes data

    if (data?.user_info?.es_administrador) {
      navigate("/admin");
    } else if (data) {
      navigate("/"); // o "/user-dashboard"
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado de visibilidad de la contraseña
  };

  return (
    <div className="login-container">
      <HeaderLogin /> 

      <main className="login-main">
        
        <section>
          <div className="text-inicia">Inicia sesión</div>
          <div className="text-registrate">¿No tienes una cuenta?, <a className= "a" href="https://www.youtube.com/watch?v=-s_O2mCiHK4">Regístrate</a></div>
          
          <form onSubmit={handleLogin}>

    
              <label className="label-usuario-contraseña" htmlFor="Usuario">Usuario</label>
                <input
                  className="input-usuario"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="usuario@ejemplo.cl"
                  style={{
                    outline: 'none', // Elimina el contorno al hacer foco
                  }}
                />
          
            
          
              <div className="password-container">
                <label className="label-usuario-contraseña" htmlFor="password">Contraseña</label>
                <div className="input-contraseña-container">
                  <input
                      className="input-contraseña"
                      type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="•••••••••••"
                      style={{
                        outline: 'none', // Elimina el contorno al hacer foco
                      }}   
                    />
                    <button type="button" className="eye-icon" onClick={togglePasswordVisibility}/>
                </div>
              </div>
              
              
              <button className="button-login" type="submit">Iniciar sesión</button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>

      </main>
    </div>
  );
};

