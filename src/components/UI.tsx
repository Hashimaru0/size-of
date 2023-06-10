import { useEffect, Dispatch, SetStateAction, useRef } from "react";
// Icons
import AddIcon from "./icons/AddIcon";
import CenterCameraIcon from "./icons/CenterCameraIcon";
import RandomIcon from "./icons/RandomIcon";
import PatreonIcon from "./icons/PatreonIcon";
import CoffeeIcon from "./icons/CoffeeIcon";
import DiscordIcon from "./icons/DiscordIcon";
// Types
import { FinalObject } from "../types/components/types";

const ControlButtonGroup = ({
  setFormOpen,
  resetCam,
  pickRandomObject,
}: {
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  resetCam: () => void;
  pickRandomObject: () => void;
}) => {
  return (
    <div className="fixed bottom-5 left-5 flex w-[40%] sm:w-auto sm:static sm:mt-[1rem]">
      <button
        className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-[2px] border-ui-100 rounded-tl-lg rounded-bl-lg bg-ui-300"
        onClick={() => setFormOpen(true)}
      >
        <AddIcon />
      </button>
      <button
        className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-y-[2px] border-ui-100 bg-ui-300"
        onClick={() => resetCam()}
      >
        <CenterCameraIcon />
      </button>
      <button
        className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-[2px] border-ui-100 rounded-tr-lg rounded-br-lg bg-ui-300"
        onClick={() => pickRandomObject()}
      >
        <RandomIcon />
      </button>
    </div>
  );
};

const SocialsButtonGroup = () => {
  return (
    <div className="fixed bottom-5 right-5 flex justify-end w-[40%] sm:w-auto sm:static sm:mt-[1rem]">
      <button className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-[2px] border-ui-100 rounded-tl-lg rounded-bl-lg bg-ui-300">
        <PatreonIcon />
      </button>
      <button className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-y-[2px] border-ui-100 bg-ui-300">
        <CoffeeIcon />
      </button>
      <button className="flex justify-center items-center text-white text-shadow h-[2.5rem] w-[3.5rem] border-[2px] border-ui-100 rounded-tr-lg rounded-br-lg bg-ui-300">
        <DiscordIcon />
      </button>
    </div>
  );
};

const UI = ({
  finalObject,
  setFormOpen,
  resetCam,
  pickRandomObject,
}: {
  finalObject: FinalObject;
  setFormOpen: Dispatch<SetStateAction<boolean>>;
  resetCam: () => void;
  pickRandomObject: () => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.innerText = finalObject.description;
    }
  }, [finalObject]);

  return (
    <div className="absolute flex justify-between min-h-[5rem] max-w-[60rem] top-0 left-0 right-0 sm:px-5 mx-auto z-10">
      <ControlButtonGroup
        setFormOpen={setFormOpen}
        resetCam={resetCam}
        pickRandomObject={pickRandomObject}
      />
      <div
        ref={inputRef}
        className="w-full sm:max-w-[30rem] px-5 py-5 sm:mx-5 break-words resize-none bg-white"
        contentEditable
        spellCheck={false}
      />
      <SocialsButtonGroup />
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export default UI;
