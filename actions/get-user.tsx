import { UserWithAddresseAndMessage } from "@/type";
import axios from "axios";

const GetUser = async (): Promise<UserWithAddresseAndMessage> => {
  const res = await axios.get(`/api/users/user`);
  return res.data;
};

export default GetUser;
