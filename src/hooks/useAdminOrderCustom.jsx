
import { useEffect, useState } from "react";
import { getAdminPaginatedOrderCustom } from "../services/orderAdminService"; // ajusta si el path es otro
import { getShipmentStatusByOrderIdAdmin } from "../services/shipmentAdminService";
import { getUserFullNameById } from "../services/userAdminService";

const ordersPerPage = 10;

export default function useAdminOrderCustom() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  const [shipmentStatuses, setShipmentStatuses] = useState({});
  const [userNames, setUserNames] = useState({});
  const [totalQuantities, setTotalQuantities] = useState({});

  const calculateTotalQuantities = (ordersList) => {
    const quantities = {};
    ordersList.forEach(order => {
      quantities[order.id] = order.order_details?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    });
    setTotalQuantities(quantities);
  };

  const fetchShipmentStatuses = async (ordersList) => {
    const statuses = {};
    await Promise.all(
      ordersList.map(async (order) => {
        const [data, err] = await getShipmentStatusByOrderIdAdmin(order.id);
        statuses[order.id] = (!err && data?.tracking_status) ? data.tracking_status : "No disponible";
      })
    );
    setShipmentStatuses(statuses);
  };

  const fetchUserNames = async (ordersList) => {
    const names = {};
    await Promise.all(
      ordersList.map(async (order) => {
        const [name, error] = await getUserFullNameById(order.user_id);
        names[order.id] = !error ? name : "Usuario no encontrado";
      })
    );
    setUserNames(names);
  };

  const fetchOrders = async (page = 0, limit = ordersPerPage, searchTerm = "", searchField = "id") => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedOrderCustom(page + 1, limit, searchTerm, searchField);

    if (err) {
      setError(err);
      setOrders([]);
      setShipmentStatuses({});
      setUserNames({});
      setTotalQuantities({});
    } else {
      setOrders(data.orders);
      setTotalOrders(data.total);
      calculateTotalQuantities(data.orders);
      await Promise.all([
        fetchShipmentStatuses(data.orders),
        fetchUserNames(data.orders)
      ]);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders(page, ordersPerPage, search, searchBy);
  }, [page, search, searchBy]);

  return {
    orders,
    loading,
    error,
    page,
    setPage,
    totalOrders,
    ordersPerPage,
    search,
    setSearch,
    searchBy,
    setSearchBy,
    shipmentStatuses,
    userNames,
    fetchOrders,
    fetchShipmentStatuses,
    fetchUserNames,
    totalQuantities,
  };
}
