import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/GlobalState";
import { useFavorites } from "../contexts/FavoritesContext";
import Spinner from "../ui/Spinner";
import TourCards from "../components/tour/TourCards";
import Error from "./Error";

function MyFavorites() {
  // const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser();
  const { favorites, fetchAndSetFavorites } = useFavorites();

  useEffect(() => {
    if (user?._id) {
      fetchAndSetFavorites(user._id, setLoading, setError);
    }
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your favorites</h2>
      <div className="card-container-account">
        <TourCards tours={favorites} />
      </div>
    </div>
  );
}

export default MyFavorites;
