import { Link } from "react-router-dom";
import { UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useGetUser from "@/hooks/queries/users/useGetUser";

interface UserPreviewProps {
  id: string | number;
}

export const UserPreview = ({ id }: UserPreviewProps) => {
  const { data, isLoading, isError, error } = useGetUser(id);

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      <div className="flex items-center mb-6 space-x-4">
        <Avatar>
          <AvatarImage
            src={data.image}
            alt={`${data.firstName} ${data.lastName}`}
          />
          <AvatarFallback>
            <UserIcon className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{`${data.firstName} ${data.lastName}`}</p>
          <p className="text-sm text-gray-500">{`${data.company.title} @ ${data.company.name}`}</p>
        </div>
      </div>
      <Button asChild>
        <Link to={`/users/${data.id}`} unstable_viewTransition>
          View more about {data.firstName}
        </Link>
      </Button>
    </div>
  );
};
