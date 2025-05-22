
export default function GuitarList() {
  return (
    <div className="guitar-list">
      <h1>Lista de Guitarras</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Año</th>
            <th>Color</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí iría el mapeo de las guitarras */}
        </tbody>
      </table>
    </div>
  );
}