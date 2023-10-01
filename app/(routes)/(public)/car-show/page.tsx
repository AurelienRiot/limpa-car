"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { CarShow } from "./car-show";
import Loading from "../loading";

const CarShowPage = () => {
  return (
    <div
      className="m-0  w-full overflow-hidden"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <Suspense fallback={<Loading />}>
        <Canvas shadows className="relative">
          <CarShow />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CarShowPage;
