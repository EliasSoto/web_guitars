import { Link } from "react-router-dom";
import "../styles/Sidebar.css"; 

export default function Sidebar () {

  return (
    <aside className="sidebar">
      <h2>Panel</h2>
      <nav>
        <ul>
          <Link to="/admin">
            <li><>Usuarios</></li>
          </Link>
        </ul>
      </nav>
    </aside>
  );
};


