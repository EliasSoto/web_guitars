import React from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout(); // Limpia token y user_info
    navigate("/login"); // Redirige al login
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
};

export default LogoutButton;
