import React from "react";
import { Outlet } from "react-router-dom";
import "../styles/Layout.scss";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  return (
    <div className="container">
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
