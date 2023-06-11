import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import burjKhalifaObj from "../../../assets/3DModels/BurjKhalifa.glb";

type GLTFResult = GLTF & {
  nodes: {
    Material2: THREE.Mesh;
    Material2002: THREE.Mesh;
    Material2003: THREE.Mesh;
    Material2004: THREE.Mesh;
    Material3: THREE.Mesh;
  };
  materials: {
    Color_003: THREE.MeshStandardMaterial;
    Concrete_Aggregate_Smoke: THREE.MeshStandardMaterial;
    window: THREE.MeshStandardMaterial;
    Fencing_Metal_Straight: THREE.MeshStandardMaterial;
    windo: THREE.MeshStandardMaterial;
  };
};

export function BurjKhalifa(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(burjKhalifaObj) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Material2.geometry}
        material={materials.Color_003}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Material2002.geometry}
        material={materials.Concrete_Aggregate_Smoke}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Material2003.geometry}
        material={materials.window}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Material2004.geometry}
        material={materials.Fencing_Metal_Straight}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Material3.geometry}
        material={materials.windo}
        castShadow
        receiveShadow
      />
    </group>
  );
}
