import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";
import { Image, Product } from ".prisma/client";

export type FormattedProduct = Omit<Product, "priceHT" | "options"> & {
  priceHT: number;
  options?: string;
};

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismadb.category.findMany();

  const formattedProduct: (FormattedProduct & { images: Image[] }) | null =
    product
      ? {
          ...product,
          options: product.options ? product.options : undefined,
          priceHT: parseFloat(String(product.priceHT)),
        }
      : null;

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductForm categories={categories} initialData={formattedProduct} />
      </div>
    </div>
  );
};

export default ProductPage;
