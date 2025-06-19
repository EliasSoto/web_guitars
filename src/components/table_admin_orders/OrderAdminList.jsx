import { useEffect, useState, useMemo } from "react";
import { getAdminPaginatedOrders, getOrderByIdAdmin } from "../../services/orderAdminService";
import OrderAdminTableHead from "./OrderAdminTableHead";
import OrderAdminRow from "./OrderAdminRow";
import ProductOrdersList from "../table_product_orders/ProductOrdersList";
import Modal from "../Modal";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/admin_table/TableUsers.css";
import UpdateAdminShipmentForm from "../forms/UpdateAdminShipmentForm";
import { Icon } from "@iconify/react";
import { getShipmentStatusByOrderIdAdmin } from "../../services/shipmentAdminService";
import { getUserFullNameById } from "../../services/userAdminService";

const ordersPerPage = 10;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const [shipmentStatuses, setShipmentStatuses] = useState({});
  const [userNames, setUserNames] = useState({});
  const [totalQuantities, setTotalQuantities] = useState({});

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);

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

  // Filtrar órdenes basado en el término de búsqueda
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;

    const term = searchTerm.toLowerCase();
    return orders.filter((order) => {
      const id = order.id?.toString() || "";
      const userName = userNames[order.id]?.toLowerCase() || "";
      const orderDate = formatSearchDate(order.order_date) || "";
      const paymentMethod = order.payment_method?.toLowerCase() || "";
      const status = order.status?.toLowerCase() || "";
      const shipmentStatus = shipmentStatuses[order.id]?.toLowerCase() || "";
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
  }, [orders, searchTerm, userNames, shipmentStatuses, totalQuantities]);

  const handleOpenShipmentForm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowShipmentForm(true);
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

  const handleViewDetails = async (orderId) => {
    const [data, err] = await getOrderByIdAdmin(orderId);
    if (err || !data) {
      toast.error("No se pudo obtener detalles del pedido.");
      return;
    }
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  useEffect(() => {
    fetchOrders(page, ordersPerPage);
  }, [page]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Órdenes</h1>
        <div className="search-bar">
          <Icon icon="ic:outline-search" width="24" height="24" />
          <input
            type="text"
            placeholder="Buscar órdenes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando órdenes...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : filteredOrders.length === 0 ? (
        <p>{searchTerm ? "No se encontraron órdenes que coincidan con la búsqueda." : "No se encontraron órdenes."}</p>
      ) : (
        <>
          <table>
            <OrderAdminTableHead />
            <tbody>
              {filteredOrders.map((order) => (
                <OrderAdminRow
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                  shipmentStatus={shipmentStatuses[order.id]}
                  userName={userNames[order.id]}
                />
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            {[...Array(Math.ceil(totalOrders / ordersPerPage)).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`pagination-button ${page === num ? "active" : ""}`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={(page + 1) * ordersPerPage >= totalOrders}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
        <ProductOrdersList
          orderId={selectedOrderId}
          onSendOrder={handleOpenShipmentForm}
          isAdmin={true}
        />
      </Modal>

      <Modal isOpen={showShipmentForm} onClose={() => setShowShipmentForm(false)}>
        <UpdateAdminShipmentForm
          orderId={selectedOrderId}
          onClose={() => {
            setShowShipmentForm(false);
            fetchOrders(page, ordersPerPage);
          }}
        />
      </Modal>

      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
    </div>
  );
};

export default OrderList;