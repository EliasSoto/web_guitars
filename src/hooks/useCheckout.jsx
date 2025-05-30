import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUserAddress } from './useUserAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrderUser } from '../services/userOrderService';
import { useNavigate } from 'react-router-dom';

export default function useCheckout() {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
  const { activeAddress, loading } = useUserAddress();
  const navigate = useNavigate();

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

  const handleConfirmPurchase = async () => {
    if (!address) {
      toast.error('Debe ingresar una dirección de envío.');
      return;
    }
    if (!paymentMethod) {
      toast.error('Por favor, seleccione un método de pago.');
      return;
    }
    
  const items = cartItems.map(item => ({
    guitar_id: item.id,
    quantity: item.quantity
  }));

  const orderData = {
    status: "procesado",
    payment_method: paymentMethod,
    items
  };

  const [data, error] = await createOrderUser(orderData);

  if (error) {
    toast.error(`Error al crear el pedido: ${error}`);
    return;
  }

  toast.success('Compra realizada exitosamente!');
  clearCart();
  setTimeout(() => {
    navigate('/profile/orders');
  }, 2000);
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
