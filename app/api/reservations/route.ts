import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  isPast,
  isThisMonth,
  startOfMonth,
} from "date-fns";
import {
  getFreeDays,
  getFullDays,
  getPartiallyFullDays,
  getWeekendDays,
} from "@/components/calendar/get-functions-calendar";

export async function POST(req: Request) {
  try {
    const { month } = await req.json();

    if (!month) {
      return new NextResponse("Le mois est nécessaires", {
        status: 400,
      });
    }
    const start = startOfMonth(new Date(month));
    const end = endOfMonth(new Date(month));
    const currentDay = new Date();
    const effectiveDate = addDays(currentDay, 3);
    console.log("date send:", month);
    console.log("start: ", start);
    console.log("end: ", start);
    console.log("currentDay: ", start);
    console.log("effectiveDay: ", start);

    if (
      (!isThisMonth(start) && isPast(start)) ||
      (isThisMonth(start) && !isThisMonth(effectiveDate))
    ) {
      const fullDays: Date[] = [];
      const partiallyFullDays: Date[] = [];
      const freeDays: Date[] = [];
      const disabledDays: Date[] = eachDayOfInterval({ start, end });
      return new NextResponse(
        JSON.stringify({ fullDays, partiallyFullDays, freeDays, disabledDays }),
        {
          status: 200,
        }
      );
    }

    if (isThisMonth(start)) {
      const events = await prismadb.event.findMany({
        where: {
          dateOfEvent: {
            gte: effectiveDate,
            lte: end,
          },
        },
        select: {
          dateOfEvent: true,
        },
      });

      const previousDays = eachDayOfInterval({
        start,
        end: addDays(effectiveDate, -1),
      });
      const daysInterval = eachDayOfInterval({ start: effectiveDate, end });
      const weekendDays = getWeekendDays(daysInterval);
      const disabledDays = [...weekendDays, ...previousDays];

      const eventCounts: { [date: string]: number } = {};
      events.forEach((event) => {
        const dateOfEvent = new Date(event.dateOfEvent);
        dateOfEvent.setHours(dateOfEvent.getHours() + 2);
        const dateStr = dateOfEvent.toISOString().split("T")[0];
        if (!eventCounts[dateStr]) {
          eventCounts[dateStr] = 0;
        }
        eventCounts[dateStr]++;
      });

      const partiallyFullDays = getPartiallyFullDays(eventCounts);
      const fullDays = getFullDays(eventCounts);
      const freeDays = getFreeDays(
        daysInterval,
        weekendDays,
        fullDays,
        partiallyFullDays
      );

      return new NextResponse(
        JSON.stringify({ fullDays, partiallyFullDays, freeDays, disabledDays }),
        {
          status: 200,
        }
      );
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

    const eventCounts: { [date: string]: number } = {};
    events.forEach((event) => {
      const dateOfEvent = new Date(event.dateOfEvent);
      dateOfEvent.setHours(dateOfEvent.getHours() + 2);
      const dateStr = dateOfEvent.toISOString().split("T")[0];
      if (!eventCounts[dateStr]) {
        eventCounts[dateStr] = 0;
      }
      eventCounts[dateStr]++;
    });

    const effectiveStart = effectiveDate > start ? effectiveDate : start;
    const daysInMonth = eachDayOfInterval({ start: effectiveStart, end });

    let disabledDays = getWeekendDays(daysInMonth);
    if (effectiveDate > start) {
      const daysBetweenStartAndEffective = eachDayOfInterval({
        start,
        end: addDays(effectiveDate, -1),
      });
      disabledDays = [...disabledDays, ...daysBetweenStartAndEffective];
    }
    const partiallyFullDays = getPartiallyFullDays(eventCounts);
    const fullDays = getFullDays(eventCounts);
    const freeDays = getFreeDays(
      daysInMonth,
      disabledDays,
      fullDays,
      partiallyFullDays
    );

    return new NextResponse(
      JSON.stringify({ fullDays, partiallyFullDays, freeDays, disabledDays }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("[EVENTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
