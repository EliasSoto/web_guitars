export default function OrderCustomTableHead() {
  return (
    <thead className="table-head">
      <tr>
        <th>ID Pedido</th>         
        <th>Nombre del Usuario</th>       
        <th>Fecha Pedido</th>       
        <th>Método de Pago</th>        
        <th>Estado</th>
        <th>Estado de Envío</th>    
        <th>Precio Total</th>         
        <th>Acciones</th>            
      </tr>
    </thead>
  );
}
