import prismadb from "@/lib/prismadb";

const getProduct = async (id: string) => {
  const product = await prismadb.product.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
      category: true,
    },
  });

  return product;
};

export default getProduct;
