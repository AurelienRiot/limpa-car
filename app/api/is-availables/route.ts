import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { allDates } = await req.json();

    const existingEvents = await prismadb.event.findMany({
      where: {
        dateOfEvent: {
          in: allDates,
        },
      },
      select: {
        dateOfEvent: true,
      },
    });

    return new NextResponse(JSON.stringify(existingEvents), {
      status: 200,
    });
  } catch (error) {
    console.log("[ISAVAILABLES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
