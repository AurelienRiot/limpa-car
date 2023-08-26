import getProducts from "@/actions/get-products-server";
import NettoyageTile from "./components/nettoyage-tile";
import { MdOutlineLocalCarWash } from "react-icons/md";
import { ProductWithCategoryAndImages } from "@/types";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getCategory from "@/actions/get-category-server";

export const metadata = {
  title: "Limpa Car - Nettoyage",
};

const Nettoyage = async () => {
  const products = (await getProducts({ categoryName: "Nettoyage" })).sort(
    (a, b) => a.priceHT - b.priceHT
  );

  const category = await getCategory(products[0].categoryId);

  const groupedProductsObj = products.reduce<
    Record<string, ProductWithCategoryAndImages[]>
  >((acc, product) => {
    if (!acc[product.name]) {
      acc[product.name] = [];
    }
    acc[product.name].push(product);
    return acc;
  }, {});

  const groupedProducts = Object.values(groupedProductsObj);

  return (
    <Container>
      {category && <Billboard data={category.billboard} />}
      <h1 className="mt-12 text-5xl font-bold text-center">
        Formules ou sur Devis
      </h1>

      <div className="flex flex-col items-center justify-between gap-2 m-6 lg:items-start lg:flex-row ">
        {groupedProducts.map((sameProduct) => (
          <NettoyageTile
            key={sameProduct[0].id}
            sameProducts={sameProduct}
            iconComponent={<MdOutlineLocalCarWash size={20} />}
          />
        ))}
      </div>
    </Container>
  );
};

export default Nettoyage;
