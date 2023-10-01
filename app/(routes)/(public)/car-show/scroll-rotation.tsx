import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

export function useScrollRotation() {
  const { camera } = useThree();
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      scrollRef.current += e.deltaY * 0.01;
      camera.rotation.y = scrollRef.current;
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [camera]);
}
