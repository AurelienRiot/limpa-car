import prismadb from "@/lib/prismadb";
import { ProductWithCategoryAndImages } from "@/types";

interface Query {
  categoryId?: string;
  isFeatured?: boolean;
}

const getProducts = async (
  query: Query
): Promise<ProductWithCategoryAndImages[]> => {
  const categoryId = query.categoryId || undefined;
  const isFeatured = query.isFeatured || undefined;

  const products = await prismadb.product.findMany({
    where: {
      categoryId,
      isFeatured,
      isArchived: false,
    },
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return products;
};

export default getProducts;
