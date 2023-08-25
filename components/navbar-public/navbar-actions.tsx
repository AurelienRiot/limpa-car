"use client";

import useCart from "@/hooks/use-cart";
import { ShoppingBag, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { LoginButton, LogoutButton } from "../auth/auth";
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
import { HiOutlineExternalLink } from "react-icons/hi";
import { ThemeToggle } from "../navbar-admin/theme.toggle";
import IconButton from "../ui/icon-button";
import { Session } from "next-auth";

const NavbarAction: React.FC<{ session: Session | null }> = ({ session }) => {
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

  const dashboard =
    session?.user?.role === "admin" ? "/admin" : "/dashboard-user";

  return (
    <div className="flex items-center ml-4 gap-x-2 sm:gap-x-4 ">
      {session && (
        <Link
          href={dashboard}
          className="flex items-center justify-center p-2 transition border rounded-full shadow-md hover:scale-110 bg-primary text-primary-foreground hover:rounded-full hover:bg-accent hover:text-accent-foreground"
        >
          <User2 className="w-4 h-4 " />
        </Link>
      )}

      {!session && <LoginButton />}
      <ThemeToggle />

      <Sheet onOpenChange={setIsOpen} open={isOpen}>
        <SheetTrigger className="inline-flex items-center justify-center w-auto h-10 px-5 py-3 text-sm font-semibold transition rounded-full ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-75 ">
          <ShoppingBag size={20} />
          <span className="w-3 ml-1 text-sm font-medium ">{totalQuantity}</span>
        </SheetTrigger>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>
              <Link
                onClick={() => setIsOpen(false)}
                href="/cart-page"
                className="flex items-center gap-2 justify-left hover:underline"
              >
                {" "}
                Passer commande <HiOutlineExternalLink />
              </Link>
            </SheetTitle>
            <SheetDescription>
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
                        className="flex p-1 mb-4 border rounded-lg sm:border-2 sm:p-2 bg-card border-border"
                      >
                        <CartItem data={item} />
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarAction;
