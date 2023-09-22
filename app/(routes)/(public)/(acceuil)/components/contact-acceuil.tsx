"use client";
import { Separator } from "@/components/ui/separator";
import { Facebook, Phone } from "lucide-react";
import { Oswald } from "next/font/google";
import Link from "next/link";
import SolutionPro from "./solution-pro";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GetWindowHeight, isWindowSmallerThan } from "@/lib/utils";

const oswald = Oswald({ subsets: ["latin"] });

const ContactAcceuil = () => {
  let test = "";
  if (typeof window !== "undefined") {
    test = navigator.userAgent;
  }
  const [divBgHeight, setDivBgHeight] = useState(0);
  const divBg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (divBg.current) {
      setDivBgHeight(divBg.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: divBg,
    offset: ["start end", "end end"],
  });
  const imageOffSet = isWindowSmallerThan(640)
    ? (3 * GetWindowHeight()) / 4
    : (2 * divBgHeight) / 3;
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-imageOffSet, divBgHeight - imageOffSet],
  );

  return (
    <>
      <div
        ref={divBg}
        className="relative w-full overflow-hidden  bg-black shadow-lg"
      >
        <motion.img
          src={"/home-page/TEST-HOME-BANNER.webp"}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0  h-screen object-cover sm:h-full"
          style={{
            y,
          }}
        />

        <SolutionPro />
        <div
          className={`flex flex-col items-center  text-white ${oswald.className} backdrop-blur-md`}
        >
          <h1 className="mb-6 mt-14 text-5xl sm:text-7xl">LIMPA CAR </h1>
          <Separator className="w-24" />
          <div className="mb-20 mt-8 flex flex-col items-center justify-center gap-4 rounded-sm bg-black/40 px-14 py-10 text-xl shadow-2xl sm:text-3xl">
            <Link
              href="tel:0000000000"
              className="flex h-20 w-20 items-center justify-center rounded-full bg-black/20 p-2 transition-colors duration-500 hover:bg-primary-foreground hover:text-primary "
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
              className="flex h-20 w-20 items-center justify-center rounded-full bg-black/20 p-2 transition-colors duration-500 hover:bg-[#3b5998]"
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
