"use client";

import { cn, formatter } from "@/lib/utils";
import { useEffect, useState } from "react";

interface CurrencyProps {
  value?: string | number;
  className?: string;
}

const Currency: React.FC<CurrencyProps> = ({ value, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <span className={cn(`font-semibold text-primary`, className)}>
      {`${formatter.format(Number(value) * 1.2)}`}
    </span>
  );
};

export default Currency;
