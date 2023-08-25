"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Check,
  ChevronDown,
  ChevronsUpDown,
  LucidePhoneCall,
  Menu,
  StoreIcon,
  User2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { RiAlarmWarningLine } from "react-icons/ri";
import { BsSim } from "react-icons/bs";
import { BiCctv } from "react-icons/bi";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { Category } from "@prisma/client";
import { VisibleElement } from "@/components/animations/visible-element";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface MobileNavProps extends PopoverTriggerProps {
  data: Category[];
  isSession: boolean;
}

export default function MobileNav({
  className,
  data,
  isSession,
}: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
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
          className={cn("w-[75px] justify-between ", className)}
        >
          <Menu className="w-4 h-4 mr-2" />

          <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-auto p-0">
        <Command>
          <CommandList>
            <Link
              href="/"
              className="text-center sm:hidden"
              onClick={() => {
                setOpen(false);
                setOpenProduct(false);
              }}
            >
              <p className="pt-2 text-lg font-bold text-primary"> Riot Tech</p>
            </Link>
            {/* <SearchNavMobile /> */}
            {/* <CommandInput placeholder="recherche"/>
                        <CommandEmpty> Aucun resultat</CommandEmpty> */}
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  router.push("/activation-sim");
                  setOpen(false);
                  setOpenProduct(false);
                }}
                className="cursor-pointer test-sm "
              >
                <BsSim className="w-4 h-4 mr-2" />
                Activation Sim
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === "/activation-sim" ? "opacity-100" : "opacity-0"
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
                        {routes.map((route) => (
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
                  router.push("/anomaly-detect");
                  setOpen(false);
                  setOpenProduct(false);
                }}
                className="cursor-pointer test-sm "
              >
                <RiAlarmWarningLine className="w-4 h-4 mr-2" />
                {"Détection d'anomalies"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === "/anomaly-detect" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  router.push("/surveillance-elevage");
                  setOpen(false);
                  setOpenProduct(false);
                }}
                className="cursor-pointer test-sm"
              >
                <BiCctv className="w-4 h-4 mr-2" />
                {"Surveillance élevage"}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    pathname === "/surveillance-elevage"
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
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
              {isSession && (
                <CommandItem
                  onSelect={() => {
                    router.push("/dashboard-user");
                    setOpen(false);
                    setOpenProduct(false);
                  }}
                  className="cursor-pointer test-sm"
                >
                  <User2 className="w-4 h-4 mr-2" />
                  {"Profil"}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      pathname === "/dashboard-user"
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              )}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
        </Command>
      </PopoverContent>
    </Popover>
  );
}
