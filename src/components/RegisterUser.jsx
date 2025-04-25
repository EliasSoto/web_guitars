import React from "react";
import useRegister from "../hooks/useRegister"; // Ajusta la ruta si es necesario

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
    <div>
      <h2>Registro</h2>
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
          type="text"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Correo electrónico"
        />
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
        />
        <input
          type="text"
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
        <button type="submit">Registrar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
    </div>
  );
};

export default RegisterUser;
