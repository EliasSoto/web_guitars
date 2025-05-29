import { useState, useEffect } from "react";
import { getUserAddressById, updateAddress } from "../services/userNormalService";

export const useEditUserAddress = (addressId) => {
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
    } else {
      setSuccessMessage("Dirección actualizada correctamente");
      setError("");
    }

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
