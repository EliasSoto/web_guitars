import { useState } from "react";
import { userDelete } from "../services/userAdminService"; // Asegúrate que exista este servicio

const UserDelete = () => {
  const [rut, setRut] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [error, setError] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    setError("");
    setMensajeExito("");

    if (!rut.trim()) {
      setError("Debes ingresar un RUT válido.");
      return;
    }

    const [data, err] = await userDelete(rut);

    if (err) {
      setError(err);
    } else {
      setMensajeExito("Usuario eliminado correctamente ✅");
      setRut("");
    }
  };

  return (
    <div>
      <h2>Eliminar Usuario por RUT</h2>
      <form onSubmit={handleDelete}>
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
          placeholder="Ingresa el RUT"
        />
        <button type="submit">Eliminar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
    </div>
  );
};

export default UserDelete;
