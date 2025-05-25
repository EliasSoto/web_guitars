import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import { getGuitars } from "../services/userNormalService"; // Importa tu servicio
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../styles/AdminDashboard.css";
import GuitarCard from "../components/GuitarCard.jsx";
import "../styles/MainMenu.css";

const MainMenu = () => {
  const navigate = useNavigate();
  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const [data, err] = await getGuitars(); // Usa tu servicio real
        if (err) {
          setError(err);
        } else {
          setGuitars(data.guitars);
        }
      } catch (error) {
        setError("Error al cargar las guitarras");
      } finally {
        setLoading(false);
      }
    };

    fetchGuitars();
  }, []);

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">
      <Header />

      <div className="main-content-admin">
        <Sidebar />

        <main className="main-content-guitarras">
          {loading ? (
            <div className="loading-spinner">Cargando guitarras...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            guitars.map((guitar) => (
              <GuitarCard
                key={guitar.id}
                model={guitar.model}
                brand={guitar.brand}
                sale_price={guitar.sale_price}
                purchase_price={guitar.purchase_price}
                image_link={guitar.image_link}
              />
            ))
          )}
        </main>
      </div>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default MainMenu;