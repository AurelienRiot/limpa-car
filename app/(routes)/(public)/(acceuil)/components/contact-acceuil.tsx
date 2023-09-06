"use client";
import { Separator } from "@/components/ui/separator";
import { motion, useScroll, useTransform } from "framer-motion";
import { Facebook, Phone, PhoneCall } from "lucide-react";
import Image from "next/image";
import { Oswald } from "next/font/google";
import Link from "next/link";

const oswald = Oswald({ subsets: ["latin"] });

const ContactAcceuil = () => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full h-[800px]">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          priority
          src="/home-page/i51.jpg"
          alt="image background"
          width={1000}
          height={549}
          className="absolute top-0 left-0 object-cover object-center w-full h-full"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 dark:opacity-60 "></div>
      <div
        className={`absolute top-0 flex flex-col items-center w-full h-full  text-white ${oswald.className}`}
      >
        <h1 className="mb-6 text-5xl mt-14 sm:text-7xl">LIMPA CAR </h1>
        <Separator className="w-24" />

        <div className="flex flex-col items-center justify-center gap-4 px-20 py-10 mt-8 text-3xl rounded-sm bg-black/10 ">
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
  );
};

export default ContactAcceuil;
