"use client";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { Raleway } from "next/font/google";
import { useState } from "react";
import { motion } from "framer-motion";
import { VisibleElement } from "@/components/animations/visible-element";

const raleway = Raleway({ subsets: ["latin"] });

const Temoignage = () => {
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

  const [currentTemoignage, setCurrentTemoignage] = useState(temoignage[0]);

  const nextTemoignage = () => {
    const currentIndex = temoignage.findIndex(
      (t) =>
        t.name === currentTemoignage.name && t.text === currentTemoignage.text
    );
    if (currentIndex === temoignage.length - 1) {
      console.log(currentIndex === temoignage.length - 1);
      setCurrentTemoignage(temoignage[0]);
      return;
    }
    setCurrentTemoignage(temoignage[currentIndex + 1]);
  };

  const prevTemoignage = () => {
    const currentIndex = temoignage.findIndex(
      (t) =>
        t.name === currentTemoignage.name && t.text === currentTemoignage.text
    );
    if (currentIndex === 0) {
      setCurrentTemoignage(temoignage[temoignage.length - 1]);
      return;
    }
    setCurrentTemoignage(temoignage[currentIndex - 1]);
  };

  return (
    <>
      <div
        className={`flex flex-col items-center justify-center ${raleway.className} pb-20`}
      >
        <h2 className="text-4xl text-center sm:text-7xl">Ils témoignent</h2>
        <Separator className="w-20 mx-auto my-4" />
        <p className="font-sans font-light text-center ">
          Laissez votre avis !
        </p>
      </div>
      <div className="relative w-full min-h-[500px]">
        <div className="absolute top-0 left-0 w-full h-full">
          <Image
            priority
            src="/home-page/slidebg5.jpg"
            alt="image background"
            width={1000}
            height={549}
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
          />
        </div>
        <div className="absolute top-0 left-0 flex flex-col items-center w-full h-full bg-black opacity-60 "></div>
        <div
          className={`absolute top-0 flex flex-col items-center w-full h-full  text-white ${raleway.className}`}
        >
          <Quote className="mt-10" size={40} />
          <VisibleElement
            duration={1}
            as="p"
            key={currentTemoignage.text}
            className="px-32 my-4 text-3xl text-center "
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
          <div className="absolute bottom-0 z-10 flex gap-2 mb-6 text-white opacity-60">
            <button
              onClick={prevTemoignage}
              className="flex items-center justify-center p-1 bg-gray-900 rounded-full hover:bg-gray-600 "
            >
              <ChevronLeft size={36} strokeWidth={1} />{" "}
            </button>
            <button
              onClick={nextTemoignage}
              className="flex items-center justify-center p-1 bg-gray-900 rounded-full hover:bg-gray-600"
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
