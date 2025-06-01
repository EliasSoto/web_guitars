import { useState, useEffect } from "react";
import { getUserAddressById, updateAddress } from "../services/userNormalService";

export const useEditUserAddress = (addressId, handleUpdateGlobal) => {
  const [formData, setFormData] = useState({
    street_name: "",
    region: "",
    commune: "",
    directions: "",
    address_type: "",
    is_active: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!addressId) return;

    const fetchAddressData = async () => {
      setLoading(true);
      const [data, err] = await getUserAddressById(addressId);

      if (err) {
        setError(err);
      } else {
        setFormData({
          street_name: data.street_name || "",
          region: data.region || "",
          commune: data.commune || "",
          directions: data.directions || "",
          address_type: data.address_type || "",
          is_active: !!data.is_active,
        });
      }

      setLoading(false);
    };

    fetchAddressData();
  }, [addressId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Evita actualizar el campo si el valor es solo espacios
    if (value.trim() === "" && value.length > 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [data, updateError] = await updateAddress(addressId, formData);

    if (updateError) {
      setError(updateError);
      setSuccessMessage("");
      setLoading(false);
      return;
    }

    // Aquí uso la función global para refrescar la lista completa
    if (handleUpdateGlobal) {
      const errorGlobal = await handleUpdateGlobal(addressId, formData);
      if (errorGlobal) {
        setError(errorGlobal);
        setSuccessMessage("");
        setLoading(false);
        return;
      }
    }

    setSuccessMessage("Dirección actualizada correctamente");
    setError("");
    setLoading(false);
  };

  const resetStatus = () => {
    setError("");
    setSuccessMessage("");
  };

  return {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    resetStatus,
  };
};
