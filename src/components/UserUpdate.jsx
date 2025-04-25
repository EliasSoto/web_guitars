import React, { useState } from "react";
import { userUpdate } from "../services/userAdminService"; // Asegúrate que exista este servicio

const UserUpdate = () => {
  const [rut, setRut] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [password, setContraseña] = useState("");
  const [esAdministrador, setEsAdministrador] = useState(false);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const validateForm = () => {
    return (
      rut &&
      nombres &&
      apellidos &&
      correo &&
      telefono &&
      fechaNacimiento &&
      password
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    if (!rut.trim()) {
      setError("Debes ingresar un RUT válido.");
      return;
    }

    const [data, err] = await userUpdate(rut, nombres, apellidos, correo, telefono, fechaNacimiento, password, esAdministrador);

    if (err) {
      setError(err);
    } else {
      setMensajeExito("Usuario actualizado correctamente ✅");
      setRut("");
      setNombres("");
      setApellidos("");
      setCorreo("");
      setTelefono("");
      setFechaNacimiento("");
      setContraseña("");
      setEsAdministrador(false);
    }
  };

  return (
    <div>
      <h2>Actualizar Usuario por RUT</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="RUT del Usuario"
        />
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
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
          placeholder="Fecha de nacimiento"
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
            checked={esAdministrador}
            onChange={(e) => setEsAdministrador(e.target.checked)}
          />
          ¿Es administrador?
        </label>

        <button type="submit" disabled={!validateForm()}>
          Actualizar Usuario
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
    </div>
  );
};

export default UserUpdate;
