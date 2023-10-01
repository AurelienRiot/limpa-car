import { PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
  PerspectiveCamera as ThreePerspectiveCamera,
  Vector3,
} from "three/src/Three.js";

const Camera = () => {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const data = useScroll();

  useFrame(() => {
    if (cameraRef.current) {
      const radius = 5; // The distance from the car to the camera
      const x = radius * Math.cos(2 * Math.PI * data.offset);
      const z = radius * Math.sin(2 * Math.PI * data.offset);
      cameraRef.current.position.lerp(new Vector3(x, 3, z), 0.1);
    }
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />;
};

export default Camera;
