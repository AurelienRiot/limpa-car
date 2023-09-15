"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 relative lg:text-xl md:text-lg sm:text-base text-sm items-start pl-14 justify-left py-4 font-medium transition-all hover:underline [&[data-state=open]>svg.plus]:scale-0 [&[data-state=closed]>svg.plus]:scale-100   [&[data-state=closed]]:bg-primary dark:[&[data-state=closed]]:bg-gray-300 [&[data-state=closed]]:text-primary-foreground duration-200 [&[data-state=open]]:bg-primary-foreground [&[data-state=closed]>svg.square]:scale-0",
        className
      )}
      {...props}
    >
      <svg
        className="absolute left-0 w-11 h-11 stroke-2 top-1/2 shrink-0  translate-y-[-20px] translate-x-[4px] square transition-transform duration-500"
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
      >
        <rect x="5" y="5" rx="5" ry="5" width="22" height="22" />
      </svg>

      <svg
        className="absolute left-0 w-5 h-5 mx-4 transition-transform duration-500 top-1/2 shrink-0 plus translate-y-[-8px]"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <rect width="2" height="20" x="9" y="0" />
      </svg>
      <svg
        className="absolute left-0 w-5 h-5 mx-4 top-1/2 shrink-0 "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <rect width="20" height="2" x="0" y="0" />
      </svg>

      {children}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-muted-foreground font-light transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down px-4 data-[state=open]:bg-primary-foreground ",
      className
    )}
    {...props}
  >
    <div className="pt-0 pb-4 transition-opacity duration-200 ease-out">
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
