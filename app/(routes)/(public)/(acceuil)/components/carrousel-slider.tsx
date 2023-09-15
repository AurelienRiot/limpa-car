"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import ImageSlider from "./image-slider";

const CarouselData = [
  {
    imageAvant: "/carrousel/voiture1-1.webp",
    imageApres: "/carrousel/voiture1-2.webp",
    alt: "image1",
  },
  {
    imageAvant: "/carrousel/voiture2-1.webp",
    imageApres: "/carrousel/voiture2-2.webp",
    alt: "image2",
  },
  {
    imageAvant: "/carrousel/voiture3-1.webp",
    imageApres: "/carrousel/voiture3-2.webp",
    alt: "image3",
  },
  {
    imageAvant: "/carrousel/voiture4-1.webp",
    imageApres: "/carrousel/voiture4-2.webp",
    alt: "image4",
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
    <>
      <div
        className="flex justify-center "
        onTouchStart={() => setPaused(false)}
      >
        <div className="relative mt-8">
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={(e) => {
              e.stopPropagation();
              setPaused(true);
            }}
            className="relative flex justify-center overflow-hidden "
          >
            {CarouselData.map((slide, index) => {
              return (
                <ImageSlider
                  key={index}
                  imageAvant={slide.imageAvant}
                  imageApres={slide.imageApres}
                  dataState={index === carouselIndex ? "active" : "inactive"}
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

            <button
              onClick={prevSlide}
              className="absolute left-0 text-white cursor-pointer top-1/2"
            >
              <ChevronLeft className="w-10 h-10 p-1 transition-colors duration-300 translate-x-2 rounded-full bg-primary/50 hover:bg-primary" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 text-white cursor-pointer top-1/2"
            >
              <ChevronRight className="w-10 h-10 p-1 transition-colors duration-300 -translate-x-2 rounded-full bg-primary/50 hover:bg-primary" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carrousel;
