import { useState } from "react";
import { userLogin } from "../services/userAuthService.jsx";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [data, error] = await userLogin(username, password);
    
    if (error) {
      setError(error);
      setMensajeExito("");
    } else {
      setMensajeExito("Inicio de sesión exitoso");
      setError("");
      // Se guarda el token y la información del usuario en localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user_info", JSON.stringify(data.user_info));

      console.log("Información del usuario:", data.user_info);
    }
  };

  return {
    username,
    password,
    error,
    mensajeExito,
    setUsername,
    setPassword,
    handleSubmit,
  };
};

export default useLogin;