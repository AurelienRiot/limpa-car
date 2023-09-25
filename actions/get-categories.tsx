import { Category } from "@prisma/client";
import axios from "axios";

const GetCategories = async (): Promise<Category[]> => {
  const res = await axios.get(`/api/categories`);
  return res.data;
};

export default GetCategories;
