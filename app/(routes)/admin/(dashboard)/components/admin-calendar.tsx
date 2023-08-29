"use client";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { fr } from "date-fns/locale";
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  getDay,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { DayClickEventHandler } from "react-day-picker";
import getAllEvents from "@/actions/get-all-events";
import { Event, User } from "@prisma/client";
import {
  disabled,
  freeDaysStyle,
  fullDaysStyle,
  getFooterMessage,
  partiallyFullDaysStyle,
} from "@/components/calendar/days-styles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DisplayEvents from "./display-events";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [isDayAvailable, setIsDayAvailable] = useState<
    "full" | "partiallyFull" | "free" | "unavailable" | null
  >(null);
  const [events, setEvents] = useState<(Event & { user: User })[]>([]);
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);
  const [freeDays, setFreeDays] = useState<Date[]>([]);
  const [partiallyFullDays, setPartiallyFullDays] = useState<Date[]>([]);
  const [fullDays, setFullDays] = useState<Date[]>([]);

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (day) {
      if (modifiers.outside) {
        setMonth(day);
        setIsDayAvailable(null);
        return;
      }
      if (modifiers.partiallyFull) {
        setIsDayAvailable("partiallyFull");
        return;
      }
      if (modifiers.full) {
        setIsDayAvailable("full");
        return;
      }
      if (modifiers.free) {
        setIsDayAvailable("free");
        return;
      }
      if (!modifiers.partiallyFull && !modifiers.full && !modifiers.free) {
        setIsDayAvailable("unavailable");
        return;
      }
      if (modifiers.selected) {
        setIsDayAvailable(null);
        return;
      }
    } else {
      setIsDayAvailable(null);
    }
  };

  useEffect(() => {
    handleMonthChange(month);
  }, [month]);

  const handleMonthChange = async (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    setMonth(month);

    const daysInMonth = eachDayOfInterval({ start, end });
    const saturdaysAndSundays = daysInMonth.filter((day) => {
      const dayOfWeek = getDay(day);
      return dayOfWeek === 6 || dayOfWeek === 0;
    });
    setDisabledDays((prev) => saturdaysAndSundays);

    const events = await getAllEvents(start, end);
    if (events) {
      setEvents((prev) => events);

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

      const partiallyFullDays = Object.entries(eventCounts)
        .filter(([date, count]) => count === 2 || count === 3 || count === 1)
        .map(([date, count]) => new Date(date));
      setPartiallyFullDays(partiallyFullDays);
      const fullDays = Object.entries(eventCounts)
        .filter(([date, count]) => count === 4)
        .map(([date, count]) => new Date(date));
      setFullDays(fullDays);

      setFreeDays((prev) =>
        daysInMonth.filter(
          (day) =>
            !saturdaysAndSundays.some((disabledDay) =>
              isSameDay(disabledDay, day)
            ) &&
            !fullDays.some((fullDay) => isSameDay(fullDay, day)) &&
            !partiallyFullDays.some((partialDay) => isSameDay(partialDay, day))
        )
      );
    } else {
      setEvents([]);
      setPartiallyFullDays([]);
      setFullDays([]);
      setFreeDays((prev) =>
        daysInMonth.filter(
          (day) =>
            !saturdaysAndSundays.some((disabledDay) =>
              isSameDay(disabledDay, day)
            )
        )
      );
    }
    console.log(events);
  };

  return (
    <>
      <Card className="col-span-1 p-4 md:col-span-2 xl:col-span-1">
        <CardTitle>Calendrier</CardTitle>
        <CardContent className="p-0 sm:pl-2">
          <Calendar
            mode="single"
            captionLayout="buttons"
            selected={date}
            month={month}
            locale={fr}
            onSelect={setDate}
            modifiers={{
              full: fullDays,
              partiallyFull: partiallyFullDays,
              free: freeDays,
              disabled: disabledDays,
            }}
            modifiersStyles={{
              full: fullDaysStyle,
              partiallyFull: partiallyFullDaysStyle,
              free: freeDaysStyle,
              disabled: disabled,
            }}
            onDayClick={handleDayClick}
            footer={getFooterMessage(isDayAvailable)}
            onMonthChange={(month) => {
              setMonth(month);
            }}
            // defaultMonth={new Date(2023, 0)}
          />
        </CardContent>
      </Card>
      <Card className="col-span-1 p-4 md:col-span-2 xl:col-span-3">
        <CardTitle>Rendez vous du jour</CardTitle>
        <CardContent className="p-0 sm:pl-2">
          <DisplayEvents
            date={date}
            dailyEvents={events.filter(
              (event) => date && isSameDay(new Date(event.dateOfEvent), date)
            )}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default AdminCalendar;
