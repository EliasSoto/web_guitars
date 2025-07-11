import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from "@iconify/react";
import "../styles/RegisterUser.css";
import useRegisterUser from "../hooks/useRegisterUser";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterUser = () => {
  const { formData, error, successMessage, handleChange, handleSubmit } = useRegisterUser();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (e) => {
    e.preventDefault();
    const [data, err] = await handleSubmit();

    if (err) {
      if (Array.isArray(err)) {
        err.forEach((e) => toast.error(e.msg));
      } else if (err.msg) {
        toast.error(err.msg);
      } else {
        toast.error(err);
      }
      return;
    }

    if (successMessage) {
      toast.success(successMessage);
    }
  };

  const today = new Date();
  const minBirthDate = new Date(today.getFullYear() - 65, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];
  
  const maxBirthDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    .toISOString()
    .split("T")[0];

  return (
    <div className="register-page">
      <HeaderLogin />

      <div className="register-page__container">
        <main className="register-page__main">
          <section className="register-form">
            <div className="register-form__header">
              <Link to="/login" className="register-form__back-link">
                <Icon
                  className="register-form__back-icon"
                  icon="ic:round-arrow-back"
                  width="24"
                  height="24"
                />
              </Link>
              <h1 className="register-form__title">Crea una cuenta</h1>
            </div>

            <form onSubmit={onSubmit} className="register-form__body">
              <div className="register-form__column register-form__column--left">
                <div className="register-form__group">
                  <label htmlFor="first_name" className="register-form__label">Nombre</label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="register-form__input"
                    placeholder="Nombres"
                    value={formData.first_name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    autoComplete="given-name"
                  />
                </div>

                <div className="register-form__group">
                  <label htmlFor="last_name" className="register-form__label">Apellido</label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="register-form__input"
                    placeholder="Apellidos"
                    value={formData.last_name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <div className="register-form__group">
                  <label htmlFor="rut" className="register-form__label">RUT</label>
                  <input
                    id="rut"
                    name="rut"
                    type="text"
                    className="register-form__input"
                    placeholder="12345678-9"
                    value={formData.rut}
                    onChange={handleChange}
                    pattern="^\d{7,8}-[\dkK]{1}$"
                    title="Formato válido: 12345678-9 o 12345678-K"
                    minLength={9}
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div className="register-form__column register-form__column--right">
                <div className="register-form__group">
                  <label htmlFor="email" className="register-form__label">Correo</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="register-form__input"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="register-form__row">
                  <div className="register-form__group register-form__group--inline">
                    <label htmlFor="phone" className="register-form__label">Teléfono</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className="register-form__input"
                      placeholder="951225682"
                      value={formData.phone}
                      onChange={handleChange}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                      minLength={9}
                      maxLength={9}
                      required
                      autoComplete="tel"
                    />
                  </div>

                  <div className="register-form__group register-form__group--inline">
                    <label htmlFor="birth_date" className="register-form__label">Fecha nacimiento</label>
                    <input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      className="register-form__input"
                      value={formData.birth_date}
                      onChange={handleChange}
                      min={minBirthDate}
                      max={maxBirthDate}
                      required
                    />
                  </div>
                </div>

                <div className="register-form__group">
                  <label htmlFor="password" className="register-form__label">Contraseña</label>
                  <div className="register-form__password-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      className="register-form__password-input"
                      autoComplete="new-password"
                      minLength={8}
                      required
                    />
                    <Icon
                      icon={showPassword ? "octicon:eye-16" : "mdi:eye-off-outline"}
                      width="24"
                      height="24"
                      className="register-form__toggle-icon"
                      onClick={togglePasswordVisibility}
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") togglePasswordVisibility();
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="register-form__footer">
                <button className="register-form__submit-button" type="submit">
                  Registrar
                </button>
              </div>
            </form>
          </section>
        </main>

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

      <Footer />
    </div>
  );
};

export default RegisterUser;
