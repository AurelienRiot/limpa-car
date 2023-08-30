"use client";
import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useState } from "react";
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
import {
  getEventCounts,
  getFreeDays,
  getFullDays,
  getPartiallyFullDays,
  getWeekendDays,
} from "@/components/calendar/get-functions-calendar";

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
        handleMonthChange(day);
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

  const handleMonthChange = useCallback(async (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    setMonth(month);

    const daysInMonth = eachDayOfInterval({ start, end });
    const saturdaysAndSundays = getWeekendDays(daysInMonth);
    setDisabledDays(saturdaysAndSundays);

    const events = await getAllEvents(start, end);
    if (events) {
      setEvents(events);

      const eventCounts = getEventCounts(events);

      const partiallyFullDays = getPartiallyFullDays(eventCounts);
      setPartiallyFullDays(partiallyFullDays);

      const fullDays = getFullDays(eventCounts);
      setFullDays(fullDays);

      setFreeDays(
        getFreeDays(
          daysInMonth,
          saturdaysAndSundays,
          fullDays,
          partiallyFullDays
        )
      );
    } else {
      resetDays(daysInMonth, saturdaysAndSundays);
    }
  }, []);

  const resetDays = (daysInMonth: Date[], saturdaysAndSundays: Date[]) => {
    setEvents([]);
    setPartiallyFullDays([]);
    setFullDays([]);
    setFreeDays(
      daysInMonth.filter(
        (day) =>
          !saturdaysAndSundays.some((disabledDay) =>
            isSameDay(disabledDay, day)
          )
      )
    );
  };

  useEffect(() => {
    handleMonthChange(new Date());
  }, [handleMonthChange]);

  return (
    <>
      <Card className="col-span-1 pt-4 sm:p-4 sm:col-span-2 xl:col-span-1">
        <CardTitle className="pl-4 sm:pl-0">Calendrier</CardTitle>
        <CardContent>
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
              handleMonthChange(month);
            }}
            // defaultMonth={new Date(2023, 0)}
          />
        </CardContent>
      </Card>
      <Card className="col-span-1 p-4 sm:col-span-2 xl:col-span-3">
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
