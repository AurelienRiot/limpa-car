"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayClickEventHandler } from "react-day-picker";
import { fr } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  freeDaysStyle,
  fullDaysStyle,
  GetFooterMessage,
  partiallyFullDaysStyle,
} from "@/components/calendar/days-styles";
import { useEffect, useState } from "react";
import GetReservations from "@/actions/get-reservations";
import Image from "next/image";

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const DatePicker = ({ className, date, setDate }: DatePickerProps) => {
  const [isDayAvailable, setIsDayAvailable] = useState<
    "full" | "partiallyFull" | "free" | "unavailable" | null
  >(null);
  const [disabledDays, setDisabledDays] = useState<Date[]>([]);
  const [freeDays, setFreeDays] = useState<Date[]>([]);
  const [partiallyFullDays, setPartiallyFullDays] = useState<Date[]>([]);
  const [fullDays, setFullDays] = useState<Date[]>([]);
  const [month, setMonth] = useState<Date>(date ? date : new Date());

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

  const handleMonthChange = async (month: Date) => {
    const reservation = await GetReservations(month);
    if (!reservation) return;
    const { fullDays, partiallyFullDays, freeDays, disabledDays } = reservation;

    setFullDays(fullDays);
    setPartiallyFullDays(partiallyFullDays);
    setFreeDays(freeDays);
    setDisabledDays(disabledDays);
  };

  useEffect(() => {
    handleMonthChange(month);
  }, [month]);

  return (
    <div className={cn("relative", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <svg
              width="800px"
              height="800px"
              viewBox="0 0 1024 1024"
              className="w-6 h-6 mr-2"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M106.666667 810.666667V298.666667h810.666666v512c0 46.933333-38.4 85.333333-85.333333 85.333333H192c-46.933333 0-85.333333-38.4-85.333333-85.333333z"
                fill="#CFD8DC"
              />
              <path
                d="M917.333333 213.333333v128H106.666667v-128c0-46.933333 38.4-85.333333 85.333333-85.333333h640c46.933333 0 85.333333 38.4 85.333333 85.333333z"
                fill="#F44336"
              />
              <path
                d="M704 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                fill="#B71C1C"
              />
              <path
                d="M320 213.333333m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                fill="#B71C1C"
              />
              <path
                d="M704 64c-23.466667 0-42.666667 19.2-42.666667 42.666667v106.666666c0 23.466667 19.2 42.666667 42.666667 42.666667s42.666667-19.2 42.666667-42.666667V106.666667c0-23.466667-19.2-42.666667-42.666667-42.666667zM320 64c-23.466667 0-42.666667 19.2-42.666667 42.666667v106.666666c0 23.466667 19.2 42.666667 42.666667 42.666667s42.666667-19.2 42.666667-42.666667V106.666667c0-23.466667-19.2-42.666667-42.666667-42.666667z"
                fill="#B0BEC5"
              />
              <path
                d="M277.333333 426.666667h85.333334v85.333333h-85.333334zM405.333333 426.666667h85.333334v85.333333h-85.333334zM533.333333 426.666667h85.333334v85.333333h-85.333334zM661.333333 426.666667h85.333334v85.333333h-85.333334zM277.333333 554.666667h85.333334v85.333333h-85.333334zM405.333333 554.666667h85.333334v85.333333h-85.333334zM533.333333 554.666667h85.333334v85.333333h-85.333334zM661.333333 554.666667h85.333334v85.333333h-85.333334zM277.333333 682.666667h85.333334v85.333333h-85.333334zM405.333333 682.666667h85.333334v85.333333h-85.333334zM533.333333 682.666667h85.333334v85.333333h-85.333334zM661.333333 682.666667h85.333334v85.333333h-85.333334z"
                fill="#90A4AE"
              />
            </svg>
            {date ? (
              format(new Date(date), "d MMMM yyyy", { locale: fr })
            ) : (
              <span>Choisir une date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="absolute w-auto p-0">
          <Calendar
            key={month.getTime()}
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
            onMonthChange={setMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
