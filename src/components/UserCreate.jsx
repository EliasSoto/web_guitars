import React from "react";
import useCreate from "../hooks/useRegister";

const RegisterUser = () => {
  const {
    nombres,
    apellidos,
    correo,
    telefono,
    fecha_nacimiento,
    rut,
    password,
    es_administrador,
    setes_administrador,
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
  } = useCreate();

  const validateForm = () => {
    return (
      nombres &&
      apellidos &&
      correo &&
      telefono &&
      fecha_nacimiento &&
      rut &&
      password
    );
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nombres}
          onChange={(e) => setNombres(e.target.value)}
          placeholder="Nombres"
        />
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
          placeholder="Apellidos"
        />
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
        />
        <input
          type="date"
          value={fecha_nacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          placeholder="Fecha de nacimiento"
        />
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="RUT"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
        />

        {/* Checkbox para seleccionar si el usuario es administrador */}
        <label>
          <input
            type="checkbox"
            checked={es_administrador}
            onChange={(e) => setes_administrador(e.target.checked)}
          />
          ¿Es administrador?
        </label>

        <button type="submit" disabled={!validateForm()}>
          Registrar
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
    </div>
  );
};

export default RegisterUser;
