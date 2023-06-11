/* eslint-disable prefer-const */
import { FormObject } from "../types/components/types";

export let MIN_LENGTH = 1e-10;
export let MAX_LENGTH = 2e10;

let DENSITY_NORMAL = 1;
let MULTIPLIERS = [
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion",
  "septillion",
  "octillion",
  "nonillion",
  "decillion",
];

export const valueToNum = (val: string): number => {
  let splitNums = val.split(" ");
  let numMultiplier = 1;
  let startNum = splitNums[0];
  let splitEnd = splitNums[splitNums.length - 1];

  if (splitNums.length === 2 && MULTIPLIERS.includes(splitEnd)) {
    switch (splitEnd) {
      case "million":
        numMultiplier = 1e6;
        break;
      case "billion":
        numMultiplier = 1e9;
        break;
      case "trillion":
        numMultiplier = 1e12;
        break;
      case "quadrillion":
        numMultiplier = 1e15;
        break;
      case "quintillion":
        numMultiplier = 1e18;
        break;
      case "sextillion":
        numMultiplier = 1e21;
        break;
      case "septillion":
        numMultiplier = 1e24;
        break;
      case "octillion":
        numMultiplier = 1e27;
        break;
      case "nonillion":
        numMultiplier = 1e30;
        break;
      case "decillion":
        numMultiplier = 1e33;
        break;
    }
    return +startNum * numMultiplier;
  } else {
    return +val;
  }
};

const cubeFromVolume = (formObject: FormObject): FormObject => {
  if (!formObject.x.valid) return formObject;

  let volumeInM = Math.pow(
    valueToNum(formObject.x.value) * formObject.x.unit.toBase,
    3
  );
  let massInKg = DENSITY_NORMAL * volumeInM;
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  if (formObject.price.value !== "???") {
    let value = valueToNum(formObject.price.value) * massInKg;
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const cubeFromMass = (formObject: FormObject): FormObject => {
  if (!formObject.mass.valid) return formObject;

  let volumeInM =
    (valueToNum(formObject.mass.value) * formObject.mass.unit.toBase) /
    DENSITY_NORMAL;
  let sideInM = Math.cbrt(volumeInM);
  formObject.x.value = formatNumber(sideInM / formObject.x.unit.toBase);
  formObject.x.valid = isInRangeLength(sideInM.toString(), 1, false);

  if (formObject.price.value !== "???") {
    let value =
      valueToNum(formObject.mass.value) *
      formObject.mass.unit.toBase *
      valueToNum(formObject.price.value);
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const cubeFromValue = (formObject: FormObject): FormObject => {
  if (!formObject.value.valid) return formObject;

  let massInKg =
    valueToNum(formObject.value.value) / valueToNum(formObject.price.value);
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  let volumeInM = massInKg / DENSITY_NORMAL;
  let sideInM = Math.cbrt(volumeInM);
  formObject.x.value = formatNumber(sideInM / formObject.x.unit.toBase);
  formObject.x.valid = isInRangeLength(sideInM.toString(), 1, false);

  return formObject;
};

const boxFromVolume = (formObject: FormObject): FormObject => {
  if (!formObject.x.valid || !formObject.y.valid || !formObject.z.valid)
    return formObject;

  let volumeInM =
    valueToNum(formObject.x.value) *
    formObject.x.unit.toBase *
    valueToNum(formObject.y.value) *
    formObject.y.unit.toBase *
    valueToNum(formObject.z.value) *
    formObject.z.unit.toBase;

  let massInKg = DENSITY_NORMAL * volumeInM;
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  if (formObject.price.value !== "???") {
    let value = valueToNum(formObject.price.value) * massInKg;
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const boxFromMass = (formObject: FormObject): FormObject => {
  if (
    !formObject.mass.valid ||
    (!formObject.x.locked && !formObject.x.valid) ||
    (!formObject.y.locked && !formObject.y.valid) ||
    (!formObject.z.locked && !formObject.z.valid)
  )
    return formObject;

  let volumeInM =
    (valueToNum(formObject.mass.value) * formObject.mass.unit.toBase) /
    DENSITY_NORMAL;
  if (formObject.z.locked) {
    let xInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let yInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let zInM = volumeInM / xInM / yInM;
    formObject.z.value = formatNumber(zInM / formObject.z.unit.toBase);
    formObject.z.valid = isInRangeLength(zInM.toString(), 1, false);
  } else if (formObject.y.locked) {
    let xInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let zInM = valueToNum(formObject.z.value) * formObject.z.unit.toBase;
    let yInM = volumeInM / xInM / zInM;
    formObject.y.value = formatNumber(yInM / formObject.y.unit.toBase);
    formObject.y.valid = isInRangeLength(yInM.toString(), 1, false);
  } else if (formObject.x.locked) {
    let yInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let zInM = valueToNum(formObject.z.value) * formObject.z.unit.toBase;
    let xInM = volumeInM / yInM / zInM;
    formObject.x.value = formatNumber(xInM / formObject.x.unit.toBase);
    formObject.x.valid = isInRangeLength(xInM.toString(), 1, false);
  }

  if (formObject.price.value !== "???") {
    let value =
      valueToNum(formObject.mass.value) *
      formObject.mass.unit.toBase *
      valueToNum(formObject.price.value);
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const boxFromValue = (formObject: FormObject): FormObject => {
  if (
    !formObject.value.valid ||
    (!formObject.x.locked && !formObject.x.valid) ||
    (!formObject.y.locked && !formObject.y.valid) ||
    (!formObject.z.locked && !formObject.z.valid)
  )
    return formObject;

  let massInKg =
    valueToNum(formObject.value.value) / valueToNum(formObject.price.value);
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  let volumeInM = massInKg / DENSITY_NORMAL;
  if (formObject.z.locked) {
    let xInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let yInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let zInM = volumeInM / xInM / yInM;
    formObject.z.value = formatNumber(zInM / formObject.z.unit.toBase);
    formObject.z.valid = isInRangeLength(zInM.toString(), 1, false);
  } else if (formObject.y.locked) {
    let xInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let zInM = valueToNum(formObject.z.value) * formObject.z.unit.toBase;
    let yInM = volumeInM / xInM / zInM;
    formObject.y.value = formatNumber(yInM / formObject.y.unit.toBase);
    formObject.y.valid = isInRangeLength(yInM.toString(), 1, false);
  } else if (formObject.x.locked) {
    let yInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let zInM = valueToNum(formObject.z.value) * formObject.z.unit.toBase;
    let xInM = volumeInM / yInM / zInM;
    formObject.x.value = formatNumber(xInM / formObject.x.unit.toBase);
    formObject.x.valid = isInRangeLength(xInM.toString(), 1, false);
  }

  return formObject;
};

const sphereFromVolume = (formObject: FormObject): FormObject => {
  if (!formObject.x.valid) return formObject;

  let volumeInM =
    (4 / 3) *
    Math.PI *
    Math.pow(valueToNum(formObject.x.value) * formObject.x.unit.toBase, 3);

  let massInKg = DENSITY_NORMAL * volumeInM;
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  if (formObject.price.value !== "???") {
    let value = valueToNum(formObject.price.value) * massInKg;
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const sphereFromMass = (formObject: FormObject): FormObject => {
  if (!formObject.mass.valid) return formObject;

  let volumeInM =
    (valueToNum(formObject.mass.value) * formObject.mass.unit.toBase) /
    DENSITY_NORMAL;
  let radiusInM = Math.cbrt((3 * volumeInM) / (4 * Math.PI));
  formObject.x.value = formatNumber(radiusInM / formObject.x.unit.toBase);
  formObject.x.valid = isInRangeLength(radiusInM.toString(), 1, true);

  if (formObject.price.value !== "???") {
    let value =
      valueToNum(formObject.mass.value) *
      formObject.mass.unit.toBase *
      valueToNum(formObject.price.value);
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }

  return formObject;
};

const sphereFromValue = (formObject: FormObject): FormObject => {
  if (!formObject.value.valid) return formObject;

  let massInKg =
    valueToNum(formObject.value.value) / valueToNum(formObject.price.value);
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  let volumeInM = massInKg / DENSITY_NORMAL;
  let radiusInM = Math.cbrt((3 * volumeInM) / (4 * Math.PI));
  formObject.x.value = formatNumber(radiusInM / formObject.x.unit.toBase);
  formObject.x.valid = isInRangeLength(radiusInM.toString(), 1, true);

  return formObject;
};

const cylinderFromVolume = (formObject: FormObject): FormObject => {
  if (!formObject.x.valid || !formObject.y.valid) return formObject;

  let volumeInM =
    Math.PI *
    Math.pow(valueToNum(formObject.x.value) * formObject.x.unit.toBase, 2) *
    (valueToNum(formObject.y.value) * formObject.y.unit.toBase);

  let massInKg = DENSITY_NORMAL * volumeInM;
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  if (formObject.price.value !== "???") {
    let value = valueToNum(formObject.price.value) * massInKg;
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const cylinderFromMass = (formObject: FormObject): FormObject => {
  if (
    !formObject.mass.valid ||
    (!formObject.x.locked && !formObject.x.valid) ||
    (!formObject.y.locked && !formObject.y.valid)
  )
    return formObject;

  let volumeInM =
    (valueToNum(formObject.mass.value) * formObject.mass.unit.toBase) /
    DENSITY_NORMAL;
  if (formObject.y.locked) {
    let radiusInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let heightInM = volumeInM / (Math.PI * Math.pow(radiusInM, 2));
    formObject.y.value = formatNumber(heightInM / formObject.y.unit.toBase);
    formObject.y.valid = isInRangeLength(heightInM.toString(), 1, false);
  } else if (formObject.x.locked) {
    let heightInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let radiusInM = Math.sqrt(volumeInM / (Math.PI * heightInM));
    formObject.x.value = formatNumber(radiusInM / formObject.x.unit.toBase);
    formObject.x.valid = isInRangeLength(radiusInM.toString(), 1, true);
  }

  if (formObject.price.value !== "???") {
    let value =
      valueToNum(formObject.mass.value) *
      formObject.mass.unit.toBase *
      valueToNum(formObject.price.value);
    formObject.value.value = formatNumber(value);
    formObject.value.valid = isValidNumber(value.toString());
  }
  return formObject;
};

const cylinderFromValue = (formObject: FormObject): FormObject => {
  if (
    !formObject.value.valid ||
    (!formObject.x.locked && !formObject.x.valid) ||
    (!formObject.y.locked && !formObject.y.valid)
  )
    return formObject;

  let massInKg =
    valueToNum(formObject.value.value) / valueToNum(formObject.price.value);
  formObject.mass.value = formatNumber(massInKg / formObject.mass.unit.toBase);
  formObject.mass.valid = isValidNumber(
    (massInKg / formObject.mass.unit.toBase).toString()
  );

  let volumeInM = massInKg / DENSITY_NORMAL;
  if (formObject.y.locked) {
    let radiusInM = valueToNum(formObject.x.value) * formObject.x.unit.toBase;
    let heightInM = volumeInM / (Math.PI * Math.pow(radiusInM, 2));
    formObject.y.value = formatNumber(heightInM / formObject.y.unit.toBase);
    formObject.y.valid = isInRangeLength(heightInM.toString(), 1, false);
  } else if (formObject.x.locked) {
    let heightInM = valueToNum(formObject.y.value) * formObject.y.unit.toBase;
    let radiusInM = Math.sqrt(volumeInM / (Math.PI * heightInM));
    formObject.x.value = formatNumber(radiusInM / formObject.x.unit.toBase);
    formObject.x.valid = isInRangeLength(radiusInM.toString(), 1, true);
  }

  return formObject;
};

export const isInRangeFinite = (num: string): boolean => {
  if (valueToNum(num) > 0 && isFinite(valueToNum(num))) {
    return true;
  } else return false;
};

export const isInRangeLength = (
  num: string,
  toBase: number,
  toDoubleSize: boolean
): boolean => {
  if (
    valueToNum(num) * toBase * (toDoubleSize ? 2 : 1) > MIN_LENGTH &&
    valueToNum(num) * toBase * (toDoubleSize ? 2 : 1) < MAX_LENGTH
  ) {
    return true;
  } else return false;
};

export const isValidNumber = (num: string): boolean => {
  let splitNums = num.split(" ");
  let startNum = splitNums[0];

  if (+startNum >= 0 && !isNaN(+startNum)) {
    if (splitNums.length === 1) {
      return true;
    } else if (splitNums.length === 2) {
      let splitEnd = splitNums[splitNums.length - 1];
      if (MULTIPLIERS.includes(splitEnd)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else return false;
};

export const formatNumber = (num: number): string => {
  let strNum = "";

  if (num === 0) {
    strNum = "0";
  } else if (num > 999999) {
    if (num >= 1e36) {
      strNum = num.toExponential(3);
    } else if (num >= 1e33) {
      strNum = (Math.round((num / 1e33) * 100) / 100).toString() + " decillion";
    } else if (num >= 1e30) {
      strNum = (Math.round((num / 1e30) * 100) / 100).toString() + " nonillion";
    } else if (num >= 1e27) {
      strNum = (Math.round((num / 1e27) * 100) / 100).toString() + " octillion";
    } else if (num >= 1e24) {
      strNum =
        (Math.round((num / 1e24) * 100) / 100).toString() + " septillion";
    } else if (num >= 1e21) {
      strNum =
        (Math.round((num / 1e21) * 100) / 100).toString() + " sextillion";
    } else if (num >= 1e18) {
      strNum =
        (Math.round((num / 1e18) * 100) / 100).toString() + " quintillion";
    } else if (num >= 1e15) {
      strNum =
        (Math.round((num / 1e15) * 100) / 100).toString() + " quadrillion";
    } else if (num >= 1e12) {
      strNum = (Math.round((num / 1e12) * 100) / 100).toString() + " trillion";
    } else if (num >= 1e9) {
      strNum = (Math.round((num / 1e9) * 100) / 100).toString() + " billion";
    } else if (num >= 1e6) {
      strNum = (Math.round((num / 1e6) * 100) / 100).toString() + " million";
    }
  } else if (num < 0.01) {
    strNum = num.toExponential(2);
  } else {
    strNum = (Math.round(num * 100) / 100).toString();
  }

  return strNum;
};

export const calculateLocked = (formObject: FormObject): FormObject => {
  DENSITY_NORMAL = valueToNum(formObject.density.value) * 1000;

  switch (formObject.shape.name) {
    case "cube":
      if (!formObject.x.locked) {
        return cubeFromVolume(formObject);
      } else if (!formObject.mass.locked) {
        return cubeFromMass(formObject);
      } else if (
        !formObject.value.locked &&
        formObject.price.value != "???" &&
        formObject.value.value != "???"
      ) {
        return cubeFromValue(formObject);
      }
      break;
    case "box":
      if (formObject.mass.locked && formObject.value.locked) {
        return boxFromVolume(formObject);
      } else if (!formObject.mass.locked) {
        return boxFromMass(formObject);
      } else if (
        !formObject.value.locked &&
        formObject.price.value != "???" &&
        formObject.value.value != "???"
      ) {
        return boxFromValue(formObject);
      }
      break;
    case "sphere":
      if (formObject.mass.locked && formObject.value.locked) {
        return sphereFromVolume(formObject);
      } else if (!formObject.mass.locked) {
        return sphereFromMass(formObject);
      } else if (
        !formObject.value.locked &&
        formObject.price.value != "???" &&
        formObject.value.value != "???"
      ) {
        return sphereFromValue(formObject);
      }
      break;
    case "cylinder":
      if (formObject.mass.locked && formObject.value.locked) {
        return cylinderFromVolume(formObject);
      } else if (!formObject.mass.locked) {
        return cylinderFromMass(formObject);
      } else if (
        !formObject.value.locked &&
        formObject.price.value != "???" &&
        formObject.value.value != "???"
      ) {
        return cylinderFromValue(formObject);
      }
      break;
    default:
      return formObject;
  }

  return formObject;
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
