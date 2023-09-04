import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { fr } from "date-fns/locale";
import { format } from "date-fns";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export const dateFormatter = (date: Date) => {
  return format(date, "d MMMM yyyy", { locale: fr });
};
