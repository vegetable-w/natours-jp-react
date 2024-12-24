/* eslint-disable no-restricted-globals */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../api/login";
import { showAlert } from "../api/alerts";

export function useLogout() {
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      queryClient.removeQueries();
      location.reload(true);
    },
    onError: (err) => {
      showAlert("error", err.response.data.message);
    },
  });

  return { logout, isLoading };
}
