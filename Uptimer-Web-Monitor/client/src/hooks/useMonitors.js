import { useQuery } from "@tanstack/react-query";
import { getMonitor } from "../services/apiFunctions";

export function useMonitors(user) {
  const { data, isLoading } = useQuery({
    queryFn: () => getMonitor(user),
    queryKey: ["monitors"],
  });
  return { data, isLoading };
}
