"use client";
import { Separator } from "@/components/ui/separator";
import { Facebook, Phone } from "lucide-react";
import { Oswald } from "next/font/google";
import Link from "next/link";
import SolutionPro from "./solution-pro";
import { cn, isMobileDevice } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"] });

const ContactAcceuil = () => {
  let test = "";
  if (typeof window !== "undefined") {
    test = navigator.userAgent;
  }
  return (
    <>
      <div
        className={cn(
          "relative w-full bg-center bg-no-repeat bg-cover shadow-lg ",
          isMobileDevice() ? "bg-scroll" : "bg-fixed"
        )}
        style={{
          backgroundImage: `url(/home-page/TEST-HOME-BANNER.webp)`,
        }}
      >
        <SolutionPro />
        <div
          className={`flex flex-col items-center    text-white ${oswald.className} backdrop-blur-xl`}
        >
          <h1 className="mb-6 text-5xl mt-14 sm:text-7xl">LIMPA CAR </h1>
          <Separator className="w-24" />
          <div className="flex flex-col items-center justify-center gap-4 py-10 mt-8 mb-20 text-xl rounded-sm shadow-2xl sm:text-3xl px-14 bg-black/40">
            <Link
              href="tel:0000000000"
              className="flex items-center justify-center w-20 h-20 p-2 transition-colors duration-500 rounded-full bg-black/20 hover:bg-primary-foreground hover:text-primary "
            >
              <Phone size={40} />
            </Link>
            <p>00 00 00 00 00</p>
            <p>13 avenur du general </p>
            <p>Leclerc, Pierrelaye, 95480</p>
            <p>limpacar@orange.fr</p>
            <Link
              href={"https://www.facebook.com/profile.php?id=100091438730802"}
              target={"_blank"}
              className="flex items-center justify-center w-20 h-20 p-2 rounded-full bg-black/20 hover:bg-[#3b5998] transition-colors duration-500"
            >
              <Facebook size={40} />
            </Link>
          </div>
        </div>
      </div>
      <p>{test}</p>
    </>
  );
};

export default ContactAcceuil;
