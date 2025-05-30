import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUserAddress } from './useUserAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function useCheckout() {
  const { cartItems, cartTotal, removeFromCart } = useCart();

  const { activeAddress, loading } = useUserAddress();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  useEffect(() => {
    if (activeAddress) {
      setAddress(activeAddress.street_name);
    }
  }, [activeAddress]);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirmPurchase = () => {
    if (!address) {
      toast.error('Debe ingresar una dirección de envío.');
      return;
    }
    if (!paymentMethod) {
      toast.error('Por favor, seleccione un método de pago.');
      return;
    }
    toast.success('Compra confirmada exitosamente!');
    
    console.log('Compra confirmada', { cartItems, paymentMethod });
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  return {
    cartItems,
    cartTotal,
    address,
    loading,
    paymentMethod,
    handlePaymentChange,
    handleConfirmPurchase,
    handleRemoveItem,
  };
}
