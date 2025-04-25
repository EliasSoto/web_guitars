import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import RegisterUser from "./components/RegisterUser";
import LoginUser from "./components/LoginUser";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/login" element={<LoginUser />} />
      </Routes>
    </Router>
  );
};

export default App;
