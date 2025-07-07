import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import "../styles/HeaderLogin.css";

export default function HeaderLogin() {
  return (
    <header className="header-login">
      <div className="text-header">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
          Guitarras
        </Link>
      </div>
      <nav>
        <Link to="/">
          <Icon className="home-ico" icon="fa-solid:home" width="22" height="22" color="#808080" />
        </Link>
      </nav>
    </header>
  );
}
