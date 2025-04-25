import { useEffect, useState } from "react";
import { getUsers } from "../services/userAdminService.jsx"; // Asegúrate de que esté bien exportado

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const [data, err] = await getUsers();
      if (err) {
        setError(err);
      } else {
        setUsuarios(data);
      }
    };

    fetchUsers();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Usuarios Read</h2>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
          id : {user.id} - {user.nombres} {user.apellidos} - {user.correo} - {user.telefono} - {user.fecha_nacimiento} - {user.rut} - {user.es_administrador ? "Administrador" : "Usuario"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
