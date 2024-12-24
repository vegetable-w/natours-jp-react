import { useMutation } from "@tanstack/react-query";
import { showAlert } from "../api/alerts";
import { createReview as createReviewApi } from "../api/createReview";

export function useCreateReview() {
  const { mutate: createReview, isLoading: isCreating } = useMutation({
    mutationFn: ({ tourId, rating, review }) =>
      createReviewApi(tourId, rating, review),
    onSuccess: (data) => {
      showAlert("success", "Review submitted successfully!");
      console.log(data);
    },
    onError: (err) => {
      showAlert("error", err.response.data.message);
    },
  });

  return { isCreating, createReview };
}
