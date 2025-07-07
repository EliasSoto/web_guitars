import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast.error(err);
      return;
    }

    if (mensajeExito) {
      toast.success(mensajeExito);
    }
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-page__container">
      <HeaderLogin />

      <main className="login-page__main">
        <section className="login-form">
          <div className="login-form__title">Inicia sesión</div>
          <div className="login-form__register-text">
            ¿No tienes una cuenta?{" "}
            <a className="login-form__register-link" href="/register" onClick={handleRegisterClick}>
              Regístrate
            </a>
          </div>

          <form onSubmit={handleLogin}>
            <label className="login-form__label" htmlFor="Usuario">
              Correo
            </label>
            <input
              className="login-form__input"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="usuario@ejemplo.cl"
              style={{ outline: "none" }}
            />

            <label className="login-form__label" htmlFor="password">
              Contraseña
            </label>

            <div className="login-form__password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Contraseña"
                className="login-form__password-input"
              />
              <Icon
                icon={showPassword ? "octicon:eye-16" : "mdi:eye-off-outline"}
                width="24"
                height="24"
                className="login-form__toggle-icon"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </div>

            <button className="login-form__submit-button" type="submit">
              Iniciar sesión
            </button>
          </form>
        </section>
      </main>

      <Footer />

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
