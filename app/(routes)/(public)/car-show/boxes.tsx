import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Color, Mesh, Vector3 } from "three";

const Box = ({ color }: { color: Color }) => {
  const box = useRef<Mesh>(null);
  const time = useRef(0);
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
  const [position, setPosition] = useState(getInitialPosition());

  function getInitialPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      (Math.random() * 2 - 1) * 15,
    );
    if (v.x < 0) {
      v.x -= 1.75;
    }
    if (v.x > 0) {
      v.x += 1.75;
    }
    return v;
  }

  function resetPosition() {
    let v = new Vector3(
      (Math.random() * 2 - 1) * 3,
      Math.random() * 2.5 + 0.1,
      Math.random() * 10 + 10,
    );
    if (v.x < 0) {
      v.x -= 1.75;
    }
    if (v.x > 0) {
      v.x += 1.75;
    }
    setPosition(v);
  }

  useFrame((state, delta) => {
    time.current += delta * 1.2;
    let newZ = position.z - time.current;

    if (newZ < -10) {
      resetPosition();
      time.current = 0;
    }

    if (!box.current) return;

    box.current.position.set(position.x, position.y, newZ);
    box.current.rotation.x += delta * xRotSpeed;
    box.current.rotation.y += delta * yRotSpeed;
  });

  return (
    <mesh ref={box} rotation-x={Math.PI * 0.5} scale={scale} castShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
};

export function Boxes() {
  const [arr] = useState(() => {
    let a = [];
    for (let i = 0; i < 100; i++) a.push(0);
    return a;
  });

  return (
    <>
      {arr.map((e, i) => (
        <Box
          key={i}
          color={
            new Color(i % 2 === 0 ? 0.4 : 0.05, 0.1, i % 2 === 0 ? 0.1 : 0.4)
          }
        />
      ))}
    </>
  );
}
