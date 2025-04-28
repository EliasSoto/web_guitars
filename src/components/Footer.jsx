import React from "react";
import "../styles/Footer.css"; // Asegúrate de crear este archivo CSS

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-about">
          <h2 className="footer-title">Guitarras</h2>
          <p className="footer-description">
            Ofrecemos guitarras únicas, diseñadas para que cada instrumento
            cuente o cree el himno único que refleje su identidad y pasión por
            la música.
          </p>
        </div>

        <div className="footer-links">
          <h3 className="footer-subtitle">Sobre nosotros</h3>
          <ul className="footer-link-list">
            <li><a href="#" className="footer-link">Cómo Funcionamos</a></li>
            <li><a href="#" className="footer-link">Alianzas</a></li>
            <li><a href="#" className="footer-link">Destacado</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">©2025 Guitars. Derechos reservados</p>
        <a href="#" className="footer-terms">Términos y Condiciones</a>
      </div>
    </footer>
  );
};

