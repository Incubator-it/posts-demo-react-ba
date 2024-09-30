import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EyeIcon, ThumbsUpIcon, ThumbsDownIcon } from "lucide-react";
import { Comments } from "@/components/comments";
import useGetPost from "@/hooks/queries/posts/useGetPost";
import { UserPreview } from "@/components/user-preview";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError, error } = useGetPost(id);

  if (isLoading) {
    return <div className="py-4 text-center">Loading post...</div>;
  }

  if (isError) {
    return <div className="py-4 text-center text-red-500">{error.message}</div>;
  }

  return (
    <div className="w-full px-4 py-8">
      <Card className="w-full mx-auto">
        <CardHeader>
          <h1 className="mb-3 text-3xl font-bold">{post.title}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-gray-700">{post.body}</p>
          <UserPreview id={post.userId} />
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <EyeIcon className="w-4 h-4" aria-hidden="true" />
            <span>{post.views.toLocaleString()} views</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <ThumbsUpIcon
                className="w-4 h-4 text-green-500"
                aria-hidden="true"
              />
              <span className="text-sm">{post.reactions.likes}</span>
            </span>
            <span className="flex items-center space-x-1">
              <ThumbsDownIcon
                className="w-4 h-4 text-red-500"
                aria-hidden="true"
              />
              <span className="text-sm">{post.reactions.dislikes}</span>
            </span>
          </div>
        </CardFooter>
      </Card>
      {id && <Comments postId={parseInt(id)} />}
    </div>
  );
}
