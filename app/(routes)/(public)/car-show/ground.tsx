import { useFrame, useLoader, extend } from "@react-three/fiber";
import { useEffect } from "react";
import {
  Color,
  LinearSRGBColorSpace,
  Matrix4,
  RepeatWrapping,
  Texture,
  TextureLoader,
  Vector2,
  Vector3,
} from "three";
import { Reflector, useTexture } from "@react-three/drei";
import { MeshReflectorMaterialProps } from "@react-three/drei/materials/MeshReflectorMaterial";
import { ElementType } from "react";

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
    // <mesh rotation-x={-Math.PI * 0.5} castShadow receiveShadow>
    //   <planeGeometry args={[30, 30]} />
    //   <MeshReflectorMaterialImpl
    //     envMapIntensity={0}
    //     normalMap={normal}
    //     normalScale={new Vector2(0.15, 0.15)}
    //     roughnessMap={roughness}
    //     dithering={true}
    //     color={[0.015, 0.015, 0.015]}
    //     roughness={0.7}
    //     mixBlur={30}
    //     mixStrength={80}
    //     mixContrast={1}
    //     mirror={0}
    //     depthScale={0.01}
    //     minDepthThreshold={0.9}
    //     maxDepthThreshold={1}
    //     depthToBlurRatioBias={0.25}
    //     distortion={0.5}
    //   />
    // </mesh>
    //    <Reflector blur={[400, 100]} resolution={512} args={[10, 10]} mirror={0.5} mixBlur={6} mixStrength={1.5} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
    //    {(Material, props) => <Material color="#a0a0a0" metalness={0.4} roughnessMap={roughness} normalMap={normal} normalScale={new Vector2(0.15, 0.15)} {...props} />}
    //  </Reflector>
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
            hasBlur={false} // add this
            minDepthThreshold={0.9} // add this
            maxDepthThreshold={1} // add this
            depthScale={0.01} // add this
            depthToBlurRatioBias={0.25} // add this
            distortion={0.5}
          />
        </>
      )}
    </Reflector>
  );
}
