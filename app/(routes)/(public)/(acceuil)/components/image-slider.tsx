"use client";
import Image from "next/image";
import { useState } from "react";

export type ImageSliderProps = {
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
      Math.min(rect.width, e.touches[0].clientX - rect.left)
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
      style={{ animationDuration: "500ms" }}
      className="relative w-full data-[state=inactive]:hidden  data-[state=active]:zoom-in-95  data-[state=active]:animate-in  data-[state=active]:fade-in-0 rounded-md border-primary border-2 "
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      <div
        className="relative sm:h-[80vh] sm:max-w-[80vw] w-[80vw] sm:w-auto  aspect-[281/372] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
      >
        <Image src={imageAvant} alt="image1" fill />

        <div
          className="absolute top-0 left-0 right-0 w-full h-full m-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image src={imageApres} alt="image1" fill />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-col-resize"
          style={{ left: `calc(${sliderPosition}% - 1px )` }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
