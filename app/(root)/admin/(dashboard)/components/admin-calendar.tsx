"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { fr } from "date-fns/locale";
import { addDays } from "date-fns";
import { DayClickEventHandler } from "react-day-picker";

const AdminCalendar = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isDayAvailable, setIsDayAvailable] = useState<
    "full" | "partiallyFull" | "free" | "unavailable" | null
  >(null);
  const fullDays = [new Date(), addDays(new Date(), 2)];
  const partiallyFullDays = [
    addDays(new Date(), 4),
    addDays(new Date(), -2),
    addDays(new Date(), 1),
  ];
  const freeDays = [
    addDays(new Date(), 3),
    addDays(new Date(), -1),
    addDays(new Date(), 5),
  ];

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
  );
};

export default AdminCalendar;
