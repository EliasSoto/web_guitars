import { useState, useEffect } from "react";
import { getAdminUserById, updateAdminUserById } from "../services/userAdminService";

export const useEditAdminUser = (userId, navigate) => {
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

      // Formatear la fecha si existe
      let formattedDate = "";
      if (data.birth_date) {
        const [day, month, year] = data.birth_date.split('/');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: formattedDate,
        rut: data.rut || "",
        is_admin: data.is_admin || false,
      });
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    };
    
    const formattedBirthDate = formatDate(formData.birth_date);

    try {
      const [data, updateError] = await updateAdminUserById(
        userId,
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formattedBirthDate,
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
      setTimeout(() => navigate("/admin"), 1500);

    } catch (err) {
      setError("Error inesperado al actualizar el usuario");
      setSuccessMessage("");
    }
  };

  return {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit
  };
};
