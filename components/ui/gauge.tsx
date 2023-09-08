"use client";
import { useEffect, useState } from "react";

export const Gauge = ({
  value,
  size = "small",
  showValue = false,
}: {
  value: number;
  size?: "small" | "medium" | "large";
  showValue?: boolean;
}) => {
  const circumference = 332; //2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const sizes = {
    small: {
      width: "36",
      height: "36",
      textSize: "text-xs",
    },
    medium: {
      width: "72",
      height: "72",
      textSize: "text-lg",
    },
    large: {
      width: "144",
      height: "144",
      textSize: "text-3xl",
    },
  };

  const [animationKey, setAnimationKey] = useState(0);

  // Add useEffect to listen for value changes
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1);
  }, [value]);

  return (
    <div
      key={animationKey}
      className="relative flex flex-col items-center justify-center"
    >
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height={sizes[size].height}
        width={sizes[size].width}
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="transform -rotate-90"
      >
        <circle
          className="text-gray-300"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className="text-green-600 animate-gauge-fill"
          strokeWidth="12"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dasharray 1s ease 0s,stroke 1s ease 0s",
          }}
        />
      </svg>
      {showValue ? (
        <div className="absolute flex animate-fade-in">
          <p className={`text-primary ${sizes[size].textSize}`}>{value}</p>
        </div>
      ) : null}
    </div>
  );
};
