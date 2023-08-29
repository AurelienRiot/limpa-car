import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== "admin") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const { start, end } = await req.json();

    if (!start || !end) {
      return new NextResponse("Les dates sont nécessaires", {
        status: 400,
      });
    }

    const events = await prismadb.event.findMany({
      where: {
        dateOfEvent: {
          gte: start,
          lte: end,
        },
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.log("[EVENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
