import { useState, useEffect } from "react";
import { getCurrentUser, updateCurrentUser } from "../services/userNormalService";

export const useEditUserProfile = (navigate) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
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

      // Convertir la fecha de nacimiento a formato YYYY-MM-DD para el input de tipo date
      let formattedDate = "";
      if (data.birth_date) {
        const [day, month, year] = data.birth_date.split('/');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      setFormData(prev => ({
        ...prev,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: formattedDate, // Guardamos la fecha en el formato adecuado para el input
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

    // Validar que las contraseñas coincidan si se están cambiando
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Preparar los datos para enviar (excluyendo confirmPassword)
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
      // Limpiar campos de contraseña después de actualizar
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

  return {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit
  };
};
