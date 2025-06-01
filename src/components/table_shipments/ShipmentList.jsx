import { useEffect } from "react";
import ShipmentRow from "./ShipmentRow";
import ShipmentTableHead from "./ShipmentTableHead";
import "../../styles/admin_table/TableUsers.css";
import { useUserShipment } from "../../hooks/useUserShipment";
import { getUserShipmentsPaginated } from "../../services/useShipmentService";
import { Icon } from "@iconify/react";

const shipmentsPerPage = 10;

export default function ShipmentList({ userName }) {
  const {
    shipments,
    setShipments,
    total,
    setTotal,
    loading,
    page,
    setPage,
    setLoading,
    setError,
  } = useUserShipment();

  const fetchShipments = async (page = 1, limit = shipmentsPerPage) => {
    setLoading(true);
    const [data, err] = await getUserShipmentsPaginated(page, limit);

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
        <h2>Envíos de {userName}</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando envíos...</p>
        </div>
      ) : shipments.length === 0 ? (
        <p>No se encontraron envíos.</p>
      ) : (
        <>
          <table>
            <ShipmentTableHead />
            <tbody>
              {shipments.map((shipment) => (
                <ShipmentRow key={shipment.id} shipment={shipment} />
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
                className={`pagination-button ${
                  page === num + 1 ? "active" : ""
                }`}
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
