import { Event, User } from "@prisma/client";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const GetAllEvents = async (
  start: Date,
  end: Date
): Promise<(Event & { user: User })[] | undefined> => {
  try {
    const events = await axios.post("/api/events", {
      start,
      end,
    });

    return events.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      toast.error(axiosError.response.data as string);
    } else {
      toast.error("Erreur");
    }
    return [];
  }
};

export default GetAllEvents;
