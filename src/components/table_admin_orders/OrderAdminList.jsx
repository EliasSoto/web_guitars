// File: src/components/table_admin_orders/OrderAdminList.jsx
import { useState } from "react";
import useAdminOrders from "../../hooks/useAdminOrders";
import OrderAdminTableHead from "./OrderAdminTableHead";
import OrderAdminRow from "./OrderAdminRow";
import ProductOrdersList from "../table_product_orders/ProductOrdersList";
import Modal from "../Modal";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/admin_table/TableUsers.css";
import UpdateAdminShipmentForm from "../forms/UpdateAdminShipmentForm";
import { Icon } from "@iconify/react";

const OrderAdminList = () => {
  const {
    orders,
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
    fetchOrders
  } = useAdminOrders();

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showShipmentForm, setShowShipmentForm] = useState(false);

  const handleViewDetails = async (orderId) => {
    setSelectedOrderId(orderId);
    setShowDetails(true);
  };

  const handleOpenShipmentForm = (orderId) => {
    setSelectedOrderId(orderId);
    setShowShipmentForm(true);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Órdenes</h1>
        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />
            
            <input
              type="text"
              placeholder={`Buscar órdenes por ${
                searchBy === 'id' ? 'ID' : 
                searchBy === 'user' ? 'usuario' : 
                searchBy === 'shipment' ? 'estado de envío' : 
                'cualquier campo'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="search-bar-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="id">ID Pedido</option>
              <option value="user">Usuario</option>
              <option value="shipment">Estado Envío</option>
            </select>
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
        <p>{searchTerm ? "No se encontraron órdenes que coincidan con la búsqueda." : "No se encontraron órdenes."}</p>
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

export default OrderAdminList;