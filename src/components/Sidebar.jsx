import "../styles/Sidebar.css"; 

export default function Sidebar () {

  return (
    <aside className="sidebar">
      <h2>Panel</h2>
      <nav>
        <ul>
          <li><a href="/admin">Usuarios</a></li>
        </ul>
      </nav>
    </aside>
  );
};


