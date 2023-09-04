"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { fr } from "date-fns/locale";
import {
  eachDayOfInterval,
  endOfMonth,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { DayClickEventHandler } from "react-day-picker";
import GetAllEvents from "@/actions/get-all-events";
import { Event, User } from "@prisma/client";
import {
  disabledStyle,
  freeDaysStyle,
  fullDaysStyle,
  GetFooterMessage,
  partiallyFullDaysStyle,
} from "@/components/calendar/days-styles";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import DisplayEvents from "./display-events";
import {
  GetEventCounts,
  GetFreeDays,
  GetFullDays,
  GetPartiallyFullDays,
  GetWeekendDays,
} from "@/components/calendar/get-functions-calendar";
import { Button } from "@/components/ui/button";
import { EventModal } from "@/components/modals/event-modal";
import { Plus } from "lucide-react";

type AdminCalendarProps = {
  currentDate: Date;
  initialEvents: (Event & { user: User | null })[];
  saturdaysAndSundays: Date[];
  initialFreeDays: Date[];
  initialPartiallyFullDays: Date[];
  initialFullDays: Date[];
  users: { id: string; name: string | null; email: string | null }[];
};

const AdminCalendar = ({
  currentDate,
  initialEvents,
  saturdaysAndSundays,
  initialFreeDays,
  initialPartiallyFullDays,
  initialFullDays,
  users,
}: AdminCalendarProps) => {
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(currentDate);
  const [month, setMonth] = useState<Date>(currentDate);
  const [isDayAvailable, setIsDayAvailable] = useState<
    "full" | "partiallyFull" | "free" | "unavailable" | null
  >(null);

  const [events, setEvents] =
    useState<(Event & { user: User | null })[]>(initialEvents);
  const [disabledDays, setDisabledDays] = useState<Date[]>(saturdaysAndSundays);
  const [freeDays, setFreeDays] = useState<Date[]>(initialFreeDays);
  const [partiallyFullDays, setPartiallyFullDays] = useState<Date[]>(
    initialPartiallyFullDays
  );
  const [fullDays, setFullDays] = useState<Date[]>(initialFullDays);

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

  const handleMonthChange = async (month: Date) => {
    const start = startOfMonth(month);
    const end = endOfMonth(month);
    setMonth(month);

    const daysInMonth = eachDayOfInterval({ start, end });
    const saturdaysAndSundays = GetWeekendDays(daysInMonth);
    setDisabledDays(saturdaysAndSundays);

    const events = await GetAllEvents(start, end);
    if (events) {
      setEvents(events);

      const eventCounts = GetEventCounts(events);

      const partiallyFullDays = GetPartiallyFullDays(eventCounts);
      setPartiallyFullDays(partiallyFullDays);

      const fullDays = GetFullDays(eventCounts);
      setFullDays(fullDays);

      setFreeDays(
        GetFreeDays(
          daysInMonth,
          saturdaysAndSundays,
          fullDays,
          partiallyFullDays
        )
      );
    } else {
      resetDays(daysInMonth, saturdaysAndSundays);
    }
  };

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

  return (
    <>
      <EventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        users={users}
      />
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
              disabled: disabledStyle,
            }}
            onDayClick={handleDayClick}
            footer={GetFooterMessage(isDayAvailable)}
            onMonthChange={handleMonthChange}
          />
        </CardContent>
      </Card>
      <Card className="flex justify-between col-span-1 p-4 sm:col-span-2 xl:col-span-3">
        <div>
          <CardTitle>Rendez vous du jour</CardTitle>
          <CardContent className="p-0 sm:pl-2">
            <DisplayEvents
              date={date}
              dailyEvents={events.filter(
                (event) => date && isSameDay(new Date(event.dateOfEvent), date)
              )}
            />
          </CardContent>
        </div>
        <Button
          onClick={() => setIsEventModalOpen(true)}
          className="self-start"
        >
          <Plus className="w-8 h-8 mr-2 sm:h-4 sm:w-4" />
          Creer un rendez vous
        </Button>
      </Card>
    </>
  );
};

export default AdminCalendar;
