import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { dateOfEvent } = await req.json();

    if (!dateOfEvent) {
      return new NextResponse("Date incorrecte", {
        status: 400,
      });
    }

    const events = await prismadb.event.findMany({
      where: {
        dateOfEvent,
      },
      select: {
        dateOfEvent: true,
      },
    });

    return new NextResponse(JSON.stringify(events), {
      status: 200,
    });
  } catch (error) {
    console.log("[ISAVAILABLE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
