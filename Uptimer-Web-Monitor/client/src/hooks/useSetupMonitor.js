import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setupMonitor as setupMonitorApi } from "../services/apiFunctions";

export default function useSetupMonitor() {
  const { mutate: setupMonitor, isPending } = useMutation({
    mutationFn: setupMonitorApi,
    onError: (err) => {
      console.log("Error during signup :==== ", err.message);
    },
    onSuccess: (user) => {
      console.log(user);
    },
  });
  return { setupMonitor, isLoading: isPending };
}
