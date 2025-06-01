import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import OrderTableHead from "./OrderTableHead";
import "../../styles/admin_table/TableUsers.css";
import { useUserOrder } from "../../hooks/useUserOrder";
import { getUserOrdersPaginated } from "../../services/userOrderService";
import { getUserOrderById } from "../../services/userOrderService";
import { toast } from "react-toastify";

import Modal from "../Modal";
import ProductOrdersList from "../table_product_orders/ProductOrdersList";
import { Icon } from "@iconify/react";

const ordersPerPage = 10;

export default function OrderList() {
  const {
    orders,
    setOrders,
    total,
    setTotal,
    loading,
    page,
    setPage,
    setLoading,
    setError,
  } = useUserOrder();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const fetchOrders = async (page = 1, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getUserOrdersPaginated(page, limit);

    if (err) {
      setError(err);
    } else {
      setOrders(data.orders);
      setTotal(data.total);
    }
    setLoading(false);
  };

  const handleViewDetails = async (orderId) => {
    const [data, err] = await getUserOrderById(orderId);
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
        <h2>Tus Pedidos</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon"/>
          <p>Cargando pedidos...</p>
        </div>
      ) : orders.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        <>
          <table>
            <OrderTableHead />
            <tbody>
              {orders.map((order) => (
                <OrderRow
                  key={order.id}
                  order={order}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            {[...Array(Math.ceil(total / ordersPerPage)).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`pagination-button ${
                  page === num + 1 ? "active" : ""
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={page * ordersPerPage >= total}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>

          {/* Modal para mostrar detalles del pedido */}
          <Modal isOpen={showDetails} onClose={() => setShowDetails(false)}>
            <ProductOrdersList orderId={selectedOrderId} isAdmin={false} />
          </Modal>
        </>
      )}
    </div>
  );
}
