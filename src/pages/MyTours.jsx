import React, { useEffect, useState } from "react";
import axios from "axios";

import { useUser } from "../contexts/GlobalState";
import Spinner from "../ui/Spinner";
import TourCards from "../components/tour/TourCards";
import Error from "./Error";

const getMyTours = async ({ userId }) => {
  try {
    const response = await axios.get(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/bookings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data.tours;
  } catch (error) {
    console.log("Error: failed fetch my tours");
    throw error;
  }
};

const MyTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useUser();

  useEffect(() => {
    const fetchMyTours = async () => {
      try {
        const fetchedTours = await getMyTours({ userId: user._id });
        setTours(fetchedTours);
      } catch (err) {
        setError("Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };

    fetchMyTours();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your tours</h2>
      <div className="card-container-account">
        <TourCards tours={tours} />
      </div>
    </div>
  );
};

export default MyTours;
