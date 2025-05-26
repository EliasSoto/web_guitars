// src/contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated } from '../services/userAuthService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Función para obtener la clave del carrito
  const getCartKey = () => {
    const user = isAuthenticated();
    return user ? `cart_user_${user.id}` : 'cart_guest';
  };

  // Estado inicial del carrito
  const [cartItems, setCartItems] = useState(() => {
    try {
      const cartData = sessionStorage.getItem(getCartKey());
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error('Error loading initial cart:', error);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Función para eliminar un item del carrito
  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Función para actualizar la cantidad de un item
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Función para calcular el total
  const cartTotal = cartItems.reduce(
    (total, item) => total + (item.sale_price * item.quantity),
    0
  );

  // Efecto para guardar cambios en el carrito
  useEffect(() => {
    try {
      sessionStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
    }
  }, [cartItems]);

  // Efecto para manejar cambios de autenticación
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const newCart = sessionStorage.getItem(getCartKey());
        setCartItems(newCart ? JSON.parse(newCart) : []);
      } catch (error) {
        console.error('Error handling auth change:', error);
      }
    };

    const storageListener = (e) => {
      if (e.key === 'access_token' || e.key === 'user_info') {
        handleAuthChange();
      }
    };

    window.addEventListener('storage', storageListener);
    return () => window.removeEventListener('storage', storageListener);
  }, []);

  // Función para agregar al carrito
  const addToCart = (guitar) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === guitar.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === guitar.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...guitar, quantity: 1 }];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};