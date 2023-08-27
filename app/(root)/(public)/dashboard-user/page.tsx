import Link from "next/link";
import { BsGear } from "react-icons/bs";
import GetUser from "@/actions/get-user-server";
import { LogoutButton } from "@/components/auth/auth";
import ClientData from "./components/client-data";

const UserDashboard = async () => {
  const user = await GetUser();

  return (
    <div className="gap-4 mt-4 mb-4">
      <div className="flex flex-col items-center justify-center w-auto h-auto mb-4 text-gray-800 border-2 rounded-md shadow-xl dark:text-white">
        <h1 className="text-3xl font-bold text-center">
          {user?.name
            ? user.name
            : "Faite un achat pour avoir accès à votre profile"}
        </h1>

        <Link href="/dashboard-user/settings" className="mt-2 ">
          <BsGear size={20} className="cursor-pointer" />
        </Link>
      </div>
      <LogoutButton />
      <ClientData />
    </div>
  );
};

export default UserDashboard;
