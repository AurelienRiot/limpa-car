import axios, { AxiosError } from "axios";
import { addDays } from "date-fns";
import toast from "react-hot-toast";

export const maxEventsPerDay = 4;

const IsAvailable = async (
  dateOfEvent: Date | undefined,
  dates: { [productId: string]: Date[] },
) => {
  try {
    if (!dateOfEvent) {
      return false;
    }

    const currentDay = new Date();
    const effectiveDate = addDays(currentDay, 2);

    if (dateOfEvent < effectiveDate) {
      return false;
    }

    const dayOfWeek = dateOfEvent.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return false;
    }

    const response = await axios.post("/api/is-available", { dateOfEvent });

    const eventCountFromResponse = response.data.length;
    console.log(eventCountFromResponse);
    // Count events from the dates prop
    const eventCountFromDates = Object.values(dates)
      .flat()
      .filter(
        (date) =>
          new Date(date).toISOString().split("T")[0] ===
          dateOfEvent?.toISOString().split("T")[0],
      ).length;

    const eventCount = eventCountFromResponse + eventCountFromDates;

    if (eventCount >= maxEventsPerDay) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    if (axiosError.response && axiosError.response.data) {
      toast.error(axiosError.response.data as string);
    } else {
      toast.error("Erreur");
    }
  }
};

export default IsAvailable;
