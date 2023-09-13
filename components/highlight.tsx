"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as React from "react";

type HighlightProps = React.HTMLAttributes<HTMLDivElement> & {
  trigger: unknown;
  duration?: number;
  highlightVariant?: keyof typeof highlightVariants;
  highlightColor?: keyof typeof highlightColors;
};

export const highlightVariants = {
  BackgroundColorChange: {
    principalClassName:
      "data-[highlight=on]:duration-300  transition-colors duration-500",
    secondaryClassName: "hidden",
  },
  RingHighlight: {
    principalClassName:
      " transition-all group-data-[highlight=on]:duration-150",
    secondaryClassName: "hidden",
  },
  circleFill: {
    principalClassName: "principalClassName circleFill",
    secondaryClassName: `w-full aspect-square rounded-full  opacity-0
                         group-data-[highlight=on]:animate-in 
                         group-data-[highlight=on]:zoom-in-[0.1]                   
                         group-data-[highlight=on]:scale-150  
                         group-data-[highlight=on]:opacity-100         
                         group-data-[highlight=on]:fade-in-5 
                         group-data-[highlight=on]:duration-300
                         group-data-[highlight=on]:fill-mode-forwards 

                         group-data-[highlight=off]:animate-out 
                         group-data-[highlight=off]:scale-150 
                       
                         group-data-[highlight=off]:zoom-out-150 
                         group-data-[highlight=off]:opacity-100 
                         group-data-[highlight=off]:fade-out-0  
                         group-data-[highlight=off]:duration-500 
                         group-data-[highlight=off]:fill-mode-forwards 
                         
                         `,
  },
};

const highlightColors = {
  blue: {
    BackgroundColorChange: {
      principalClassName:
        "data-[highlight=on]:bg-blue-500 data-[highlight=on]:text-primary",
      secondaryClassName: "",
    },
    RingHighlight: {
      principalClassName:
        "data-[highlight=on]:ring-blue-500 data-[highlight=on]:ring-2",
      secondaryClassName: "",
    },
    circleFill: {
      principalClassName: "",
      secondaryClassName: "bg-blue-500/50",
    },
  },
  red: {
    BackgroundColorChange: {
      principalClassName:
        "data-[highlight=on]:bg-red-500 data-[highlight=on]:text-primary",
      secondaryClassName: "",
    },
    RingHighlight: {
      principalClassName:
        "data-[highlight=on]:ring-red-500 data-[highlight=on]:ring-2",
      secondaryClassName: "",
    },
    circleFill: {
      principalClassName: "",
      secondaryClassName: "bg-red-500/50",
    },
  },
  green: {
    BackgroundColorChange: {
      principalClassName:
        "data-[highlight=on]:bg-green-500 data-[highlight=on]:text-primary",
      secondaryClassName: "",
    },
    RingHighlight: {
      principalClassName:
        "data-[highlight=on]:ring-green-500 data-[highlight=on]:ring-2",
      secondaryClassName: "",
    },
    circleFill: {
      principalClassName: "",
      secondaryClassName: "bg-green-500/50",
    },
  },
  primary: {
    BackgroundColorChange: {
      principalClassName:
        "data-[highlight=on]:bg-primary data-[highlight=on]:text-primary-foreground",
      secondaryClassName: "",
    },
    RingHighlight: {
      principalClassName:
        "data-[highlight=on]:ring-primary data-[highlight=on]:ring-2",
      secondaryClassName: "",
    },
    circleFill: {
      principalClassName: "",
      secondaryClassName: "bg-primary/50",
    },
  },
};

const Highlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  (
    {
      highlightVariant = "BackgroundColorChange",
      highlightColor = "red",
      trigger,
      duration = 1000,
      children,
      className,
      ...props
    },
    ref
  ) => {
    let [previous, setPrevious] = React.useState(trigger);
    let [didHighlight, setDidHighlight] = React.useState(false);

    React.useEffect(() => {
      const handler = setTimeout(() => {
        if (previous !== trigger) {
          setDidHighlight(true);
        }
        setPrevious(trigger);
      }, duration);

      return () => {
        clearTimeout(handler);
      };
    }, [duration, previous, trigger]);

    return (
      <div
        ref={ref}
        data-highlight={
          previous !== trigger ? "on" : didHighlight ? "off" : null
        }
        {...props}
        className={cn(
          "relative  group",
          highlightVariants[highlightVariant].principalClassName,
          highlightColors[highlightColor][highlightVariant].principalClassName,
          className
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden border rounded-lg pointer-events-none">
          <div
            className={cn(
              highlightVariants[highlightVariant].secondaryClassName,
              highlightColors[highlightColor][highlightVariant]
                .secondaryClassName
            )}
          />
        </div>
        {children}
      </div>
    );
  }
);
Highlight.displayName = "Highlight";

const CardHightlight = React.forwardRef<HTMLDivElement, HighlightProps>(
  (
    {
      highlightVariant,
      highlightColor,
      trigger,
      duration,
      className,
      ...props
    },
    ref
  ) => (
    <Highlight
      ref={ref}
      highlightVariant={highlightVariant}
      highlightColor={highlightColor}
      trigger={trigger}
      duration={duration}
      {...props}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm ",
        className
      )}
    />
  )
);
CardHightlight.displayName = "CardHightlight";

export { Highlight, CardHightlight };
