import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useGetPostComments = (postId: string | number) => {
  return useQuery({
    queryKey: ["postComments", postId],
    queryFn: () => api.posts.getPostCommentsById(postId),
  });
};

export default useGetPostComments;
