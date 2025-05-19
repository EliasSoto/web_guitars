import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import RegisterUser from "./pages/RegisterUser";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import EditAdminUser from "./pages/EditAdminUser";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfile from "./pages/EditUserProfile";
import RegisterAdminUserForm from "./components/forms/RegisterAdminUserForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<RegisterAdminUserForm />} />
        <Route path="/admin/edit/:userId" element={<EditAdminUser />} />
        <Route path="/perfil" element={<UserProfilePage />} />
        <Route path="/editar-perfil" element={<EditUserProfile />} />

      </Routes>
    </Router>
  );
};

export default App;
