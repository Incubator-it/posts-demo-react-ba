import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (userId: string | number | undefined) => {
  if (!userId) {
    throw new Error("postId is required");
  }

  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => api.users.getUserById(userId),
  });
};

export default useGetUser;
