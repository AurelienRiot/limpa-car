"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { cn, isWindowSmallerThan } from "@/lib/utils";
import {
  Car,
  Check,
  ChevronDown,
  LucidePhoneCall,
  StoreIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { VisibleElement } from "@/components/animations/visible-element";
import { Category } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface MobileNavProps extends PopoverTriggerProps {}

export default function MobileNav({ className }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { categories } = useCategories();

  const routesCategory = categories
    .filter((category) => category.name !== "Nettoyage")
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(isWindowSmallerThan(1024));
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {isMobile && (
        <Popover open={open} onOpenChange={setPopover}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              role="combobox"
              aria-expanded={open}
              aria-label="Select"
              className={cn(
                "  group relative h-10 w-10 rounded-full transition-colors duration-300   data-[state=open]:bg-destructive  data-[state=open]:text-destructive-foreground ",
                className,
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="absolute left-[10px] top-[18px] h-4  w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[5px] group-data-[state=open]:translate-y-[-2px] group-data-[state=open]:-rotate-45 "
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
                className="absolute left-[10px] top-[13px] h-4 w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[-4px] group-data-[state=open]:translate-y-[3px] group-data-[state=open]:rotate-45  "
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
                className="absolute left-[15px] top-[23px] h-4  w-4 transition-transform duration-300 group-data-[state=open]:translate-x-[-5px] group-data-[state=open]:translate-y-[-3px] group-data-[state=open]:rotate-45 "
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
                  <p className="pt-2 text-lg font-bold text-primary">
                    Limpa Car
                  </p>
                </Link>

                <CommandGroup className="overflow-visible">
                  <CommandItem
                    onSelect={() => {
                      router.push("/nettoyage");
                      setOpen(false);
                      setOpenProduct(false);
                    }}
                    className="test-sm cursor-pointer "
                  >
                    <Car className="mr-2 h-4 w-4" />
                    Nettoyage
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        pathname === "nettoyage" ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>

                  <CommandItem
                    aria-expanded={openProduct}
                    onSelect={() => setOpenProduct(!openProduct)}
                    className="test-sm cursor-pointer"
                  >
                    {"  "} <StoreIcon className="mr-2 h-4 w-4 " /> Produits
                    <ChevronDown
                      className={cn(
                        `relative top-[1px] ml-1 h-3 w-3 transition duration-200`,
                        openProduct ? "" : "-rotate-90",
                      )}
                      aria-hidden="true"
                    />
                    <Suspense fallback={null}>
                      <AnimatePresence>
                        {openProduct && (
                          <VisibleElement
                            as="ul"
                            variant="bottom"
                            className="absolute left-20 top-6 z-40 grid w-auto gap-2 rounded-lg border-2 border-border bg-popover p-4"
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
                                    "block w-full rounded-lg text-sm font-medium leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
                    className="test-sm cursor-pointer "
                  >
                    <LucidePhoneCall className="mr-2 h-4 w-4" />
                    Contact
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        pathname === "/contact" ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandSeparator />
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
}
