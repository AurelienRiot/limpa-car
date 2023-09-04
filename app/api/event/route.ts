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

    const { name, description, date, user } = await req.json();

    if (!name) {
      return new NextResponse("Le nom est nécessaire", {
        status: 400,
      });
    }
    if (!description) {
      return new NextResponse("La description est nécessaire", {
        status: 400,
      });
    }
    if (!date) {
      return new NextResponse("La date est nécessaire", {
        status: 400,
      });
    }
    const events = await prismadb.event.create({
      data: {
        name: name,
        description: description,
        dateOfEvent: new Date(date),
        user: user
          ? {
              connect: { id: user },
            }
          : undefined,
      },
    });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log("[EVENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
