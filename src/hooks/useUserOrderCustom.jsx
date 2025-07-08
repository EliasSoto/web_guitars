import { useEffect, useState } from "react";
import { getUserOrdersPaginated } from "../services/userOrderService";

const ordersPerPage = 10;

export default function useUserOrderCustom() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState({});

  const calculateTotalQuantities = (ordersList) => {
    const quantities = {};
    ordersList.forEach(order => {
      quantities[order.id] = order.order_details?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    });
    setTotalQuantities(quantities);
  };

  const fetchOrders = async (page = 0, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getUserOrdersPaginated(page + 1, limit, true);

    if (err) {
      setError(err);
      setOrders([]);
      setTotalQuantities({});
    } else {
      setOrders(data.orders);
      setTotalOrders(data.total);
      calculateTotalQuantities(data.orders);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(page, ordersPerPage);
  }, [page]);

  return {
    orders,
    loading,
    error,
    page,
    setPage,
    totalOrders,
    ordersPerPage,
    fetchOrders,
    totalQuantities,
  };
}
