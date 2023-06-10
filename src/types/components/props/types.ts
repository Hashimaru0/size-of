import { Dispatch, SetStateAction } from "react";
import { SimpleInput, LockInput, FinalObject } from "../types";
import { ComparisonObject, Material, Shape, Unit } from "../../data/types";

export type FormProps = {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  createObject: () => void;
};

export type SelectInputProps = {
  label: string;
  target: string;
  data: Material[] | Shape[];
};

export type ConstantInputProps = {
  label: string;
  targetObj: SimpleInput;
  target: string;
  unit: string;
};

export type DimensionInputProps = {
  label: string;
  dimensionObj: LockInput;
  target: string;
  units: Unit[];
};

export type ComparatorProps = {
  finalObject: FinalObject;
  comparisonObject: ComparisonObject;
};

export type NormalComparator = {
  finalObject: FinalObject;
  comparisonObject: ComparisonObject;
  shapeSize: { x: number; y: number; z: number };
  shapePosition: { x: number; y: number; z: number };
};

export type PhysicsComparator = {
  finalObject: FinalObject;
  comparisonObject: ComparisonObject;
  shapeSize: { x: number; y: number; z: number };
};
