import { API_URL } from "@/lib/utils";
import { Product } from "@prisma/client";
import axios from "axios";

const GetProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`${API_URL}/products/${id}`);

  return res.data;
};

export default GetProduct;
