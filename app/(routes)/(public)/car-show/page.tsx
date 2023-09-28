"use client";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense } from "react";
import { Vector2 } from "three";
import { Boxes } from "./boxes";
import Car from "./car";
import FloatinGrid from "./floating-grid";
import Ground from "./ground";
import Rings from "./rings";

const CarShowPage = () => {
  return (
    <div className="m-0 h-screen w-full overflow-hidden">
      <Suspense fallback={null}>
        <Canvas shadows>
          <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

          <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />

          <color args={[0, 0, 0]} attach={"background"} />

          <spotLight
            color={[1, 0.25, 0.7]}
            intensity={2}
            angle={0.6}
            penumbra={0.5}
            position={[5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />

          <spotLight
            color={[0.14, 0.5, 1]}
            intensity={5}
            angle={0.6}
            penumbra={0.5}
            position={[-5, 5, 0]}
            castShadow
            shadow-bias={-0.0001}
          />
          {/* <CarShow /> */}
          <Rings />
          <CubeCamera resolution={256} frames={Infinity}>
            {(texture) => (
              <>
                <Environment map={texture} />
                <Car />
              </>
            )}
          </CubeCamera>
          <Boxes />
          <Ground />
          <FloatinGrid />

          <EffectComposer>
            {/* <DepthOfField
              focusDistance={0.0035}
              focalLength={0.01}
              bokehScale={3}
              height={480}
            /> */}
            <Bloom
              blendFunction={BlendFunction.ADD}
              intensity={0.5}
              width={300}
              height={300}
              kernelSize={5}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.025}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new Vector2(0.0005, 0.0012)}
              radialModulation={false}
              modulationOffset={0}
            />
          </EffectComposer>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default CarShowPage;
