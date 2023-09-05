import { dateFormatter } from "@/lib/utils";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export const maxEventsPerDay = 4;

const IsAvailables = async (
  itemsWithQuantitiesAndDates: {
    id: string;
    quantity: number;
    dates: Date[];
  }[]
) => {
  try {
    const allDates = itemsWithQuantitiesAndDates.flatMap((item) => item.dates);
    if (allDates.length > 0) {
      const existingEvents = await axios.post("/api/is-availables", {
        allDates,
      });

      const existingEventsByDate = existingEvents.data.reduce(
        (
          acc: Record<string, number>,
          event: {
            dateOfEvent: Date;
          }
        ) => {
          const eventDate = new Date(event.dateOfEvent).toISOString();
          acc[eventDate] = (acc[eventDate] || 0) + 1;
          return acc;
        },
        {}
      );

      const newEventsByDate = itemsWithQuantitiesAndDates.reduce(
        (acc: Record<string, number>, item) => {
          item.dates.forEach((date) => {
            if (!(date instanceof Date)) {
              date = new Date(date);
            }
            const dateStr = date.toISOString();
            acc[dateStr] = (acc[dateStr] || 0) + 1;
          });
          return acc;
        },
        {}
      );

      for (const dateStr in newEventsByDate) {
        const existingEventsOnDate = existingEventsByDate[dateStr] || 0;
        const newEventsOnDate = newEventsByDate[dateStr];
        if (existingEventsOnDate + newEventsOnDate > maxEventsPerDay) {
          toast.error(
            `Le ${dateFormatter(new Date(dateStr))} n'est plus disponible`
          );
          return false;
        }
      }
    }

    return true;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      toast.error(axiosError.response.data as string);
    } else {
      toast.error("Erreur");
    }
  }
};

export default IsAvailables;
