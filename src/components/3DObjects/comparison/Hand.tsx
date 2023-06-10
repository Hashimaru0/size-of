import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2001: THREE.Mesh;
  };
};

export function Hand(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("src/assets/3DModels/Hand.glb") as GLTFResult;
  return (
    <group {...props} position={[0, 4, 0.2]} dispose={null}>
      <mesh
        geometry={nodes.Object_2001.geometry}
        material={nodes.Object_2001.material}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial roughness={1} metalness={0} color={"#aaa"} />
      </mesh>
    </group>
  );
}
