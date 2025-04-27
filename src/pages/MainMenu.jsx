import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/global.css"; // Importa el CSS específico para el menú principal


const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div>
      <Header />      
      <Footer />
    </div>
  );
};

export default MainMenu;
