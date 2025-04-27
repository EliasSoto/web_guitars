import { Icon } from '@iconify/react';
import "../styles/HeaderLogin.css"; // Asegúrate de tener este archivo CSS

export default function HeaderLogin() {
  return (
    <header className="header-login">
      <div className="text-header">
        Guitarras
      </div>
      <Icon icon="fa-solid:home" width="22" height="22" color="#808080" /> {/* Gris */}
    </header>
  );
}
