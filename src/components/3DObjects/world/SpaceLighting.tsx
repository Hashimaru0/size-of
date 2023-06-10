const SpaceLighting = () => {
  return (
    <>
      <directionalLight position={[10, 10, 30]} intensity={0.3} castShadow>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 250, 10]} />
      </directionalLight>
      <directionalLight position={[10, 10, 30]} intensity={0.3} castShadow>
        <orthographicCamera
          attach="shadow-camera"
          args={[-10, 10, -10, -250]}
        />
      </directionalLight>

      <directionalLight position={[10, 10, 30]} intensity={0.3} castShadow>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, 10, -10]} />
      </directionalLight>

      <directionalLight position={[10, 10, 30]} intensity={0.3} castShadow>
        <orthographicCamera
          attach="shadow-camera"
          args={[-250, -10, 250, -250]}
        />
      </directionalLight>
      <directionalLight position={[10, 10, 30]} intensity={0.3} castShadow>
        <orthographicCamera
          attach="shadow-camera"
          args={[10, 250, 250, -250]}
        />
      </directionalLight>
      <ambientLight intensity={0.1} />
    </>
  );
};

export default SpaceLighting;
