"use client";

import { cn, formatter } from "@/lib/utils";

interface CurrencyProps {
  value?: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  return (
    <span className={cn(`font-semibold text-primary`, className)}>
      {`${formatter.format(Number(value) * 1.2)}`}
    </span>
  );
};

export default Currency;
