import "../../styles/admin_table/TableUsers.css";

export default function OrderTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID</th>
        <th>Fecha de Orden</th>
        <th>Precio Total</th>
        <th>Estado</th>
        <th>Método de Pago</th>
      </tr>
    </thead>
  );
}
