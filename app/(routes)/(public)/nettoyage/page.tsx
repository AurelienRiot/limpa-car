import GetCategory from "@/actions-server/get-category";
import GetProducts from "@/actions-server/get-products";
import Billboard from "@/components/billboard";
import { Markdown } from "@/components/markdown";
import Container from "@/components/ui/container";
import { ProductWithCategoryAndImages } from "@/types";
import Image from "next/image";
import Link from "next/link";
import NettoyageTile from "./components/nettoyage-tile";

export const metadata = {
  title: "Limpa Car - Nettoyage",
};

export type ProductWithCategoryAndImagesAndSpecs =
  ProductWithCategoryAndImages & {
    productSpecsMarkdown: JSX.Element;
  };

const NettoyagePage = async () => {
  const products = (await GetProducts({ categoryName: "Nettoyage" })).sort(
    (a, b) => a.priceHT - b.priceHT,
  );

  const productsWithSpecs: ProductWithCategoryAndImagesAndSpecs[] =
    products.map((product) => {
      return {
        ...product,
        productSpecsMarkdown: (
          <Markdown className="max-h-1/2 mt-4 overflow-y-auto">
            {product.productSpecs}
          </Markdown>
        ),
      };
    });

  const category = await GetCategory(products[0].categoryId);

  const groupedProductsObj = productsWithSpecs.reduce<
    Record<string, ProductWithCategoryAndImagesAndSpecs[]>
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
      <h1 className="mt-12 text-center text-5xl font-bold">
        Formules ou sur Devis
      </h1>
      <h2 className="py-4 text-center text-3xl font-semibold">
        Pour les Utilitaires , SUV et Monospace sur devis.
      </h2>
      <p className="text-center text-xl font-semibold">
        Si vous souhaitez une formule sur mesure merci de{" "}
        <Link className="text-blue-500 hover:underline" href="/contact">
          me contacter
        </Link>
        <br />
        directement pour vous établir un devis.
      </p>

      <div className="m-6 flex flex-col items-center justify-between gap-2 lg:flex-row lg:items-start ">
        {groupedProducts.map((sameProduct) => (
          <NettoyageTile
            key={sameProduct[0].id}
            sameProducts={sameProduct}
            iconComponent={
              <Image
                src="/car-wash.webp"
                alt="Nettoyage"
                width={100}
                height={100}
                className="h-auto w-auto bg-transparent  "
              />
            }
          />
        ))}
      </div>
    </Container>
  );
};

export default NettoyagePage;
