import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, userLogout } from '../services/userAuthService';
import { Icon } from '@iconify/react';
import '../styles/ProfileDropdown.css';


const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const toggleDropdown = () => {
    if (isOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsClosing(false);
      }, 300); // tiempo igual al de la animación CSS de salida
    } else {
      setIsOpen(true);
    }
  };

  const handleLogout = () => {
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
  
  const [userFirstName, setUserFirstName] = useState(null);

   // Obtener el usuario desde localStorage
   useEffect(() => {
    const userData = localStorage.getItem('user_info');
    if (userData) {
      const user = JSON.parse(userData);
      const firstName = user.fullname.split(' ')[0];
      setUserFirstName(firstName); 
    }
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
