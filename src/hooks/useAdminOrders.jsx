// File: src/hooks/useAdminOrders.jsx
import { useEffect, useState, useMemo } from "react";
import { 
  getAdminPaginatedOrders, 
  getOrderByIdAdmin 
} from "../services/orderAdminService";
import { getShipmentStatusByOrderIdAdmin } from "../services/shipmentAdminService";
import { getUserFullNameById } from "../services/userAdminService";

const ordersPerPage = 10;

export default function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id"); 

  const [shipmentStatuses, setShipmentStatuses] = useState({});
  const [userNames, setUserNames] = useState({});
  const [totalQuantities, setTotalQuantities] = useState({});

  // Función para formatear fecha en formato de búsqueda
  const formatSearchDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}-${month}-${year}`;
  };

  // Calcular cantidades totales
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

  const fetchOrders = async (page = 0, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedOrders(page + 1, limit);

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
    }
    setLoading(false);
  };

  // Filtrar órdenes basado en el término de búsqueda
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;

    const term = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const id = order.id?.toString() || "";
      const userName = userNames[order.id]?.toLowerCase() || "";
      const shipmentStatus = shipmentStatuses[order.id]?.toLowerCase() || "";

      // Búsqueda específica por campo seleccionado
      if (searchBy === "id") return id.includes(term);
      if (searchBy === "user") return userName.includes(term);
      if (searchBy === "shipment") return shipmentStatus.includes(term);
      
      // Búsqueda general si no hay campo específico seleccionado
      const orderDate = formatSearchDate(order.order_date) || "";
      const paymentMethod = order.payment_method?.toLowerCase() || "";
      const status = order.status?.toLowerCase() || "";
      const totalPrice = order.total_price?.toString() || "";
      const totalQuantity = totalQuantities[order.id]?.toString() || "";

      return (
        id.includes(term) ||
        userName.includes(term) ||
        orderDate.includes(term) ||
        paymentMethod.includes(term) ||
        status.includes(term) ||
        shipmentStatus.includes(term) ||
        totalPrice.includes(term) ||
        totalQuantity.includes(term)
      );
    });
  }, [orders, searchTerm, searchBy, userNames, shipmentStatuses, totalQuantities]);

  useEffect(() => {
    fetchOrders(page, ordersPerPage);
  }, [page]);

  return {
    orders: filteredOrders,
    loading,
    error,
    page,
    setPage,
    totalOrders,
    ordersPerPage, 
    searchTerm,
    setSearchTerm,
    searchBy,
    setSearchBy,
    shipmentStatuses,
    userNames,
    fetchOrders,
    fetchShipmentStatuses,
    fetchUserNames
  };
}