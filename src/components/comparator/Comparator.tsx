import { useEffect, useState } from "react";
// Comparison Objects
import { DNA } from "../3DObjects/comparison/DNA";
import { Bacteriophage } from "../3DObjects/comparison/Bacteriophage";
import { RedBloodCell } from "../3DObjects/comparison/RedBloodCell";
import { Hair } from "../3DObjects/comparison/Hair";
import { Hand } from "../3DObjects/comparison/Hand";
import { Human } from "../3DObjects/comparison/Human";
import { BurjKhalifa } from "../3DObjects/comparison/BurjKhalifa";
import { MountFuji } from "../3DObjects/comparison/MountFuji";
import { Earth } from "../3DObjects/comparison/Earth";
import { Sun } from "../3DObjects/comparison/Sun";
// Shapes
import Box from "../3DObjects/shapes/Box";
import SphereShape from "../3DObjects/shapes/SphereShape";
import CylinderShape from "../3DObjects/shapes/CylinderShape";
// Types
import { ComparatorProps } from "../../types/components/props/types";
import ObjectText from "../3DObjects/world/ObjectText";

const Comparator = ({ finalObject, comparisonObject }: ComparatorProps) => {
  const [shapeSize, setShapeSize] = useState({ x: 0, y: 0, z: 0 });
  const [shapePosition, setShapePosition] = useState({ x: 0, y: 0, z: 0 });

  const pickComparisonObject = () => {
    switch (comparisonObject.name) {
      case "DNA":
        return <DNA />;
      case "Bacteriophage":
        return <Bacteriophage />;
      case "Red Blood Cell":
        return <RedBloodCell />;
      case "Hair":
        return <Hair />;
      case "Hand":
        return <Hand />;
      case "Human":
        return <Human />;
      case "Burj Khalifa":
        return <BurjKhalifa />;
      case "Mount Fuji":
        return <MountFuji />;
      case "Earth":
        return <Earth />;
      case "Sun":
        return <Sun />;
    }
  };

  const makeShape = () => {
    switch (finalObject.shape) {
      case "cube":
        return (
          <Box
            finalObject={finalObject}
            comparisonObject={comparisonObject}
            size={shapeSize}
            position={shapePosition}
          />
        );
      case "box":
        return (
          <Box
            finalObject={finalObject}
            comparisonObject={comparisonObject}
            size={shapeSize}
            position={shapePosition}
          />
        );
      case "sphere":
        return (
          <SphereShape
            finalObject={finalObject}
            comparisonObject={comparisonObject}
            size={shapeSize}
            position={shapePosition}
          />
        );
      case "cylinder":
        return (
          <CylinderShape
            finalObject={finalObject}
            comparisonObject={comparisonObject}
            size={shapeSize}
            position={shapePosition}
          />
        );
    }
  };

  useEffect(() => {
    const unitSizeInM = comparisonObject.unitSize;

    let newShapeSize = { x: 1, y: 1, z: 1 };
    let newShapePosition = { x: 0, y: 0, z: 0 };

    let heightCutoff = 5;

    if (
      comparisonObject.name === "Hair" ||
      comparisonObject.name === "Earth" ||
      comparisonObject.name === "Sun"
    ) {
      heightCutoff = 8;
    }

    newShapeSize = {
      x: (finalObject.x.value * finalObject.x.unit.toBase) / unitSizeInM,
      y: (finalObject.y.value * finalObject.y.unit.toBase) / unitSizeInM,
      z: (finalObject.z.value * finalObject.z.unit.toBase) / unitSizeInM,
    };

    if (finalObject.shape === "cube" || finalObject.shape === "sphere")
      newShapeSize = {
        x: (finalObject.x.value * finalObject.x.unit.toBase) / unitSizeInM,
        y: (finalObject.x.value * finalObject.x.unit.toBase) / unitSizeInM,
        z: (finalObject.x.value * finalObject.x.unit.toBase) / unitSizeInM,
      };

    if (newShapeSize.x <= 0.01) newShapeSize.x = 0.01;
    if (newShapeSize.y <= 0.01) newShapeSize.y = 0.01;
    if (newShapeSize.z <= 0.01) newShapeSize.z = 0.01;

    if (comparisonObject.name === "Hand") {
      switch (finalObject.shape) {
        case "cube":
          newShapePosition = {
            x: 0.3,
            y: newShapeSize.y / 2 + 6.65,
            z: 0.4,
          };
          break;
        case "box":
          newShapePosition = {
            x: 0.3,
            y: newShapeSize.y / 2 + 6.715,
            z: 0.4,
          };
          break;
        case "sphere":
          newShapePosition = {
            x: 0.3,
            y: newShapeSize.y + 6.6,
            z: 0.4,
          };
          break;
        case "cylinder":
          newShapePosition = {
            x: 0.3,
            y: newShapeSize.y / 2 + 6.715,
            z: 0.4,
          };
          break;
      }
    } else {
      switch (finalObject.shape) {
        case "cube":
          newShapePosition = {
            x: 0,
            y: newShapeSize.y / 2,
            z:
              newShapeSize.x > heightCutoff
                ? -(newShapeSize.x / 2 + comparisonObject.backDistance)
                : newShapeSize.x / 2 + comparisonObject.frontDistance,
          };
          break;
        case "box":
          newShapePosition = {
            x: 0,
            y: newShapeSize.y / 2,
            z:
              newShapeSize.y > heightCutoff
                ? -(newShapeSize.z / 2 + comparisonObject.backDistance)
                : newShapeSize.z / 2 + comparisonObject.frontDistance,
          };
          break;
        case "sphere":
          newShapePosition = {
            x: 0,
            y: newShapeSize.y,
            z:
              newShapeSize.x * 2 > heightCutoff
                ? -(newShapeSize.x + comparisonObject.backDistance)
                : newShapeSize.x + comparisonObject.frontDistance,
          };
          break;
        case "cylinder":
          newShapePosition = {
            x: 0,
            y: newShapeSize.y / 2,
            z:
              newShapeSize.y > heightCutoff
                ? -(newShapeSize.x + comparisonObject.backDistance)
                : newShapeSize.x + comparisonObject.frontDistance,
          };
          break;
      }
    }

    if (comparisonObject.name === "Earth" || comparisonObject.name === "Sun") {
      newShapePosition.y = 5;
    }

    setShapeSize(newShapeSize);
    setShapePosition(newShapePosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finalObject, comparisonObject]);

  return (
    <>
      {pickComparisonObject()}
      <ObjectText
        comparisonObject={comparisonObject}
        shapePosition={shapePosition}
      />
      {makeShape()}
    </>
  );
};

export default Comparator;
