import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    Sphere_Material002_0: THREE.Mesh;
  };
  materials: {
    ["Material.002"]: THREE.MeshStandardMaterial;
  };
};

export function Earth(props: JSX.IntrinsicElements["group"]) {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    "src/assets/3DModels/Earth.glb"
  ) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Sketchfab_modelAction"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model">
          <group
            name="8a888f66473549c99c3f97fb5030482ffbx"
            position={[0, -0.17, 0]}
            scale={0.071}
          >
            <group name="RootNode">
              <group name="Sphere" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                <mesh
                  name="Sphere_Material002_0"
                  geometry={nodes.Sphere_Material002_0.geometry}
                  material={materials["Material.002"]}
                  position={[0, 0, 0.73]}
                  scale={0.706}
                  castShadow
                  receiveShadow
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
