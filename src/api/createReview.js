import axios from "axios";

export const createReview = async ({ tourId, rating, review }) => {
  const res = await axios.post(
    `https://natours-japan-tours-18991a07f7f0.herokuapp.com/api/v1/tours/${tourId}/reviews`,
    {
      rating,
      review,
    }
  );

  if (res.data.status === "success") {
    return res.data.data;
  }

  throw new Error(res.response?.data?.message || "Review submitted failed");
};
