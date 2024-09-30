import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThumbsUpIcon, ThumbsDownIcon, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string | number;
  title: string;
  tags: string[];
  body: string;
  views: number;
  likes: number;
  dislikes: number;
}

export const PostPreview = ({
  id,
  title,
  tags,
  body,
  views,
  likes,
  dislikes,
}: BlogCardProps) => {
  return (
    <Link
      to={`/posts/${id}`}
      className="block transition-transform hover:scale-105"
      unstable_viewTransition
    >
      <Card className="flex flex-col w-full h-full max-w-md">
        <CardHeader className="flex-grow">
          <h2 className="mb-3 text-2xl font-bold">{title}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 line-clamp-3">{body}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <EyeIcon className="w-4 h-4" aria-hidden="true" />
            <span>{views.toLocaleString()} vistas</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <ThumbsUpIcon
                className="w-4 h-4 text-green-500"
                aria-hidden="true"
              />
              <span className="text-sm">{likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsDownIcon
                className="w-4 h-4 text-red-500"
                aria-hidden="true"
              />
              <span className="text-sm">{dislikes}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
