import { useState, useEffect } from "react";
import { getCurrentUser, updateCurrentUser } from "../services/userNormalService";

export const useEditUserProfile = (navigate) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    is_admin: "",
    email: "",
    phone: "",
    rut: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const [data, err] = await getCurrentUser();
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }

      setFormData(prev => ({
        ...prev,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        birth_date: data.birth_date ? data.birth_date.split('/').reverse().join('-') : "",
        is_admin: data.is_admin || "",
        email: data.email || "",
        phone: data.phone || "",
        rut: data.rut || ""
      }));
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const { confirmPassword, ...userUpdate } = formData;

    if (userUpdate.birth_date) {
      const [year, month, day] = userUpdate.birth_date.split('-');
      userUpdate.birth_date = `${day}/${month}/${year}`;
    }

    try {
      const [data, updateError] = await updateCurrentUser(userUpdate);

      if (updateError) {
        setError(updateError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Perfil actualizado correctamente");
      setError("");
      setFormData(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
      setTimeout(() => navigate("/perfil"), 1500);

    } catch (err) {
      setError("Error inesperado al actualizar el perfil");
      setSuccessMessage("");
    }
  };

  // Nueva función para limpiar estados de error y éxito
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
    resetStatus  // <-- devolver esta función para usarla fuera
  };
};
