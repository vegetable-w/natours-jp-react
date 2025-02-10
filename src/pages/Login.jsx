import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import SpinnerMini from "../ui/SpinnerMini";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };

  return (
    <main className="main">
      <div className="login-form">
        <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
        <form className="form form--login" onSubmit={handleSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              className="form__input"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__group ma-bt-md">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="form__input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="8"
            />
          </div>
          <div className="form__group">
            <button className="btn btn--green" type="submit">
              {isLoading ? <SpinnerMini /> : "Login"}
            </button>
          </div>
          <div className="form__group">
            <button
              className="btn btn--green"
              type="button"
              onClick={() => {
                setEmail("user@test.io");
                setPassword("pswd1234");
              }}
            >
              Try with Demo Account
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
