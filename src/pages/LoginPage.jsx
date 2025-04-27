import React, { useState } from "react"; // Importamos useState
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import HeaderLogin from "../components/HeaderLogin";

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
    <div>
      <HeaderLogin />

      <main>
        
        <section>
          <div>Inicia sesión</div>
          <div>¿No tienes una cuenta?, <a href="https://www.youtube.com/watch?v=-s_O2mCiHK4">Regístrate</a></div>
          
          <form onSubmit={handleLogin}>

            <label htmlFor="Usuario">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Usuario"
              />
              
              <div className="password-container">

              <label htmlFor="password">Contraseña</label>
                <input
                  type={showPassword ? "text" : "password"} // Cambia el tipo de input según el estado
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="*********"

                  style={{
                    border: 'none', // Elimina el borde
                    outline: 'none', // Elimina el contorno al hacer foco
                  }}

                />
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Ocultar" : "Mostrar"} Contraseña
                </button>

              </div>
              
              
              <button type="submit">Iniciar sesión</button>
          </form>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>

      </main>
    </div>
  );
};

