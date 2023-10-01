import { Scroll } from "@react-three/drei";
import Image from "next/image";

const Text = () => {
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
    <Scroll html>
      <div className="relative  h-[300vh] w-screen ">
        <div className="flex flex-wrap gap-4 pb-10 ">
          {prestations.map((prestation, index) => (
            <div
              className="flex w-80 flex-auto flex-col items-start bg-white xl:w-1/5"
              key={index}
            >
              <h3 className="relative flex w-full flex-col items-center justify-center gap-4 pb-8 text-center font-bold">
                {prestation.titre}
                <Image src={prestation.image} alt="" width={130} height={130} />
              </h3>

              <div className="flex flex-col">
                <h3 className="z-10 mb-2 flex items-center space-x-2 font-semibold">
                  {prestation.text}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Scroll>
  );
};

export default Text;
