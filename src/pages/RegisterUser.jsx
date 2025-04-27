import React from "react";
import useRegister from "../hooks/useRegister";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { PasswordInput } from "../components/PassInput"; // Asegúrate de que la ruta sea correcta

const RegisterUser = () => {
  const {
    nombres,
    apellidos,
    correo,
    telefono,
    fecha_nacimiento,
    rut,
    password,
    error,
    mensajeExito,
    setNombres,
    setApellidos,
    setCorreo,
    setTelefono,
    setFechaNacimiento,
    setRut,
    setContraseña,
    handleSubmit,
  } = useRegister();

  return (
    <div className="register-container">
      
      <HeaderLogin />

      <main className="register-main">

        <section className="register-section">

          <div className="title-register">
            <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            <div className="text-inicia">Crea una cuenta</div>
          </div>
        
          <form onSubmit={handleSubmit}>

            <label className="label-register">Nombre</label>
            <input
              className="input-normal"
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              placeholder="Nombres"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <label className="label-register">Apellido</label>
            <input
              className="input-normal"
              type="text"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              placeholder="Apellidos"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              placeholder="RUT"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="Correo electrónico"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Teléfono"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
            className="input-normal"
              type="date"
              value={fecha_nacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              placeholder="Fecha de nacimiento"
              style={{
                outline: 'none', // Elimina el contorno al hacer foco
              }}
            />

            <PasswordInput></PasswordInput>

            <button className="button-register" type="submit">Registrar</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
