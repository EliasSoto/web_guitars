
import "../styles/Sidebar.css";
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import { getUserFirstNameLocal } from "../utils/userUtils";
import { useEffect, useState } from "react";

export default function UserSidebar ({ openProfileModal}) {

  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState(null);

  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };

  useEffect(() => {
      const firstName = getUserFirstNameLocal();
      setUserFirstName(firstName);
    }, []);

  return (
    <aside className="sidebar">
      <h2 className="title-userside">Mi Cuenta</h2>

      <nav>
        <ul className="nav-list">

          <NavLink
            to="/profile/user-data"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon className="icon" icon="fa-solid:users" width="24" height="24" />
            <p className="text-panel">Datos del Usuario</p>
          </NavLink>

          <NavLink
            to="/profile/address"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon className="icon" icon="tdesign:map-location" width="24" height="24" />
            <p className="text-panel">Direcciones</p>
          </NavLink>

          <NavLink
            to="/profile/orders"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="streamline:shipment-download" width="24" height="24" />
            <p>Pedidos</p>
          </NavLink>

          <NavLink
            to="/profile/shipments"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="material-symbols:local-shipping-outline-sharp" width="24" height="24" />
            <p>Envíos</p>
          </NavLink>

          <NavLink to="/profile/wishlist"
          className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="mdi:heart" width="24" height="24" />
            <p>Mis Favoritos</p>
          </NavLink>

          <div className="sesion-container">
            <li className="select" onClick={openProfileModal}>
              <Icon icon="ix:user-profile-filled" width="24" height="24" />
              <p>{userFirstName}</p>
            </li>

            <li className="select logout-item" onClick={handleLogout}>
              <Icon icon="grommet-icons:logout" width="24" height="24" />
              <p>Cerrar Sesión</p>
            </li>
          </div>
          
        </ul>

      </nav>

    </aside>
  );
};
