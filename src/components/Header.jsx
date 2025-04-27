import { Icon } from '@iconify/react';
import "../styles/Header.css"; // Asegúrate de tener este archivo CSS
import { Link } from 'react-router-dom'; // Para navegación interna

export default function Header() {
  return (
    <header className="header-login">
      <div className="text-header">
        Guitarras
      </div>

      {/* NUEVO: Input de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
        />
      </div>

      {/* Apartado de Login y Registro */}
      <div className="auth-links">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/register" className="auth-button">Registro</Link>
      </div>

    </header>
  );
}
