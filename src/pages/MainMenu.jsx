import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import Footer from "../components/Footer.jsx";


const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Menú Principal</h1>
      <nav>
        <ul>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li>
            <button onClick={handleLogout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
      <Footer />
    </div>
  );
};

export default MainMenu;
