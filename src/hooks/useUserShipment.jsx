import { useEffect, useState } from "react";
import {
  getUserShipmentsPaginated,
  createUserShipment,
} from "../services/useShipmentService";

export const useUserShipment = () => {
  const [shipments, setShipments] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchShipments = async (newPage = page, newLimit = limit) => {
    setLoading(true);
    const [data, err] = await getUserShipmentsPaginated(newPage, newLimit);
    if (err) {
      setError(err);
    } else {
      setShipments(data.shipments);
      setTotal(data.total);
    }
    setLoading(false);
  };

  const handleCreate = async (newShipment) => {
    const [createdShipment, err] = await createUserShipment(newShipment);
    if (!err) {
      fetchShipments();
    } else {
      setError(err);
    }
  };

  return {
    shipments,
    setShipments,
    total,
    setTotal,
    loading,
    setLoading,
    error,
    setError,
    page,
    setPage,
    limit,
    setLimit,
    fetchShipments,
    handleCreate,
  };
};
