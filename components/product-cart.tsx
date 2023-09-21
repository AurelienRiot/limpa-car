"use client";

import Image from "next/image";
import IconButton from "@/components/ui/icon-button";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "./ui/currency";
import { useRouter } from "next/navigation";
import { MouseEventHandler } from "react";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { VisibleElement } from "./animations/visible-element";
import { ProductWithCategoryAndImages } from "@/types";
import toast from "react-hot-toast";

type ProductCartProps = {
  data: ProductWithCategoryAndImages;
};

const ProductCart: React.FC<ProductCartProps> = ({ data }) => {
  const router = useRouter();
  const cart = useCart();
  const previewModal = usePreviewModal();

  const value = Number(data.priceHT);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
    toast.success("Produit ajouté au panier");
  };

  return (
    <div
      onClick={handleClick}
      className="group m-2 cursor-pointer space-y-4 rounded-xl border bg-secondary p-3 transition-transform hover:scale-105"
    >
      <VisibleElement className="relative aspect-square rounded-xl bg-white before:absolute before:inset-0 before:z-10 before:rounded-xl before:bg-black/20 before:opacity-0 before:duration-300 before:ease-linear before:animate-in group-hover:before:opacity-100 ">
        <Image
          src={data?.images?.[0].url}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          alt="Image"
          className="aspect-square rounded-xl object-cover "
        />
        <div className="absolute bottom-5 w-full px-6 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
          <div className="flex justify-center gap-x-6">
            <IconButton
              className="z-20"
              title="Aperçue"
              onClick={onPreview}
              icon={<Expand size={20} className="text-foreground" />}
            />
            <IconButton
              className="z-20"
              title="Ajouté au panier"
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-foreground" />}
            />
          </div>
        </div>
      </VisibleElement>
      <div>
        <p className="text-lg font-semibold text-primary">{data.name}</p>
        <p className="text-sm text-secondary-foreground">
          {data.category?.name}
        </p>
      </div>
      <div className="flex items-center justify-between text-primary">
        <Currency value={value} />
      </div>
    </div>
  );
};

export default ProductCart;
