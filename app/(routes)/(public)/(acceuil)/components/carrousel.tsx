"use client";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const CarouselData = [
  {
    image: "/carrousel/voiture1-1.webp",
    alt: "image1",
  },
  {
    image: "/carrousel/voiture2-1.webp",
    alt: "image2",
  },
  {
    image: "/carrousel/voiture3-1.webp",
    alt: "image2",
  },
  {
    image: "/carrousel/voiture4-1.webp",
    alt: "image2",
  },
];

const Carrousel = () => {
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [paused, setPaused] = useState(false);

  const nextSlide = useCallback(() => {
    let newSlide =
      carouselIndex === CarouselData.length - 1 ? 0 : carouselIndex + 1;
    setCarouselIndex(newSlide);
  }, [carouselIndex]);

  const prevSlide = () => {
    let newSlide =
      carouselIndex === 0 ? CarouselData.length - 1 : carouselIndex - 1;
    setCarouselIndex(newSlide);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!paused) {
      interval = setInterval(() => {
        nextSlide();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paused, nextSlide]);

  return (
    <div className="flex justify-center">
      <div className="mt-8">
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative flex overflow-hidden "
        >
          {CarouselData.map((slide, index) => {
            return (
              <Image
                key={index}
                data-state={index === carouselIndex ? "active" : "inactive"}
                src={slide.image}
                object-fit="cover"
                width={702}
                height={930}
                alt={slide.alt}
                className=" data-[state=inactive]:hidden     duration-300 data-[state=active]:animate-fade-in "
              />
            );
          })}

          <div className="absolute bottom-0 flex justify-center w-full">
            {CarouselData.map((element, index) => {
              return (
                <div
                  data-state={index === carouselIndex ? "active" : "inactive"}
                  className=" data-[state=active]:bg-blue-700 transition-colors duration-300 h-2 w-2 ease-linear bg-white rounded-full mx-2 mb-2 cursor-pointer "
                  key={index}
                  onClick={() => {
                    setCarouselIndex(index);
                  }}
                ></div>
              );
            })}
          </div>
          {/* <button
            className="absolute bottom-0 left-0 z-10 w-16 h-full transition-opacity duration-500 bg-black rounded-r-lg opacity-0 cursor-pointer hover:opacity-30"
          ></button> */}
          <MoveLeftIcon
            onClick={prevSlide}
            className="absolute left-0 text-3xl text-white cursor-pointer inset-y-1/2"
          />

          <MoveRightIcon
            onClick={nextSlide}
            className="absolute right-0 text-3xl text-white cursor-pointer inset-y-1/2"
          />
        </div>
      </div>
    </div>
  );
};

export default Carrousel;
