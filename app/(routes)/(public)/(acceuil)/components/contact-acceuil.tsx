"use client";
import { Separator } from "@/components/ui/separator";
import { Facebook, Phone } from "lucide-react";
import { Oswald } from "next/font/google";
import Link from "next/link";
import SolutionPro from "./solution-pro";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const oswald = Oswald({ subsets: ["latin"] });

const ContactAcceuil = () => {
  let test = "";
  if (typeof window !== "undefined") {
    test = navigator.userAgent;
  }
  const divBg = useRef<HTMLDivElement>(null);
  const divBgHeight = divBg?.current?.getBoundingClientRect()
    ? divBg.current.getBoundingClientRect().bottom -
      divBg.current.getBoundingClientRect().top
    : 0;

  const { scrollY, scrollYProgress } = useScroll({
    target: divBg,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-0.4 * divBgHeight, divBgHeight],
  );
  // const y = useTransform(scrollY, (value) => value);
  // const heightDivBg = useRef<number>(0);
  // const [offsetY, setOffsetY] = useState(0);

  // useEffect(() => {
  //   const handleScroll = throttle(() => {
  //     if (divBg?.current) {
  //       const rect = divBg.current.getBoundingClientRect();
  //       heightDivBg.current = rect.bottom - rect.top;
  //       setOffsetY(-rect.top - (rect.bottom - rect.top) / 5);
  //     }
  //   }, 100); // Throttle scroll event handler to run every 200ms

  //   window.addEventListener("scroll", handleScroll, { passive: true }); // Use passive event listener for better performance

  //   return () => {
  //     handleScroll.cancel(); // Cancel any trailing throttled calls
  //     window.removeEventListener("scroll", handleScroll)  ;
  //   };
  // }, []);

  return (
    <>
      <div
        ref={divBg}
        className="relative w-full  bg-black shadow-lg "
        // style={{
        //   backgroundImage: `url(/home-page/TEST-HOME-BANNER.webp)`,
        // }}
      >
        <motion.img
          src={"/home-page/TEST-HOME-BANNER.webp"}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0 z-50 h-screen   object-cover"
          style={{
            y,
          }}
        />
        {/* <Image
          src={"/home-page/TEST-HOME-BANNER.webp"}
          alt=""
          width={1920}
          height={1080}
          className="absolute inset-0  h-screen object-cover sm:h-full "
          style={{
            transition: "transform 0.2s linear",
            transform: `translateY(${offsetY}px)`,
          }}
        /> */}
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
