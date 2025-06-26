import { useEffect, useState, useMemo } from "react";
import { 
  getAdminPaginatedShipments,
  getShipmentStatusByOrderIdAdmin
} from "../services/shipmentAdminService";
import { getUserFullNameById } from "../services/userAdminService";

const shipmentsPerPage = 10;

export default function useAdminShipments() {
  const [shipments, setShipments] = useState([]);
  const [userNames, setUserNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("id"); 

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

  const formatSearchDate = (dateString) => {
    if (!dateString) return "";
    const [datePart] = dateString.split("T");
    const [year, month, day] = datePart.split("-");
    return `${day}-${month}-${year}`;
  };

  const filteredShipments = useMemo(() => {
    if (!searchTerm) return shipments;

    const term = searchTerm.toLowerCase();
    return shipments.filter((shipment) => {
      const id = shipment.id?.toString() || "";
      const userName = userNames[shipment.id]?.toLowerCase() || "";
      const shippingDate = formatSearchDate(shipment.shipping_date) || "";
      const status = shipment.tracking_status?.toLowerCase() || "";
      const orderId = shipment.order_id?.toString() || "";

      switch(searchBy) {
        case "id": return id.includes(term);
        case "user": return userName.includes(term);
        case "date": return shippingDate.includes(term);
        case "status": return status.includes(term);
        case "order": return orderId.includes(term);
        default: return false;
      }
    });
  }, [shipments, searchTerm, searchBy, userNames]);

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

  return {
    shipments: filteredShipments,
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
  };
}
