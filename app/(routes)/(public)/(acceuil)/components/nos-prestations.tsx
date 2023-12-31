"use client";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import { useState } from "react";
import { motion } from "framer-motion";
import { VisibleElement } from "@/components/animations/visible-element";

const oswald = Oswald({ subsets: ["latin"] });

const NosPrestations = () => {
  const prestations = [
    {
      image: "/home-page/Covering.webp",
      titre: "COVERING",
      text: "Le covering automobile consiste à recouvrir la carrosserie de votre véhicule par un film thermoformage. Ce film permettra non seulement de personnaliser votre véhicule mais aussi de garder son aspect neuf.",
    },
    {
      image: "/home-page/adhesif.webp",
      titre: "ADHÉSIF PUBLICITAIRE",
      text: "Spécialiste du marquage publicitaire, Netcars vous accompagne dans la réalisation de vos projets. Nous nous occupons de la fabrication ainsi que de la pose de vos adhésifs.",
    },
    {
      image: "/home-page/VT.webp",
      titre: "VITRES TEINTÉES",
      text: "Spécialiste des vitres teintées sur Paris et sa région, nous vous proposons des tarifs explosifs pour la pose de films solaires : teintes légères recommandées par l’ASFFV, ou des films transparents securit.",
    },
    {
      image: "/home-page/lavage1.webp",
      titre: "LAVAGE",
      text: "Depuis 2001, Netcars nettoie lave et remet à neuf des véhicules. Chaque année, plus de 15 000 véhicules sont nettoyés ou préparés dans nos centres. Nous vous proposons 4 formules attractives pour répondre à vos besoins.",
    },
    {
      image: "/home-page/protection.webp",
      titre: "CARROSSERIE",
      text: "Une peinture terne? Des micro-rayures ou le besoin de protéger une peinture neuve? Un lustrage en 3 passages, gros, moyen, fin, protégera la peinture de la carrosserie pendant au moins 6 mois.",
    },
    {
      image: "/home-page/Renovation.webp",
      titre: "RÉNOVATION",
      text: "Le traitement de choc contre les odeurs (tabac, animal, vomi) ou la réparation (tissus, cuir, plastiques) redonneront un aspect neuf et respirable à votre automobile.",
    },
  ];

  return (
    <div className="relative space-y-10 px-4 pb-10 pt-6 ">
      <div
        className={`relative flex flex-col items-center justify-center ${oswald.className}  `}
      >
        <h2 className="text-center text-4xl  tracking-tight sm:text-7xl">
          NOS PRESTATIONS
        </h2>
        <Separator className="mx-auto my-4 w-24" />
        <p className="mb-8 mt-20 text-center ">COVID-19</p>
        <Image
          src={"/home-page/478px-SARS-CoV-2_without_background.webp"}
          alt=""
          width={150}
          height={150}
          className="transition duration-500 ease-in-out hover:grayscale hover:filter"
        />
        <p className="mt-8 text-lg font-light ">
          Spécialiste du nettoyage et du marquage adhésif, Netcars vous
          accompagne dans la lutte contre le Covid-19. Nous respectons la norme
          14476.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 pb-10 ">
        {prestations.map((prestation, index) => (
          <div
            className="flex w-80 flex-auto flex-col items-start xl:w-1/5"
            key={index}
          >
            <VisibleElement
              variant="fade"
              as="h3"
              className="relative flex w-full flex-col items-center justify-center gap-4 pb-8 text-center font-bold"
            >
              {prestation.titre}
              <Image src={prestation.image} alt="" width={130} height={130} />
            </VisibleElement>

            <div className="flex flex-col">
              <VisibleElement
                variant="fade"
                className="z-10 mb-2 flex items-center space-x-2 font-semibold"
              >
                {prestation.text}
              </VisibleElement>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NosPrestations;
