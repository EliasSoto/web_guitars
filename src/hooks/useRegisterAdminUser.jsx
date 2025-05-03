import { useState } from "react";
import { registerAdminUser } from "../services/userAdminService";

const useRegisterAdminUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    password: "",
    is_admin: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [data, registerError] = await registerAdminUser(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formData.birth_date,
        formData.rut,
        formData.password,
        formData.is_admin
      );

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Usuario administrador registrado correctamente");
      setError("");
    } catch (err) {
      setError("Error inesperado al registrar el usuario");
      setSuccessMessage("");
    }
  };

  return {
    formData,
    error,
    successMessage,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility
  };
};

export default useRegisterAdminUser;
