import { Float, Lightformer, useGLTF, useScroll } from "@react-three/drei";
import { applyProps, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import { Group, Mesh, BackSide } from "three";
import { LayerMaterial, Color, Depth } from "lamina";

export function Cube() {
  const ref = useRef<Mesh>(null);

  useFrame((state) => {
    if (!ref.current) {
      return;
    }
    ref.current.rotation.x += 0.01;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshBasicMaterial color={"red"} />
    </mesh>
  );
}

// export function Porsche() {
//   const { scene, nodes, materials } = useGLTF("/911-transformed.glb");
//   useLayoutEffect(() => {
//     Object.values(nodes).forEach(
//       (node) => node.isMesh && (node.receiveShadow = node.castShadow = true),
//     );
//     applyProps(materials.rubber, {
//       color: "#222",
//       roughness: 0.6,
//       roughnessMap: null,
//       normalScale: [4, 4],
//     });
//     applyProps(materials.window, {
//       color: "black",
//       roughness: 0,
//       clearcoat: 0.1,
//     });
//     applyProps(materials.coat, {
//       envMapIntensity: 4,
//       roughness: 0.5,
//       metalness: 1,
//     });
//     applyProps(materials.paint, {
//       envMapIntensity: 2,
//       roughness: 0.45,
//       metalness: 0.8,
//       color: "#555",
//     });
//   }, [nodes, materials]);

//   return (
//     <primitive
//       object={scene}
//       scale={1.6}
//       position={[-0.5, -0.18, 0]}
//       rotation={[0, Math.PI / 5, 0]}
//     />
//   );
// }

export function Lightformers({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current) {
      return;
    }
    (group.current.position.z += delta * 10) > 20 &&
      (group.current.position.z = -60);
  });
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      {/* Accent (red) */}
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={BackSide}>
          <Color color="#444" alpha={1} mode="normal" />
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
