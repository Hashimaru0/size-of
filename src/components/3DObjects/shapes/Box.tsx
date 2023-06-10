import { RoundedBox } from "@react-three/drei";
import { FinalObject } from "../../../../public/types/components/types";
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
      <RoundedBox
        args={[size.x, size.y, size.z]}
        position={[position.x, position.y, position.z]}
        radius={size.x <= 0.2 || size.y <= 0.2 || size.z <= 0.2 ? 0 : 0.03}
        smoothness={4}
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
      </RoundedBox>
    </>
  );
};

export default Box;
