import getProducts from "@/actions-server/get-products";
import NettoyageTile from "./components/nettoyage-tile";
import LocalCarWashIcon from "@mui/icons-material/LocalCarWash";
import { ProductWithCategoryAndImages } from "@/types";
import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getCategory from "@/actions-server/get-category";
import Link from "next/link";

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
      <h2 className="py-4 text-3xl font-semibold text-center">
        Pour les Utilitaires , SUV et Monospace sur devis.
      </h2>
      <p className="text-xl font-semibold text-center">
        Si vous souhaitez une formule sur mesure merci de{" "}
        <Link className="text-blue-500 hover:underline" href="/contact">
          me contacter
        </Link>
        <br />
        directement pour vous établir un devis.
      </p>

      <div className="flex flex-col items-center justify-between gap-2 m-6 lg:items-start lg:flex-row ">
        {groupedProducts.map((sameProduct) => (
          <NettoyageTile
            key={sameProduct[0].id}
            sameProducts={sameProduct}
            iconComponent={<LocalCarWashIcon className="w-8 h-8" />}
          />
        ))}
      </div>
    </Container>
  );
};

export default Nettoyage;
