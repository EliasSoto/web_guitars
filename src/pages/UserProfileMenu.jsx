import HeaderLogin from '../components/HeaderLogin';
import Footer from '../components/Footer';
import UserSidebar from '../components/UserSidebar';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';


import UserProfileData from '../components/forms/UserProfileData';
import UserAddressList from '../components/table_address/UserAddressList';
import OrderList from '../components/table_orders/OrderList';
import ShipmentList from '../components/table_shipments/ShipmentList';

import useNormalUser from '../hooks/useNormalUsers';
import { useUserAddress } from '../hooks/useUserAddress';

import "../styles/UserProfileMenu.css";

export default function UserProfileMenu() {
  const userData = useNormalUser();
  const { user } = userData;

  const addressProps = useUserAddress();

  return (
    <div className="user-profile-menu">
      <HeaderLogin className="header-login" />

      <main className="main-content-user">
        <UserSidebar />

        <section className="main-section-user">
          <Routes>
            <Route index element={<UserProfileData {...userData} />} />
            <Route path="/user-data" element={<UserProfileData {...userData} />} />
            <Route path="/address" element={<UserAddressList  userId={user?.id}  {...addressProps}/>} />
            <Route path="/orders" element={<OrderList/>}/>
            <Route path="/shipments" element={<ShipmentList/>}/>
          </Routes>
        </section>
      </main>

      <Footer className="footer" />
    </div>
  );
}
