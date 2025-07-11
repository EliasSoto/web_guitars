import { useState } from "react";
import useUserOrderCustom from "../../hooks/useUserOrderCustom";
import OrderCustomTableHead from "./OrderCustomTableHead";
import OrderCustomRow from "./OrderCustomRow";
import CustomGuitarDetailsUser from "./CustomGuitarDetails";
import Modal from "../Modal";
import { Icon } from "@iconify/react";
import "../../styles/admin_table/TableUsers.css";

export default function OrderCustomUserList() {
  const {
    orders,
    loading,
    error,
    page,
    setPage,
    totalOrders,
    ordersPerPage,
    search,
    setSearch,
  } = useUserOrderCustom();

  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Tus pedidos personalizados</h1>
        <div className="search-bar">
          <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />
          <input
            type="number"
            className="search-bar-input"
            placeholder="Buscar por ID..."
            value={search}
            onChange={handleSearchChange}
            style={{ flexGrow: 1, padding: "0.5rem" }}
          />
          <div
            style={{
              padding: "0.5rem",
              backgroundColor: "transparent",
              userSelect: "none",
              minWidth: "30px",
              textAlign: "center",
            }}
          >
            ID
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando órdenes...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No se encontraron pedidos personalizados.</p>
      ) : (
        <>
          <table>
            <OrderCustomTableHead />
            <tbody>
              {orders.map((order) => (
                <OrderCustomRow
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
        <CustomGuitarDetailsUser orderId={selectedOrderId} />
      </Modal>
    </div>
  );
}
