import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, userLogout } from '../services/userAuthService';

const DropdownButton = () => {
  // Estado para controlar la apertura y cierre del menú desplegable y navegación
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Función para manejar el cambio de estado del menú desplegable
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    userLogout();
    localStorage.clear();
    setIsOpen(false);
    navigate('/');
  }

  // Verificar si el usuario está autenticado y no mostrar el menú si no lo está
  if (!isAuthenticated()) {
    return null;
  }

  // Cierra el dropdown si se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container" ref={dropdownRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        Menú
        <span className={`dropdown-arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      
      {isOpen && (
        <ul className="dropdown-menu">
          <li className="dropdown-item">
            <Link to="/perfil" className="dropdown-link" onClick={() => setIsOpen(false)}>
              Mi Perfil
            </Link>
          </li>
          <li className="dropdown-item">
            <Link to="/editar-perfil" className="dropdown-link" onClick={() => setIsOpen(false)}>
              Editar Perfil
            </Link>
          </li>
          <li className="dropdown-item" onClick={handleLogout}>
            Cerrar Sesión
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownButton;