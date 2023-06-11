import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const Controls = ({ target }: { target: [number, number, number] }) => {
  const ref = useRef<OrbitControlsImpl>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.target.x = target[0];
      ref.current.target.y = target[1];
      ref.current.target.z = target[2];
    }
  }, [target]);

  return (
    <OrbitControls
      ref={ref}
      dampingFactor={0.2}
      maxDistance={600}
      minDistance={1}
      target={target}
    />
  );
};

export default Controls;
