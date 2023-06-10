import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Human: THREE.Mesh;
  };
};

export function Human(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("src/assets/3DModels/Human.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Human.geometry}
        material={nodes.Human.material}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial roughness={1} metalness={0} color={"#888"} />
      </mesh>
    </group>
  );
}
