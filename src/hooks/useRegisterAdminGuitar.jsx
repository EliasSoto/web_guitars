import { useState } from "react";
import { registerAdminGuitar } from "../services/guitarAdminService";

const useRegisterAdminGuitar = () => {
  const [formData, setFormData] = useState({
    model: "",
    brand: "",
    description: "",
    purchase_price: 0,
    sale_price: 0,
    net_price: 0,
    iva: 0,
    liquidation_price: 0,
    purchase_date: "",
    wood_type: "",
    image_link: "",
    color: "",
    stock: 0,
    is_custom: false,
    fret_count: 0,
  });

  const resetForm = () => {
    setFormData({
      model: "",
      brand: "",
      description: "",
      purchase_price: 0,
      sale_price: 0,
      net_price: 0,
      iva: 0,
      liquidation_price: 0,
      purchase_date: "",
      wood_type: "",
      image_link: "",
      color: "",
      stock: 0,
      is_custom: false,
      fret_count: 0,
    });
  };

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [data, registerError] = await registerAdminGuitar(
        formData.model,
        formData.brand,
        formData.description,
        Number(formData.purchase_price),
        Number(formData.sale_price),
        Number(formData.net_price),
        Number(formData.iva),
        Number(formData.liquidation_price),
        formData.purchase_date,
        formData.wood_type,
        formData.image_link,
        formData.color,
        Number(formData.stock),
        formData.is_custom,
        Number(formData.fret_count)
      );

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Guitarra registrada correctamente");
      setError("");
      resetForm();
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
  };
};

export default useRegisterAdminGuitar;
