import React from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useEditAdminUser } from "../hooks/useEditAdminUser";

const EditAdminUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit
  } = useEditAdminUser(userId, navigate);

  return (
    <div className="register-container">
      <HeaderLogin />

      <main className="register-main">
        <section className="register-section">
          <div className="title-register">
            <Link to="/admin" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Editar usuario</div>
          </div>

          <form onSubmit={handleSubmit}>
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

            <label className="label-register">Apellido</label>
            <input
              className="input-normal"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Apellidos"
              style={{ outline: 'none' }}
              minLength={2}
              required
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="RUT"
              style={{ outline: 'none' }}
              required
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              style={{ outline: 'none' }}
              required
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              style={{ outline: 'none' }}
              required
              minLength={9}
              maxLength={9}
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none' }}
            />

            <div style={{ marginTop: "1rem" }}>
              <label className="label-register">
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={formData.is_admin}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                ¿Es administrador?
              </label>
            </div>

            <button className="button-register" type="submit">Actualizar</button>
          </form>

          {error && (
            <p style={{ color: "red" }}>
              {Array.isArray(error) ? error.map((err, index) => (
                <span key={index}>{err.msg}<br /></span>
              )) : error}
            </p>
          )}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </section>
      </main>
    </div>
  );
};

export default EditAdminUser;
