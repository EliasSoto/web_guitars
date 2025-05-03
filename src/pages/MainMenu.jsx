import React from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/AdminDashboard.css"; // Asegúrate de importar el CSS
import GuitarCard from "../components/GuitarCard.jsx"; // Asegúrate de importar el componente GuitarCard
import "../styles/MainMenu.css"; // Asegúrate de importar el CSS para GuitarCard

const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <Header />

      <div className="main-content-admin">
        <aside className="sidebar">
          <Sidebar />
        </aside>

        <main className="main-content-guitarras">
          {Array.from({ length: 33 }).map((_, i) => (
            <GuitarCard key={i} />
          ))}
        </main>
      </div>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default MainMenu;
