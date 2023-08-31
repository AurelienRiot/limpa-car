import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { addDays } from "date-fns";

export async function POST(req: Request) {
  try {
    const { date } = await req.json();

    console.log("mois API: ", date);
    if (!date) {
      return new NextResponse("false", {
        status: 200,
      });
    }

    const dateCheck = new Date(date);
    const currentDay = new Date();
    const effectiveDate = addDays(currentDay, 3);

    if (dateCheck < effectiveDate) {
      return new NextResponse("false", {
        status: 200,
      });
    }

    const dayOfWeek = dateCheck.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return new NextResponse("false", {
        status: 200,
      });
    }

    const events = await prismadb.event.findMany({
      where: {
        dateOfEvent: dateCheck,
      },
      select: {
        dateOfEvent: true,
      },
    });

    const eventCount = events.length;

    if (eventCount > 3) {
      return new NextResponse("false", {
        status: 200,
      });
    } else {
      return new NextResponse("true", {
        status: 200,
      });
    }
  } catch (error) {
    console.log("[ISAVAILABLE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
