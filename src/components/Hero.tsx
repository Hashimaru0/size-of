import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const Hero = () => {
  return (
    <Canvas camera={{ fov: 60, position: [2, 3, 7] }} shadows>
      <OrbitControls dampingFactor={0.2} maxDistance={350} minDistance={1} />
      <Environment preset="sunset" blur={1} />
      <ambientLight intensity={0.3} />
      <directionalLight
        color="white"
        position={[3, 5, 5]}
        intensity={1}
        castShadow
      >
        <orthographicCamera attach="shadow-camera" args={[-50, 50, 50, -50]} />
      </directionalLight>
      <mesh position={[0, 4.5, 8]} castShadow>
        <boxGeometry args={[4, 9, 4]} />
        <meshStandardMaterial roughness={0.1} metalness={1} color={"#aaa"} />
      </mesh>
      <mesh position={[0, 6, 10]} castShadow>
        <sphereGeometry args={[2, 16, 16]} />
        <meshStandardMaterial roughness={0.1} metalness={1} color={"#d1aa1b"} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2000, 2000]} />
        <meshStandardMaterial roughness={1} metalness={0} color={"#282c36"} />
      </mesh>
    </Canvas>
  );
};

export default Hero;
