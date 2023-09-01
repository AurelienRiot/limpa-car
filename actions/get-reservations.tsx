"use client";
import {
  getFreeDays,
  getFullDays,
  getPartiallyFullDays,
  getWeekendDays,
} from "@/components/calendar/get-functions-calendar";
import axios, { AxiosError } from "axios";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  isPast,
  isThisMonth,
  startOfMonth,
} from "date-fns";
import toast from "react-hot-toast";

type getReservationsOutput = {
  fullDays: Date[];
  partiallyFullDays: Date[];
  freeDays: Date[];
  disabledDays: Date[];
};
const getReservations = async (
  month: Date
): Promise<getReservationsOutput | undefined> => {
  try {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    const currentDay = new Date();
    const effectiveDate = addDays(currentDay, 3);

    if (
      (!isThisMonth(start) && isPast(start)) ||
      (isThisMonth(start) && !isThisMonth(effectiveDate))
    ) {
      const fullDays: Date[] = [];
      const partiallyFullDays: Date[] = [];
      const freeDays: Date[] = [];
      const disabledDays: Date[] = eachDayOfInterval({ start, end });
      return { fullDays, partiallyFullDays, freeDays, disabledDays };
    }

    if (isThisMonth(start)) {
      const reservations = await axios.post("/api/reservations", {
        start,
        end,
      });
      const events: { dateOfEvent: string }[] = reservations.data;

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

      return { fullDays, partiallyFullDays, freeDays, disabledDays };
    }

    const reservations = await axios.post("/api/reservations", {
      start,
      end,
    });
    const events: { dateOfEvent: string }[] = reservations.data;

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

    return { fullDays, partiallyFullDays, freeDays, disabledDays };
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    if (axiosError.response && axiosError.response.data) {
      toast.error(axiosError.response.data as string);
    } else {
      toast.error("Erreur");
    }
  }
};

export default getReservations;
