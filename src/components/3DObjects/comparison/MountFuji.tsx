import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_2: THREE.Mesh;
  };
  materials: {
    ["rastMat.003"]: THREE.MeshStandardMaterial;
  };
};

export function MountFuji(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("3DModels/MountFuji.glb") as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group
        position={[0, -14.25, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
        scale={0.006}
      >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials["rastMat.003"]}
          scale={1.098}
        />
      </group>
    </group>
  );
}
