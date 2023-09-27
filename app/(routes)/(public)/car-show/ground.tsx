import { Reflector, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { Color, Matrix4, RepeatWrapping, Texture, Vector2 } from "three";

export default function Ground() {
  const [roughness, normal] = useTexture([
    "/car-show/terrain-roughness.jpg",
    "/car-show/terrain-normal.jpg",
  ]);

  useEffect(() => {
    [normal, roughness].forEach((texture) => {
      texture.wrapS = texture.wrapT = RepeatWrapping;
      texture.repeat.set(5, 5);
    });
  }, [roughness, normal]);

  useFrame((state) => {
    let t = -state.clock.getElapsedTime() * 0.128;
    roughness.offset.set(0, t);
    normal.offset.set(0, t);
  });

  return (
    <Reflector
      blur={[400, 100]}
      resolution={512}
      args={[10, 10]}
      mirror={0.5}
      mixBlur={6}
      mixStrength={1.5}
      rotation-x={-Math.PI * 0.5}
      castShadow
      receiveShadow
    >
      {(Material, props) => (
        <>
          <Material
            color={new Color(0.015, 0.015, 0.015)}
            roughnessMap={roughness}
            normalMap={normal}
            normalScale={new Vector2(0.15, 0.15)}
            envMapIntensity={0}
            dithering={true}
            roughness={0.7}
            mixBlur={30}
            mixStrength={80}
            mirror={0}
            textureMatrix={new Matrix4()}
            tDiffuse={new Texture()}
            tDiffuseBlur={new Texture()}
            mixContrast={1}
            hasBlur={false}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthScale={0.01}
            depthToBlurRatioBias={0.25}
            distortion={0.5}
          />
        </>
      )}
    </Reflector>
  );
}
