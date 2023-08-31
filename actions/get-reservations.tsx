"use client";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type getReservationsOutput = {
  fullDays: Date[];
  partiallyFullDays: Date[];
  freeDays: Date[];
  disabledDays: Date[];
};
const getReservations = async (
  month: Date
): Promise<getReservationsOutput | undefined> => {
  try {
    const reservations = await axios.post("/api/reservations", {
      month,
    });

    const fullDays = reservations.data.fullDays.map(
      (day: string) => new Date(day)
    );
    const partiallyFullDays = reservations.data.partiallyFullDays.map(
      (day: string) => new Date(day)
    );
    const freeDays = reservations.data.freeDays.map(
      (day: string) => new Date(day)
    );
    const disabledDays = reservations.data.disabledDays.map(
      (day: string) => new Date(day)
    );

    return { fullDays, partiallyFullDays, freeDays, disabledDays };
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

export default getReservations;
