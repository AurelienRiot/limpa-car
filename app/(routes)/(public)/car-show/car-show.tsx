import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import Rings from "./rings";
import Car from "./car";
import { Boxes } from "./boxes";
import Ground from "./ground";
import FloatinGrid from "./floating-grid";
import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { Vector2, Vector3 } from "three";
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
        {/* <OrbitControls
          target={[0, 0.35, 0]}
          maxPolarAngle={1.45}
          enableZoom={false}
        /> */}
        <Camera />

        <Scroll html>
          {/* DOM contents in here will scroll along */}
          <h1 className="top-1/2 text-3xl text-white">
            html in here (optional)
          </h1>
          <h1 className="text-3xl text-white" style={{ top: "100vh" }}>
            second page
          </h1>
          <h1 className="text-3xl text-white" style={{ top: "200vh" }}>
            third page
          </h1>
        </Scroll>

        <color args={[0, 0, 0]} attach={"background"} />

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
      </ScrollControls>
    </>
  );
}
