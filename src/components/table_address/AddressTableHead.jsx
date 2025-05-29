import "../../styles/admin_table/TableUsers.css";

export default function AddressTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID</th>
        <th>Nombre de la calle</th>
        <th>Comuna</th>
        <th>Región</th>
        <th>Tipo de dirección</th>
        <th>Indicaciones</th>
        <th>Estado</th>
      </tr>
    </thead>
  );
}
