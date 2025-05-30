


import { useEffect, useState } from "react";
import { getAdminPaginatedOrders, getOrderByIdAdmin } from "../../services/orderAdminService";
import OrderAdminTableHead from "./OrderAdminTableHead";
import OrderAdminRow from "./OrderAdminRow";
import ProductOrdersList from "../table_product_orders/ProductOrdersList";
import Modal from "../Modal";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/admin_table/TableUsers.css";
import AdminShipmentCreateForm from "../forms/AdminShipmentCreateForm";

const ordersPerPage = 10;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [showShipmentForm, setShowShipmentForm] = useState(false);

  const handleOpenShipmentForm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowShipmentForm(true);
  };


  const fetchOrders = async (page = 0, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedOrders(page + 1, limit);

    if (err) {
      setError(err);
    } else {
      setOrders(data.orders);
      setTotalOrders(data.total);
      sessionStorage.setItem("cachedOrders", JSON.stringify(data));
      sessionStorage.setItem("cachedOrderPage", page);
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
    const cachedData = sessionStorage.getItem("cachedOrders");
    const cachedPage = sessionStorage.getItem("cachedOrderPage");

    if (cachedData && Number(cachedPage) === page) {
      const parsed = JSON.parse(cachedData);
      setOrders(parsed.orders);
      setTotalOrders(parsed.total);
      setLoading(false);
    } else {
      fetchOrders(page, ordersPerPage);
    }
  }, [page]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Pedidos</h1>
      </div>

      <table>
        <OrderAdminTableHead />
        <tbody>
          {orders.map((order) => (
            <OrderAdminRow key={order.id} order={order} onViewDetails={handleViewDetails} />
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

      <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
  <ProductOrdersList
    orderId={selectedOrderId}
    onSendOrder={handleOpenShipmentForm} // 👈 aquí está el fix
  />
</Modal>


      <Modal isOpen={showShipmentForm} onClose={() => setShowShipmentForm(false)}>
        <AdminShipmentCreateForm
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
