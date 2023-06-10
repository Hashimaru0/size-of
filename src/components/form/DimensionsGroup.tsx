import { useContext } from "react";
import { FormDataContext } from "../Hero";
import Select from "react-select";
// Data
import lengthUnits from "../../assets/data/length_units.json";
import massUnits from "../../assets/data/mass_units.json";
import currencyUnits from "../../assets/data/currency_units.json";
// Utils
import { TARGET } from "../../utils/formReducer";
import { valueToNum } from "../../utils/calculator";
// Types
import { DimensionInputProps } from "../../types/components/props/types";
import { SelectOption } from "../../types/components/types";

const DimensionInput = ({
  label,
  dimensionObj,
  target,
  units,
}: DimensionInputProps) => {
  const { formObject, dispatch } = useContext(FormDataContext);

  const onChangeSelect = (option: SelectOption | null) => {
    if (option === null) return;

    let unitObj = undefined;

    switch (target) {
      case "x":
        unitObj = lengthUnits.find((obj) => obj.id === option?.value);
        if (unitObj)
          dispatch({
            type: target,
            payload: {
              x: { ...formObject.x, unit: unitObj },
            },
          });
        break;
      case "y":
        unitObj = lengthUnits.find((obj) => obj.id === option?.value);
        if (unitObj)
          dispatch({
            type: target,
            payload: {
              y: { ...formObject.y, unit: unitObj },
            },
          });
        break;
      case "z":
        unitObj = lengthUnits.find((obj) => obj.id === option?.value);
        if (unitObj)
          dispatch({
            type: target,
            payload: {
              z: { ...formObject.z, unit: unitObj },
            },
          });
        break;
      case "mass":
        unitObj = massUnits.find((obj) => obj.id === option?.value);
        if (unitObj)
          dispatch({
            type: target,
            payload: {
              mass: { ...formObject.mass, unit: unitObj },
            },
          });
        break;
      case "value":
        unitObj = currencyUnits.find((obj) => obj.id === option?.value);
        if (unitObj)
          dispatch({
            type: target,
            payload: {
              value: { ...formObject.value, unit: unitObj },
            },
          });
        break;
    }
  };

  const onInputChange = (val: string) => {
    switch (target) {
      case "x":
        dispatch({
          type: target,
          payload: {
            x: { ...formObject.x, value: val },
          },
        });
        break;
      case "y":
        dispatch({
          type: target,
          payload: {
            y: { ...formObject.y, value: val },
          },
        });
        break;
      case "z":
        dispatch({
          type: target,
          payload: {
            z: { ...formObject.z, value: val },
          },
        });
        break;
      case "mass":
        dispatch({
          type: target,
          payload: {
            mass: { ...formObject.mass, value: val },
          },
        });
        break;
      case "value":
        dispatch({
          type: target,
          payload: {
            value: { ...formObject.value, value: val },
          },
        });
        break;
    }
  };

  const onLockButtonClick = () => {
    switch (target) {
      case "x":
        dispatch({
          type: target,
          payload: {
            x: { ...formObject.x, locked: !dimensionObj.locked },
          },
        });
        break;
      case "y":
        dispatch({
          type: target,
          payload: {
            y: { ...formObject.y, locked: !dimensionObj.locked },
          },
        });
        break;
      case "z":
        dispatch({
          type: target,
          payload: {
            z: { ...formObject.z, locked: !dimensionObj.locked },
          },
        });
        break;
      case "mass":
        dispatch({
          type: target,
          payload: {
            mass: { ...formObject.mass, locked: !dimensionObj.locked },
          },
        });
        break;
      case "value":
        dispatch({
          type: target,
          payload: {
            value: { ...formObject.value, locked: !dimensionObj.locked },
          },
        });
        break;
    }
  };

  const rangeCheck = () => {
    if (!dimensionObj.valid) {
      if (label !== "Mass:" && label !== "Value:") {
        if (label === "Radius:") {
          if (
            valueToNum(dimensionObj.value) * dimensionObj.unit.toBase <=
            0.5e-11
          ) {
            return "Too small!";
          } else if (
            valueToNum(dimensionObj.value) * dimensionObj.unit.toBase >=
            1e10
          ) {
            return "Too big!";
          }
        } else if (
          valueToNum(dimensionObj.value) * dimensionObj.unit.toBase <=
          1e-11
        ) {
          return "Too small!";
        } else if (
          valueToNum(dimensionObj.value) * dimensionObj.unit.toBase >=
          2e10
        ) {
          return "Too big!";
        }
      }
    }
  };

  return (
    <div className="relative w-full mt-3">
      <h2
        className={`text-[#adadad] ml-1 ${dimensionObj.locked && "opacity-60"}`}
      >
        {label}
      </h2>
      <div className="relative flex mt-1">
        <input
          className={`w-full h-[2rem] text-white pl-[0.6rem] pr-[3.5rem] border-2 border-r-0 ${
            dimensionObj.locked && "opacity-60"
          } ${
            dimensionObj.valid
              ? `border-[#9e9e9e] ${
                  !dimensionObj.locked && "hover:border-[#888]"
                }`
              : `border-red-600 ${
                  !dimensionObj.locked && "hover:border-red-700"
                }`
          } bg-transparent rounded-l-lg transition duration-100`}
          disabled={dimensionObj.locked}
          type="text"
          value={dimensionObj.value}
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            onInputChange(e.currentTarget.value)
          }
        />
        <div
          className={`absolute flex items-center px-1 h-[80%] top-[50%] translate-y-[-50%] right-[6.2rem] text-sm ${
            dimensionObj.locked ? "text-red-700" : "text-red-500"
          } bg-ui-400 transition duration-100`}
        >
          {rangeCheck()}
        </div>
        <button
          className="absolute right-[4.8rem] mt-[0.4rem]"
          onClick={() =>
            target === "value" && formObject.price.value === "???"
              ? {}
              : onLockButtonClick()
          }
        >
          {dimensionObj.locked ? (
            <svg
              className={`fill-[#9e9e9e] hover:fill-[#888] ${
                dimensionObj.locked && "opacity-60"
              } transition`}
              width="17"
              height="17"
              viewBox="0 0 10 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.50001 12.8333C1.17918 12.8333 0.904621 12.7192 0.676343 12.4909C0.447677 12.2622 0.333344 11.9875 0.333344 11.6667V5.83333C0.333344 5.51249 0.447677 5.23774 0.676343 5.00908C0.904621 4.7808 1.17918 4.66666 1.50001 4.66666H2.08334V3.49999C2.08334 2.69305 2.36782 2.00511 2.93676 1.43616C3.50532 0.867606 4.19307 0.583328 5.00001 0.583328C5.80695 0.583328 6.4949 0.867606 7.06384 1.43616C7.6324 2.00511 7.91668 2.69305 7.91668 3.49999V4.66666H8.50001C8.82084 4.66666 9.09559 4.7808 9.32426 5.00908C9.55254 5.23774 9.66668 5.51249 9.66668 5.83333V11.6667C9.66668 11.9875 9.55254 12.2622 9.32426 12.4909C9.09559 12.7192 8.82084 12.8333 8.50001 12.8333H1.50001ZM1.50001 11.6667H8.50001V5.83333H1.50001V11.6667ZM5.00001 9.91666C5.32084 9.91666 5.59559 9.80252 5.82426 9.57424C6.05254 9.34558 6.16668 9.07083 6.16668 8.74999C6.16668 8.42916 6.05254 8.15441 5.82426 7.92574C5.59559 7.69747 5.32084 7.58333 5.00001 7.58333C4.67918 7.58333 4.40462 7.69747 4.17634 7.92574C3.94768 8.15441 3.83334 8.42916 3.83334 8.74999C3.83334 9.07083 3.94768 9.34558 4.17634 9.57424C4.40462 9.80252 4.67918 9.91666 5.00001 9.91666ZM3.25001 4.66666H6.75001V3.49999C6.75001 3.01388 6.57987 2.60069 6.23959 2.26041C5.89932 1.92013 5.48612 1.74999 5.00001 1.74999C4.5139 1.74999 4.1007 1.92013 3.76043 2.26041C3.42015 2.60069 3.25001 3.01388 3.25001 3.49999V4.66666ZM1.50001 11.6667V5.83333V11.6667Z" />
            </svg>
          ) : (
            <svg
              className={`fill-[#9e9e9e] hover:fill-[#888] ${
                dimensionObj.locked && "opacity-60"
              } transition`}
              width="17"
              height="17"
              viewBox="0 0 10 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M1.50001 12.8333C1.17918 12.8333 0.904621 12.7192 0.676343 12.4909C0.447677 12.2623 0.333344 11.9875 0.333344 11.6667V5.83334C0.333344 5.51251 0.447677 5.23776 0.676343 5.00909C0.904621 4.78082 1.17918 4.66668 1.50001 4.66668H6.75001V3.50001C6.75001 3.0139 6.57987 2.6007 6.23959 2.26043C5.89932 1.92015 5.48612 1.75001 5.00001 1.75001C4.6014 1.75001 4.24907 1.86901 3.94301 2.10701C3.63657 2.3454 3.42987 2.64445 3.32293 3.00418C3.27432 3.15001 3.19907 3.26901 3.09718 3.36118C2.9949 3.45373 2.8757 3.50001 2.73959 3.50001C2.54515 3.50001 2.38959 3.43429 2.27293 3.30284C2.15626 3.17179 2.11737 3.02362 2.15626 2.85834C2.30209 2.20695 2.63751 1.66484 3.16251 1.23201C3.68751 0.799566 4.30001 0.583344 5.00001 0.583344C5.80695 0.583344 6.4949 0.867621 7.06384 1.43618C7.6324 2.00512 7.91668 2.69307 7.91668 3.50001V4.66668H8.50001C8.82084 4.66668 9.09559 4.78082 9.32426 5.00909C9.55254 5.23776 9.66668 5.51251 9.66668 5.83334V11.6667C9.66668 11.9875 9.55254 12.2623 9.32426 12.4909C9.09559 12.7192 8.82084 12.8333 8.50001 12.8333H1.50001ZM1.50001 11.6667H8.50001V5.83334H1.50001V11.6667Z" />
            </svg>
          )}
        </button>
        <Select
          className="min-w-[4.5rem] max-w-[4.5rem] top-0 text-base"
          value={{
            value: dimensionObj.unit.id,
            label: dimensionObj.unit.shorthand,
          }}
          onChange={(option: SelectOption | null) =>
            option && onChangeSelect(option)
          }
          options={units.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              background: "transparent",
              border: dimensionObj.valid
                ? dimensionObj.locked
                  ? "2px solid rgba(158, 158, 158, 0.6)"
                  : "2px solid #9e9e9e"
                : dimensionObj.locked
                ? "2px solid rgba(220, 38, 38, 0.6)"
                : "2px solid #dc2626",
              "&:hover": {
                border: dimensionObj.valid
                  ? dimensionObj.locked
                    ? "2px solid rgba(136, 136, 136, 0.6)"
                    : "2px solid #888"
                  : dimensionObj.locked
                  ? "2px solid rgba(185, 28, 28, 0.6)"
                  : "2px solid #b91c1c",
              },
              borderRadius: "0 0.5rem 0.5rem 0",
              boxShadow: "none",
              minHeight: "2rem",
              height: "2rem",
              flexWrap: "nowrap",
            }),
            valueContainer: (baseStyles) => ({
              ...baseStyles,
              justifyContent: "center",
            }),
            indicatorSeparator: (baseStyles) => ({
              ...baseStyles,
              background: "transparent",
            }),
            dropdownIndicator: (baseStyles) => ({
              ...baseStyles,
              padding: "4px 4px 4px 0px",
            }),
            placeholder: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            input: (baseStyles) => ({
              ...baseStyles,
              color: "white",
            }),
            singleValue: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              overflow: "visible",
              textOverflow: "clip",
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              color: "white",
              background: "#27292e",
              border: "2px solid #3a3c42",
              borderRadius: "0.5rem",
              margin: "0.2rem 0",
              width: "10rem",
              right: 0,
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
    </div>
  );
};

const DimensionsGroup = () => {
  const { formObject } = useContext(FormDataContext);

  const switchDimensions = (shape: string) => {
    switch (shape) {
      case "cube":
        return (
          <>
            <DimensionInput
              label="Side:"
              dimensionObj={formObject.x}
              target={TARGET.X}
              units={lengthUnits}
            />
          </>
        );
      case "box":
        return (
          <>
            <DimensionInput
              label="Width (x):"
              dimensionObj={formObject.x}
              target={TARGET.X}
              units={lengthUnits}
            />
            <DimensionInput
              label="Height (y):"
              dimensionObj={formObject.y}
              target={TARGET.Y}
              units={lengthUnits}
            />
            <DimensionInput
              label="Depth (z):"
              dimensionObj={formObject.z}
              target={TARGET.Z}
              units={lengthUnits}
            />
          </>
        );
      case "sphere":
        return (
          <>
            <DimensionInput
              label="Radius:"
              dimensionObj={formObject.x}
              target={TARGET.X}
              units={lengthUnits}
            />
          </>
        );
      case "cylinder":
        return (
          <>
            <DimensionInput
              label="Radius:"
              dimensionObj={formObject.x}
              target={TARGET.X}
              units={lengthUnits}
            />
            <DimensionInput
              label="Height:"
              dimensionObj={formObject.y}
              target={TARGET.Y}
              units={lengthUnits}
            />
          </>
        );
    }
  };

  return (
    <div className="mt-3">
      {switchDimensions(formObject.shape.name)}
      <DimensionInput
        label="Mass:"
        dimensionObj={formObject.mass}
        target={TARGET.MASS}
        units={massUnits}
      />
      <DimensionInput
        label="Value:"
        dimensionObj={formObject.value}
        target={TARGET.VALUE}
        units={currencyUnits}
      />
    </div>
  );
};

export default DimensionsGroup;
