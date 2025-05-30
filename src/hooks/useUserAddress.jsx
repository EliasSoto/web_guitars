import { useEffect, useState } from "react";
import {
  getAllUserAddresses,
  getActiveAddress,
  createAddress,
  updateAddress,
  deleteAddress,
  activateAddress,
} from "../services/userNormalService";
import { isAuthenticated } from "../services/userAuthService";


const useUserAddress = () => {
  const [addresses, setAddresses] = useState([]);
  const [activeAddress, setActiveAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [allData, allError] = await getAllUserAddresses();
      const [activeData, activeError] = await getActiveAddress();

      if (allError || activeError) {
        setError(allError || activeError);
      } else {
        setAddresses(allData);
        setActiveAddress(activeData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleCreate = async (newAddress) => {
    const [, err] = await createAddress(newAddress);
    if (!err) {
      const [data] = await getAllUserAddresses();
      setAddresses(data);
    } else {
      setError(err);
    }
  };

  const handleUpdate = async (id, updatedData) => {
    const [, err] = await updateAddress(id, updatedData);
    if (!err) {
      const [data] = await getAllUserAddresses();
      setAddresses(data);
    } else {
      setError(err);
    }
  };

  const handleDelete = async (id) => {
    const [, err] = await deleteAddress(id);
    if (!err) {
      const [data] = await getAllUserAddresses();
      setAddresses(data);
      return null;
    } else {
      setError(err);
      return err;
    }
  };

  const handleActivate = async (id) => {
    const [, err] = await activateAddress(id);
    if (!err) {
      const [allData] = await getAllUserAddresses();
      const [activeData] = await getActiveAddress();
      setAddresses(allData);
      setActiveAddress(activeData);
    } else {
      setError(err);
    }
  };

  return {
    addresses,
    activeAddress,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleActivate,
  };
};


export default useUserAddress;
