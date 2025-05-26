// src/components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, userLogout } from '../services/userAuthService';
import { Icon } from '@iconify/react';
import '../styles/ProfileDropdown.css';
import { getUserFirstNameLocal } from '../utils/userUtils';
import { useCart } from '../contexts/CartContext';

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);
  const { clearCart } = useCart(); // Importamos la función para limpiar el carrito

  const toggleDropdown = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
    clearCart(); // Limpiamos el carrito al hacer logout
    userLogout();
    localStorage.clear();
    setIsOpen(false);
    navigate('/');
  };

  if (!isAuthenticated()) {
    return null;
  }

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
  
  useEffect(() => {
    const firstName = getUserFirstNameLocal();
    setUserFirstName(firstName);
  }, []);

  return (
    <div className="user-tab-container" ref={dropdownRef}>
      <div className="user-tab-button">
        <span onClick={toggleDropdown} className="user-tab-text">{userFirstName}</span>
        <Icon onClick={toggleDropdown} className='user-ico' icon="mdi:account-circle" width="28" height="28" />
      </div>
      
      {(isOpen || isClosing) && (
        <div className={`user-tab-modal ${isClosing ? 'fade-out' : 'fade-in'}`}>
          <Link to="/perfil" className="user-tab-item" onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:account" className="user-tab-icon" />
            Mi perfil
          </Link>
          <Link to="/editar-perfil" className="user-tab-item" onClick={() => setIsOpen(false)}>
            <Icon icon="mdi:pencil" className="user-tab-icon" />
            Editar perfil
          </Link>
          <div className="user-tab-item logout" onClick={handleLogout}>
            <Icon icon="mdi:logout" className="user-tab-icon" />
            Cerrar sesión
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;