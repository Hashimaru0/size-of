import { useEffect, useState } from "react";
import { Text } from "@react-three/drei";
// Types
import { ComparisonObject } from "../../../types/data/types";

type Props = {
  comparisonObject: ComparisonObject;
  shapePosition: { x: number; y: number; z: number };
};

const ObjectText = ({ comparisonObject, shapePosition }: Props) => {
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  useEffect(() => {
    if (comparisonObject.name === "Hand") {
      setY(3);
      setZ(5);
    } else if (comparisonObject.name === "Mount Fuji") {
      setY(14);
      setZ(0);
    } else {
      comparisonObject.name === "Red Blood Cell" ? setY(13) : setY(12);
      setZ(0);
    }
  }, [shapePosition, comparisonObject]);

  return (
    <>
      <Text
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineColor={"#444"}
        outlineWidth={0.03}
        outlineBlur={0}
        position={[0, y, z]}
      >
        {comparisonObject.name}
      </Text>
      <Text
        fontSize={0.6}
        color="white"
        anchorX="center"
        anchorY="bottom"
        outlineColor={"#444"}
        outlineWidth={0.03}
        outlineBlur={0}
        position={[0, y - 1, z]}
      >
        {comparisonObject.description}
      </Text>
    </>
  );
};

export default ObjectText;
