
import UserProfileData from '../components/forms/UserProfileData';

// ... tus importaciones existentes
import HeaderLogin from '../components/HeaderLogin';
import "../styles/UserProfileMenu.css";
import Footer from '../components/Footer';
import UserSidebar from '../components/UserSidebar';
import { Route, Routes } from 'react-router-dom';

import useNormalUser from '../hooks/useNormalUsers';

export default function UserProfileMenu() {

  const usersProps = useNormalUser();
  return (

    <div className="user-profile-menu">
      <HeaderLogin className="header-login" />

      <main className="main-content-user">

        <UserSidebar/>
        <section className="main-section-user">
          <Routes>
            <Route index element={<UserProfileData {...usersProps} />} />
            <Route path="/user-data" element={<UserProfileData {...usersProps}/>} />
          </Routes>
        </section>
      </main>

      <Footer className="footer" />
    </div>
  );
}
