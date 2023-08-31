import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-wrap items-center justify-center min-h-0",
        className
      )}
    >
      <div className="flex items-center self-center min-h-0 p-4 space-x-4 justify-self-center place-self-center">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px] max-w-full " />
          <Skeleton className="h-4 w-[200px]  max-w-full" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
