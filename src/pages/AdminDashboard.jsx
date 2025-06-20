
import { useState } from 'react';
import Modal from '../components/Modal';
import AdminProfileForm from '../components/forms/AdminProfileForm';

// ... tus importaciones existentes
import UserList from '../components/table_admin/UserList';
import HeaderLogin from '../components/HeaderLogin';
import "../styles/AdminDashboard.css";
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Route, Routes } from 'react-router-dom';
import GuitarList from '../components/table_guitars/GuitarList';
import OrderAdminList from '../components/table_admin_orders/OrderAdminList';
import ShipmentAdminList from '../components/table_admin_shipments/ShipmentAdminList';
import ComponentList from '../components/table_components/ComponentList';

import useAdminUsers from '../hooks/useAdminUsers';

export default function AdminDashboard() {

  const adminUsersProps = useAdminUsers();
  const {
    handleFormSuccess,
  } = adminUsersProps;

  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const openProfileModal = () => setProfileModalOpen(true);
  const closeProfileModal = () => setProfileModalOpen(false);

  return (
    <div className="admin-dashboard">
      <HeaderLogin className="header-login" />

      <main className="main-content-admin">

        {/* Pasa la función para abrir el modal al Sidebar */}
        <AdminSidebar openProfileModal={openProfileModal} />

        <section className="main-section-admin">
          <Routes>
            <Route index element={<UserList {...adminUsersProps} />} />
            <Route path="/users" element={<UserList {...adminUsersProps}/>} />
            <Route path="guitars" element={<GuitarList />} />
            <Route path="orders" element={<OrderAdminList />} />
            <Route path="shipments" element={<ShipmentAdminList />} />
            <Route path="components" element={<ComponentList />} />
          </Routes>
        </section>
      </main>

      <Footer className="footer" />

      {/* Renderiza el modal aquí */}
      <Modal isOpen={isProfileModalOpen} onClose={closeProfileModal}>
        <AdminProfileForm onSuccess={handleFormSuccess}/>
      </Modal>
      {/* jsjs */}
    </div>
  );
}
