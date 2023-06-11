import { Sphere } from "@react-three/drei";
import { FinalObject } from "../../../types/components/types";
import { ComparisonObject } from "../../../types/data/types";

type Props = {
  finalObject: FinalObject;
  comparisonObject: ComparisonObject;
  size: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
};

const SphereShape = ({
  finalObject,
  comparisonObject,
  size,
  position,
}: Props) => {
  return (
    <Sphere
      args={[size.x, 32, 32]}
      position={[position.x, position.y, position.z]}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={finalObject.material.color}
        metalness={
          comparisonObject.name === "Earth" || comparisonObject.name === "Sun"
            ? 0.1
            : finalObject.material.metalness
        }
        roughness={finalObject.material.roughness}
        transparent={true}
        opacity={finalObject.material.opacity}
      />
    </Sphere>
  );
};

export default SphereShape;
