import React from "react";
import { Link } from "react-router-dom";

const MainMenu = () => {
  return (
    <div>
      <h1>Menú Principal</h1>
      <nav>
        <ul>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainMenu;
