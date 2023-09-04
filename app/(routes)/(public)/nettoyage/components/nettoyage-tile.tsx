"use client";
import IsAvailable from "@/actions/isAvailable";
import { CalendarModal } from "@/components/modals/calendar-modal";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Markdown } from "@/lib/markdown";
import { cn } from "@/lib/utils";
import { ProductWithCategoryAndImages } from "@/types";

import { useState } from "react";
import toast from "react-hot-toast";

interface NettoyageTileProps {
  sameProducts: ProductWithCategoryAndImages[];
  iconComponent: JSX.Element;
}

const NettoyageTile: React.FC<NettoyageTileProps> = ({
  iconComponent,
  sameProducts,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCategoryAndImages>(sameProducts[0]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const cart = useCart();

  const handleOnConfirm = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setLoading(true);
    const isDayAvailable = await IsAvailable(date, cart.dates);
    console.log(isDayAvailable);
    if (!isDayAvailable) {
      toast.error(
        "Ce jour n'est plus disponible, veuillez choisir un autre jour"
      );
      setLoading(false);
      return;
    }
    cart.addItem(selectedProduct, date);
    setLoading(false);
    setOpenCalendar(false);
    toast.success("Produit ajouté au panier");
  };

  return (
    <>
      <CalendarModal
        date={date}
        setDate={setDate}
        isOpen={openCalendar}
        onClose={() => setOpenCalendar(false)}
        loading={loading}
        onConfirm={handleOnConfirm}
      />
      <div className="relative flex flex-col justify-between w-full p-6 border-2 lg:w-96 bg-card group rounded-3xl border-primary">
        <div>
          <div className="flex items-center gap-5">
            {iconComponent}
            <span className="text-xl font-bold">{selectedProduct.name}</span>
          </div>
          <span className="flex mt-4 mb-4 text-lg">
            {selectedProduct.description}
          </span>
          <div className="flex justify-start gap-2 mx-4 lg:justify-between">
            {sameProducts.map((product) => {
              return (
                <Button
                  onClick={() => setSelectedProduct(product)}
                  key={product.id}
                  className={cn(
                    "hover:bg-primary hover:text-primary-foreground",
                    product === selectedProduct
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {product.options}
                </Button>
              );
            })}
          </div>

          <Markdown className="mt-4 overflow-y-auto max-h-1/2">
            {selectedProduct.productSpecs}
          </Markdown>

          <div className="my-4 border border-dashed border-border" />
        </div>

        <div>
          <div className="flex items-baseline justify-start">
            <Currency
              className="text-2xl font-bold "
              value={selectedProduct.priceHT}
            />
          </div>
          <Button
            onClick={(e) => setOpenCalendar(true)}
            className="px-4 py-3 mt-6 text-lg font-semibold bg-emerald-100 text-emerald-800 group-hover:text-white group-hover:bg-emerald-800 rounded-xl"
          >
            Reserver une date
          </Button>
        </div>
      </div>
    </>
  );
};

export default NettoyageTile;
