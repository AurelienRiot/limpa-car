import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

const FloatinGrid = () => {
  const diffuse = useLoader(TextureLoader, "/car-show/grid-texture.png");

  useEffect(() => {
    diffuse.wrapS = RepeatWrapping;
    diffuse.wrapT = RepeatWrapping;
    diffuse.anisotropy = 4;
    diffuse.repeat.set(30, 30);
    diffuse.offset.set(0, 0);
  }, [diffuse]);

  useFrame((state, delta) => {
    let t = -state.clock.getElapsedTime() * 0.68;
    diffuse.offset.set(0, t);
  });
  return (
    <mesh rotation-x={-Math.PI * 0.5} position={[0, 0.425, 0]}>
      <planeGeometry args={[35, 35]} />
      <meshBasicMaterial
        color={[1, 1, 1]}
        map={diffuse}
        opacity={0.15}
        alphaMap={diffuse}
        transparent
      />
    </mesh>
  );
};

export default FloatinGrid;
