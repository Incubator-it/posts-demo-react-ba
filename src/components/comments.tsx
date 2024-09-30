import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUpIcon, UserIcon } from "lucide-react";
import useGetPostComments from "@/hooks/queries/posts/useGetPostComments";

interface CommentsProps {
  postId: number;
}

export function Comments({ postId }: CommentsProps) {
  const { data, isLoading, isError, error } = useGetPostComments(postId);

  if (isLoading) {
    return <div className="py-4 text-center">Loading comments...</div>;
  }

  if (isError) {
    return <div className="py-4 text-center text-red-500">{error.message}</div>;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Comments ({data.comments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {data.comments.length === 0 ? (
          <p className="text-center text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {data.comments.map((comment) => (
              <li key={comment.id}>
                <Card>
                  <CardContent className="pt-4">
                    <div className="flex items-start space-x-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.user.fullName}`}
                          alt={comment.user.fullName}
                        />
                        <AvatarFallback>
                          <UserIcon className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{comment.user.fullName}</p>
                        <p className="text-sm text-gray-500">
                          @{comment.user.username}
                        </p>
                        <p className="mt-2">{comment.body}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <ThumbsUpIcon className="w-4 h-4 mr-1" />
                          <span>{comment.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
