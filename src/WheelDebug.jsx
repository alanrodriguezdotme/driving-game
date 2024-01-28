const debug = true;

export const WheelDebug = ({ radius, wheelRef }) => {
  return (
    debug && (
      <group ref={wheelRef}>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius, radius, 0.1, 16]} />
          <meshStandardMaterial color={0x222222} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[radius / 1.5, radius / 1.5, 0.11, 16]} />
          <meshStandardMaterial color={0x666666} />
        </mesh>
      </group>
    )
  );
};
