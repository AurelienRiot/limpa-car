import { API_URL } from "@/lib/utils";
import { ProductWithCategoryAndImages } from "@/types";
import axios from "axios";
import qs from "query-string";

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (
  query: Query
): Promise<ProductWithCategoryAndImages[]> => {
  const url = qs.stringifyUrl({
    url: `${API_URL}/products`,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await axios.get(url);
  return res.data;
};

export default getProducts;
