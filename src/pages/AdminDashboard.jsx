import UserList from '../components/table_admin/UserList';
import HeaderLogin from '../components/HeaderLogin';
import "../styles/AdminDashboard.css";
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <HeaderLogin className="header-login" />
      <main className="main-content-admin">

        <AdminSidebar />
        
        <section className="main-section-admin">
          <UserList />
        </section>
        
      </main>

      <Footer className="footer" />

    </div>
  );
};
