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
import { Car, LucidePhoneCall, StoreIcon, User2 } from "lucide-react";

import { useEffect, useState } from "react";
import { VisibleElement } from "@/components/animations/visible-element";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { Category } from "@prisma/client";

interface MainNavProps {
  data: Category[];
  isSession?: boolean;
}

const MainNav: React.FC<MainNavProps> = ({ data, isSession }) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const routesCategory = data
    .filter((route) => route.name !== "Nettoyage")
    .map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathname.startsWith(`/category/${route.id}`),
    }));

  return (
    <nav className="flex items-center mx-6 space-x-4 lg:space-x-6 ">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="border-2 rounded-lg border-border">
            <Link href="/nettoyage" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <Car className="hidden w-4 h-4 mr-2 xl:flex" />
                Nettoyage
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="relative border-2 rounded-lg border-border">
            <button
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium transition-colors rounded-md w-max bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
            >
              {"  "} <StoreIcon className="hidden w-4 h-4 mr-2 xl:flex" />{" "}
              Produits
              <ChevronDown
                className={cn(
                  `relative top-[1px] ml-1 h-3 w-3 transition duration-200`,
                  open ? "rotate-180" : ""
                )}
                aria-hidden="true"
              />
            </button>

            <AnimatePresence>
              {open && (
                <VisibleElement
                  as="ul"
                  variant="bottom"
                  className="absolute z-50 grid w-full gap-3 py-6 border-2 rounded-lg xl:px-2 top-12 bg-popover border-border"
                >
                  {routesCategory.map((route) => (
                    <li key={route.href}>
                      <Link
                        href={route.href}
                        className={cn(
                          route.active
                            ? "text-popover-foreground "
                            : "text-muted-foreground ",
                          "pl-4 block rounded-lg py-1 w-full text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
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

          <NavigationMenuItem className="border-2 rounded-lg border-border">
            <Link href="/contact" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <LucidePhoneCall className="hidden w-4 h-4 mr-2 xl:flex" />
                Contact
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default MainNav;
