import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";


const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div>
      <Header />  
      <Sidebar />
      <Footer />
    </div>
  );
};

export default MainMenu;
