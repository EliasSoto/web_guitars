import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Footer from "../components/Footer.jsx";
import HeaderLogin from "../components/HeaderLogin.jsx";
import useCheckout from '../hooks/useCheckout';
import { useUserAddress } from '../hooks/useUserAddress';
import '../styles/CheckoutPage.css';
import { ToastContainer } from 'react-toastify';


const CheckoutPage = () => {
  const {
    cartItems,
    cartTotal,
    paymentMethod,
    address,
    loading,
    handlePaymentChange,
    handleConfirmPurchase,
    handleRemoveItem
  } = useCheckout();

  return (
    <div className="checkout-page">
      <HeaderLogin />
      <div className="checkout-container">
        
        {/* Columna izquierda - Detalle del carrito */}
        <div className="checkout-left">
          <h2>Revisión del Pedido</h2>
    
          <div className="checkout-section">
            <h3>Productos</h3>
    
            {cartItems.length === 0 ? (
              <p>Tu carrito está vacío.</p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <img 
                    src={item.image_link} 
                    alt={item.model}
                    onError={(e) => {
                      e.target.src = 'https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png';
                    }}
                  />
                  <div>
                    <p>{item.brand} {item.model}</p>
                    <p>Cantidad: {item.quantity}</p>
                  
                    <div className="price-container">
                      {item.liquidation_price ? (
                        <>
                          <p className="original-price">
                            ${item.sale_price.toLocaleString('es-CL')}
                          </p>
                          <p className="liquidation-price">
                            ${item.liquidation_price.toLocaleString('es-CL')}
                          </p>
                        </>
                      ) : (
                        <p className="final-price">
                          ${item.sale_price.toLocaleString('es-CL')}
                        </p>
                      )}
                    </div>
                    <button
                      className="remove-item-button"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
          
        {/* Columna derecha - Dirección, pago y resumen */}
        <div className="checkout-right">
          
          <div className="checkout-section">
            <h3>Dirección de envío</h3>
            {loading ? (
              <p>Cargando dirección...</p>
            ) : address ? (
              <p className="address-shown">{address}</p>
            ) : (
              <p>
                No tienes una dirección activa. 
                <Link 
                  to="/profile/address" 
                  style={{ color: 'blue', textDecoration: 'underline', marginLeft: '5px' }}
                >
                  Agregar dirección
                </Link>
              </p>
            )}
          </div>
          
          <div className="checkout-section">
            <h3>Método de pago</h3>
            <select value={paymentMethod} onChange={handlePaymentChange}>
              <option value="" disabled hidden>
                Selecciona un método
              </option>
              <option value="tarjeta">Tarjeta de crédito/débito</option>
              <option value="transferencia">Transferencia bancaria</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          
          <div className="checkout-section price-summary">
            <h3>Resumen</h3>
          
            <div className="price-line">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString('es-CL')}</span>
            </div>
          
            <div className="price-line">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
          
            <div className="price-line total">
              <span>Total</span>
              <span>${(cartTotal).toLocaleString('es-CL')}</span>
            </div>
          
            <button 
              className="confirm-button" 
              onClick={handleConfirmPurchase}
            >
              Confirmar Compra
            </button>
          </div>
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
