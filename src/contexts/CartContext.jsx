import React, { createContext, useState, useContext, useEffect } from 'react';
import { isAuthenticated } from '../services/userAuthService';
import { toast } from 'react-toastify';

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
      console.error('Fallo al cargar el carrito:', error);
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

    setCartItems(prevItems => {
      const itemToUpdate = prevItems.find(item => item.id === id);
      if (!itemToUpdate) return prevItems;

      if (quantity > itemToUpdate.stock) {
        // No actualizamos cantidad porque excede stock
        return prevItems;
      }

      return prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  // Función para limpiar el carrito
  const clearCart = () => {
    setCartItems([]);
  };

  // Función para calcular el total
  const cartTotal = cartItems.reduce(
    (total, item) => {
      const price = item.liquidation_price && item.liquidation_price < item.sale_price
        ? item.liquidation_price
        : item.sale_price;
      return total + price * item.quantity;
    },
    0
  );

  // Efecto para guardar cambios en el carrito
  useEffect(() => {
    try {
      sessionStorage.setItem(getCartKey(), JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  }, [cartItems]);

  // Efecto para manejar cambios de autenticación
  useEffect(() => {
    const handleAuthChange = () => {
      try {
        const newCart = sessionStorage.getItem(getCartKey());
        setCartItems(newCart ? JSON.parse(newCart) : []);
      } catch (error) {
        console.error('Error al manejar los cambios de autenticación:', error);
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
        // Si el item ya existe, se verifica si la cantidad supera el stock
        if (existingItem.quantity >= guitar.stock) {
          return prevItems;
        }

        // Se actualiza la cantidad del item existente
        return prevItems.map(item =>
          item.id === guitar.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Se agrega un nuevo item al carrito
      return [...prevItems, { ...guitar, quantity: 1 }];
    });

    const existingItem = cartItems.find(item => item.id === guitar.id);

    if (existingItem) {
      if (existingItem.quantity >= guitar.stock) {
        toast.error("No puedes agregar más unidades, no hay suficiente stock.");
      } else {
        toast.success("Cantidad actualizada en el carrito.");
      }
    } else {
      if (guitar.stock < 1) {
        toast.error("Este producto no tiene stock disponible.");
      } else {
        toast.success("Producto agregado al carrito.");
      }
    }
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