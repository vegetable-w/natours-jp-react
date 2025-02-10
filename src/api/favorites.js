import axios from "axios";

export const addFavoriteToBackend = async ({ userId, tour }) => {
  try {
    await axios.post(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/favorites/${userId}`,
      { tourId: tour.id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to add favorite:", error);
  }
};

export const removeFavoriteFromBackend = async ({ userId, tourId }) => {
  try {
    await axios.delete(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/favorites/${userId}/${tourId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to remove favorite:", error);
  }
};

export const getMyFavorites = async (userId) => {
  try {
    const response = await axios.get(
      `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/favorites/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    throw error;
  }
};
