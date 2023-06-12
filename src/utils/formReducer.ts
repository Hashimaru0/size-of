/* eslint-disable prefer-const */
/* eslint-disable no-case-declarations */
// Utility functions
import {
  calculateLocked,
  isInRangeFinite,
  isInRangeLength,
  isValidNumber,
  DEFAULT_FORM,
} from "./calculator";
// Data
import lengthUnits from "../assets/data/length_units.json";
// Types
import { FormObject, Action } from "../types/components/types";

export const TARGET = {
  MATERIAL: "material",
  SHAPE: "shape",
  DENSITY: "density",
  PRICE: "price",
  X: "x",
  Y: "y",
  Z: "z",
  MASS: "mass",
  VALUE: "value",
  RESET: "reset",
};

const formValidCheck = (formObject: FormObject): boolean => {
  let isValid = false;

  if (
    formObject.density.valid &&
    formObject.price.valid &&
    formObject.mass.valid &&
    formObject.value.valid
  ) {
    if (
      formObject.shape.name === "cube" ||
      formObject.shape.name === "sphere"
    ) {
      if (formObject.x.valid) {
        isValid = true;
      }
    } else if (formObject.shape.name === "box") {
      if (formObject.x.valid && formObject.y.valid && formObject.z.valid) {
        isValid = true;
      }
    } else if (formObject.shape.name === "cylinder") {
      if (formObject.x.valid && formObject.y.valid) {
        isValid = true;
      }
    }
  }
  return isValid;
};

const updateForm = (formObject: FormObject, action: Action): FormObject => {
  switch (action.type) {
    case TARGET.MATERIAL:
      let newMaterial = action.payload.material;

      if (newMaterial) {
        formObject.material = newMaterial;

        formObject.density = {
          ...formObject.density,
          value: newMaterial.density.toString(),
          valid: true,
        };
        formObject.price = {
          ...formObject.price,
          value: newMaterial.price.toString(),
          valid: true,
        };

        if (formObject.price.value === "???") {
          formObject.value.value = "???";
          formObject.value.locked = true;
          formObject.value.valid = true;
        }
      }
      return { ...formObject };
    case TARGET.SHAPE:
      let newShape = action.payload.shape;

      if (newShape) {
        formObject.shape = newShape;

        switch (newShape.name) {
          case "cube":
            formObject.x = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            break;
          case "box":
            formObject.x = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            formObject.y = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            formObject.z = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            break;
          case "sphere":
            formObject.x = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            break;
          case "cylinder":
            formObject.x = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            formObject.y = {
              value: "1",
              valid: true,
              unit: lengthUnits[5],
              locked: false,
            };
            break;
        }
      }

      formObject.mass.locked = true;
      formObject.value.locked = true;

      return { ...formObject };
    case TARGET.DENSITY:
      let newDensity = action.payload.density;

      if (newDensity) {
        formObject.density = {
          ...newDensity,
          valid: isInRangeFinite(newDensity.value),
        };
      }

      return { ...formObject };
    case TARGET.PRICE:
      let newPrice = action.payload.price;

      if (newPrice) {
        formObject.price = {
          ...newPrice,
          valid: newPrice.value === "???" || isInRangeFinite(newPrice.value),
        };

        if (formObject.price.value === "???") {
          formObject.value.value = "???";
          formObject.value.locked = true;
          formObject.value.valid = true;
        }
      }

      return { ...formObject };
    case TARGET.X:
      let newX = action.payload.x;
      if (newX) {
        formObject.x = {
          ...newX,
          valid: isInRangeLength(
            newX.value,
            newX.unit.toBase,
            formObject.shape.name === "sphere" ||
              formObject.shape.name === "cylinder"
          ),
        };
      }

      if (
        formObject.shape.name === "cube" ||
        formObject.shape.name === "sphere"
      ) {
        if (!formObject.x.locked) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        }
      } else if (formObject.shape.name === "box") {
        if (
          !formObject.x.locked &&
          !formObject.y.locked &&
          !formObject.z.locked
        ) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        } else if (formObject.x.locked) {
          formObject.y.locked = false;
          formObject.z.locked = false;
        }
      } else if (formObject.shape.name === "cylinder") {
        if (!formObject.x.locked && !formObject.y.locked) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        } else if (formObject.x.locked) {
          formObject.y.locked = false;
        }
      }
      return { ...formObject };
    case TARGET.Y:
      let newY = action.payload.y;

      if (newY) {
        formObject.y = {
          ...newY,
          valid: isInRangeLength(newY.value, newY.unit.toBase, false),
        };
      }

      if (formObject.shape.name === "box") {
        if (
          !formObject.x.locked &&
          !formObject.y.locked &&
          !formObject.z.locked
        ) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        } else if (formObject.y.locked) {
          formObject.x.locked = false;
          formObject.z.locked = false;
        }
      } else if (formObject.shape.name === "cylinder") {
        if (!formObject.x.locked && !formObject.y.locked) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        } else if (formObject.y.locked) {
          formObject.x.locked = false;
        }
      }
      return { ...formObject };
    case TARGET.Z:
      let newZ = action.payload.z;

      if (newZ) {
        formObject.z = {
          ...newZ,
          valid: isInRangeLength(newZ.value, newZ.unit.toBase, false),
        };
      }

      if (formObject.shape.name === "box") {
        if (
          !formObject.x.locked &&
          !formObject.y.locked &&
          !formObject.z.locked
        ) {
          formObject.mass.locked = true;
          formObject.value.locked = true;
        } else if (formObject.z.locked) {
          formObject.x.locked = false;
          formObject.y.locked = false;
        }
      }
      return { ...formObject };
    case TARGET.MASS:
      let newMass = action.payload.mass;

      if (newMass) {
        formObject.mass = {
          ...newMass,
          valid: isValidNumber(newMass.value.toString()),
        };
      }

      if (!formObject.mass.locked) {
        formObject.value.locked = true;
        if (
          formObject.shape.name === "cube" ||
          formObject.shape.name === "sphere"
        ) {
          if (!formObject.x.locked) {
            formObject.x.locked = true;
          }
        } else if (formObject.shape.name === "box") {
          if (
            !formObject.x.locked &&
            !formObject.y.locked &&
            !formObject.z.locked
          ) {
            formObject.z.locked = true;
          }
        } else if (formObject.shape.name === "cylinder") {
          if (!formObject.x.locked && !formObject.y.locked) {
            formObject.y.locked = true;
          }
        }
      }
      return { ...formObject };
    case TARGET.VALUE:
      let newValue = action.payload.value;

      if (newValue) {
        formObject.value = {
          ...newValue,
          valid:
            newValue.value === "???" ||
            isValidNumber(newValue.value.toString()),
        };
      }

      if (!formObject.value.locked) {
        formObject.mass.locked = true;
        if (
          formObject.shape.name === "cube" ||
          formObject.shape.name === "sphere"
        ) {
          if (!formObject.x.locked) {
            formObject.x.locked = true;
          }
        } else if (formObject.shape.name === "box") {
          if (
            !formObject.x.locked &&
            !formObject.y.locked &&
            !formObject.z.locked
          ) {
            formObject.z.locked = true;
          }
        } else if (formObject.shape.name === "cylinder") {
          if (!formObject.x.locked && !formObject.y.locked) {
            formObject.y.locked = true;
          }
        }
      }
      return { ...formObject };
    case TARGET.RESET:
      formObject = DEFAULT_FORM;
      return { ...formObject };
    default:
      return { ...formObject };
  }
};

export const reducer = (formObject: FormObject, action: Action): FormObject => {
  let updatedForm = updateForm(formObject, action);

  if (updatedForm.density.valid && updatedForm.price.valid)
    updatedForm = calculateLocked(updatedForm);

  updatedForm.valid = formValidCheck(formObject);

  return updatedForm;
};
