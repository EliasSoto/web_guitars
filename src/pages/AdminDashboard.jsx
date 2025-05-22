import UserList from '../components/table_admin/UserList';
import HeaderLogin from '../components/HeaderLogin';
import "../styles/AdminDashboard.css";
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Route, Routes } from 'react-router-dom';

//solo para hacer pruebas
import GuitarList from '../components/GuitarList';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <HeaderLogin className="header-login" />

      <main className="main-content-admin">

        <AdminSidebar />
        
        <section className="main-section-admin">
           <Routes>
            <Route path="users" element={<UserList /> } />
            

            {/* Rutas para las guitarras solo pruebas por ahora */}
            <Route path="guitars" element={<GuitarList />} /> 
           
          </Routes>
        </section>
        
      </main>

      <Footer className="footer" />

    </div>
  );
};
