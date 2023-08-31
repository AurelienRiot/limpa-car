import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const isAvailable = async (date: Date | undefined) => {
  try {
    const responce = await axios.post("/api/is-available", { date });

    if (responce.data) {
      return true;
    } else {
      return false;
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
