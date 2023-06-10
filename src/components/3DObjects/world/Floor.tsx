const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[2000, 2000]} />
      <meshStandardMaterial roughness={1} metalness={0} color={"#282c36"} />
    </mesh>
  );
};

export default Floor;
