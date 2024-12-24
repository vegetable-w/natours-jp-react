import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../GlobalState";
import Spinner from "../components/Spinner";
import TourReviewCards from "../components/TourReviewCards";
import Error from "./Error";

const getMyTours = async ({ userId }) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}api/v1/bookings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // 添加认证头部
        },
      }
    );
    return response.data.data.tours; // 返回 tours 数据
  } catch (error) {
    console.error("Error fetching My Tours:", error);
    throw error;
  }
};

const MyReviews = () => {
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

  return <TourReviewCards tours={tours} />;
};

export default MyReviews;
