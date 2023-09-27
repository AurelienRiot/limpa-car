import NavBar from "@/components/navbar-public/navbar";
import ButtonBackward from "@/components/ui/button-backward";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const NotFound = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <NavBar role={session?.user?.role} />
      <div className="grid h-screen place-content-center bg-primary-foreground px-4">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-primary">
            Erreur
          </p>

          <h1
            className={`animate-[glitch_1s_linear_infinite] font-FiraMono text-9xl font-black tracking-[-15px] text-primary 
          before:absolute
          before:left-0 before:animate-[glitch-top_1s_linear_.5s_infinite] before:content-['404'] before:clip-path-polygon-[0_0,_100%_0,_100%_33%,_0_33%]
          after:absolute after:left-0 after:animate-[glitch-bottom_1s_linear_infinite] after:content-['404']
          after:clip-path-polygon-[0_67%,_100%_67%,_100%_100%,_0_100%]
          `}
          >
            404
          </h1>

          <p className="mb-4 mt-4 text-gray-500 dark:text-gray-400">
            Page introuvable.
          </p>

          <ButtonBackward />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
