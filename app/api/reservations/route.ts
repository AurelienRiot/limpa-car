import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { start, end } = await req.json();

    if (!start) {
      return new NextResponse("Le mois est nécessaires", {
        status: 400,
      });
    }
    if (!end) {
      return new NextResponse("Le mois est nécessaires", {
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
      select: {
        dateOfEvent: true,
      },
    });

    return new NextResponse(JSON.stringify(events), {
      status: 200,
    });
  } catch (error) {
    console.log("[EVENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
