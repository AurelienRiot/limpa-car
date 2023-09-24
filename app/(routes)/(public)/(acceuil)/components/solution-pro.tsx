import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SolutionPro = () => {
  return (
    <>
      <div className="relative  bg-primary-foreground/80 py-20 ">
        <div className={`flex flex-col    items-center justify-center  `}>
          <h2 className="transform   bg-gradient-to-b from-primary via-transparent to-primary bg-[size:200%_200%] bg-clip-text bg-[position:0%_0%] text-center text-4xl tracking-tight text-transparent duration-500 hover:bg-[position:100%_100%] hover:tracking-wide  sm:text-7xl">
            SOLUTIONS PRO
          </h2>
          <Separator className="mx-auto my-4 w-20" />
          <p className="mb-4 text-center font-sans font-light">
            Depuis 2001, Netcars accompagne les professionnels.
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="item-1 ">
            <AccordionTrigger className={`  rounded-t-md`}>
              CONCESSIONNAIRES
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>
                  Préparations des véhicules d’occasion, en clientèle ou dans
                  nos ateliers
                </li>
                <li>
                  Préparation des véhicules neufs, en clientèle ou dans nos
                  ateliers
                </li>
                <li>
                  Mise à disposition de metteur en main pour livraisons de VO et
                  de VN
                </li>
                <li>Remises en état de carrosseries</li>
                <li>Rayures éffacées sans délais d’immobilisation important</li>
                <li>Lustrages d’éléments de carrosserie</li>
                <li>Lavages de parc d’exposition</li>
                <li>Accompagnement aux préparations de portes ouvertes</li>
                <li>Convoyages de véhicules neufs ou d’occasion</li>
                <li>Stockage de véhicules</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>FLOTTES ENTREPRISES</AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>
                  Vous gérez une flotte automobile et, à ce titre, vous êtes le
                  responsable du budget des frais de remises en état avant
                  restitution?
                </li>
                <li>
                  Vous faîtes face à de nombreuses situations dans un délai
                  souvent trop court?
                </li>
                <li>
                  Vous êtes à la recherche de partenaires qui sauront trouver
                  les bonnes solutions aux différents problèmes rencontrés?
                </li>
                <li>
                  Pour des informations plus détaillées, veuillez télécharger
                  nos plaquettes commerciales ci-jointes en PDF :
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              CABINET ASSURANCES ET EXPERTISES
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>
                  Depuis 2001, Netcars est devenu le partenaire incontournable
                  de bon nombre de cabinets d’expertises et de compagnies
                  d’assurance dans la gestion des sinistres suivants:
                </li>
                <li>Retour de vol et poudre d’extincteur</li>
                <li>
                  Incendie dans les parkings : suie et odeurs de fumées dans les
                  véhicules
                </li>
                <li>
                  Vous êtes expert automobile ou assureur et vous recherchez un
                  partenaire sûr, efficace, professionnel, expérimenté, qui sait
                  s’engager sur des coûts et des délais? Alors prenez contact
                  avec Netcars !
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>COMMUNICATION ET ÉVÉNEMENTIEL</AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>
                  Prise en charge de présentations de nouveaux modèles, pour le
                  compte de constructeurs automobiles : installation des
                  véhicules, nettoyage, stickage, …
                </li>
                <li>
                  Covering total ou partiel de véhicules pour opérations de
                  street marketing : automobiles, motos, bus, …
                </li>
                <li>
                  Accompagnement ou prise en charge complète de projets :
                  organisation, création de visuels, impressions d’adhésifs,
                  pose d’adhésifs, suivi informatisé via application mobile
                  Netcars…
                </li>
                <li>Couverture nationale et internationale</li>
                <li>
                  Confiez-nous vos projets ! Pour des informations plus
                  détaillées, veuillez télécharger nos plaquettes commerciales
                  ci-jointes en PDF :
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className={`  rounded-b-md`}>
              REMISE EN ÉTAT DE VÉHICULE AVANT RESTITUTION
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-inside list-disc">
                <li>
                  Vous devez restituer votre véhicule en fin de leasing
                  (buy-back) et vous redoutez l’étape du procès-verbal de
                  restitution ?
                </li>
                <li>
                  Combien vous coutera cette bosse, ces rayures, cet impact sur
                  le pare-brise ou cette tâche sur la moquette ?
                </li>
                <li>
                  Netcars vous propose une solution simple et économique de
                  gestion de votre restitution.
                </li>
                <li>
                  Après analyse ou sur envoi de photos, nos experts vous
                  adressent un devis de remise en état intégrant les réparations
                  nécessaires : carrosserie, solutions de réparations rapides
                  (smart repair), nettoyage complet, réparation ou remplacement
                  de pare-brise, remplacement de pneumatique et réparations de
                  jantes, débosselage sans peinture.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};

export default SolutionPro;
