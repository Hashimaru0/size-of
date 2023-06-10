import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Object_8: THREE.Mesh;
    Object_16: THREE.Mesh;
    Object_18: THREE.Mesh;
    Object_34: THREE.Mesh;
    Object_36: THREE.Mesh;
    Object_38: THREE.Mesh;
    Object_40: THREE.Mesh;
    Object_42: THREE.Mesh;
    Object_44: THREE.Mesh;
    Object_46: THREE.Mesh;
    Object_48: THREE.Mesh;
    Object_50: THREE.Mesh;
    Object_52: THREE.Mesh;
    Object_54: THREE.Mesh;
    Object_32: THREE.Mesh;
    Object_10: THREE.Mesh;
    Object_14: THREE.Mesh;
    Object_4: THREE.Mesh;
    Torus001: THREE.Mesh;
    Torus002: THREE.Mesh;
    Torus003: THREE.Mesh;
    Torus004: THREE.Mesh;
    Torus005: THREE.Mesh;
    Torus006: THREE.Mesh;
    Torus007: THREE.Mesh;
    Torus008: THREE.Mesh;
    Torus009: THREE.Mesh;
    Torus010: THREE.Mesh;
    Torus011: THREE.Mesh;
    Torus012: THREE.Mesh;
    Torus013: THREE.Mesh;
    Torus014: THREE.Mesh;
    Torus015: THREE.Mesh;
    Torus016: THREE.Mesh;
    Torus017: THREE.Mesh;
    Torus018: THREE.Mesh;
    Torus019: THREE.Mesh;
  };
  materials: {
    [".003"]: THREE.MeshStandardMaterial;
    [".009"]: THREE.MeshStandardMaterial;
    material_9: THREE.MeshStandardMaterial;
    material_3: THREE.MeshStandardMaterial;
    [".008"]: THREE.MeshStandardMaterial;
    [".004"]: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    ["material.001"]: THREE.MeshStandardMaterial;
    ["material.002"]: THREE.MeshStandardMaterial;
    ["material.003"]: THREE.MeshStandardMaterial;
    ["material.004"]: THREE.MeshStandardMaterial;
    ["material.005"]: THREE.MeshStandardMaterial;
    ["material.006"]: THREE.MeshStandardMaterial;
    ["material.007"]: THREE.MeshStandardMaterial;
    ["material.008"]: THREE.MeshStandardMaterial;
    ["material.009"]: THREE.MeshStandardMaterial;
    ["material.010"]: THREE.MeshStandardMaterial;
    ["material.011"]: THREE.MeshStandardMaterial;
    ["material.012"]: THREE.MeshStandardMaterial;
    ["material.013"]: THREE.MeshStandardMaterial;
    ["material.014"]: THREE.MeshStandardMaterial;
    ["material.015"]: THREE.MeshStandardMaterial;
    ["material.016"]: THREE.MeshStandardMaterial;
    ["material.017"]: THREE.MeshStandardMaterial;
    ["material.018"]: THREE.MeshStandardMaterial;
  };
};

export function Bacteriophage(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "3DModels/Bacteriophage.glb"
  ) as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={0.434}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group scale={4.686}>
            <mesh
              geometry={nodes.Object_10.geometry}
              material={materials.material_3}
              position={[0, -0.02, 0]}
              castShadow
              receiveShadow
            />
          </group>
          <mesh
            geometry={nodes.Object_8.geometry}
            material={materials[".003"]}
            position={[0, -0.13, 0]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_16.geometry}
            material={materials[".003"]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_18.geometry}
            material={materials[".009"]}
            scale={0.427}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_34.geometry}
            material={materials.material_9}
            rotation={[3.047, 0.913, 2.345]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_36.geometry}
            material={materials.material_9}
            rotation={[0.169, 1.22, -1.03]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_38.geometry}
            material={materials.material_9}
            rotation={[0.059, 0.239, -0.885]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_40.geometry}
            material={materials.material_9}
            rotation={[0.084, -0.808, -0.81]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_42.geometry}
            material={materials.material_9}
            rotation={[2.846, -1.276, 1.944]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_44.geometry}
            material={materials.material_9}
            rotation={[3.074, -0.713, 2.814]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_46.geometry}
            material={materials.material_9}
            rotation={[3.087, 0.351, 2.877]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_48.geometry}
            material={materials.material_9}
            rotation={[2.631, 1.466, -2.917]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_50.geometry}
            material={materials.material_9}
            rotation={[0.058, 0.475, -0.309]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_52.geometry}
            material={materials.material_9}
            rotation={[0.055, -0.363, -0.264]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_54.geometry}
            material={materials.material_9}
            rotation={[0.202, -1.312, -0.088]}
            scale={[-0.027, -1.711, -0.044]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_32.geometry}
            material={materials.material_9}
            rotation={[3.083, 0.146, 2.279]}
            scale={[-0.049, -3.128, -0.08]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_14.geometry}
            material={materials[".008"]}
            scale={2.353}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Object_4.geometry}
            material={materials[".004"]}
            rotation={[0, 0, Math.PI / 2]}
            scale={0.092}
            castShadow
            receiveShadow
          />
        </group>
      </group>
      <mesh
        geometry={nodes.Torus001.geometry}
        material={materials.material}
        position={[0, 2.4, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus002.geometry}
        material={materials["material.001"]}
        position={[0, 1.8, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus003.geometry}
        material={materials["material.002"]}
        position={[0, 2.8, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus004.geometry}
        material={materials["material.003"]}
        position={[0, 2.2, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus005.geometry}
        material={materials["material.004"]}
        position={[0, 3, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus006.geometry}
        material={materials["material.005"]}
        position={[0, 2, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus007.geometry}
        material={materials["material.006"]}
        position={[0, 2.6, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus008.geometry}
        material={materials["material.007"]}
        position={[0, 3.4, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus009.geometry}
        material={materials["material.008"]}
        position={[0, 4.2, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus010.geometry}
        material={materials["material.009"]}
        position={[0, 3.2, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus011.geometry}
        material={materials["material.010"]}
        position={[0, 3.6, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus012.geometry}
        material={materials["material.011"]}
        position={[0, 3.8, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus013.geometry}
        material={materials["material.012"]}
        position={[0, 4, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus014.geometry}
        material={materials["material.013"]}
        position={[0, 5.4, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus015.geometry}
        material={materials["material.014"]}
        position={[0, 4.4, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus016.geometry}
        material={materials["material.015"]}
        position={[0, 4.6, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus017.geometry}
        material={materials["material.016"]}
        position={[0, 4.8, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus018.geometry}
        material={materials["material.017"]}
        position={[0, 5, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
      <mesh
        geometry={nodes.Torus019.geometry}
        material={materials["material.018"]}
        position={[0, 5.2, 0]}
        scale={[0.484, 0.504, 0.484]}
        castShadow
        receiveShadow
      />
    </group>
  );
}
