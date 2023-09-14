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
  freeDaysStyle,
  fullDaysStyle,
  GetFooterMessage,
  partiallyFullDaysStyle,
} from "@/components/calendar/days-styles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { CalendarCheck, Plus } from "lucide-react";
import { CardHightlight } from "@/components/highlight";

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
        refetchData={handleMonthChange}
      />
      <Card className="col-span-1 pt-4 sm:p-4 sm:pt-2 sm:col-span-2 xl:col-span-3 ">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="pl-4 sm:pl-0">Calendrier</CardTitle>
          <CalendarCheck className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <Calendar
            mode="single"
            captionLayout="buttons"
            selected={date}
            month={month}
            locale={fr}
            onSelect={setDate}
            disabled={disabledDays}
            modifiers={{
              full: fullDays,
              partiallyFull: partiallyFullDays,
              free: freeDays,
            }}
            modifiersStyles={{
              full: fullDaysStyle,
              partiallyFull: partiallyFullDaysStyle,
              free: freeDaysStyle,
            }}
            onDayClick={handleDayClick}
            footer={GetFooterMessage(isDayAvailable)}
            onMonthChange={handleMonthChange}
          />
        </CardContent>
      </Card>
      <CardHightlight
        trigger={date}
        duration={500}
        highlightColor="green"
        highlightVariant="ringHighlight"
        className="flex flex-col justify-between col-span-1 pt-4 sm:p-4 xl:flex-row sm:col-span-2 xl:col-span-5"
      >
        <div>
          <CardTitle className="m-2 mb-4 xl:mb-12">
            Rendez vous du jour
          </CardTitle>
          <CardContent className="p-0 sm:pl-2 xl:ml-6">
            <DisplayEvents
              date={date}
              refetchData={handleMonthChange}
              dailyEvents={events.filter(
                (event) => date && isSameDay(new Date(event.dateOfEvent), date)
              )}
            />
          </CardContent>
        </div>
        <Button
          className="mt-4 max-w-max md:m-2"
          onClick={() => setIsEventModalOpen(true)}
        >
          <Plus className="w-8 h-8 mr-2 sm:h-4 sm:w-4 shrink-0" />
          Creer un rendez vous
        </Button>
      </CardHightlight>
    </>
  );
};

export default AdminCalendar;
