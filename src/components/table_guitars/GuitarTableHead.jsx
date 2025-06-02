import "../../styles/admin_table/TableUsers.css";

export default function GuitarTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID</th>
        <th>Modelo</th>
        <th>Marca</th>
        <th>Precio Compra</th>
        <th>Precio Venta</th>
        <th>Stock</th>
        <th>Color</th>
        <th>Fecha de<br />Compra</th>
        <th>Tipo de Madera</th>
        <th>Personalizada</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}

