import { useEffect, useState } from "react";
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
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('id');

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

  const fetchShipments = async (
    pageToFetch = page,
    limit = shipmentsPerPage,
    currentSearch = search,
    currentSearchBy = searchBy
  ) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedShipments(
      pageToFetch,
      limit,
      currentSearch,
      currentSearchBy
    );

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
    fetchShipments();
  }, [page, search, searchBy]);

  return {
    shipments,
    userNames,
    loading,
    error,
    page,
    setPage,
    total,
    shipmentsPerPage,
    search,
    setSearch,
    searchBy,
    setSearchBy,
    fetchShipments,
  };
}
