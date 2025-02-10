import React, { useState, useEffect } from "react";
import axios from "axios";

import TourCards from "../components/tour/TourCards";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import { useFavorites } from "../contexts/FavoritesContext";
import { useUser } from "../contexts/GlobalState";
import NotificationPanel from "../components/notification/NotificationPanel";

function Overview() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchAndSetFavorites } = useFavorites();
  const user = useUser();

  useEffect(() => {
    const fetchToursAndFavorites = async () => {
      try {
        const res = await axios.get(
          "https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/tours"
        );
        console.log(res.data.data.data);
        if (res?.data.data.data) {
          setTours(res.data.data.data);
        } else {
          throw new Error("Unexpected data format");
        }

        if (user?._id) {
          await fetchAndSetFavorites(user._id);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchToursAndFavorites();
  }, [user]);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;

  return (
    <>
      <div className="card-container">
        <TourCards tours={tours} />
      </div>

      {user ? <NotificationPanel userId={user._id} /> : ""}
    </>
  );
}

export default Overview;
