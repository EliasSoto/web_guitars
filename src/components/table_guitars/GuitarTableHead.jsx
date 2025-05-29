import "../../styles/admin_table/TableUsers.css";

export default function GuitarTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID</th>
        <th>Modelo</th>
        <th>Marca</th>
        <th>Precio Venta</th>
        <th>Precio Compra</th>
        <th>Stock</th>
        <th>Color</th>
        <th>Fecha de<br />Compra</th>
        <th>Personalizada</th>
        <th>Tipo de Madera</th>
        <th>Acciones</th>
      </tr>
    </thead>
  );
}

