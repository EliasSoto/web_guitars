import { useState } from "react";
import { registerNormalUser } from "../services/userNormalService";
import { useNavigate } from "react-router-dom";

const useRegisterUser = () => {
  // Importamos el hook useNavigate para redirigir al usuario después de iniciar sesión
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    password: "",
  });

  // Estados para manejar errores y mensajes de éxito
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para formatear la fecha en DD/MM/YYYY
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    try {
      // Formatear la fecha de nacimiento
      const formattedBirthDate = formatDate(formData.birth_date);

      // Llamar al servicio de registro
      const [data, registerError] = await registerNormalUser(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formattedBirthDate,
        formData.rut,
        formData.password
      );

      // Manejo de errores
      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return [null, registerError];
      }

      // Registro exitoso
      setSuccessMessage("Usuario registrado correctamente");
      setError("");
    
      // Redirigir al usuario a la página de inicio
      navigate("/login");

      return [data, null];

    } catch (err) {
      // Manejo de errores inesperados
      setError("Error inesperado al registrar el usuario");
      setSuccessMessage("");
      return [null, err.message];
    }
  };

  // Retornar los estados y funciones necesarias
  return {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
  };
};

export default useRegisterUser;