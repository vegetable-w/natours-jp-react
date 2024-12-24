import React, { useState, useEffect } from "react";
import TourCards from "../components/TourCards";
import Spinner from "../components/Spinner";
import Error from "./Error";

function Overview() {
  const [tours, setTours] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL =
      "https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/tours";

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((result) => {
        if (result?.data?.data) {
          setTours(result.data.data);
        } else {
          throw new Error("Unexpected data format");
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;

  return <TourCards tours={tours} />;
}

export default Overview;
