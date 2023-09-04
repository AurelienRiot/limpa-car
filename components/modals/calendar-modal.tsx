"use client";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import DatePicker from "@/app/(routes)/(public)/nettoyage/components/date-picker";

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
  return (
    <Modal
      title="Choissez une date"
      description="Prenez un jour libre"
      isOpen={isOpen}
      onClose={onClose}
      className="left-[50%] top-[30%]"
    >
      <div className="items-center gap-4 sm:flex">
        <DatePicker aria-disabled={loading} date={date} setDate={setDate} />
        <Button disabled={loading} onClick={onConfirm} className="mt-4 sm:mt-0">
          Ajouté au panier
        </Button>
      </div>
    </Modal>
  );
};
