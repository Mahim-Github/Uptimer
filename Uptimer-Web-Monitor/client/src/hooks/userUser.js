import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/apiFunctions";

export function useUser() {
  const { data, isPending, isFetching, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: false, // Disable retries for auth requests
  });
  return { data, isPending, isFetching, isLoading };
}
