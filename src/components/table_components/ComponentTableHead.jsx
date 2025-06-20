import "../../styles/admin_table/TableUsers.css";

export default function ComponentTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Tipo</th>
        <th>Subtipo</th>
        <th>Precio Compra</th>
        <th>Precio Venta</th>
        <th>Precio Neto</th>
        <th>Stock</th>
        <th>Marca</th>
        <th>Fecha de<br />Compra</th>
        <th>Activo</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}
