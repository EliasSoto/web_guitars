import { useCart } from '../contexts/CartContext';
import '../styles/CartModal.css';
import { useNavigate } from 'react-router-dom';

const CartModal = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    isCartOpen,
    setIsCartOpen
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Tu Carrito ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</h3>
          <button 
            className="close-button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>
        
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="empty-cart-message">
              <p>Tu carrito está vacío</p>
              
            </div>
          ) : (
            cartItems.map(item => (
              <div key={`${item.id}-${item.addedAt || 0}`} className="cart-item">
                <div className="cart-item-image-container">
                  <img 
                    src={item.image_link || 'https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png'} 
                    alt={`${item.brand} ${item.model}`} 
                    className="cart-item-image"
                    onError={(e) => {
                      e.target.src = 'https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png';
                      e.target.onerror = null; 
                    }}
                  />
                </div>
                <div className="cart-item-details">
                  <h4>{item.brand} {item.model}</h4>
                  {item.liquidation_price && item.liquidation_price < item.sale_price ? (
                    <div className="price-container">
                      <p className="original-price">${item.sale_price.toLocaleString('es-CL')}</p>
                      <p className="liquidation-price">${item.liquidation_price.toLocaleString('es-CL')}</p>
                    </div>
                  ) : (
                    <p className="final-price">${item.sale_price.toLocaleString('es-CL')}</p>
                  )}
                  <div className="quantity-controls">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Reducir cantidad"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Aumentar cantidad"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Eliminar del carrito"
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <div className="cart-total">
                <span>Subtotal:</span>
                <span>${cartTotal.toLocaleString('es-CL')}</span>
              </div>
              <div className="cart-shipping">
              </div>
              <div className="cart-grand-total">
              </div>
            </div>
            <button 
              className="confirm-button"
              onClick={() => {
                setIsCartOpen(false);
                navigate('/checkout');
              }}
            >
              Proceder al pago
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;