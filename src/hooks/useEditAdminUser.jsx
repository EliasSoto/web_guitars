import { useState, useEffect } from "react";
import { getAdminUserById, updateAdminUserById } from "../services/userAdminService";

export const useEditAdminUser = (userId, navigate, onSuccess) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    is_admin: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const [data, err] = await getAdminUserById(userId);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: data.birth_date || "",
        rut: data.rut || "",
        is_admin: data.is_admin || false,
      });
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Evita actualizar el campo si el valor es solo espacios
    if (value.trim() === "" && value.length > 0) return;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const [data, updateError] = await updateAdminUserById(
        userId,
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formData.birth_date,
        formData.rut,
        formData.is_admin
      );

      if (updateError) {
        setError(updateError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Usuario actualizado correctamente");
      setError("");
      
      if (onSuccess) onSuccess();

    } catch (err) {
      setError("Error inesperado al actualizar el usuario");
      setSuccessMessage("");
    }
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
    resetStatus
  };
};
