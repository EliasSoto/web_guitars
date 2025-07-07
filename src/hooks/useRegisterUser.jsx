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
    const { name, value, type, checked } = e.target;
    
    // Evita actualizar si solo contiene espacios
    if (value.trim() === "" && value.length > 0) return;
    
    let newValue = value;
    
    if (name === "phone") {
      // Solo permite números
      newValue = value.replace(/\D/g, "");
    }
  
    if (name === "rut") {
      // Convertir a mayúscula y eliminar puntos
      newValue = value.toUpperCase().replace(/\./g, "");
    
      // Solo permitir números, guion y K
      if (!/^[0-9K\-]*$/.test(newValue)) return;
    
      // No permitir más de un guion
      const guiones = (newValue.match(/-/g) || []).length;
      if (guiones > 1) return;
    
      // Evitar más de un carácter después del guion
      const parts = newValue.split("-");
      if (parts.length === 2 && parts[1].length > 1) return;
    
      // Limitar longitud total a máximo 10 caracteres
      if (newValue.length > 10) return;
    }
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : newValue,
    }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    try {
      // Formatear la fecha de nacimiento
      // Llamar al servicio de registro
      const [data, registerError] = await registerNormalUser(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formData.birth_date,
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