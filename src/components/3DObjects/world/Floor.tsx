const Floor = () => {
  return (
    <mesh
      position={[0, -0.03, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial roughness={1} metalness={0} color={"#2f3440"} />
    </mesh>
  );
};

export default Floor;
