import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/userAuthService';
import "../styles/Header.css";
import ProfileDropdown from './ProfileDropdown';

export default function Header() {
  return (
    <header className="header-login">
      <div className="text-header">
        Guitarras
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          className="search-input"
        />
      </div>

      <div className="auth-links">
        {isAuthenticated() ? (
          <ProfileDropdown />
        ) : (
          <Link to="/login" className="auth-button">Login</Link>
        )}
      </div>
    </header>
  );
}
