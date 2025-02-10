/* eslint-disable react/prop-types */
import React from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Header from "./ui/Header";
import Footer from "./ui/Footer";

function AppLayout() {
  const location = useLocation();
  const isOverviewPage = [
    "/",
    "/my-tours",
    "/my-reviews",
    "/my-videos",
  ].includes(location.pathname);

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
