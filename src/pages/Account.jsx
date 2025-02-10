/* eslint-disable react/prop-types */
import React from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";

import { useUser } from "../contexts/GlobalState";
import Settings from "./Settings";
import MyTours from "./MyTours";
import MyReviews from "./MyReviews";
import MyVideos from "./MyVideos";
import MyFavorites from "./MyFavorites";

const NavItem = ({ link, text, icon }) => {
  const location = useLocation();
  const isActive = location.pathname === link;
  return (
    <li className={isActive ? "side-nav--active" : ""}>
      <Link to={link}>
        <svg>
          <use href={`/img/icons.svg#icon-${icon}`} />
        </svg>
        {text}
      </Link>
    </li>
  );
};

function Account() {
  const user = useUser();

  return (
    <main className="main">
      <div className="user-view">
        <nav className="user-view__menu">
          {user.role === "user" && (
            <ul className="side-nav">
              <NavItem link="/me/settings" text="Settings" icon="settings" />
              <NavItem
                link="/me/my-tours"
                text="My bookings"
                icon="briefcase"
              />
              <NavItem link="/me/my-reviews" text="My reviews" icon="star" />
              <NavItem link="/me/my-videos" text="My videos" icon="video" />
              <NavItem
                link="/me/my-favorites"
                text="My favorites"
                icon="heart"
              />
            </ul>
          )}

          {user.role === "admin" && (
            <div className="admin-nav">
              <h5 className="admin-nav__heading">Admin</h5>
              <ul className="side-nav">
                <NavItem link="#" text="Manage tours" icon="map" />
                <NavItem link="#" text="Manage users" icon="users" />
                <NavItem link="#" text="Manage reviews" icon="star" />
                <NavItem link="#" text="Manage bookings" icon="briefcase" />
              </ul>
            </div>
          )}
        </nav>

        <div className="user-view__content">
          <Routes path="/me/*" element={<Account />}>
            <Route index element={<Navigate to="settings" replace />} />
            <Route path="/settings" element={<Settings user={user} />} />
            <Route path="/my-tours" element={<MyTours />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="/my-videos" element={<MyVideos />} />
            <Route path="/my-favorites" element={<MyFavorites />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default Account;
