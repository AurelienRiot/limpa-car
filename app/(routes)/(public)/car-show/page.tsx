"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CarShow } from "./car-show";
import Loading from "../loading";
import { useScroll } from "framer-motion";

const CarShowPage = () => {
  return (
    <div className="m-0 h-screen w-full overflow-hidden">
      <Suspense fallback={<Loading />}>
        <Canvas shadows>
          <CarShow />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CarShowPage;
