import React from "react";

const LoginUser = () => {
  return (
    <div>
      <h2>Login</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginUser;
