import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Container from "@/components/ui/container";
import { Suspense } from "react";
import Loading from "@/app/(routes)/(public)/loading";
import ImagesAccueil from "./components/images-accueil";
import prismadb from "@/lib/prismadb";
import { VisibleElement } from "@/components/animations/visible-element";
import GetProducts from "@/actions-server/get-products";
import ProductList from "@/components/products-list";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const products = await GetProducts({ isFeatured: true });

  const imagesAccueil = await prismadb.billboard.findFirst({
    where: {
      label: "Acceuil",
    },
  });
  const imageUrl = imagesAccueil?.imageUrl || "";

  return (
    <>
      <ImagesAccueil name={session?.user?.name} imageUrl={imageUrl} />
      <Container>
        <div className="relative pt-6 pb-10 space-y-10 h-[2000px] bg-primary-foreground bg-clip-padding  ">
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col px-4 mb-16 gap-y-8 sm:px-6 lg:px-8">
              <ProductList title="Produits mise en avant" items={products} />
            </div>
          </Suspense>

          <VisibleElement
            variant="fade"
            className="w-auto overflow-auto break-after-column"
          >{`L'utilisateur est ${JSON.stringify(session)}`}</VisibleElement>
        </div>
      </Container>
    </>
  );
}
