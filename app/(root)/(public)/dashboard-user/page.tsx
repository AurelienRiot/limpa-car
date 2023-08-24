import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LogoutButton } from "@/components/auth/auth";

const UserDashboard = async () => {
  const session = await getServerSession(authOptions);
  const callbackUrl = "/dashboard-user";

  if (!session || !session.user || !session.user.image) {
    redirect(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  console.log(session);

  return (
    <div>
      <p>hello {session.user.name}</p>
      <Image
        src={session.user.image}
        alt="Vercel Logo"
        width={72}
        height={16}
      />
      <LogoutButton />
    </div>
  );
};

export default UserDashboard;
