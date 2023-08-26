"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { addDays } from "date-fns";
import DatePicker from "@/components/ui/date-picker";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export const CalendarModal: React.FC<CalendarModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  date,
  setDate,
}) => {
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

  return (
    <Modal
      title="Choissez une date"
      description="Prenez un jour libre"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="items-center gap-4 sm:flex">
        <DatePicker
          aria-disabled={loading}
          date={date}
          setDate={setDate}
          fullDays={fullDays}
          freeDays={freeDays}
          partiallyFullDays={partiallyFullDays}
        />
        <Button disabled={loading} onClick={onConfirm} className="mt-4 sm:mt-0">
          Ajouté au panier
        </Button>
      </div>
    </Modal>
  );
};
