"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "@/components/loading";

const ImagesAccueil = ({
  name,
  imageUrl,
}: {
  name: string | undefined | null;
  imageUrl: string;
}) => {
  let { scrollYProgress } = useScroll();
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative w-full h-screen ">
      <motion.div
        style={{ y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <Suspense fallback={<Loading />}>
          <Image
            priority
            src={imageUrl}
            alt="image background"
            width={1920}
            height={1080}
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
          />
        </Suspense>
      </motion.div>
      <motion.div
        style={{ y }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 left-0 w-full h-full bg-black opacity-30 "
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-0 flex flex-col items-center justify-center w-full h-full font-bold text-white"
      >
        <h1 className="text-5xl sm:text-7xl">Bienvenue </h1>
        <p className="text-3xl sm:text-5xl">sur Limpa Car</p>
        {/* <p className="text-3xl sm:text-5xl">{name}</p> */}
      </motion.div>
    </div>
  );
};

export default ImagesAccueil;
