"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Car, LucidePhoneCall, StoreIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { VisibleElement } from "@/components/animations/visible-element";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Category } from "@prisma/client";
import { useCategories } from "@/hooks/use-categories";

const MainNav = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { categories } = useCategories();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const routesCategory = categories
    .filter((category) => category.name !== "Nettoyage")
    .map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathname.startsWith(`/category/${route.id}`),
    }));

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem className="rounded-lg border-2 border-border">
          <Link href="/nettoyage" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Car className="mr-2 hidden h-4 w-4 xl:flex" />
              Nettoyage
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative rounded-lg border-2 border-border">
          <button
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
          >
            {"  "} <StoreIcon className="mr-2 hidden h-4 w-4 xl:flex" />{" "}
            Produits
            <ChevronDown
              className={cn(
                `relative top-[1px] ml-1 h-3 w-3 transition duration-200`,
                open ? "rotate-180" : "",
              )}
              aria-hidden="true"
            />
          </button>

          <AnimatePresence>
            {open && (
              <VisibleElement
                as="ul"
                variant="bottom"
                className="absolute top-12 z-50 grid w-full gap-3 rounded-lg border-2 border-border bg-popover py-6 xl:px-2"
              >
                {routesCategory.map((route) => (
                  <li key={route.href}>
                    <Link
                      onClick={() => setOpen(false)}
                      href={route.href}
                      className={cn(
                        route.active
                          ? "text-popover-foreground "
                          : "text-muted-foreground ",
                        "block w-full rounded-lg py-1 pl-4 text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                      )}
                    >
                      {route.label}
                    </Link>
                  </li>
                ))}
              </VisibleElement>
            )}
          </AnimatePresence>
        </NavigationMenuItem>

        <NavigationMenuItem className="rounded-lg border-2 border-border">
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <LucidePhoneCall className="mr-2 hidden h-4 w-4 xl:flex" />
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default MainNav;
