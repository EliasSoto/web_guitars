import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useUserAddress } from './useUserAddress';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createOrderUser } from '../services/userOrderService';
import { useNavigate } from 'react-router-dom';
import { createUserShipment } from '../services/useShipmentService';

export default function useCheckout() {
  const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
  const { activeAddress, loading } = useUserAddress();
  const [isProcessing, setIsProcessing] = useState(false);
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
  if (cartItems.length === 0) {
    toast.error('El carrito está vacío. Agrega productos antes de continuar.');
    return;
  }

  if (!address) {
    toast.error('Debe ingresar una dirección de envío.');
    return;
  }

  if (!paymentMethod || paymentMethod.trim() === '') {
    toast.error('Por favor, seleccione un método de pago.');
    return;
  }

  setIsProcessing(true);

  try {
    const items = cartItems.map(item => ({
      guitar_id: item.id,
      quantity: item.quantity
    }));

    const orderData = {
      status: "pagado",
      payment_method: paymentMethod,
      items
    };

    const [data, error] = await createOrderUser(orderData);

    if (error) {
      toast.error(`Error al crear el pedido: ${error}`);
      return;
    }

    const orderIds = Array.isArray(data) ? data.map(order => order.id) : [data.id];

    const [shipmentData, shipmentError] = await createUserShipment({ order_ids: orderIds });

    if (shipmentError) {
      toast.error(`Error al crear el envío: ${shipmentError}`);
      return;
    }

    toast.success('Compra y envío realizados exitosamente!');
    clearCart();
    setTimeout(() => {
      navigate('/profile/orders');
    }, 1000);
  } finally {
    setIsProcessing(false);
  }
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
    isProcessing
  };
}
