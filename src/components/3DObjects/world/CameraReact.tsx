import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function CameraReact({ cameraPos }: { cameraPos: [number, number, number] }) {
  const state = useThree((state) => state);

  useEffect(() => {
    state.camera.position.set(cameraPos[0], cameraPos[1], cameraPos[2]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraPos]);

  return null;
}

export default CameraReact;
