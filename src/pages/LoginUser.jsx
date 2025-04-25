import React from "react";
import useLogin from "../hooks/useLogin";

const LoginUser = () => {
  const {
    username,
    password,
    error,
    mensajeExito,
    setUsername,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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

export default LoginUser;