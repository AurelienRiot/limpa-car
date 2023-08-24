"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Menu } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { routesNav } from "./main-nav";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface MobileNavProps extends PopoverTriggerProps {}

export default function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const routes = routesNav(pathname);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selectionner"
          className={cn("w-[75px] justify-between ", className)}
        >
          <Menu className="w-4 h-4 mr-2" />

          <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[220px] h-auto p-2 ">
        <nav className="flex flex-col gap-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex text-sm font-medium transition-colors hover:text-primary",
                route.active
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <Check
                className={cn(
                  " h-4 w-4  shrink-0",
                  route.active ? "opacity-100" : "opacity-0"
                )}
              />
              {<route.Icone className="w-4 h-4 mr-2 shrink-0 " />}
              {route.label}
            </Link>
          ))}
        </nav>
      </PopoverContent>
    </Popover>
  );
}
