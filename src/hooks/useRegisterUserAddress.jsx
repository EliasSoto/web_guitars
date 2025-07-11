import { useState } from "react";
import { createAddress } from "../services/userNormalService";

const useRegisterUserAddress = (userId, totalAddresses = 0) => {
  const [formData, setFormData] = useState({
    street_name: "",
    region: "",
    commune: "",
    directions: "",
    address_type: "",
    is_active: totalAddresses === 0,
    user_id: userId,
  });
  
  const regiones = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena"
  ];

  const tiposDireccion = ["Casa", "Departamento", "Trabajo", "Otro"];

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      street_name: "",
      region: "",
      commune: "",
      directions: "",
      address_type: "",
      is_active: totalAddresses === 0,
      user_id: userId,
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Evita actualizar el campo si el valor es solo espacios
    if (value.trim() === "" && value.length > 0) return;

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

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  }

  return {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
    clearSuccessMessage,
    regiones,
    tiposDireccion,
  };
};

export default useRegisterUserAddress;
