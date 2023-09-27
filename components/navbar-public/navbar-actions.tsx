"use client";

import useCart from "@/hooks/use-cart";
import { ExternalLink, ShoppingBag, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginButton } from "../auth/auth-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import CartItem from "../cart/cart-item";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "../navbar-admin/theme.toggle";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const NavbarAction: React.FC<{ role: string | undefined }> = ({ role }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  const totalQuantity = Object.values(cart.quantities).reduce((total, qte) => {
    return total + qte;
  }, 0);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-4 flex items-center gap-x-2 sm:gap-x-4 ">
      {role ? (
        <Link
          href={role === "admin" ? "/admin" : "/dashboard-user"}
          className="group flex items-center justify-center rounded-full border bg-primary p-2 text-primary-foreground shadow-md transition hover:rounded-full hover:bg-accent hover:text-accent-foreground"
        >
          <User2 className="h-6 w-6 duration-300 ease-linear group-hover:scale-150 " />
        </Link>
      ) : (
        <LoginButton />
      )}

      <ThemeToggle />

      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger className={cn(buttonVariants({ variant: "rounded" }))}>
          <ShoppingBag size={20} />
          <span className="ml-1 w-3 text-sm font-medium ">{totalQuantity}</span>
        </SheetTrigger>
        <SheetContent className="w-auto overflow-y-auto">
          <SheetHeader className="pb-2 sm:pb-4">
            <SheetTitle>
              <Link
                onClick={() => setIsOpen(false)}
                href="/cart-page#summary"
                className={cn(
                  buttonVariants(),
                  "group mt-6 flex items-center justify-center gap-2 hover:underline sm:text-lg",
                )}
              >
                {" "}
                Passer commande{" "}
                <ExternalLink className="h-5 w-5 transition-transform group-hover:scale-110" />
              </Link>
            </SheetTitle>
            <SheetDescription>Contenue de votre panier</SheetDescription>
          </SheetHeader>
          <div className="lg:col-span-7">
            {cart.items.length === 0 && (
              <p className="text-secondary-foreground ">
                Aucun produit dans le panier
              </p>
            )}
            <ul>
              <AnimatePresence>
                {cart.items.map((item) => (
                  <motion.li
                    key={item.id}
                    layout
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{
                      layout: { type: "tween" },
                      animate: { duration: 1 },
                    }}
                    className="mb-4 flex rounded-lg border border-border bg-card p-1 sm:border-2 sm:p-2"
                  >
                    <CartItem data={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarAction;
