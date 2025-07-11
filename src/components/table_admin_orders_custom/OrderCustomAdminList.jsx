import { useState } from "react";
import useAdminOrderCustom from '../../hooks/useAdminOrderCustom';
import OrderCustomAdminTableHead from "./OrderCustomAdminTableHead";
import OrderCustomAdminRow from "./OrderCustomAdminRow";
import CustomGuitarDetails from "./CustomGuitarDetails";
import Modal from "../Modal";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/admin_table/TableUsers.css";
import UpdateAdminShipmentForm from "../forms/UpdateAdminShipmentForm";
import { Icon } from "@iconify/react";


const OrderCustomAdminList = () => {
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
    searchBy,
    setSearchBy,
    shipmentStatuses,
    userNames,
    fetchOrders,
  } = useAdminOrderCustom();

  const [showDetails, setShowDetails] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Reiniciar a la primera página al buscar
  };

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  const handleOpenShipmentForm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowShipmentForm(true);
  };

  const fixedSearchBy = "id"; // fijo si solo buscarás por ID

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Órdenes Personalizadas</h1>

        <div className="search-bar">
          <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />
          <input
            type="number"
            className="search-bar-input"
            placeholder="Buscar..."
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
          <Icon
            icon="line-md:loading-loop"
            width="40"
            height="40"
            className="loading-icon"
          />
          <p>Cargando órdenes personalizadas...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : orders.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        <>
          <table>
            <OrderCustomAdminTableHead />
            <tbody>
              {orders.map((order) => (
                <OrderCustomAdminRow
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
        <CustomGuitarDetails
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
            setShowDetails(false);
            fetchOrders(page, ordersPerPage, search, fixedSearchBy);
          }}
        />
      </Modal>

      <ToastContainer position="top-center" autoClose={1000} hideProgressBar />
    </div>
  );
};

export default OrderCustomAdminList;
