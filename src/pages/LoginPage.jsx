import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";   // <-- Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css";            // <-- Importa estilos
import useLogin from "../hooks/useLogin";
import HeaderLogin from "../components/HeaderLogin";
import "../styles/LoginPage.css";
import Footer from "../components/Footer";

export default function LoginPage() {
  const navigate = useNavigate();

  const { formData, error, mensajeExito, handleChange, handleSubmit } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const [data, err] = await handleSubmit();

    if (err) {
      console.error("Error al iniciar sesión:", err);
      toast.error(err);           // <-- Muestra el error en toast
      return;
    }
    
    if (mensajeExito) {
      toast.success(mensajeExito);  // Opcional: mensaje de éxito en toast
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="page-container">
      <HeaderLogin />

      <main className="login-main">
        <section className="login-section">
          <div className="text-inicia">Inicia sesión</div>
          <div className="text-registrate">
            ¿No tienes una cuenta?{" "}
            <a className="a" href="/register" onClick={handleRegisterClick}>
              Regístrate
            </a>
          </div>

          <form onSubmit={handleLogin}>
            <label className="label-usuario-contraseña" htmlFor="Usuario">
              Correo
            </label>
            <input
              className="input-usuario"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="usuario@ejemplo.cl"
              style={{ outline: "none" }}
            />

            <label className="label-usuario-contraseña" htmlFor="password">
              Contraseña
            </label>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="password-input-field"
              />
              <Icon
                icon={showPassword ? "octicon:eye-16" : "mdi:eye-off-outline"}
                width="24"
                height="24"
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </div>

            <button className="button-login" type="submit">
              Iniciar sesión
            </button>
          </form>
        </section>
      </main>

      <Footer />

      {/* Aquí colocas el ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
      />
    </div>
  );
}
