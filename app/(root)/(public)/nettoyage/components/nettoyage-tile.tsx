"use client";
import { CalendarModal } from "@/components/modals/calendar-modal";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Markdown, cn } from "@/lib/utils";
import { ProductWithCategoryAndImages } from "@/types";

import { MouseEventHandler, useState } from "react";

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

    cart.addItem(selectedProduct, date);
    setLoading(false);
    setOpenCalendar(false);
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
      <div className="w-auto p-6 border-2 bg-background group rounded-3xl border-primary">
        <div className="flex flex-row items-center gap-5">
          <div>{iconComponent}</div>
          <span className="text-xl font-bold">{selectedProduct.name}</span>
        </div>
        <span className="flex mt-4 mb-4 text-lg">
          {selectedProduct.description}
        </span>
        <div className="flex justify-between gap-2 mx-4">
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

        <Markdown className="mt-4 overflow-y-auto h-1/2 ">
          {selectedProduct.productSpecs}
        </Markdown>

        <div className="my-4 tracking-widest border border-dashed border-border" />

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
    </>
  );
};

export default NettoyageTile;
