import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserIcon,
  MapPinIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  CreditCardIcon,
  HeartPulseIcon,
} from "lucide-react";
import useGetUser from "@/hooks/queries/users/useGetUser";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  address: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  university: string;
  company: {
    name: string;
    title: string;
    department: string;
    address: {
      address: string;
      city: string;
      state: string;
      postalCode: string;
      country: string;
    };
  };
  bank: {
    cardType: string;
    currency: string;
  };
}

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError, error } = useGetUser(id);

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!user) {
    return <div className="py-4 text-center">No user data found. 🤷‍♂️</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <AvatarFallback>
                <UserIcon className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-bold">
                {user.firstName} {user.lastName}{" "}
                {user.gender === "female" ? "👩" : "👨"}
              </CardTitle>
              <p className="text-gray-500">@{user.username}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="mb-2 text-xl font-semibold">
              📋 Personal Information
            </h2>
            <ul className="space-y-2">
              <li>
                <strong>Age:</strong> {user.age} 🎂
              </li>
              <li>
                <strong>Birthday:</strong>{" "}
                {new Date(user.birthDate).toLocaleDateString()} 🎉
              </li>
              <li>
                <strong>Email:</strong> {user.email} 📧
              </li>
              <li>
                <strong>Phone:</strong> {user.phone} 📱
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">🏠 Address</h2>
            <p>
              <MapPinIcon className="inline-block mr-2" />
              {user.address.address}, {user.address.city}, {user.address.state}{" "}
              {user.address.postalCode}, {user.address.country}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">💼 Work</h2>
            <p>
              <BriefcaseIcon className="inline-block mr-2" />
              {user.company.title} at {user.company.name}
            </p>
            <p>
              <strong>Department:</strong> {user.company.department}
            </p>
            <p>
              <strong>Company Address:</strong> {user.company.address.address},{" "}
              {user.company.address.city}, {user.company.address.state}{" "}
              {user.company.address.postalCode}, {user.company.address.country}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">🎓 Education</h2>
            <p>
              <GraduationCapIcon className="inline-block mr-2" />
              {user.university}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">💳 Bank Information</h2>
            <p>
              <CreditCardIcon className="inline-block mr-2" />
              Card Type: {user.bank.cardType}
            </p>
            <p>
              <strong>Currency:</strong> {user.bank.currency}
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">
              🩺 Physical Characteristics
            </h2>
            <ul className="space-y-2">
              <li>
                <HeartPulseIcon className="inline-block mr-2" />
                Blood Group: {user.bloodGroup}
              </li>
              <li>
                <strong>Height:</strong> {user.height} cm
              </li>
              <li>
                <strong>Weight:</strong> {user.weight} kg
              </li>
              <li>
                <strong>Eye Color:</strong> {user.eyeColor} 👁️
              </li>
              <li>
                <strong>Hair:</strong> {user.hair.color} {user.hair.type} 💇
              </li>
            </ul>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetail;
