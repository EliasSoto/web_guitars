import "../../styles/admin_table/TableUsers.css";

export default function ShipmentAdminTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID Envío</th>
        <th>Fecha de Envío</th>
        <th>Fecha de Entrega</th>
        <th>Estado de Seguimiento</th>
        <th>Precio</th>
        <th>Proveedor de Envío</th>
        <th>Entrega Inmediata</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}
