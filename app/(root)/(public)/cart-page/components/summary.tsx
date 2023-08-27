"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Currency from "@/components/ui/currency";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { Session } from "next-auth";

interface SummaryProps {
  session: Session | null;
}

const Summary: React.FC<SummaryProps> = ({ session }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const quantities = useCart((state) => state.quantities);
  const dates = useCart((state) => state.dates);
  const removeAll = useCart((state) => state.removeAll);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (searchParams.get("canceled")) {
      toast.error("Erreur de paiement.");
      router.replace("/cart-page");
    }
  }, [removeAll, searchParams, router]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.priceHT) * Number(quantities[item.id]);
  }, 0);

  const onCheckout = async () => {
    setLoading(true);
    if (!session) {
      const callbackUrl = "/cart";
      router.replace(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      return;
    }
    const itemsWithQuantitiesAndDates = items.map((item) => {
      return {
        id: item.id,
        quantity: quantities[item.id],
        dates: dates[item.id],
      };
    });
    try {
      const checkout = await axios.post(`/api/checkout`, {
        itemsWithQuantitiesAndDates,
        totalPrice: totalPrice.toFixed(2),
      });
      window.location = checkout.data.url;
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError?.response?.data as string, { duration: 8000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="summary"
      className="px-4 py-6 mt-16 bg-gray-100 border-2 rounded-lg dark:bg-black sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-xl font-medium text-gray-500">Votre Commmande</h2>
      <ul className="pt-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <div>
              {quantities[item.id] > 1 && <span> {quantities[item.id]}x </span>}
              <strong>{item.name} </strong>{" "}
            </div>
            <Currency value={item.priceHT} className="justify-self-end" />
          </li>
        ))}
      </ul>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-base font-medium text-gray-500">Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        disabled={items.length === 0 || loading}
        onClick={onCheckout}
        variant="rounded"
        className="w-full mt-6"
      >
        Passer la commande
      </Button>
    </div>
  );
};
export default Summary;
