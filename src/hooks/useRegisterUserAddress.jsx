import { useState } from "react";
import { createAddress } from "../services/userNormalService";

const useRegisterUserAddress = (userId) => {
  const [formData, setFormData] = useState({
    street_name: "",
    region: "",
    commune: "",
    directions: "",
    address_type: "",
    is_active: true,
    user_id: userId,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      street_name: "",
      region: "",
      commune: "",
      directions: "",
      address_type: "",
      is_active: true,
      user_id: userId,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [data, registerError] = await createAddress(formData);

    if (registerError) {
      setError(registerError);
      setSuccessMessage("");
      return;
    }

    setSuccessMessage("Dirección registrada correctamente");
    setError("");
    resetForm();
  };

  return {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useRegisterUserAddress;
