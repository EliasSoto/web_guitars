import { useState } from "react";
import { userLogin } from "../services/userAuthService.jsx";

const useLogin = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  // Estado para almacenar el error y el mensaje de éxito
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  // Función para manejar el cambio en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    try {
      const [data, loginError] = await userLogin(formData.username, formData.password);

      // Manejo de errores del inicio de sesión
      if (loginError) {
        setError(loginError);
        setMensajeExito("");
        localStorage.clear();
        return [null, loginError];
      }

      // Guardar el token y la información del usuario en localStorage
      setMensajeExito("Inicio de sesión exitoso");
      setError("");

      if (data?.access_token) localStorage.setItem("access_token", data.access_token);
      if (data?.user_info) localStorage.setItem("user_info", JSON.stringify(data.user_info));

      return [data, null];

    } catch (err) {
      // Manejo de errores inesperados
      setError("Error inesperado al iniciar sesión");
      setMensajeExito("");
      return [null, err.message];
    }
  };

  // Retornar los estados y funciones necesarias para el formulario de inicio de sesión
  return {
    formData,
    error,
    mensajeExito,
    handleChange,
    handleSubmit,
  };
};

export default useLogin;
