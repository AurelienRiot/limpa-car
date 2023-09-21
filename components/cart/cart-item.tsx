"use client";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import useCart from "@/hooks/use-cart";
import { dateFormatter } from "@/lib/utils";
import { ProductWithCategoryAndImages } from "@/types";
import { Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

interface CartItemProps {
  data: ProductWithCategoryAndImages;
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const value = Number(data.priceHT);
  const quantity = cart.quantities[data.id];
  const dates = cart.dates[data.id];

  const onRemove = () => {
    cart.removeItem(data.id);
    toast.success("Produit retiré du panier");
  };

  const handleIncrement = () => {
    cart.addItem(data);
  };
  const handleDecrement = () => {
    cart.removeOneItem(data.id);
  };

  const handleRemoveDate = (date: Date) => {
    cart.removeOneItem(data.id, date);

    toast.success("Produit retirée du panier");
  };

  return (
    <>
      <div className="relative h-24 w-24 rounded-md bg-white sm:h-40 sm:w-40">
        <Image
          fill
          src={data.images[0].url}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          alt="image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute right-0 top-0 z-10">
          <IconButton
            className="h-6 w-6 bg-primary-foreground p-1 sm:h-8 sm:w-8 sm:p-2"
            onClick={onRemove}
            icon={<X size={15} className="text-primary" />}
          />
        </div>
        <div className="relative flex flex-col text-left sm:gap-y-2 lg:gap-y-4">
          <div className="flex justify-between ">
            <Link
              href={`/product/${data.id}`}
              className="pr-10 text-base font-semibold text-primary sm:text-lg"
            >
              {data.name} {data.options}
            </Link>
          </div>
          <p>
            <Currency value={value} />
          </p>
          {!dates || !dates.length ? (
            <div className="items-left flex flex-wrap gap-2 text-sm sm:flex-col sm:text-base ">
              Quantité :
              <div className="flex items-center gap-2">
                <IconButton
                  className="h-5 w-5 bg-primary-foreground p-0.5  "
                  onClick={handleDecrement}
                  icon={<Minus size={20} className="text-primary" />}
                />
                {quantity}
                <IconButton
                  className="h-5 w-5 bg-primary-foreground p-0.5 "
                  onClick={handleIncrement}
                  icon={<Plus size={20} className="stroke-2 font-bold" />}
                />
              </div>
            </div>
          ) : (
            <div>
              {" "}
              {dates.map((date, index) => (
                <div key={index} className="flex items-center">
                  {quantity > 1 && (
                    <IconButton
                      className="mr-2 h-5 w-5 bg-primary-foreground p-0.5"
                      onClick={() => handleRemoveDate(date)}
                      icon={<X size={15} className="text-primary" />}
                    />
                  )}
                  {dateFormatter(new Date(date))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartItem;
