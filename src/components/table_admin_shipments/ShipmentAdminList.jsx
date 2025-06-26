import { Icon } from "@iconify/react";
import useAdminShipments from "../../hooks/useAdminShipment";
import ShipmentAdminTableHead from "./ShipmentAdminTableHead";
import ShipmentAdminRow from "./ShipmentAdminRow";
import "../../styles/admin_table/TableUsers.css";

export default function ShipmentAdminList() {
  const {
    shipments,
    userNames,
    loading,
    error,
    page,
    setPage,
    total,
    shipmentsPerPage,
    searchTerm,
    setSearchTerm,
    searchBy,
    setSearchBy,
    fetchShipments
  } = useAdminShipments();

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Lista de Envíos</h2>
        
        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />
            
            <input
              type="text"
              placeholder={`Buscar por ${
                searchBy === 'id' ? 'ID de envío' : 
                searchBy === 'user' ? 'nombre de usuario' : 
                searchBy === 'date' ? 'fecha (dd-mm-yyyy)' : 
                searchBy === 'status' ? 'estado' :
                ''
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="search-bar-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="id">ID Envío</option>
              <option value="user">Usuario</option>
              <option value="date">Fecha</option>
              <option value="status">Estado</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando envíos...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : shipments.length === 0 ? (
        <p>{searchTerm ? "No se encontraron envíos que coincidan con la búsqueda." : "No se encontraron envíos."}</p>
      ) : (
        <>
          <table>
            <ShipmentAdminTableHead />
            <tbody>
              {shipments.map((shipment) => (
                <ShipmentAdminRow
                  key={shipment.id}
                  shipment={shipment}
                  userName={userNames[shipment.id]}
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

            {[...Array(Math.ceil(total / shipmentsPerPage)).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`pagination-button ${page === num + 1 ? "active" : ""}`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={page * shipmentsPerPage >= total}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}