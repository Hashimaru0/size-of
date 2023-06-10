import { useContext } from "react";
import { FormDataContext } from "../Hero";
// Components
import MaterialGroup from "./MaterialGroup";
import DimensionsGroup from "./DimensionsGroup";
// Types
import { FormProps } from "../../types/components/props/types";

const Form = ({ setFormOpen, createObject }: FormProps) => {
  const { formObject } = useContext(FormDataContext);

  return (
    <div className="fixed flex justify-center items-center w-full h-full z-20">
      <div
        className="w-full h-full bg-black/80"
        onClick={() => {
          setFormOpen(false);
        }}
      ></div>
      <div className="absolute max-w-[25rem] max-h-[40rem] w-full h-full px-3 bg-ui-400 border-[0.2rem] border-ui-200 rounded-lg shadow-lg">
        <button
          className="absolute top-2 right-2"
          onClick={() => {
            setFormOpen(false);
          }}
        >
          <img
            src="src/assets/icons/cross.svg"
            width={15}
            height={15}
            alt="cross"
          />
        </button>
        <MaterialGroup />
        <DimensionsGroup />
        <button
          className={`absolute bottom-2 right-2 text-white bg-ui-200 rounded-lg px-8 py-2 ${
            !formObject.valid && "opacity-60"
          }`}
          disabled={!formObject.valid}
          onClick={() => createObject()}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default Form;
