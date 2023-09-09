"use client";
import Image from "next/image";
import { useState } from "react";

const ImageSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
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
    <div className="relative w-full " onMouseUp={handleMouseUp}>
      <div
        className="relative w-full max-w-[300px] aspect-[281/372] m-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        <Image src="/carrousel/voiture1-1.webp" alt="image1" fill />

        <div
          className="absolute top-0 left-0 right-0 w-full max-w-[300px] aspect-[281/372] m-auto overflow-hidden "
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image src="/carrousel/voiture1-2.webp" alt="image1" fill />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 1px )` }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
