import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    pSphere11: THREE.Mesh;
  };
  materials: {
    ["Material_0.001"]: THREE.MeshStandardMaterial;
  };
};

export function Sun(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "3DModels/Sun.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["pSphere1.1Action"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sun" position={[0, 5, 0]} scale={0.501}>
          <mesh
            name="pSphere11"
            geometry={nodes.pSphere11.geometry}
            material={materials["Material_0.001"]}
          />
        </group>
      </group>
    </group>
  );
}
