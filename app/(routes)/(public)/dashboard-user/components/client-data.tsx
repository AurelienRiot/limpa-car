"use client";
import useCart from "@/hooks/use-cart";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const ClientData = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success-order")) {
      toast.success("Paiement réussi.");
      router.replace("/dashboard-user");
      removeAll();
    }
  }, [removeAll, searchParams, router]);

  return <div>Donnée CLient</div>;
};

export default ClientData;
