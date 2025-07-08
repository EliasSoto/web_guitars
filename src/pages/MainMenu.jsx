import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import { getGuitars } from "../services/userNormalService"; // Importa tu servicio
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import "../styles/AdminDashboard.css";
import GuitarCard from "../components/GuitarCard.jsx";
import "../styles/MainMenu.css";
import { ToastContainer } from "react-toastify";

const MainMenu = () => {

  const navigate = useNavigate();
  const [guitars, setGuitars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const fetchGuitars = async () => {
      try {
        const [data, err] = await getGuitars();
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

  const filteredGuitars = guitars.filter(guitar => {
    const term = searchTerm.toLowerCase();
    return (
      guitar.model.toLowerCase().includes(term) ||
      guitar.brand.toLowerCase().includes(term)
    );
  });

 return (
    <div className="admin-dashboard">
      <Header setSearchTerm={setSearchTerm} />
        {isLoggedIn && (
          <div className="custom-button-container">
            <button className="custom-button" onClick={() => navigate("/custom")}>
              🎸 Crear guitarra personalizada
            </button>
          </div>
        )}
      <div className="main-content-admin">
        <main className="main-content-guitarras">
          {!loading && error ? (
            <div className="error-message">{error}</div>
          ) : (
            filteredGuitars.map((guitar) => (
              <GuitarCard
                key={guitar.id}
                id={guitar.id}
                model={guitar.model}
                brand={guitar.brand}
                sale_price={guitar.sale_price}
                liquidation_price={guitar.liquidation_price}
                purchase_price={guitar.purchase_price}
                image_link={guitar.image_link}
                stock={guitar.stock}
              />
            ))
          )}
        </main>
      </div>

      <footer className="footer">
        <Footer />
      </footer>
      <ToastContainer position="top-center" autoClose={500} hideProgressBar />
    </div>
  );
};



export default MainMenu;