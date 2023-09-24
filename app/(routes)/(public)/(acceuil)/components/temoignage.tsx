"use client";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { Raleway } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { VisibleElement } from "@/components/animations/visible-element";

const raleway = Raleway({ subsets: ["latin"] });
const temoignage = [
  {
    name: "GILLES",
    text: "Le patron est très sympa. Il offre le café en plus !",
  },
  {
    name: "ANONYME",
    text: "J'ai trouvé Netcars vraiment très pros, serviable et commerçants ... Je penses que de nombreuses enseignes et concessionnaires avec pignon sur rue devraient prendre exemple sur Netcars que je vais recommander à toutes les personnes autour de moi.",
  },
  {
    name: "ALAIN",
    text: "Pour l’accueil, le sourire, les tarifs, et le délai, je recommande donc aux gens en Ile de France d'aller à Netcars !",
  },
];
const Temoignage = () => {
  const [currentTemoignage, setCurrentTemoignage] = useState(temoignage[0]);
  const [paused, setPaused] = useState(false);

  const nextTemoignage = useCallback(() => {
    const currentIndex = temoignage.findIndex(
      (t) =>
        t.name === currentTemoignage.name && t.text === currentTemoignage.text,
    );

    if (currentIndex === temoignage.length - 1) {
      setCurrentTemoignage(temoignage[0]);

      return;
    }
    setCurrentTemoignage(temoignage[currentIndex + 1]);
  }, [currentTemoignage.name, currentTemoignage.text]);

  const prevTemoignage = () => {
    const currentIndex = temoignage.findIndex(
      (t) =>
        t.name === currentTemoignage.name && t.text === currentTemoignage.text,
    );

    if (currentIndex === 0) {
      setCurrentTemoignage(temoignage[temoignage.length - 1]);

      return;
    }
    setCurrentTemoignage(temoignage[currentIndex - 1]);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!paused) {
      interval = setInterval(() => {
        nextTemoignage();
      }, 3000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paused, nextTemoignage]);

  return (
    <>
      <div
        className={` flex flex-col items-center justify-center ${raleway.className} pb-20 `}
      >
        <h2 className="text-center text-4xl tracking-tight  sm:text-7xl">
          Ils témoignent
        </h2>
        <Separator className="mx-auto my-4 w-20" />
        <p className="text-center font-sans font-light ">
          Laissez votre avis !
        </p>
      </div>
      <div className="relative h-[80vh] w-full">
        <div className="absolute left-0 top-0 h-full w-full">
          <Image
            priority
            src="/home-page/slidebg5.jpg"
            alt="image background"
            width={1000}
            height={549}
            className="absolute left-0 top-0 h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center bg-slate-900 opacity-60 "></div>
        <div className="absolute left-1/2 top-0 h-0 w-0 -translate-x-1/2 border-b-0 border-l-[30px] border-r-[30px] border-t-[30px] border-transparent border-t-primary-foreground"></div>
        <div
          className={`absolute top-10 flex h-full w-full flex-col items-center  text-white ${raleway.className}`}
        >
          <Quote className="mt-6" size={40} />

          <VisibleElement
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            duration={1}
            as="p"
            key={currentTemoignage.text}
            className="my-4 px-2 text-center text-base sm:px-24 sm:text-xl md:text-2xl lg:w-2/3"
          >
            &quot; {currentTemoignage.text} &quot;{" "}
          </VisibleElement>
          <VisibleElement
            duration={3}
            as="p"
            key={currentTemoignage.name}
            className="font-light"
          >
            {currentTemoignage.name}
          </VisibleElement>
          <div className="absolute bottom-10 z-10 mb-6 flex gap-2 text-white opacity-60">
            <button
              onClick={prevTemoignage}
              className="flex items-center justify-center rounded-full bg-gray-900 p-1 hover:bg-gray-600 "
            >
              <ChevronLeft size={36} strokeWidth={1} />{" "}
            </button>
            <button
              onClick={nextTemoignage}
              className="flex items-center justify-center rounded-full bg-gray-900 p-1 hover:bg-gray-600"
            >
              <ChevronRight size={36} strokeWidth={1} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Temoignage;
