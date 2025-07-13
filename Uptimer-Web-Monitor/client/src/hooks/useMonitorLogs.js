import { useQuery } from "@tanstack/react-query";
import { getMonitorLogs } from "../services/apiFunctions";

export function useMonitorLogs() {
  const { data, isLoading } = useQuery({
    queryFn: getMonitorLogs,
    queryKey: ["monitor-logs"],
  });
  return { data, isLoading };
}
