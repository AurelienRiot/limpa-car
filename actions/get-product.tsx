import { Product } from "@prisma/client";
import axios from "axios";

const GetProduct = async (id: string): Promise<Product> => {
  const res = await axios.get(`/api/products/${id}`);

  return res.data;
};

export default GetProduct;
