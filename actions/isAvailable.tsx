import axios, { AxiosError } from "axios";
import { addDays } from "date-fns";
import toast from "react-hot-toast";

const isAvailable = async (date: Date | undefined) => {
  try {
    if (!date) {
      return false;
    }

    const currentDay = new Date();
    const effectiveDate = addDays(currentDay, 3);

    if (date < effectiveDate) {
      return false;
    }

    const dayOfWeek = date.getDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) {
      return false;
    }

    const responce = await axios.post("/api/is-available", { date });

    const eventCount = responce.data.length;

    if (eventCount > 3) {
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

export default isAvailable;
