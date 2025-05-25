
import "../styles/Sidebar.css"; 
import { Icon } from '@iconify/react';
import { NavLink, useNavigate } from "react-router-dom";
import { userLogout } from "../services/userAuthService";
import { useState, useCallback } from "react";
import Modal from "./Modal";
import AdminProfileForm from "./forms/AdminProfileForm";

export default function AdminSidebar () {
  const navigate = useNavigate();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);
  const [page, setPage] = useState(0);
  const [users, setUsers] = useState([]);
  
  const handleLogout = () => {
    userLogout();
    navigate("/login");
  };
  

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
            to="/admin/addresses"
            className={({ isActive }) => `select ${isActive ? 'active' : ''}`}
          >
            <Icon icon="tdesign:map-location" width="24" height="24" />
            <p>Direcciones</p>
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
              <p>Administrador</p>
            </li>

            <li className="select logout-item" onClick={handleLogout}>
              <Icon icon="grommet-icons:logout" width="24" height="24" />
              <p>Cerrar Sesión</p>
            </li>
          </div>


        </ul>
     
      </nav>
      
        <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
          <AdminProfileForm  />
        </Modal>

    </aside>
  );
};
