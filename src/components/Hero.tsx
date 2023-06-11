import { useState, useEffect, useReducer, createContext } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
// Components
import UI from "./UI";
import Form from "./form/Form";
import CameraReact from "./3DObjects/world/CameraReact";
import Controls from "./3DObjects/world/Controls";
import NormalLighting from "./3DObjects/world/NormalLighting";
import SpaceLighting from "./3DObjects/world/SpaceLighting";
import Comparator from "./comparator/Comparator";
// Data
import comparisonObjects from "../assets/data/comparison_objects.json";
import lengthUnits from "../assets/data/length_units.json";
import massUnits from "../assets/data/mass_units.json";
import currencyUnits from "../assets/data/currency_units.json";
import randomObjects from "../assets/data/random_objects.json";
// 3D Objects
import Floor from "./3DObjects/world/Floor";
// Utils
import { reducer } from "../utils/formReducer";
import {
  capitalizeFirstLetter,
  formatNumber,
  valueToNum,
} from "../utils/calculator";
// Types
import { ComparisonObject } from "../types/data/types";
import { FinalObject, Context } from "../types/components/types";
import LevaUI from "./LevaUI";
// Assets
import skyNX from "../assets/cubemaps/sky/nx.jpg";
import skyNY from "../assets/cubemaps/sky/ny.jpg";
import skyNZ from "../assets/cubemaps/sky/nz.jpg";
import skyPX from "../assets/cubemaps/sky/px.jpg";
import skyPY from "../assets/cubemaps/sky/py.jpg";
import skyPZ from "../assets/cubemaps/sky/pz.jpg";

import galaxyNX from "../assets/cubemaps/galaxy/nx.jpg";
import galaxyNY from "../assets/cubemaps/galaxy/ny.jpg";
import galaxyNZ from "../assets/cubemaps/galaxy/nz.jpg";
import galaxyPX from "../assets/cubemaps/galaxy/px.jpg";
import galaxyPY from "../assets/cubemaps/galaxy/py.jpg";
import galaxyPZ from "../assets/cubemaps/galaxy/pz.jpg";

export const FormDataContext = createContext<Context>({
  formObject: {
    material: {
      id: 0,
      name: "",
      density: 1,
      price: 1,
      color: "",
      metalness: 0,
      roughness: 1,
      opacity: 1,
    },
    shape: {
      id: 0,
      name: "cube",
    },
    density: {
      value: "1",
      valid: true,
    },
    price: {
      value: "1",
      valid: true,
    },
    x: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    y: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    z: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    mass: {
      value: "1",
      valid: true,
      unit: massUnits[5],
      locked: true,
    },
    value: {
      value: "1",
      valid: true,
      unit: currencyUnits[0],
      locked: true,
    },
    valid: false,
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {},
});

const Hero = () => {
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [formObject, dispatch] = useReducer(reducer, {
    material: {
      id: 0,
      name: "",
      density: 1,
      price: 1,
      color: "",
      metalness: 0,
      roughness: 1,
      opacity: 1,
    },
    shape: {
      id: 0,
      name: "cube",
    },
    density: {
      value: "1",
      valid: true,
    },
    price: {
      value: "1",
      valid: true,
    },
    x: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    y: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    z: {
      value: "1",
      valid: true,
      unit: lengthUnits[5],
      locked: false,
    },
    mass: {
      value: "1",
      valid: true,
      unit: massUnits[5],
      locked: true,
    },
    value: {
      value: "1",
      valid: true,
      unit: currencyUnits[0],
      locked: true,
    },
    valid: false,
  });
  const [finalObject, setFinalObject] = useState<FinalObject>({
    material: {
      id: 0,
      name: "",
      density: 1,
      price: 1,
      color: "",
      metalness: 0,
      roughness: 1,
      opacity: 1,
    },
    shape: "cube",
    x: { value: 1, unit: lengthUnits[5] },
    y: { value: 1, unit: lengthUnits[5] },
    z: { value: 1, unit: lengthUnits[5] },
    mass: {
      value: 1,
      unit: massUnits[5],
    },
    value: {
      value: 1,
      unit: currencyUnits[0],
    },
    description: "",
  });
  const [comparisonObject, setComparisonObject] = useState<ComparisonObject>(
    comparisonObjects[0]
  );

  const [cameraPos, setCameraPos] = useState<[number, number, number]>([
    0, 0, 10,
  ]);
  const [orbitTarget, setOrbitTarget] = useState<[number, number, number]>([
    0, 0, 0,
  ]);

  const createObject = () => {
    const finalObj = {
      material: formObject.material,
      shape: formObject.shape.name,
      x: { value: valueToNum(formObject.x.value), unit: formObject.x.unit },
      y: { value: valueToNum(formObject.y.value), unit: formObject.y.unit },
      z: { value: valueToNum(formObject.z.value), unit: formObject.z.unit },
      mass: {
        value: valueToNum(formObject.mass.value),
        unit: formObject.mass.unit,
      },
      value: {
        value:
          valueToNum(formObject.value.value) === null ||
          isNaN(valueToNum(formObject.value.value))
            ? 0
            : valueToNum(formObject.value.value),
        unit: formObject.value.unit,
      },
      description: "",
    };

    finalObj.description = `${capitalizeFirstLetter(finalObj.material.name)} ${
      finalObj.shape
    } with a mass of ${formatNumber(finalObj.mass.value)} ${
      finalObj.mass.unit.shorthand
    }, worth $${
      finalObj.value.value === 0 ? "???" : formatNumber(finalObj.value.value)
    }.`;

    setFinalObject(finalObj);
    dispatch({
      type: "reset",
      payload: {},
    });
    setFormOpen(false);
    resetCam();
  };

  const resetCam = () => {
    setCameraPos([0, 15, 25]);
    setOrbitTarget([0, 5, 0]);
  };

  const pickRandomObject = () => {
    const randomObj =
      randomObjects[Math.floor(Math.random() * randomObjects.length)];

    if (randomObj) setFinalObject(randomObj);
    resetCam();
  };

  useEffect(() => {
    pickRandomObject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let comparisonObj = comparisonObjects[0];
    let biggestDimensionInM = finalObject.x.value * finalObject.x.unit.toBase;

    if (finalObject.shape === "sphere") {
      biggestDimensionInM = finalObject.x.value * finalObject.x.unit.toBase * 2;
    }
    if (finalObject.shape === "box") {
      if (
        finalObject.y.value * finalObject.y.unit.toBase >
        biggestDimensionInM
      ) {
        biggestDimensionInM = finalObject.y.value * finalObject.y.unit.toBase;
      }
      if (
        finalObject.z.value * finalObject.z.unit.toBase >
        biggestDimensionInM
      ) {
        biggestDimensionInM = finalObject.z.value * finalObject.z.unit.toBase;
      }
    } else if (finalObject.shape === "cylinder") {
      biggestDimensionInM = finalObject.x.value * finalObject.x.unit.toBase * 2;
      if (
        finalObject.y.value * finalObject.y.unit.toBase >
        biggestDimensionInM
      ) {
        biggestDimensionInM = finalObject.y.value * finalObject.y.unit.toBase;
      }
    }

    for (let i = 0; i < comparisonObjects.length; i++) {
      if (comparisonObjects[i].cutoff > biggestDimensionInM) {
        comparisonObj = comparisonObjects[i];
        break;
      }
    }

    setComparisonObject(comparisonObj);
  }, [finalObject]);

  return (
    <div className="w-screen h-screen">
      <UI
        finalObject={finalObject}
        setFormOpen={setFormOpen}
        resetCam={resetCam}
        pickRandomObject={pickRandomObject}
      />
      <LevaUI setFinalObject={setFinalObject} />
      <FormDataContext.Provider
        value={{
          formObject,
          dispatch,
        }}
      >
        {formOpen && (
          <Form setFormOpen={setFormOpen} createObject={createObject} />
        )}
      </FormDataContext.Provider>
      <Canvas camera={{ fov: 60, position: [0, 0, 10] }} shadows>
        <CameraReact cameraPos={cameraPos} />
        <Controls target={orbitTarget} />
        <Environment
          files={
            comparisonObject.name !== "Earth" && comparisonObject.name !== "Sun"
              ? [skyPX, skyNX, skyPY, skyNY, skyPZ, skyNZ]
              : [galaxyPX, galaxyNX, galaxyPY, galaxyNY, galaxyPZ, galaxyNZ]
          }
          background={
            comparisonObject.name !== "Earth" && comparisonObject.name !== "Sun"
              ? false
              : true
          }
        />
        {comparisonObject.name !== "Earth" &&
        comparisonObject.name !== "Sun" ? (
          <NormalLighting />
        ) : (
          <SpaceLighting />
        )}
        <Comparator
          finalObject={finalObject}
          comparisonObject={comparisonObject}
        />
        {comparisonObject.name !== "Earth" &&
          comparisonObject.name !== "Sun" && <Floor />}
      </Canvas>
    </div>
  );
};

export default Hero;
