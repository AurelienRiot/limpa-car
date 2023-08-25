import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "./[...nextauth]/route";
import { getToken } from "next-auth/jwt";

const url = process.env.NEXT_PUBLIC_API_URL_STORE;
const secureCookie = url?.startsWith("https://");

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("unauthorized", { status: 401 });
  }
  const encoded = await getToken({ req, raw: true, secureCookie });

  if (!encoded) {
    return new NextResponse("unauthorized", { status: 401 });
  }

  return NextResponse.json({ authenticated: !!session, session });
}
