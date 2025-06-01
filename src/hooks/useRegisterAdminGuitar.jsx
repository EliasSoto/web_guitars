import { useState } from "react";
import { registerAdminGuitar } from "../services/guitarAdminService";

const useRegisterAdminGuitar = () => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    description: "",
    purchase_price: "",
    sale_price: "",
    purchase_date: "",
    wood_type: "",
    image_link: "",
    color: "",
    stock: "",
    is_custom: false,
    fret_count: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      model: "",
      brand: "",
      description: "",
      purchase_price: "",
      sale_price: "",
      purchase_date: "",
      wood_type: "",
      image_link: "",
      color: "",
      stock: "",
      is_custom: false,
      fret_count: "",
    });
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleChange = (e) => {
  const { name, value } = e.target;
    
    // Evita actualizar el campo si el valor es solo espacios
    if (value.trim() === "" && value.length > 0) return;


  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Limpiar errores al escribir
  setError(null);
  setSuccessMessage(""); 
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const [data, registerError] = await registerAdminGuitar(
        formData.model,
        formData.brand,
        formData.description,
        formData.purchase_price,
        formData.sale_price,
        formData.purchase_date,
        formData.wood_type,
        formData.image_link,
        formData.color,
        formData.stock,
        formData.is_custom,
        formData.fret_count
      );

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Guitarra registrada correctamente");
      setError("");
    } catch (err) {
      setError("Error inesperado al registrar la guitarra");
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

export default useRegisterAdminGuitar;
