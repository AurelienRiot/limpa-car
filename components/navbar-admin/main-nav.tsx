"use client";

import { cn } from "@/lib/utils";
import {
  Car,
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PhoneCallIcon,
  PresentationIcon,
  RowsIcon,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const routes = routesNav(pathname);

  return (
    <nav className={cn("flex items-center space-x-4 xl:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-xs xl:text-base font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {<route.Icone className="hidden w-4 h-4 mr-2 lg:inline-block" />}
          {route.label}
        </Link>
      ))}
    </nav>
  );
}

export const routesNav = (pathname: string) => {
  return [
    {
      href: `/`,
      label: "Accueil",
      active: pathname === `/`,
      Icone: Car,
    },
    {
      href: `/admin`,
      label: "Dashboard",
      active: pathname === `/admin`,
      Icone: LayoutDashboardIcon,
    },
    {
      href: `/admin/billboards`,
      label: "Panneaux d'affichage",
      active: pathname.startsWith(`/admin/billboards`),
      Icone: PresentationIcon,
    },
    {
      href: `/admin/categories`,
      label: "Categories",
      active: pathname.startsWith(`/admin/categories`),
      Icone: RowsIcon,
    },
    {
      href: `/admin/products`,
      label: "Produits",
      active: pathname.startsWith(`/admin/products`),
      Icone: PackageIcon,
    },
    {
      href: `/admin/orders`,
      label: "Commandes",
      active: pathname.startsWith(`/admin/orders`),
      Icone: ListOrderedIcon,
    },
    {
      href: `/admin/users`,
      label: "Clients",
      active: pathname.startsWith(`/admin/users`),
      Icone: Users,
    },
    {
      href: `/admin/contacts`,
      label: "Contacts",
      active: pathname.startsWith(`/admin/contacts`),
      Icone: PhoneCallIcon,
    },
  ];
};
