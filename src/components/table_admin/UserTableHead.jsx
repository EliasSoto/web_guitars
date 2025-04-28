import "../../styles/admin_table/TableUsers.css";

export default function UserTableHead() {
    return (
      <thead className="table-head">
        <tr>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>RUT</th>
          <th>Acciones</th>
        </tr>
      </thead>
    );
  }
  