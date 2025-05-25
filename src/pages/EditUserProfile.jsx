import React from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { useNavigate, Link } from "react-router-dom";
import { useEditUserProfile } from "../hooks/useEditUserProfile";


//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL
//BORRAR ESTE UNA VEZ QUE FUNCIONE SE CREE LA PAGE PARA GESTIONAR PERFIL DE USUARIO NORMAL

const EditUserProfile = () => {
  const navigate = useNavigate();
  const {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit
  } = useEditUserProfile(navigate);

  return (
    <div className="register-container">
      <HeaderLogin />

      <main className="register-main">
        <section className="register-section">
          <div className="title-register">
            <Link to="/" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Editar perfil</div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="label-register">Nomre</label>
            <input
              className="input-normal"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Nombres"
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
              minLength={2}
              required
            />

            <label className="label-register" style={{ display: 'none' }}>Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="RUT"
              style={{ outline: 'none', display: 'none' }}
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
              minLength={9}
              maxLength={9}
              required
            />

            <label className="label-register" style={{ outline: 'none', display: 'none' }}>Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none', display: 'none' }}
            />

            <label className="label-register">Nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              style={{ outline: 'none'}}
            />

            <label className="label-register">Confirmar nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar nueva contraseña"
              style={{ outline: 'none'}}
            />

            <button className="button-register" type="submit">Actualizar perfil</button>
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

export default EditUserProfile;
