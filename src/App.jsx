import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./pages/MainMenu";
import RegisterUser from "./pages/RegisterUser";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import { CartProvider } from "./contexts/CartContext";
import UserProfileMenu from "./pages/UserProfileMenu";
import CheckoutPage from "./pages/CheckoutPage";
import CustomGuitarPage from "./pages/CustomGuitarPage";
import { SearchProvider } from './contexts/SearchContext';


const App = () => {
  return (
    <SearchProvider>
    <CartProvider>
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/profile/*" element={<UserProfileMenu />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/custom" element={<CustomGuitarPage />} />
      </Routes>
    </Router>
    </CartProvider>
    </SearchProvider>
  );
};

export default App;
