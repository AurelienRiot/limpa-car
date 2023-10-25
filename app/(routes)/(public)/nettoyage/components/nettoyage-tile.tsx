"use client";
import IsAvailable from "@/actions/isAvailable";
import { CalendarModal } from "@/components/modals/calendar-modal";
import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

import { useState } from "react";
import toast from "react-hot-toast";
import { ProductWithCategoryAndImagesAndSpecs } from "../page";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

interface NettoyageTileProps {
  sameProducts: ProductWithCategoryAndImagesAndSpecs[];
  iconComponent: JSX.Element;
}

const NettoyageTile: React.FC<NettoyageTileProps> = ({
  iconComponent,
  sameProducts,
}) => {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithCategoryAndImagesAndSpecs>(sameProducts[0]);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    let { clientX, clientY } = event;
    let { left, top } = event.currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const cart = useCart();

  const handleOnConfirm = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    setLoading(true);
    const isDayAvailable = await IsAvailable(date, cart.dates);
    if (!isDayAvailable) {
      toast.error(
        "Ce jour n'est plus disponible, veuillez choisir un autre jour",
      );
      setLoading(false);
      return;
    }
    const { productSpecsMarkdown, ...rest } = selectedProduct;
    cart.addItem(rest, date);
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
      <div
        className="group relative flex flex-col justify-between rounded-3xl border-2 border-primary/10 bg-card p-6 shadow-2xl transition-all hover:translate-y-4 lg:w-96"
        onMouseMove={handleMouseMove}
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(57, 95, 152, 0.15),
              transparent 80%
            )
          `,
          }}
        />
        <div>
          <div className="flex flex-col items-center gap-5 sm:flex-row">
            {iconComponent}
            <span className="text-xl font-bold">{selectedProduct.name}</span>
          </div>
          <span className="mb-4 mt-4 flex text-lg">
            {selectedProduct.description}
          </span>
          <div className="mx-4 flex justify-start gap-2 lg:justify-between">
            {sameProducts.map((product) => {
              return (
                <Button
                  onClick={() => setSelectedProduct(product)}
                  key={product.id}
                  data-state={
                    product === selectedProduct ? "active" : "inactive"
                  }
                  className={
                    "bg-primary-foreground text-primary hover:bg-primary hover:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground "
                  }
                >
                  {product.options}
                </Button>
              );
            })}
          </div>

          {selectedProduct.productSpecsMarkdown}

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
            className="mt-6 rounded-xl bg-emerald-100 px-4 py-3 text-lg font-semibold text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white"
          >
            Reserver une date
          </Button>
        </div>
      </div>
    </>
  );
};

export default NettoyageTile;
