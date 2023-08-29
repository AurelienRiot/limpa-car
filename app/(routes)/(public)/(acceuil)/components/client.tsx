"use client";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";

const Client = () => {
  const emailSend = async () => {
    try {
      const email = await axios.post("/api/email", {
        email: "acquis0_mod@icloud.com",
        name: "acquis0",
      });
      console.log(email.data);
    } catch (error) {
      const axiosErorr = error as AxiosError;
      console.log(axiosErorr.response);
    }
  };

  return <Button onClick={() => emailSend()}>Envoyer un mail</Button>;
};

export default Client;
