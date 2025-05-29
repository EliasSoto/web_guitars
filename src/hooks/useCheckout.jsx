import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function useCheckout() {
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPurchase = () => {
    if (!address || !paymentMethod) {
      alert('Por favor, completa todos los campos antes de continuar.');
      return;
    }

    // Aquí va la lógica para enviar los datos al backend
    console.log('Compra confirmada', { cartItems, address, paymentMethod });
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return {
    cartItems,
    cartTotal,
    address,
    setAddress,
    paymentMethod,
    handlePaymentChange,
    handleConfirmPurchase,
    handleRemoveItem,
  };
}
