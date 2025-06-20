import { useState } from "react";
import { createComponentAdmin } from "../services/componentService";

const useRegisterAdminComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    subtype: "",
    purchase_price: "",
    sale_price: "",
    net_price: "",
    stock: "",
    description: "",
    purchase_date: "",
    brand: "",
    material: "",
    position: "",
    is_active: true,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      name: "",
      type: "",
      subtype: "",
      purchase_price: "",
      sale_price: "",
      net_price: "",
      stock: "",
      description: "",
      purchase_date: "",
      brand: "",
      material: "",
      position: "",
      is_active: true,
    });
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Para checkbox manejar checked
    const val = type === "checkbox" ? checked : value;

    // Evita actualizar el campo si el valor es solo espacios
    if (typeof val === "string" && val.trim() === "" && val.length > 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));

    setError(null);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [data, registerError] = await createComponentAdmin(formData);

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Componente registrado correctamente");
      setError("");
    } catch (err) {
      setError("Error inesperado al registrar el componente");
      setSuccessMessage("");
    }
  };

  return {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
    clearSuccessMessage,
  };
};

export default useRegisterAdminComponent;
