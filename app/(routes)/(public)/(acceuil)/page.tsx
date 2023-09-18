import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Container from "@/components/ui/container";
import { Suspense } from "react";
import Loading from "@/app/(routes)/(public)/loading";
import prismadb from "@/lib/prismadb";
import { VisibleElement } from "@/components/animations/visible-element";
import GetProducts from "@/actions-server/get-products";
import ProductList from "@/components/products-list";
import ContactAcceuil from "./components/contact-acceuil";
import Temoignage from "./components/temoignage";
import NosPrestations from "./components/nos-prestations";
import CarrouselSlider from "./components/carrousel-slider";

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
      {/* <ImagesAccueil name={session?.user?.name} imageUrl={imageUrl} /> */}
      <Container>
        <CarrouselSlider />
        <div className="relative space-y-10 bg-primary-foreground bg-clip-padding px-4 pb-10 pt-6 ">
          <Suspense fallback={<Loading />}>
            <div className="mb-16 flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
              <ProductList title="Produits mise en avant" items={products} />
            </div>
          </Suspense>

          <VisibleElement
            variant="fade"
            className="w-auto break-after-column overflow-auto"
          >{`L'utilisateur est ${JSON.stringify(session)}`}</VisibleElement>

          <NosPrestations />
          <Temoignage />
          <ContactAcceuil />
        </div>
      </Container>
    </>
  );
}
