import GlitchText from "@/components/animations/glitch-text";
import ButtonBackward from "@/components/ui/button-backward";
import { Fira_Mono } from "next/font/google";

const FiraMono = Fira_Mono({ weight: "400", subsets: ["latin"] });

const NotFound = () => {
  return (
    <div className="grid h-screen px-4 bg-primary-foreground place-content-center">
      <div className="text-center">
        <GlitchText
          text="404"
          className={`font-black text-gray-200 tracking-[-15px] text-9xl dark:text-gray-700 ${FiraMono.className} `}
          as={"h1"}
        />
        <p className="text-2xl font-bold tracking-tight text-primary">Erreur</p>

        <p className="mt-4 mb-4 text-gray-500 dark:text-gray-400">
          Page introuvable.
        </p>

        <ButtonBackward />
      </div>
    </div>
  );
};

export default NotFound;
