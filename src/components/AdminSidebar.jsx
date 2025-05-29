
import "../styles/Sidebar.css";
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import { getUserFirstNameLocal } from "../utils/userUtils";
import { useEffect, useState } from "react";

export default function AdminSidebar ({ openProfileModal}) {

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
      <h2 className="title-adminside">Administración</h2>

      <nav>
        <ul className="nav-list">

          <NavLink
            to="/admin/users"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon className="icon" icon="fa-solid:users" width="24" height="24" />
            <p className="text-panel">Usuarios</p>
          </NavLink>

          <NavLink
            to="/admin/guitars"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon className="icon" icon="f7:guitars" width="24" height="24" />
            <p className="text-panel">Guitarras</p>
          </NavLink>

          <NavLink
            to="/admin/shipments"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="material-symbols:local-shipping-outline-sharp" width="24" height="24" />
            <p>Envíos</p>
          </NavLink>

          <NavLink
            to="/admin/components"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="qlementine-icons:guitar-strat-16" width="24" height="24" />
            <p>Componentes</p>
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
