import { useState } from "react";
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/userAuthService';
import "../styles/Header.css";
import ProfileDropdown from './ProfileDropdown';
import { Icon } from '@iconify/react';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';

export default function Header({ setSearchTerm }) {
  const { cartItems, setIsCartOpen } = useCart();

  const handleSearchChange = (e) => {
    if (setSearchTerm) setSearchTerm(e.target.value);
  };

  return (
    <header className="header-main">
      
      {/* Título a la izquierda */}
      <div className="text-header">
        <Link to="/" className="text-guitar">Guitarras</Link>
      </div>

      {/* Buscador al centro */}
      <div className="search-container">
        <div className="search-wrapper">
          <input 
            type="text" 
            className="search__input" 
            placeholder="Busca aquí" 
            onChange={handleSearchChange}
          />
          <Icon icon="material-symbols:search" className="search__icon" />
        </div>
      </div>


      {/* Carrito + Login al lado derecho */}
      <div className='icons-container'>
        <div className="cart-icon-container" onClick={() => setIsCartOpen(true)}>
          <Icon icon="mynaui:cart-solid" width="22" height="22" color="#8699DA" />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </div>

        <div>
          {isAuthenticated() ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="label-login">Iniciar Sesión</Link>
          )}
        </div>
      </div>

      <CartModal />
    </header>
  );
}
