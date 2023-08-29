import { dateFormatter } from "@/lib/utils";
import { Event, User } from "@prisma/client";
import Link from "next/link";

type DisplayEventsProps = {
  dailyEvents: (Event & { user: User })[];
  date: Date | undefined;
};

const DisplayEvents = ({ dailyEvents, date }: DisplayEventsProps) => {
  return (
    <>
      {date ? (
        <div>
          <p>{dateFormatter(new Date(date))}</p>
          {dailyEvents.length === 0 ? (
            <p> Aucun évènement pour cette date </p>
          ) : (
            <>
              {dailyEvents.map((event) => (
                <div key={event.id}>
                  <Link
                    href={`/admin/users/${event.user.id}`}
                    target="_blank"
                    className="hover:underline"
                  >
                    {" "}
                    {event.name}
                  </Link>
                  <p>{event.description}</p>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <p> Veuillez selectionner une date </p>
      )}
    </>
  );
};

export default DisplayEvents;
