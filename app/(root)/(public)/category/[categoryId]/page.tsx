import getCategory from "@/actions/get-category-server";
import getProducts from "@/actions/get-products-server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import NoResults from "@/components/ui/no-results";
import ProductCart from "@/components/product-cart";
import { getServerSession } from "next-auth";
import NotFound from "@/app/not-found";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
}

const CategoryPage: React.FC<CategoryPageProps> = async ({ params }) => {
  const category = await getCategory(params.categoryId);

  if (!category || category.name === "Nettoyage") {
    return <NotFound />;
  }

  const products = await getProducts({
    categoryId: params.categoryId,
  });

  const session = await getServerSession(authOptions);

  return (
    <div>
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 pb-24 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-5 lg-gap-x-8">
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-clos-4 lg:grid-cols-5">
                {products.map((item) => (
                  <ProductCart key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
