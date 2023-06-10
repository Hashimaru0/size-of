import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { buttonGroup, useControls } from "leva";
import { MAX_LENGTH, MIN_LENGTH } from "../utils/calculator";
// Data
import materials from "../assets/data/materials.json";
import lengthUnits from "../assets/data/length_units.json";
// Types
import { FinalObject } from "../types/components/types";

const materialsObjs = materials.map((material) => material.name);

const LevaUI = ({
  setFinalObject,
}: {
  setFinalObject: Dispatch<SetStateAction<FinalObject>>;
}) => {
  const { material, shape } = useControls({
    material: { options: materialsObjs },
    shape: { options: ["cube", "box", "sphere", "cylinder"] },
    X: buttonGroup({
      "\u23F4": () => setXForwards(false),
      "\u23EF": () => setXPaused((prev) => !prev),
      "\u23F5": () => setXForwards(true),
    }),
    "X Speed": buttonGroup({
      "0.25x": () => setXSpeed(0.25),
      "0.5x": () => setXSpeed(0.5),
      "1x": () => setXSpeed(1),
      "1.5x": () => setXSpeed(1.5),
      "2x": () => setXSpeed(2),
      "3x": () => setXSpeed(3),
    }),
    Y: buttonGroup({
      "\u23F4": () => setYForwards(false),
      "\u23EF": () => setYPaused((prev) => !prev),
      "\u23F5": () => setYForwards(true),
    }),
    "Y Speed": buttonGroup({
      "0.25x": () => setYSpeed(0.25),
      "0.5x": () => setYSpeed(0.5),
      "1x": () => setYSpeed(1),
      "1.5x": () => setYSpeed(1.5),
      "2x": () => setYSpeed(2),
      "3x": () => setYSpeed(3),
    }),
    Z: buttonGroup({
      "\u23F4": () => setZForwards(false),
      "\u23EF": () => setZPaused((prev) => !prev),
      "\u23F5": () => setZForwards(true),
    }),
    "Z Speed": buttonGroup({
      "0.25x": () => setZSpeed(0.25),
      "0.5x": () => setZSpeed(0.5),
      "1x": () => setZSpeed(1),
      "1.5x": () => setZSpeed(1.5),
      "2x": () => setZSpeed(2),
      "3x": () => setZSpeed(3),
    }),
  });

  const [xValue, setXValue] = useState(MIN_LENGTH);
  const [xPaused, setXPaused] = useState(true);
  const [xForwards, setXForwards] = useState(true);
  const [xSpeed, setXSpeed] = useState(1);

  const [yValue, setYValue] = useState(MIN_LENGTH);
  const [yPaused, setYPaused] = useState(true);
  const [yForwards, setYForwards] = useState(true);
  const [ySpeed, setYSpeed] = useState(1);

  const [zValue, setZValue] = useState(MIN_LENGTH);
  const [zPaused, setZPaused] = useState(true);
  const [zForwards, setZForwards] = useState(true);
  const [zSpeed, setZSpeed] = useState(1);

  const clampValue = (
    val: number,
    speed: number,
    forwards: boolean,
    id: string
  ): number => {
    let newVal = val;
    newVal += (val / 100) * speed * (forwards ? 1 : -1);

    if (newVal < MIN_LENGTH) {
      newVal = MIN_LENGTH;
      if (id === "x") {
        setXPaused(true);
      } else if (id === "y") {
        setYPaused(true);
      } else if (id === "z") {
        setZPaused(true);
      }
    } else if (newVal > MAX_LENGTH) {
      newVal = MAX_LENGTH;
      if (id === "x") {
        setXPaused(true);
      } else if (id === "y") {
        setYPaused(true);
      } else if (id === "z") {
        setZPaused(true);
      }
    }
    return newVal;
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (!xPaused) {
      intervalId = setInterval(() => {
        setXValue((prev) => clampValue(prev, xSpeed, xForwards, "x"));
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [xPaused, xForwards, xSpeed]);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (!yPaused) {
      intervalId = setInterval(() => {
        setYValue((prev) => clampValue(prev, ySpeed, yForwards, "y"));
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [yPaused, yForwards, ySpeed]);

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (!zPaused) {
      intervalId = setInterval(() => {
        setZValue((prev) => clampValue(prev, zSpeed, zForwards, "z"));
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [zPaused, zForwards, zSpeed]);

  useEffect(() => {
    const newMaterial = materials.find((mat) => mat.name === material);

    setFinalObject((prev) => ({
      ...prev,
      material: newMaterial ? newMaterial : prev.material,
      shape: shape,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material, shape]);

  useEffect(() => {
    setFinalObject((prev) => ({
      ...prev,
      x: { value: xValue, unit: lengthUnits[5] },
      y: { value: yValue, unit: lengthUnits[5] },
      z: { value: zValue, unit: lengthUnits[5] },
    }));
  }, [xValue, yValue, zValue, setFinalObject]);
  return <></>;
};

export default LevaUI;
