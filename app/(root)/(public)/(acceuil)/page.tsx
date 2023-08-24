import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Client from "./client";
import Image from "next/image";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <Client />
      {session ? <p>Connecté</p> : <p>Non connecté</p>}
    </div>
  );
}
