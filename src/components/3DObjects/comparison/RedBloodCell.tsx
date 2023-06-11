import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import redBloodCellObj from "../../../assets/3DModels/RedBloodCell.glb";

type GLTFResult = GLTF & {
  nodes: {
    Sphere: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

export function RedBloodCell(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    redBloodCellObj
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["SphereAction"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="Sphere"
          geometry={nodes.Sphere.geometry}
          material={materials["Material.001"]}
          position={[0, 5, 0]}
          rotation={[-0.413, 0.289, 0.124]}
          castShadow
        />
      </group>
    </group>
  );
}
