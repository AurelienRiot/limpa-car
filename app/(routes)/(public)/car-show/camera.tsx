import { PerspectiveCamera, SpotLight, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  PerspectiveCamera as ThreePerspectiveCamera,
  SpotLight as ThreeSpotLight,
  Vector3,
} from "three/src/Three.js";

const Camera = () => {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const spotLightRef = useRef<ThreeSpotLight>(null);
  const data = useScroll();

  useFrame(() => {
    const radius = 5; // The distance from the car to the camera
    const x = radius * Math.cos(2 * Math.PI * data.offset);
    const z = radius * Math.sin(2 * Math.PI * data.offset);
    if (cameraRef.current) {
      cameraRef.current.position.lerp(new Vector3(x, 3, z), 0.1);

      cameraRef.current.lookAt(new Vector3(0, 0.035, 0));
    }

    if (spotLightRef.current) {
      spotLightRef.current.position.lerp(new Vector3(x, 3, z), 0.1);

      spotLightRef.current.lookAt(new Vector3(0, 0.035, 0));
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />
      <SpotLight
        ref={spotLightRef}
        angle={0.4}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
        intensity={50}
      />
    </>
  );
};

export default Camera;
