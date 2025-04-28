import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { PasswordInput } from "../components/PasswordInput"; // Asegúrate de que la ruta sea correcta
import useRegisterUser from "../hooks/useRegisterUser";
import { Link } from "react-router-dom";

const RegisterUser = () => {
  // Importamos el hook useRegisterUser
  const {
    formData,
    error,
    mensajeExito,
    handleChange,
    handleSubmit,
  } = useRegisterUser();

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Cambia el estado de visibilidad de la contraseña
  };

  return (
    <div className="register-container">
      
      <HeaderLogin />

      <main className="register-main">

        <section className="register-section">

          <div className="title-register">
            <Link to="/login" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Crea una cuenta</div>
            
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
              required
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
            className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
            />

            <PasswordInput
              value={formData.password}
              onChange={(value) => handleChange({ target: { name: 'password', value } })}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <button className="button-register" type="submit">Registrar</button>
          </form>
          {error && Array.isArray(error) ? (
            error.map((err, index) => (
              <p key={index} style={{ color: "red" }}>
                {err.msg}
              </p>
            ))
          ) : (
            <p style={{ color: "red" }}>
              {error.msg ? error.msg : error}
            </p>
          )}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
