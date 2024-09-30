import api from "@/services/api";
import { useQuery } from "@tanstack/react-query";

const useGetPost = (postId: string | undefined) => {
  if (!postId) {
    throw new Error("postId is required");
  }

  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => api.posts.getPostById(postId),
  });
};

export default useGetPost;
