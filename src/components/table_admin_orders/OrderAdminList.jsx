import { useEffect, useState } from "react";
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

  const [shipmentStatuses, setShipmentStatuses] = useState({});
  const [userNames, setUserNames] = useState({});

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);

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
    } else {
      setOrders(data.orders);
      setTotalOrders(data.total);
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
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando órdenes...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        <>
          <table>
            <OrderAdminTableHead />
            <tbody>
              {orders.map((order) => (
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
