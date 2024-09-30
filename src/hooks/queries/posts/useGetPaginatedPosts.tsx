import api from "@/services/api";
import {
  useQueryClient,
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";
import { useEffect } from "react";

export interface GetPostsProps {
  limit: number;
  skip: number;
  select: string;
  sortBy: string;
  order: "asc" | "desc";
}

const getQueryOptions = ({
  limit,
  skip,
  select,
  sortBy,
  order,
}: GetPostsProps) => {
  return {
    queryKey: ["posts", limit, skip, select, sortBy, order],
    queryFn: () =>
      api.posts.getPosts({
        limit,
        skip,
        select,
        sortBy,
        order,
      }),
  };
};

const useGetPaginatedPosts = (props: GetPostsProps) => {
  const queryClient = useQueryClient();

  // Prefetch next page
  useEffect(() => {
    queryClient.prefetchQuery(
      getQueryOptions({
        ...props,
        skip: props.skip + props.limit,
      })
    );
  }, [queryClient, props]);

  return useQuery({
    ...getQueryOptions(props),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: keepPreviousData,
  });
};

export default useGetPaginatedPosts;
