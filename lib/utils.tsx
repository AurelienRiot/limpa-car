import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

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
