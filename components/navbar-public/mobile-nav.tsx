"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { usePathname, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  Check,
  ChevronDown,
  LucidePhoneCall,
  StoreIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Category } from "@prisma/client";
import { VisibleElement } from "@/components/animations/visible-element";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface MobileNavProps extends PopoverTriggerProps {
  data: Category[];
}

export default function MobileNav({ className, data }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const routesCategory = data
    .filter((route) => route.name !== "Nettoyage")
    .map((route) => ({
      href: `/category/${route.id}`,
      label: route.name,
      active: pathname.startsWith(`/category/${route.id}`),
    }));

  const setPopover = (state: boolean) => {
    if (state) {
      setOpen(state);
    } else {
      setOpen(state);
      setOpenProduct(state);
    }
  };

  return (
    <Popover open={open} onOpenChange={setPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select"
          className={cn(
            "  relative rounded-full w-10 h-10 group data-[state=open]:text-destructive-foreground transition-colors   data-[state=open]:bg-destructive  duration-300 ",
            className
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform  duration-300 group-data-[state=open]:-rotate-45 top-[18px] left-[10px] group-data-[state=open]:translate-x-[5px] group-data-[state=open]:translate-y-[-2px] "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="22" y2="2"></line>
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform duration-300 top-[13px] left-[10px] group-data-[state=open]:rotate-45 group-data-[state=open]:translate-x-[-4px] group-data-[state=open]:translate-y-[3px]  "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="14" y2="2"></line>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="absolute w-4 h-4 transition-transform  duration-300 top-[23px] left-[15px] group-data-[state=open]:rotate-45 group-data-[state=open]:translate-x-[-5px] group-data-[state=open]:translate-y-[-3px] "
            viewBox="0 0 24 24"
          >
            <line x1="2" y1="2" x2="14" y2="2"></line>
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0  ">
        <Command className="overflow-visible">
          <CommandList className="overflow-visible">
            <Link
              href="/"
              className="text-center sm:hidden"
              onClick={() => {
                setOpen(false);
                setOpenProduct(false);
              }}
            >
              <p className="pt-2 text-lg font-bold text-primary">Limpa Car</p>
            </Link>

            <CommandGroup className="overflow-visible">
              <CommandItem
                onSelect={() => {
                  router.push("/nettoyage");
                  setOpen(false);
                  setOpenProduct(false);
                }}
                className="cursor-pointer test-sm "
              >
                <Car className="w-4 h-4 mr-2" />
                Nettoyage
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === "nettoyage" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>

              <CommandItem
                aria-expanded={openProduct}
                onSelect={() => setOpenProduct(!openProduct)}
                className="cursor-pointer test-sm"
              >
                {"  "} <StoreIcon className="w-4 h-4 mr-2 " /> Produits
                <ChevronDown
                  className={cn(
                    `relative top-[1px] ml-1 h-3 w-3 transition duration-200`,
                    openProduct ? "" : "-rotate-90"
                  )}
                  aria-hidden="true"
                />
                <Suspense fallback={null}>
                  <AnimatePresence>
                    {openProduct && (
                      <VisibleElement
                        as="ul"
                        variant="bottom"
                        className="absolute z-40 grid w-auto gap-2 p-4 border-2 rounded-lg left-20 top-6 bg-popover border-border"
                      >
                        {routesCategory.map((route) => (
                          <li key={route.href}>
                            <Link
                              href={route.href}
                              onClick={() => {
                                setOpenProduct(false);
                                setOpen(false);
                              }}
                              className={cn(
                                route.active
                                  ? "text-popover-foreground "
                                  : "text-muted-foreground ",
                                "block rounded-lg w-full text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              {route.label}
                            </Link>
                          </li>
                        ))}
                      </VisibleElement>
                    )}
                  </AnimatePresence>
                </Suspense>
              </CommandItem>

              <CommandItem
                onSelect={() => {
                  router.push("/contact");
                  setOpen(false);
                  setOpenProduct(false);
                }}
                className="cursor-pointer test-sm "
              >
                <LucidePhoneCall className="w-4 h-4 mr-2" />
                Contact
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === "/contact" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
