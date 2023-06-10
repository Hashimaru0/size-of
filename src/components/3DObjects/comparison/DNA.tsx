import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    dna_double_helix1: THREE.Mesh;
  };
  materials: {
    Material_0: THREE.MeshStandardMaterial;
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export function DNA(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "src/assets/3DModels/DNA.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["DNAAction"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="DNA">
          <mesh
            name="dna_double_helix1"
            geometry={nodes.dna_double_helix1.geometry}
            material={materials.Material_0}
            scale={0.172}
            castShadow
            receiveShadow
          />
        </group>
      </group>
    </group>
  );
}
