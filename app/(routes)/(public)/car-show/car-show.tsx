import {
  Box,
  CubeCamera,
  Environment,
  ScrollControls,
  Text,
} from "@react-three/drei";
import Rings from "./rings";
import Car from "./car";
import { Boxes } from "./boxes";
import Ground from "./ground";
import FloatinGrid from "./floating-grid";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
} from "@react-three/postprocessing";
import { Vector2 } from "three";
import { BlendFunction } from "postprocessing";
import Camera from "./camera";

export function CarShow() {
  return (
    <>
      <ScrollControls
        pages={3}
        distance={4}
        damping={0.1}
        horizontal={false}
        infinite={false}
      >
        <Camera />

        {/* <Text /> */}

        <color args={[0, 0, 0]} attach={"background"} />

        <Box
          args={[0.005, 1, 1]}
          position={[1.5, 1.5, -1.5]}
          rotation={[0, Math.PI / 4, 0]}
        >
          <meshStandardMaterial attach="material" color="orange" />
          <Text
            color="black" // default
            anchorX="center" // default
            anchorY="middle" // default
            position={[0.005, 0, 0]}
            rotation={[0, Math.PI / 2, 0]} // rotate 90 degrees around the y-axis
            scale={0.2} // double the size
          >
            Hello world
          </Text>
        </Box>

        <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>
        <spotLight
          color={[1, 0.25, 0.7]}
          intensity={250}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={400}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />

        <Rings />

        {/* <Boxes /> */}
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
      </ScrollControls>
    </>
  );
}
