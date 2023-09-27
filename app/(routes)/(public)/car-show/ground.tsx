import { useFrame, useLoader, extend } from "@react-three/fiber";
import { useEffect } from "react";
import {
  LinearSRGBColorSpace,
  Matrix4,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector2,
} from "three";
import { MeshReflectorMaterial as MeshReflectorMaterialImpl } from "@react-three/drei";

export default function Ground() {
  const [roughness, normal] = useLoader(TextureLoader, [
    "/car-show/terrain-roughness.jpg",
    "/car-show/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
    });

    normal.encoding = LinearSRGBColorSpace;
  }, [roughness, normal]);

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t);
    normal.offset.set(0, t);
  });

  return (
    <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
      <planeGeometry args={[30, 30]} />
      <MeshReflectorMaterialImpl
        envMapIntensity={0}
        normalMap={normal}
        normalScale={new Vector2(0.15, 0.15)}
        roughnessMap={roughness}
        dithering={true}
        color={[0.015, 0.015, 0.015]}
        roughness={0.7}
        mixBlur={30}
        mixStrength={80}
        mixContrast={1}
        mirror={0}
        depthScale={0.01}
        minDepthThreshold={0.9}
        maxDepthThreshold={1}
        depthToBlurRatioBias={0.25}
        distortion={0.5}
      />
    </mesh>
  );
}
