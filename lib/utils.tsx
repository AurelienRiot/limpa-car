import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
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

export const Markdown: React.FC<{ children: string; className?: string }> = ({
  children,
  className = "",
}) => {
  return (
    <ReactMarkdown remarkPlugins={[gfm]} className={cn("markdown", className)}>
      {children}
    </ReactMarkdown>
  );
};
