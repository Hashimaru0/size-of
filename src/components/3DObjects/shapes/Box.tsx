import { FinalObject } from "../../../types/components/types";
import { ComparisonObject } from "../../../types/data/types";

type Props = {
  finalObject: FinalObject;
  comparisonObject: ComparisonObject;
  size: { x: number; y: number; z: number };
  position: { x: number; y: number; z: number };
};

const Box = ({ finalObject, comparisonObject, size, position }: Props) => {
  return (
    <>
      <mesh
        position={[position.x, position.y, position.z]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[size.x, size.y, size.z]} />
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
      </mesh>
    </>
  );
};

export default Box;
