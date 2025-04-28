import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { getCurrentUser } from '../services/userNormalService';
import '../styles/UserProfilePage.css';

const UserProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const [data, err] = await getCurrentUser();
      if (data) {
        setUser(data);
      } else {
        setError(err);
      }
    };

    fetchUser();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="profile-main">
      <div className="profile-header">
        <Link to="/" className="link-atras">
          <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
        </Link>
        <h1 className="profile-title">Perfil del Usuario</h1>
      </div>
  
      <div className="profile-info">
        <p className="profile-field"><strong>Nombre:</strong> {user.first_name}</p>
        <p className="profile-field"><strong>Apellido:</strong> {user.last_name}</p>
        <p className="profile-field"><strong>Email:</strong> {user.email || 'No proporcionado'}</p>
        <p className="profile-field"><strong>Teléfono:</strong> {user.phone}</p>
        <p className="profile-field"><strong>Fecha de Nacimiento:</strong> {user.birth_date || 'No proporcionada'}</p>
        <p className="profile-field"><strong>RUT:</strong> {user.rut}</p>
        <p className="profile-field"><strong>Rol:</strong> {user.is_admin ? 'Administrador' : 'Usuario normal'}</p>
      </div>
    </div>
  );
}

export default UserProfilePage;
