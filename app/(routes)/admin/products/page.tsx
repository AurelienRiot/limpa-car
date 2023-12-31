import prismadb from "@/lib/prismadb";
import { ProductClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";

const ProductsPage = async () => {
  const products = await prismadb.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    options: item.options ? item.options : null,
    isFeatured: item.isFeatured ? "oui" : "non",
    isArchived: item.isArchived ? "oui" : "non",
    priceHT: formatter.format(item.priceHT),
    category: item.category.name,
    createdAt: item.createdAt,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
