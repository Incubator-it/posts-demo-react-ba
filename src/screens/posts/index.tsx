import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetPaginatedPosts from "@/hooks/queries/posts/useGetPaginatedPosts";
import { PostPreview } from "../../components/post-preview";

function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const { data, isLoading, isError } = useGetPaginatedPosts({
    limit: 10,
    skip: (page - 1) * 10,
    select: "",
    sortBy: "",
    order: "asc",
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching posts</div>;

  return (
    <div>
      <div className="grid gap-4 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {data.posts.map((post) => (
          <PostPreview
            key={post.id}
            id={post.id}
            title={post.title}
            tags={post.tags}
            body={post.body}
            views={post.views}
            likes={post.likes}
            dislikes={post.dislikes}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => handlePageChange(page - 1)} />
          </PaginationItem>
          {page > 2 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {page > 3 && <PaginationEllipsis />}
          {page > 1 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(page - 1)}>
                {page - 1}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink isActive>{page}</PaginationLink>
          </PaginationItem>
          {data.posts?.length === 10 && (
            <PaginationItem>
              <PaginationLink onClick={() => handlePageChange(page + 1)}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          )}
          {data.posts?.length === 10 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext onClick={() => handlePageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default Posts;
