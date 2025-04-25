import { useState } from "react";
import { userLogin } from "../services/userAuthService.jsx";

const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [data, loginError] = await userLogin(username, password);

      if (loginError) {
        setError(loginError);
        setMensajeExito("");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_info");
        return [null, loginError];
      }

      setMensajeExito("Inicio de sesión exitoso");
      setError("");

      if (data?.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }
      if (data?.user_info) {
        localStorage.setItem("user_info", JSON.stringify(data.user_info));
        console.log("Información del usuario:", data.user_info);
      }

      return [data, null];
    } catch (err) {
      setError("Error inesperado al iniciar sesión");
      setMensajeExito("");
      return [null, err.message];
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
