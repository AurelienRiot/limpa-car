"use client";

import * as React from "react";
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

interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  fullDays: Date[];
  partiallyFullDays: Date[];
  freeDays: Date[];
}

const DatePicker = ({
  className,
  date,
  setDate,
  fullDays,
  partiallyFullDays,
  freeDays,
}: DatePickerProps) => {
  const [isDayAvailable, setIsDayAvailable] = React.useState<
    "full" | "partiallyFull" | "free" | "unavailable" | null
  >(null);

  const fullDaysStyle = {
    border: "2px solid white",
    backgroundColor: "red",
  };

  const partiallyFullDaysStyle = {
    border: "2px solid white",
    backgroundColor: "orange",
  };

  const freeDaysStyle = {
    border: "2px solid white",
    backgroundColor: "green",
  };
  const footer =
    isDayAvailable === "full"
      ? "Ce jour est complet!"
      : isDayAvailable === "partiallyFull"
      ? "Ce jour est presque complet!"
      : isDayAvailable === "free"
      ? "Ce jour est libre"
      : isDayAvailable === "unavailable"
      ? "Choisisez un autre jour"
      : null;

  const handleDayClick: DayClickEventHandler = (day, modifiers) => {
    if (day) {
      if (modifiers.partiallyFull) {
        setIsDayAvailable("partiallyFull");
      }
      if (modifiers.full) {
        setIsDayAvailable("full");
      }
      if (modifiers.free) {
        setIsDayAvailable("free");
      }
      if (!modifiers.partiallyFull && !modifiers.full && !modifiers.free) {
        setIsDayAvailable("unavailable");
      }
      if (modifiers.selected) {
        setIsDayAvailable(null);
      }
    } else {
      setIsDayAvailable(null);
    }
  };

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
            mode="single"
            captionLayout="buttons"
            selected={date}
            locale={fr}
            onSelect={setDate}
            fromYear={1930}
            toYear={2030}
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
            footer={footer}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
