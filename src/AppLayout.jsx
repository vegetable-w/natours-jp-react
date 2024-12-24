/* eslint-disable react/prop-types */
import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

function AppLayout() {
  const location = useLocation();
  const isOverviewPage = ["/", "/my-tours", "/my-reviews"].includes(
    location.pathname
  );

  return (
    <div>
      <Header />
      <main className={`${isOverviewPage ? "main" : ""}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
