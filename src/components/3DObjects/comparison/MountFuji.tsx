import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import mountFujiObj from "../../../assets/3DModels/MountFuji.glb";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["rastMat.003"]: THREE.MeshStandardMaterial;
  };
};

export function MountFuji(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(mountFujiObj) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials["rastMat.003"]}
        position={[0, -9.46, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.005}
      />
    </group>
  );
}
