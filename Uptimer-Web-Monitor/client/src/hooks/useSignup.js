import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp as signUpApi } from "../services/apiFunctions";

export default function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signUpApi,
    onError: (err) => {
      console.log("Error during signup :==== ", err.message);
    },
    onSuccess: (user) => {
      console.log(user);
    },
  });
  return { signup, isLoading: isPending };
}
