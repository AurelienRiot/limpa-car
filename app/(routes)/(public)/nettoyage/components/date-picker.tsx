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
  disabledStyle,
  freeDaysStyle,
  fullDaysStyle,
  getFooterMessage,
  partiallyFullDaysStyle,
} from "@/components/calendar/days-styles";
import { useEffect, useState } from "react";
import getReservations from "@/actions/get-reservations";

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
    const reservation = await getReservations(month);
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
            <CalendarIcon className="w-4 h-4 mr-2" />
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
            footer={getFooterMessage(isDayAvailable)}
            onMonthChange={setMonth}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
