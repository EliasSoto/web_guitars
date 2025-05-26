import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/userAuthService';
import "../styles/Header.css";
import ProfileDropdown from './ProfileDropdown';
import { Icon } from '@iconify/react';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';

export default function Header() {
    const { cartItems, setIsCartOpen } = useCart();
  return (
    <header className="header-main">
      
      <div className="text-header">
        <label className='text-guitar'>Guitarras</label>
      </div>

      <div class="search-container">
        <input type="text" class="search__input" placeholder="Busca aquí" />
          <button class="search__button">
              <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                  <g>
                      <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                  </g>
              </svg>
          </button>
        </div>

      <div className='icons-container'>
          
          <Icon icon="fa-solid:home" width="22" height="22" color="#808080" />

              <div className="cart-icon-container" onClick={() => setIsCartOpen(true)}>
                <Icon icon="mynaui:cart-solid" width="22" height="22" color="#000000" />
                {cartItems.length > 0 && (
                  <span className="cart-badge">{cartItems.length}</span>
                )}
              </div>

          <Icon icon="tabler:bell-filled" width="22" height="22" color="#808080" />
          
          {/* <Icon icon="qlementine-icons:user-16" width="22" height="22" color="#808080" /> */}
          
      </div>

      <div className='direccion-container'>
        <label className='label-direction'>Mi dirección</label>
      </div>

      <div className='carrito-ingresa-container'>

        <div>
          {isAuthenticated() ? (
            <ProfileDropdown />
          ) : (
            <Link to="/login" className="label-login">Login</Link>
          )}
        </div>
        
      </div>

      
      <CartModal />
    </header>
  );
}
