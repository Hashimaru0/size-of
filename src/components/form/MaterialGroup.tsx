import { useContext } from "react";
import { FormDataContext } from "../Hero";
import Select from "react-select";
// Data
import materials from "../../assets/data/materials.json";
import shapes from "../../assets/data/shapes.json";
// Utils
import { TARGET } from "../../utils/formReducer";
// Types
import { SelectInputProps } from "../../types/components/props/types";
import { ConstantInputProps } from "../../types/components/props/types";
import { SelectOption } from "../../types/components/types";

const SelectInput = ({ label, target, data }: SelectInputProps) => {
  const { dispatch } = useContext(FormDataContext);

  const onChangeSelect = (option: SelectOption | null) => {
    if (option === null) return;

    if (target === TARGET.MATERIAL) {
      const selectedObj = materials.find((obj) => obj.id === option?.value);
      if (selectedObj) {
        dispatch({
          type: TARGET.MATERIAL,
          payload: {
            material: selectedObj,
          },
        });
      }
    } else if (target === TARGET.SHAPE) {
      const selectedObj = shapes.find((obj) => obj.id === option?.value);
      if (selectedObj) {
        dispatch({
          type: TARGET.SHAPE,
          payload: {
            shape: selectedObj,
          },
        });
      }
    }
  };

  return (
    <div className="w-1/2">
      <h2 className="text-[#adadad] mt-2 ml-1">{label}</h2>
      <Select
        className="mt-1 text-base"
        defaultValue={
          target === "material" ? undefined : { value: 0, label: "Cube" }
        }
        onChange={(option: SelectOption | null) =>
          option && onChangeSelect(option)
        }
        options={data.map(({ id, name }) => ({
          value: id,
          label: name[0].toUpperCase() + name.slice(1),
        }))}
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            background: "transparent",
            border: "2px solid #9e9e9e",
            "&:hover": {
              border: "2px solid #888",
            },
            borderRadius: "0.5rem",
            boxShadow: "none",
            minHeight: "2rem",
            height: "2rem",
            flexWrap: "nowrap",
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            background: "transparent",
          }),
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            overflow: "hidden",
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "white",
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            background: "#27292e",
            border: "2px solid #3a3c42",
            borderRadius: "0.5rem",
            margin: "0.2rem 0",
          }),
          menuList: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            background: "#27292e",
            borderRadius: "0.5rem",
          }),
          option: (baseStyles) => ({
            ...baseStyles,
            color: "white",
            background: "transparent",
          }),
        }}
      />
    </div>
  );
};

const ConstantInput = ({
  label,
  targetObj,
  target,
  unit,
}: ConstantInputProps) => {
  const { formObject, dispatch } = useContext(FormDataContext);

  const onInputChange = (val: string) => {
    dispatch({
      type: target,
      payload: {
        density:
          target === TARGET.DENSITY
            ? {
                ...formObject.density,
                value: val,
              }
            : null,
        price:
          target === TARGET.PRICE
            ? {
                ...formObject.price,
                value: val,
              }
            : null,
      },
    });
  };

  return (
    <div className="w-1/2">
      <h2 className="text-[#adadad] ml-1">{label}</h2>
      <div className="relative mt-1">
        <input
          className={`w-full h-[2rem] text-white pl-[0.6rem] pr-[3.5rem] border-2 ${
            targetObj.valid
              ? "border-[#9e9e9e] hover:border-[#888]"
              : "border-red-600 hover:border-red-700"
          } bg-transparent rounded-lg transition duration-100`}
          type="text"
          value={targetObj.value}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onInputChange(e.currentTarget.value)
          }
        />
        <div className="absolute text-white text-sm top-[0.4rem] right-2">
          {unit}
        </div>
      </div>
    </div>
  );
};

const MaterialGroup = () => {
  const { formObject } = useContext(FormDataContext);

  return (
    <div>
      <div className="flex gap-3 mt-3">
        <SelectInput
          label="Material:"
          target={TARGET.MATERIAL}
          data={materials}
        />
        <SelectInput label="Shape:" target={TARGET.SHAPE} data={shapes} />
      </div>
      <div className="flex gap-3 mt-3">
        <ConstantInput
          label="Density*:"
          targetObj={formObject.density}
          target={TARGET.DENSITY}
          unit={"g/cm\u00B3"}
        />
        <ConstantInput
          label="Price*:"
          targetObj={formObject.price}
          target={TARGET.PRICE}
          unit={"$/kg"}
        />
      </div>
      <p className="mt-1 ml-1 text-xs text-[#adadad]/60">
        *Edit if not accurate
      </p>
    </div>
  );
};

export default MaterialGroup;
