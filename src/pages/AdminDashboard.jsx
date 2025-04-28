import UserList from '../components/table_admin/UserList';
import HeaderLogin from '../components/HeaderLogin';
import "../styles/AdminDashboard.css";
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <HeaderLogin className="header-login" />
      <main className="main-content">

        <Sidebar />
        
        <section className="main-section">
          <UserList />
        </section>
        
      </main>

      <Footer className="footer" />

    </div>
  );
};
