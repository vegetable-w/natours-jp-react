import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../api/login";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../api/alerts";
import { useSetUser } from "../GlobalState";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const setUser = useSetUser();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.data.user);
      localStorage.setItem("user", JSON.stringify(data.data.user));

      // queryClient.setQueryData(["user"], data.data.user);

      showAlert("success", "Logged in successfully!");

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1500);
    },
    onError: (err) => {
      showAlert("error", err.response.data.message);
    },
  });

  return { login, isLoading };
}
