import GetProduct from "@/actions-server/get-product";
import GetProducts from "@/actions-server/get-products";
import NotFound from "@/app/not-found";
import Gallery from "@/components/gallery/gallery";
import Info from "@/components/info";
import ProductList from "@/components/products-list";
import Container from "@/components/ui/container";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await GetProduct(params.productId);

  if (!product || product.category.name === "Nettoyage") {
    return <NotFound />;
  }

  const suggestedProducts = await GetProducts({
    categoryId: product.categoryId,
  });

  return (
    <div className="gb-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.images} />
            <div className="px-4 mt-10 sm:mt-16 sm:px-0 lg:mt-0">
              <Info data={product} />
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Produits Similaires" items={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
