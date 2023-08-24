import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import AuthPage from "./auth";
import Image from "next/image";
export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <p>hello {session?.user?.name}</p>
      <Image
        src={session?.user?.image ? session?.user?.image : ""}
        alt="Vercel Logo"
        width={72}
        height={16}
      />
      <AuthPage />
    </div>
  );
}
