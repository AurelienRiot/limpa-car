import { maxEventsPerDay } from "@/actions/isAvailable";
import { Event, User } from "@prisma/client";
import { getDay, isSameDay } from "date-fns";

export const GetWeekendDays = (daysInMonth: Date[]) => {
  return daysInMonth.filter((day) => {
    const dayOfWeek = getDay(day);
    return dayOfWeek === 6 || dayOfWeek === 0;
  });
};

export const GetEventCounts = (events: (Event & { user: User | null })[]) => {
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
  return eventCounts;
};

export const GetPartiallyFullDays = (eventCounts: {
  [date: string]: number;
}) => {
  return Object.entries(eventCounts)
    .filter(([date, count]) => count >= 1 && count < maxEventsPerDay)
    .map(([date, count]) => new Date(date));
};

export const GetFullDays = (eventCounts: { [date: string]: number }) => {
  return Object.entries(eventCounts)
    .filter(([date, count]) => count >= maxEventsPerDay)
    .map(([date, count]) => new Date(date));
};

export const GetFreeDays = (
  daysInMonth: Date[],
  saturdaysAndSundays: Date[],
  fullDays: Date[],
  partiallyFullDays: Date[]
) => {
  return daysInMonth.filter(
    (day) =>
      !saturdaysAndSundays.some((disabledDay) => isSameDay(disabledDay, day)) &&
      !fullDays.some((fullDay) => isSameDay(fullDay, day)) &&
      !partiallyFullDays.some((partialDay) => isSameDay(partialDay, day))
  );
};
