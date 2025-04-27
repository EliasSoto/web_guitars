import React from "react";

const Footer = () => {
  return (
    <footer style={{backgroundColor: "#1f2937", padding: "2rem 0",
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        width: "100%", }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", padding: "0 1rem" }}>
        
        <div style={{ flex: "0 1 30%",
            marginBottom: "1rem",textAlign: "left" }}>
          <h2 style={{ color: "#3b82f6", fontWeight: "bold" }}>Guitarras</h2>
          <p style={{ color: "#d1d5db" }}>
            Ofrecemos guitarras únicas, diseñadas para que cada instrumento cuente o cree el himno único que refleje su identidad y pasión por la música.
          </p>
        </div>
        
        <div style={{ flex: "1 1 200px", marginBottom: "1rem" ,textAlign: "right" }}>
          <h3 style={{ fontWeight: "bold", color: "#ffffff" }}>Sobre nosotros</h3>
          <ul style={{ listStyle: "none", padding: 0, marginTop: "1rem" }}>
            <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#d1d5db", textDecoration: "none" }}>Cómo Funcionamos</a></li>
            <li style={{ marginBottom: "0.5rem" }}><a href="#" style={{ color: "#d1d5db", textDecoration: "none" }}>Alianzas</a></li>
            <li><a href="#" style={{ color: "#d1d5db", textDecoration: "none" }}>Destacado</a></li>
          </ul>
        </div>

      </div>

      <div style={{ borderTop: "1px solid #374151", marginTop: "1rem",marginLeft:"1rem" , paddingTop: "1rem", textAlign: "left", fontSize: "0.875rem", color: "#9ca3af" }}>
        <p>©2025 Guitars. Derechos reservados</p>
        <a href="#" style={{ color: "#9ca3af", textDecoration: "none" ,}}>Términos y Condiciones</a>
      </div>
    </footer>
  );
};

export default Footer;
