import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, userLogout } from "../services/userAuthService";
import "../styles/Header.css"; 


const Header = () => {
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    userLogout();
    window.location.reload();
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [scrolled, setScrolled] = useState(false);

  return (
    <header className={`guitar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Logo - Izquierda */}
        <h1 className="logo">
          <Link to="/" className="logo-link">
            Guitarras
          </Link>
        </h1>

        {/* Barra de búsqueda - Centro */}
        <div className={`search-container ${searchFocused ? "focused" : ""}`}>
          <div className="search-bar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="search-icon"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
            <input
              type="text"
              placeholder="Busca tu guitarra soñada"
              className="search-input"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
          </div>
        </div>

        {/* Navegación - Derecha */}
        <nav className="auth-nav">
          {!isAuthenticated() ? (
            <>
              <Link to="/register" className="nav-link register-link">
                Registro
              </Link>
              <Link to="/login" className="nav-link login-link">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-link logout-button">
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
