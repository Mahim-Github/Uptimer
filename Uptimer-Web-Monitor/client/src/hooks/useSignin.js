import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../services/apiFunctions";
// import { signIn as signInApi }

export default function useSignin() {
  const queryClient = useQueryClient();

  const { mutate: signin, isPending } = useMutation({
    mutationFn: signInApi,
    onError: (err) => {
      console.log("Error during Signin :==== ", err.message);
    },
    onSuccess: (user) => {
      console.log(user);
      if (user.user.authenticated) {
        console.log("USER AUTHENTICATED");
        queryClient.setQueryData(["user"], user);
      } else {
        console.log("ACCESS DENIED!");
      }
    },
  });
  return { signin, isLoading: isPending };
}
