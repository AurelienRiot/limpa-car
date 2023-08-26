import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BsGear } from "react-icons/bs";
import GetUser from "@/actions/get-user-server";
import { LogoutButton } from "@/components/auth/auth";

const UserDashboard = async () => {
  const session = await getServerSession(authOptions);
  const callbackUrl = "/dashboard-user";

  if (!session || !session.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }

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
    </div>
  );
};

export default UserDashboard;
