"use client";
import Image from "next/image";
import { useState } from "react";

type ImageSliderProps = {
  imageAvant: string;
  imageApres: string;
  dataState: "active" | "inactive";
};
const ImageSlider = ({
  imageAvant,
  imageApres,
  dataState,
}: ImageSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPosition(percent);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(rect.width, e.touches[0].clientX - rect.left),
    );
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));

    setSliderPosition(percent);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      data-state={dataState}
      style={{ animationDuration: "1000ms" }}
      className="relative w-full rounded-md  border-2  border-primary   data-[state=inactive]:hidden data-[state=active]:animate-in data-[state=active]:fade-in-50  "
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="relative m-auto aspect-[281/372] w-[80vw] select-none  overflow-hidden sm:h-[80vh] sm:w-auto sm:max-w-[80vw]"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
      >
        <Image
          src={imageAvant}
          alt="image1"
          fill
          sizes="(max-width: 640px) 80vw, 80vh"
        />

        <div
          className="absolute left-0 right-0 top-0 m-auto h-full w-full select-none overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={imageApres}
            alt="image1"
            fill
            sizes="(max-width: 640px) 80vw, 80vh"
          />
        </div>

        <div
          className="absolute bottom-0 top-0 w-1 cursor-col-resize bg-white"
          style={{ left: `calc(${sliderPosition}% - 1px )` }}
        >
          <div className="absolute -left-1 top-[calc(50%-5px)] h-3 w-3 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
