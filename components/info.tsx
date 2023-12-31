"use client";

import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { MouseEventHandler } from "react";
import useCart from "@/hooks/use-cart";
import { Markdown } from "@/components/markdown";
import Link from "next/link";
import { ProductWithCategoryAndImages } from "@/types";
import toast from "react-hot-toast";

interface InfoProps {
  data: ProductWithCategoryAndImages;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const value = Number(data.priceHT);

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
    toast.success("Produit ajouté au panier");
  };

  return (
    <div>
      <Link
        href={`/product/${data.id}`}
        className="text-3xl font-bold text-gray-900 dark:text-white"
      >
        {data.name}
      </Link>
      <div className="mt-3 items-end justify-between">
        <p className="text-2xl text-gray-900 dark:text-white">
          <Currency value={value} />
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <p>{data.description}</p>
        </div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button
          variant="rounded"
          className="flex items-center gap-x-2 hover:scale-105"
          onClick={onAddToCart}
        >
          Ajouter au panier
          <ShoppingCart />
        </Button>
      </div>

      <Markdown className="mt-8 ">{data.productSpecs}</Markdown>
    </div>
  );
};

export default Info;
