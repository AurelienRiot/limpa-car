import { API_URL } from "@/lib/utils";
import { Category } from "@prisma/client";
import axios from "axios";

const GetCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`${API_URL}/categories`);
  return res.data;
};

export default GetCategories;
