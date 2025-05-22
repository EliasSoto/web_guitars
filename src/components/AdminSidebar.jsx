
import "../styles/Sidebar.css"; 
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

export default function AdminSidebar () {

  return (
    <aside className="sidebar">
      <h2 className="title-adminside">Administración</h2>

      <nav>
        <ul className="nav-list">

            <Link to="/admin/users" className="select">
                
                <Icon className= "icon" icon="fa-solid:users" width="24" height="24" />
                <p className="text-panel">Usuarios</p>

                {/* <Link className="text-panel" to = "/admin/users">Usuarios</Link> */}
            </Link>

            <Link to="/admin/guitars" className="select">
                    <Icon className="icon" icon="f7:guitars" width="24" height="24" />
                    <p>Guitarras</p>
            </Link>



            {/* Falta agregar los links a las rutas de los componentes */}
            <li className="select">
                    <Icon icon="tdesign:map-location" width="24" height="24" />
                    <p>Direcciones</p>
            </li>

            <li className="select">
                    <Icon icon="material-symbols:local-shipping-outline-sharp" width="24" height="24" />
                    <p>Envios</p>
            </li>

            <li className="select">
                    <Icon icon="qlementine-icons:guitar-strat-16" width="24" height="24" />
                    <p>Componentes</p>
            </li>
            
            <div className="sesion-container">
                <li className="select">
                    <Icon icon="ix:user-profile-filled" width="24" height="24" />
                    <p>Administrador</p>
                </li>

                <li className="select">
                    <Icon icon="grommet-icons:logout" width="24" height="24" />
                    <p>Cerrar Sesión</p>
                </li>
            </div>

        </ul>
        
      </nav>
      
    </aside>
  );
};


