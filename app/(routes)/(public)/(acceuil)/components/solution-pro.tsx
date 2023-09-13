import { Separator } from "@/components/ui/separator";
import { Oswald } from "next/font/google";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../../components/ui/accordion";

const oswald = Oswald({ subsets: ["latin"] });

const SolutionPro = () => {
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
      </div>
    </>
  );
};

export default SolutionPro;
