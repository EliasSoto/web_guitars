const UserDetail = ({ user, onClose }) => {
  return (
    <div>
      <h2>Detalles del Usuario</h2>
      <div>
        <p><strong>Nombre:</strong> {user.first_name}</p>
        <p><strong>Apellido:</strong> {user.last_name}</p>
        <p><strong>Email:</strong> {user.email || 'No proporcionado'}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
        <p><strong>Fecha de Nacimiento:</strong> {user.birth_date || 'No proporcionada'}</p>
        <p><strong>RUT:</strong> {user.rut}</p>
        <p><strong>Rol:</strong> {user.is_admin ? 'Administrador' : 'Usuario normal'}</p>
      </div>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default UserDetail;