import { useQuery } from "@tanstack/react-query";
import { getDowntimeLogs } from "../services/apiFunctions";

export function useDowntimeLogs() {
  const { data, isLoading } = useQuery({
    queryFn: getDowntimeLogs,
    queryKey: ["downtime-logs"],
  });
  return { data, isLoading };
}
