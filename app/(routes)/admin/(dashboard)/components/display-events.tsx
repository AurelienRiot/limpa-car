"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dateFormatter } from "@/lib/utils";
import { Event, User } from "@prisma/client";
import axios from "axios";
import { CircleOff, ExternalLink, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type DisplayEventsProps = {
  dailyEvents: (Event & { user: User | null })[];
  date: Date | undefined;
  refetchData: (month: Date) => void;
};

const DisplayEvents = ({
  dailyEvents,
  date,
  refetchData,
}: DisplayEventsProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [eventId, setEventId] = useState<string | null>(null);

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/event/${eventId}`);
      if (date) refetchData(date);
      router.refresh();
      toast.success("Commande supprimée");
    } catch (error) {
      toast.error("Erreur");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      {date ? (
        <div>
          <p className="mb-2 font-bold">{dateFormatter(new Date(date))}</p>
          {dailyEvents.length === 0 ? (
            <p> Aucun évènement pour cette date </p>
          ) : (
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Profil du client</TableHead>
                  <TableHead>Supprimer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dailyEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        {event.userId ? (
                          <Link
                            href={`/admin/users/${event.userId}`}
                            target="_blank"
                          >
                            <ExternalLink />
                          </Link>
                        ) : (
                          <CircleOff />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <Button
                          disabled={loading}
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setEventId(event.id);
                            setOpen(true);
                          }}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      ) : (
        <p> Veuillez selectionner une date </p>
      )}
    </>
  );
};

export default DisplayEvents;
