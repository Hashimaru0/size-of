export type ComparisonObject = {
  id: number;
  name: string;
  description: string;
  size: number;
  unitSize: number;
  frontDistance: number;
  backDistance: number;
  cutoff: number;
};

export type Material = {
  id: number;
  name: string;
  density: number;
  price: number | string;
  color: string;
  metalness: number;
  roughness: number;
  opacity: number;
};

export type Shape = {
  id: number;
  name: string;
};

export type Unit = {
  id: number;
  name: string;
  shorthand: string;
  toBase: number;
};
