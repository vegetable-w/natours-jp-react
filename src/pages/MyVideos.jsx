import { useEffect, useState } from "react";
import axios from "axios";

import { useUser } from "../contexts/GlobalState";
import Spinner from "../ui/Spinner";
import Error from "./Error";
import MyVideoCard from "../components/video/MyVideoCard";
import UploadVideo from "../components/video/UploadVideo";

const getMyTours = async ({ userId }) => {
  try {
    const res = await axios.get(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/bookings/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.data.tours;
  } catch (error) {
    console.log("Error: failed fetch my tours");
    throw error;
  }
};

const getMyVideos = async ({ userId }) => {
  try {
    const res = await axios.get(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/videos/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log("Error: failed fetch my tours");
    throw error;
  }
};

function MyVideos() {
  const [tours, setTours] = useState([]);
  const [videos, setVideos] = useState([]);
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

  useEffect(() => {
    const fetchMyVideos = async () => {
      try {
        const fetchedVideos = await getMyVideos({ userId: user._id });
        setVideos(fetchedVideos);
      } catch (err) {
        setError("Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };

    fetchMyVideos();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error msg={error} />;

  return (
    <div className="user-view__form-container">
      <h2 className="heading-secondary ma-bt-md">Your videos</h2>
      <UploadVideo tours={tours} user={user} />

      <div className="my-videos">
        {videos.map((video) => (
          <MyVideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default MyVideos;
