import { useEffect, useState } from "react";
import { getAdminPaginatedShipments } from "../../services/shipmentAdminService";
import ShipmentAdminTableHead from "./ShipmentAdminTableHead";
import ShipmentAdminRow from "./ShipmentAdminRow";
import "../../styles/admin_table/TableUsers.css";
import { Icon } from "@iconify/react";

const shipmentsPerPage = 10;

export default function ShipmentAdminList() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchShipments = async (page = 1, limit = shipmentsPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedShipments(page, limit);

    if (err) {
      setError(err);
    } else {
      setShipments(data.shipments);
      setTotal(data.total);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchShipments(page, shipmentsPerPage);
  }, [page]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Lista de Envíos</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando pedidos...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : shipments.length === 0 ? (
        <p>No se encontraron envíos.</p>
      ) : (
        <>
          <table>
            <ShipmentAdminTableHead />
            <tbody>
              {shipments.map((shipment) => (
                <ShipmentAdminRow key={shipment.id} shipment={shipment} />
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
