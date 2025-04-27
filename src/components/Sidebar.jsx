import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Sidebar.css"; 

// Iconos SVG como componentes
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" strokeWidth="1.5"/>
    <path d="M9 22V12h6v10" strokeWidth="1.5"/>
  </svg>
);

const ProductIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
    <path d="M3 9h18M9 21V9" strokeWidth="1.5"/>
  </svg>
);

const CustomersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeWidth="1.5"/>
    <circle cx="9" cy="7" r="4" strokeWidth="1.5"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeWidth="1.5"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75" strokeWidth="1.5"/>
  </svg>
);

const IncomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeWidth="1.5"/>
  </svg>
);

const PromoteIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M22 12A10 10 0 1 1 12 2a10 10 0 0 1 10 10z" strokeWidth="1.5"/>
    <path d="M8 14s1.5 2 4 2 4-2 4-2" strokeWidth="1.5"/>
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="1.5"/>
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="1.5"/>
  </svg>
);

const CollapseIcon = ({ isCollapsed }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    {isCollapsed ? (
      <path d="M9 18l6-6-6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    ) : (
      <path d="M15 18l-6-6 6-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    )}
  </svg>
);

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <nav>
        <ul className="sidebar-menu">
          <li className="sidebar-item toggle-item" onClick={() => setIsCollapsed(!isCollapsed)}>
            <div className="sidebar-link">
              <span className="icon">
                <CollapseIcon isCollapsed={isCollapsed} />
              </span>
              <span className="text">Elija una opción</span>
            </div>
          </li>
          
          <SidebarItem 
            icon={<DashboardIcon />} 
            text="Dashboard" 
          />
          <SidebarItem 
            icon={<ProductIcon />} 
            text="Products" 
          />
          <SidebarItem 
            icon={<CustomersIcon />} 
            text="Customers" 
          />
          <SidebarItem 
            icon={<IncomeIcon />} 
            text="Income" 
          />
          <SidebarItem 
            icon={<PromoteIcon />} 
            text="Promote" 
          />
        </ul>
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, to }) => {
  return (
    <li className="sidebar-item">
      <Link to={to} className="sidebar-link">
        <span className="icon">{icon}</span>
        <span className="text">{text}</span>
      </Link>
    </li>
  );
};

export default Sidebar;