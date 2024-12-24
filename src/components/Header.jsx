/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";
import { Link } from "react-router-dom";
import SpinnerMini from "./SpinnerMini";
import { useUser } from "../GlobalState";

const Header = () => {
  const { logout, isLoading } = useLogout();

  const user = useUser();

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link className="nav__el" to="/">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img src="/img/logo-white.png" alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {user ? (
          <>
            <button className="nav__el nav__el--logout" onClick={logout}>
              {!isLoading ? "Log out" : <SpinnerMini />}
            </button>
            <a className="nav__el" href="/me">
              <img
                className="nav__user-img"
                src={`/img/users/${user.photo}`}
                alt={`Photo of ${user.name}`}
              />
              <span>{user.name.split(" ")[0]}</span>
            </a>
          </>
        ) : (
          <>
            <a className="nav__el" href="/login">
              Log in
            </a>
            <a className="nav__el nav__el--cta" href="/signup">
              Sign up
            </a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
