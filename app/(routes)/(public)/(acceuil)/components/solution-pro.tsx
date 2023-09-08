"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";
import { Separator } from "@/components/ui/separator";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Oswald } from "next/font/google";
import { useCallback, useEffect, useState } from "react";

const oswald = Oswald({ subsets: ["latin"] });

const SolutionPro = () => {
  const [carouselIndex, setCarouselIndex] = useState(2);
  const [paused, setPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 150) {
      // the swipe was from right to left, go to next slide
      nextSlide();
    }

    if (touchStart - touchEnd < -150) {
      // the swipe was from left to right, go to previous slide
      prevSlide();
    }
  };

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
      }, 5000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [paused, nextSlide]); // Depend on 'paused' state

  return (
    <>
      <div className="py-20 bg-white bg-opacity-80">
        <div
          className={`flex flex-col items-center justify-center ${oswald.className}`}
        >
          <h2 className="text-4xl text-center sm:text-7xl">SOLUTIONS PRO</h2>
          <Separator className="w-20 mx-auto my-4" />
          <p className="mb-4 font-sans font-light text-center">
            Depuis 2001, Netcars accompagne les professionnels.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1 ">
            <AccordionTrigger className={`${oswald.className}  rounded-t-md`}>
              CONCESSIONNAIRES
            </AccordionTrigger>
            <AccordionContent>
              Préparations des véhicules d’occasion, en clientèle ou dans nos
              ateliers <br /> Préparation des véhicules neufs, en clientèle ou
              dans nos ateliers <br /> Mise à disposition de metteur en main
              pour livraisons de VO et de VN <br />
              Remises en état de carrosseries
              <br /> Rayures éffacées sans délais d’immobilisation important
              <br /> Lustrages d’éléments de carrosserie
              <br /> Lavages de parc d’exposition Accompagnement aux
              préparations de portes ouvertes
              <br /> Convoyages de véhicules neufs ou d’occasion Stockage de
              véhicules
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className={oswald.className}>
              FLOTTES ENTREPRISES
            </AccordionTrigger>
            <AccordionContent>
              Vous gérez une flotte automobile et, à ce titre, vous êtes le
              responsable du budget des frais de remises en état avant
              restitution?
              <br />
              Vous faîtes face à de nombreuses situations dans un délai souvent
              trop court?
              <br />
              Vous êtes à la recherche de partenaires qui sauront trouver les
              bonnes solutions aux différents problèmes rencontrés?
              <br />
              Pour des informations plus détaillées, veuillez télécharger nos
              plaquettes commerciales ci-jointes en PDF :<br />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className={oswald.className}>
              CABINET ASSURANCES ET EXPERTISES
            </AccordionTrigger>
            <AccordionContent>
              Depuis 2001, Netcars est devenu le partenaire incontournable de
              bon nombre de cabinets d’expertises et de compagnies d’assurance
              dans la gestion des sinistres suivants:
              <br />
              – Retour de vol et poudre d’extincteur
              <br />
              – Incendie dans les parkings : suie et odeurs de fumées dans les
              véhicules
              <br />
              Vous êtes expert automobile ou assureur et vous recherchez un
              partenaire sûr, efficace, professionnel, expérimenté, qui sait
              s’engager sur des coûts et des délais? Alors prenez contact avec
              Netcars !
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className={oswald.className}>
              COMMUNICATION ET ÉVÉNEMENTIEL
            </AccordionTrigger>
            <AccordionContent>
              Prise en charge de présentations de nouveaux modèles, pour le
              compte de constructeurs automobiles : installation des véhicules,
              nettoyage, stickage, …<br />
              Covering total ou partiel de véhicules pour opérations de street
              marketing : automobiles, motos, bus, …
              <br />
              Accompagnement ou prise en charge complète de projets :
              organisation, création de visuels, impressions d’adhésifs, pose
              d’adhésifs, suivi informatisé via application mobile Netcars…
              <br />
              Couverture nationale et internationale
              <br />
              Confiez-nous vos projets !<br />
              Pour des informations plus détaillées, veuillez télécharger nos
              plaquettes commerciales ci-jointes en PDF :
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className={`${oswald.className}  rounded-b-md`}>
              REMISE EN ÉTAT DE VÉHICULE AVANT RESTITUTION
            </AccordionTrigger>
            <AccordionContent>
              Vous devez restituer votre véhicule en fin de leasing (buy-back)
              et vous redoutez l’étape du procès-verbal de restitution ?<br />
              Combien vous coutera cette bosse, ces rayures, cet impact sur le
              pare-brise ou cette tâche sur la moquette ?<br />
              Netcars vous propose une solution simple et économique de gestion
              de votre restitution.
              <br />
              Après analyse ou sur envoi de photos, nos experts vous adressent
              un devis de remise en état intégrant les réparations nécessaires :
              carrosserie, solutions de réparations rapides (smart repair),
              nettoyage complet, réparation ou remplacement de pare-brise,
              remplacement de pneumatique et réparations de jantes, débosselage
              sans peinture.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="flex justify-center">
          <div className="mt-8">
            <div
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative flex max-w-lg overflow-hidden h-72"
            >
              {CarouselData.map((slide, index) => {
                return (
                  <div key={index}>
                    <img
                      data-state={index === carouselIndex ? "true" : "false"}
                      src={slide.image}
                      alt="This is a carousel slide"
                      className={
                        index === carouselIndex
                          ? "block w-full h-auto object-cover  duration-300 data-[state=true]:animate-gauge-fadeIn "
                          : "hidden"
                      }
                    />
                  </div>
                );
              })}

              <div className="absolute bottom-0 flex justify-center w-full">
                {CarouselData.map((element, index) => {
                  return (
                    <div
                      className={
                        index === carouselIndex
                          ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                          : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                      }
                      key={index}
                      onClick={() => {
                        setCarouselIndex(index);
                      }}
                    ></div>
                  );
                })}
              </div>
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
      </div>
    </>
  );
};

export default SolutionPro;
{
  /* <img src="/home-page/478px-SARS-CoV-2_without_background.webp" alt="Image 1" className="absolute object-cover w-full h-full transition-opacity duration-1000 ease-in-out opacity-100" /> */
}

export const CarouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1546768292-fb12f6c92568?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1501446529957-6226bd447c46?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1489&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475189778702-5ec9941484ae?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
  },
  {
    image:
      "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  },
];
