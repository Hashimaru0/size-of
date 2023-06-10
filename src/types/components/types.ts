import { Dispatch } from "react";
import { Material, Shape, Unit } from "../data/types";

type FinalObjectDimension = { value: number; unit: Unit };

export type FinalObject = {
  material: Material;
  shape: string;
  x: FinalObjectDimension;
  y: FinalObjectDimension;
  z: FinalObjectDimension;
  mass: FinalObjectDimension;
  value: FinalObjectDimension;
  description: string;
};

export type FormObject = {
  material: Material;
  shape: Shape;
  density: SimpleInput;
  price: SimpleInput;
  x: LockInput;
  y: LockInput;
  z: LockInput;
  mass: LockInput;
  value: LockInput;
  valid: boolean;
};

export type SimpleInput = {
  value: string;
  valid: boolean;
};

export interface LockInput extends SimpleInput {
  unit: Unit;
  locked: boolean;
}

export type Action = {
  type: string;
  payload: {
    material?: Material | null;
    shape?: Shape | null;
    density?: SimpleInput | null;
    price?: SimpleInput | null;
    x?: LockInput | null;
    y?: LockInput | null;
    z?: LockInput | null;
    mass?: LockInput | null;
    value?: LockInput | null;
  };
};

export type Context = {
  formObject: FormObject;
  dispatch: Dispatch<Action>;
};

export type SelectOption = {
  value: number | undefined;
  label: string | undefined;
};
