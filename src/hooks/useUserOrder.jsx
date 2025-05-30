import { useEffect, useState } from "react";
import {
  createOrderUser,
  getUserOrdersPaginated,
} from "../services/userOrderService";

export const useUserOrder = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchOrders = async (newPage = page, newLimit = limit) => {
    setLoading(true);
    const [data, err] = await getUserOrdersPaginated(newPage, newLimit);
    if (err) {
      setError(err);
    } else {
      setOrders(data.orders);
      setTotal(data.total);
    }
    setLoading(false);
  };

  const handleCreate = async (newOrder) => {
    const [createdOrder, err] = await createOrderUser(newOrder);
    if (!err) {
      fetchOrders();
    } else {
      setError(err);
    }
  };

  return {
    orders,
    setOrders,
    setTotal,
    total,
    loading,
    error,
    page,
    limit,
    setPage,
    setLimit,
    fetchOrders,
    handleCreate,
    setLoading,
    setError,
  };
};
