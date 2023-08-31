import { User, Event } from "@prisma/client";
import { getDay, isSameDay } from "date-fns";

export const getWeekendDays = (daysInMonth: Date[]) => {
  return daysInMonth.filter((day) => {
    const dayOfWeek = getDay(day);
    return dayOfWeek === 6 || dayOfWeek === 0;
  });
};

export const getEventCounts = (events: (Event & { user: User | null })[]) => {
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

export const getPartiallyFullDays = (eventCounts: {
  [date: string]: number;
}) => {
  return Object.entries(eventCounts)
    .filter(([date, count]) => count === 2 || count === 3 || count === 1)
    .map(([date, count]) => new Date(date));
};

export const getFullDays = (eventCounts: { [date: string]: number }) => {
  return Object.entries(eventCounts)
    .filter(([date, count]) => count === 4)
    .map(([date, count]) => new Date(date));
};

export const getFreeDays = (
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
