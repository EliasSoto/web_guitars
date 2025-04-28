import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import "../styles/HeaderLogin.css";

export default function HeaderLogin() {
  return (
    <header className="header-login">
      <div className="text-header">
        Guitarras
      </div>
      <nav>
        <Link to="/">
          <Icon icon="fa-solid:home" width="22" height="22" color="#808080" />
        </Link>
      </nav>
    </header>
  );
}
