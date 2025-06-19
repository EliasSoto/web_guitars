import { useEffect, useState, useMemo } from "react";
import { getAdminPaginatedShipments } from "../../services/shipmentAdminService";
import ShipmentAdminTableHead from "./ShipmentAdminTableHead";
import ShipmentAdminRow from "./ShipmentAdminRow";
import "../../styles/admin_table/TableUsers.css";
import { Icon } from "@iconify/react";
import { getUserFullNameById } from "../../services/userAdminService";

const shipmentsPerPage = 10;

export default function ShipmentAdminList() {
  const [shipments, setShipments] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // Función para formatear fechas en formato de búsqueda
  const formatSearchDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}-${month}-${year}`;
  };

  // Filtrar envíos basado en el término de búsqueda
  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;

    const term = searchTerm.toLowerCase();
    return shipments.filter((shipment) => {
      const id = shipment.id?.toString() || "";
      const userName = userNames[shipment.id]?.toLowerCase() || "";
      const shipmentDate = formatSearchDate(shipment.shipment_date) || "";
      const deliveryDate = formatSearchDate(shipment.delivery_date) || "";
      const trackingStatus = shipment.tracking_status?.toLowerCase() || "";
      const price = shipment.price?.toString() || "";
      const shippingProvider = shipment.shipping_provider?.toLowerCase() || "";
      const isImmediate = shipment.is_immediate_delivery === true ? "si" : 
                         shipment.is_immediate_delivery === false ? "no" : "";

      return (
        id.includes(term) ||
        userName.includes(term) ||
        shipmentDate.includes(term) ||
        deliveryDate.includes(term) ||
        trackingStatus.includes(term) ||
        price.includes(term) ||
        shippingProvider.includes(term) ||
        isImmediate.includes(term)
      );
    });
  }, [shipments, searchTerm, userNames]);

  const fetchUserNames = async (shipmentsList) => {
    const names = {};
    await Promise.all(
      shipmentsList.map(async (shipment) => {
        const userId = shipment.user_id;
        const [name, error] = await getUserFullNameById(userId);
        names[shipment.id] = !error ? name : "Usuario no encontrado";
      })
    );
    setUserNames(names);
  };

  const fetchShipments = async (page = 1, limit = shipmentsPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedShipments(page, limit);

    if (err) {
      setError(err);
      setShipments([]);
      setUserNames({});
    } else {
      setShipments(data.shipments);
      setTotal(data.total);
      await fetchUserNames(data.shipments);
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
        <div className="search-bar">
          <Icon icon="ic:outline-search" width="24" height="24" />
          <input
            type="text"
            placeholder="Buscar envíos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando envíos...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : filteredShipments.length === 0 ? (
        <p>{searchTerm ? "No se encontraron envíos que coincidan con la búsqueda." : "No se encontraron envíos."}</p>
      ) : (
        <>
          <table>
            <ShipmentAdminTableHead />
            <tbody>
              {filteredShipments.map((shipment) => (
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