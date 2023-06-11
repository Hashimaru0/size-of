import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import hairObj from "../../../assets/3DModels/Hair.glb";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function Hair(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(hairObj) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Cylinder.geometry}
        material={materials["Material.001"]}
        scale={0.5}
        castShadow
        receiveShadow
      />
    </group>
  );
}
