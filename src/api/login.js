/* eslint-disable no-restricted-globals */
/* eslint-disable no-constant-condition */
import axios from "axios";

export const login = async ({ email, password }) => {
  const res = await axios.post(
    "https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/users/login",
    {
      email,
      password,
    }
  );

  if (res.data.status === "success") {
    return res.data;
  }

  throw new Error(res.response?.data?.message || "Login failed");
};

export const logout = async () => {
  const res = await axios.get(
    "https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/users/logout"
  );

  if ((res.data.status = "success")) return;

  throw new Error(
    res.response?.data?.message || "Error logging out! Try again."
  );
};
