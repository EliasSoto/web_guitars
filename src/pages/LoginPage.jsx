
import React from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import HeaderLogin from "../components/HeaderLogin";

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    username,
    password,
    error,
    mensajeExito,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLogin();

  const handleLogin = async (e) => {
    const [data, err] = await handleSubmit(e); // ✅ Aquí obtienes data

    if (data?.user_info?.es_administrador) {
      navigate("/admin");
    } else if (data) {
      navigate("/"); // o "/user-dashboard"
    }
  };

  return (

    <div>

      <HeaderLogin />
      
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
    </div>
  );
};

export default LoginPage;
