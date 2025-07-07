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
  const { formData, error, mensajeExito, handleChange, handleSubmit } =
    useRegisterUser();

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

    if (mensajeExito) {
      toast.success(mensajeExito);
    }
  };

  return (
    <div className="register-page">
      <HeaderLogin />

      <div className="register-container">
        <main className="register-main">
          <section className="register-section">
            <div className="register-header">
              <Link to="/login" className="register-back-link">
                <Icon
                  className="register-back-icon"
                  icon="ic:round-arrow-back"
                  width="24"
                  height="24"
                />
              </Link>

              <h1 className="register-title">Crea una cuenta</h1>
            </div>

            <form onSubmit={onSubmit} className="register-form">
              <div className="register-form-column register-form-left">
                <div className="form-group">
                  <label htmlFor="first_name" className="form-label">
                    Nombre
                  </label>
                  <input
                    id="first_name"
                    name="first_name"
                    type="text"
                    className="form-input"
                    placeholder="Nombres"
                    value={formData.first_name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    autoComplete="given-name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="last_name" className="form-label">
                    Apellido
                  </label>
                  <input
                    id="last_name"
                    name="last_name"
                    type="text"
                    className="form-input"
                    placeholder="Apellidos"
                    value={formData.last_name}
                    onChange={handleChange}
                    minLength={2}
                    required
                    autoComplete="family-name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rut" className="form-label">
                    Rut
                  </label>
                  <input
                    id="rut"
                    name="rut"
                    type="text"
                    className="form-input"
                    placeholder="RUT"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="register-form-column register-form-right">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Correo
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-input"
                    placeholder="Correo electrónico"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group form-group-inline">
                    <label htmlFor="phone" className="form-label">
                      Teléfono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className="form-input"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={handleChange}
                      minLength={9}
                      maxLength={9}
                      required
                      autoComplete="tel"
                    />
                  </div>

                  <div className="form-group form-group-inline">
                    <label htmlFor="birth_date" className="form-label">
                      Fecha nacimiento
                    </label>
                    <input
                      id="birth_date"
                      name="birth_date"
                      type="date"
                      className="form-input"
                      value={formData.birth_date}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="password-input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Contraseña"
                      className="password-input-field"
                      autoComplete="new-password"
                      minLength={6}
                      required
                    />
                    <Icon
                      icon={
                        showPassword ? "octicon:eye-16" : "mdi:eye-off-outline"
                      }
                      width="24"
                      height="24"
                      className="password-toggle-icon"
                      onClick={togglePasswordVisibility}
                      aria-label={
                        showPassword
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          togglePasswordVisibility();
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="form-footer">
                <button className="btn-submit" type="submit">
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
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>

      <Footer />
    </div>
  );
};

export default RegisterUser;
